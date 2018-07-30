import React from 'react'
import { connect } from 'react-redux'
import Mqtt from 'mqtt'
import { isEmpty } from 'lodash'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import AlertMqttError from 'components/AlertMqttError'
import AlertModelMqttError from 'components/AlertModelMqttError'
import ModelList from '../ModelList'
import ModelDetail from '../ModelDetail'
import CreateModel from '../CreateModel'
import Train from '../Train'
import Test from '../Test'
import classes from './ModelManagement.scss'
import {
  TRAINING_CHANGE_MESSAGE,
  TESTING_CHANGE_MESSAGE,
  getModelList,
  getLicenseList,
} from '../../modules'

type Props = {
  pageStatus: String,
  modelDetail: Object,
  dispatch: Function,
  modelList: Array,
  licenseList: Array,
  intl: Object,
};

export class ModelManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDetail: false,
      row: {},
      progress: 0,
      mqttError: 'loading',
      visible: false,
      isError: false,
      errorMsg: '',
      modelId: '',
      trainingPercent: '0',
      testingPercent: '0',
    }
    this.client = null
    this.isDetail = this.isDetail.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getModelList())
    this.props.dispatch(getLicenseList())
    this.subscriptionMqttWithDeviceId()
  }

  componentWillUnmount() {
    // UnSubscribe mqtt
    if (this.client) {
      this.client.end(() => {
        console.log('Disconnect')
      })
    }
  }

  subscriptionMqttWithDeviceId = () => {
    let mqttClient
    if (__PROD__) {
      mqttClient = Mqtt.connect(`wss://${location.hostname}:59001`, {
        rejectUnauthorized: false,
        username: 'deltaww',
        password: 'Dare2Define',
      })
    } else {
      mqttClient = Mqtt.connect(__MQTT__, {
        rejectUnauthorized: false,
        username: 'deltaww',
        password: 'Dare2Define',
      })
    }

    mqttClient.stream.on('error', () => {
      this.setState({
        visible: true,
        mqttError: false,
      })
      mqttClient.end()
    })

    mqttClient.on('connect', () => {
      this.setState({
        mqttError: true,
      })
      mqttClient.subscribe('autojudge/training/info')
      mqttClient.subscribe('autojudge/testing/info')
    })
    mqttClient.on('message', (topic, message) => {
      const msgArray = JSON.parse(message.toString())
      const state = {
        modelId: msgArray.modelId.toString(),
      }
      const obj = {
        payload: msgArray,
      }
      console.log('message', msgArray)
      if (msgArray.status === 'error') {
        this.setState({
          isError: true,
          errorMsg: msgArray.divaErrorMessage,
        })
      }
      if (topic === 'autojudge/training/info') {
        state.trainingPercent = msgArray.percent
        obj.type = TRAINING_CHANGE_MESSAGE
      }
      if (topic === 'autojudge/testing/info') {
        state.testingPercent = msgArray.percent
        obj.type = TESTING_CHANGE_MESSAGE
      }

      this.setState(state)
      this.props.dispatch(obj)
    })
    this.client = mqttClient
  }

  isDetail(isOpen, rowDetail) {
    this.setState({
      isDetail: isOpen,
      row: rowDetail._original,
    })
  }

  handleMqttError = () => {
    this.setState({
      visible: false,
    })
  }
  handleModelMqttError = () => {
    this.setState({
      isError: false,
    })
  }
  props: Props
  render() {
    const { intl } = this.props
    const number = this.props.modelList.filter((item) => {
      return (item.currentState !== 'none')
    })
    let cards = []
    if (!isEmpty(this.props.licenseList)) {
      cards = this.props.licenseList.filter(item => item.isTrainingDevice === true && item.isActivate === true)
    }
    const gpuArr = cards.map(item => {
      return item.deviceGpus.map(i => {
        return i.trainingServiceCount
      })
    })
    const gpuNumber = gpuArr.toString().split(',').reduce((ret, item) => Number(ret) + Number(item), 0)
    return (
      <div className={classes.container}>
        <div className={classes.top}>
          <h4 className={classes.model}>
            <WrapperFormattedMessage
              id="nav.modelManagement"
            />
          </h4>
          <CreateModel />
        </div>
        {
          cards.length === 0 ?
            <h5 style={{ margin: '15px 0px' }}><WrapperFormattedMessage id='modelManagement.remainingService' />: 0</h5> :
            <h5 style={{ margin: '15px 0px' }}><WrapperFormattedMessage id='modelManagement.remainingService' />: {gpuNumber - number.length}</h5>
        }
        <ModelList isDetail={this.isDetail} />
        {
          !isEmpty(this.props.modelDetail) &&
          this.state.isDetail &&
          this.props.pageStatus === 'detailPage' &&
          <ModelDetail
            rowDetail={this.state.row}
            isDetail={this.isDetail}
            modelDetail={this.props.modelDetail}
            trainingPercent={this.state.trainingPercent}
            testingPercent={this.state.testingPercent}
            modelId={this.state.modelId}
          />
        }
        {
          this.props.pageStatus === 'startTrainPage' &&
          <Train rowDetail={this.state.row} />
        }
        {
          this.props.pageStatus === 'startTestPage' &&
          <Test rowDetail={this.state.row} />
        }
        <AlertMqttError isOpen={this.state.visible} isError={this.state.mqttError} handleCancel={this.handleMqttError} />
        <AlertModelMqttError isOpen={this.state.isError} handleCancel={this.handleModelMqttError} errorMsg={this.state.errorMsg} />
      </div>
    )
  }
}
export default injectIntl(connect(
  state => ({
    token: state.auth.token,
    pageStatus: state.modelManagement.pageStatus,
    modelList: state.modelManagement.modelList,
    modelDetail: state.modelManagement.modelDetail,
    licenseList: state.modelManagement.licenseList,
  }),
)(ModelManagement))
