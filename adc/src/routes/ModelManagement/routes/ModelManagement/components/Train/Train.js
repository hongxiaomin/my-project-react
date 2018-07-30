/* eslint max-len: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filter } from 'lodash'
import { Progress, Button } from 'antd'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import classes from './Train.scss'
import ModelTrainingProgress from '../ModelTrainingProgress'
import {
  PAGE_STATUS,
  getModelTrainDetail,
  actionTrainModel,
  getModelDetail,
} from '../../modules'

type Props = {
  rowDetail: Object,
  dispatch: Function,
  modelList: Array,
  intl: Object,
};
export class TextField {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  getRender(btn) {
    return (
      <div className={classes.textField}>
        <div className={classes.key}>
          {this.key}
        </div>
        <div className={classes.value}>
          {this.value}
          {btn}
        </div>
      </div>
    )
  }
}


const TrainDiv = ({ children }) => (<div style={{ display: 'flex', height: '30px' }} >{children}</div>)
TrainDiv.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
}

const TrainButton = ({ name, loading, handleClick, className, style }) => (<Button
  type="primary"
  style={style}
  loading={loading}
  className={`pt-button pt-intent-primary${className}`}
  onClick={handleClick}
>{name}</Button>)
TrainButton.defaultProps = {
  handleClick: () => {},
  className: '',
  loading: false,
  style: { marginRight: '20px' },
}
TrainButton.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.bool,
}

export class Train extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    this.props.dispatch(getModelTrainDetail(this.props.rowDetail.id)) // 传 id
  }

  getActionTrainModel = (tmp) => {
    this.setState({
      loading: true,
    })
    this.props.dispatch(actionTrainModel(tmp, () => {
      this.setState({
        loading: false,
      })
    }))
  }

  mainPageButton = intl => () => (<TrainButton
    handleClick={this.mainPage}
    name={intl.formatMessage({ id: 'modelManagement.test.mainPage' })}
  />)

  goToTestingButton = intl => () => (<TrainButton
    name={intl.formatMessage({ id: 'modelManagement.test.goToTesting' })}
    handleClick={this.gotoTesting}
    loading={this.state.loading}
  />)

  startButton = intl => () => (<TrainButton
    name={intl.formatMessage({ id: 'modelManagement.test.start' })}
    handleClick={this.BeginTraining}
    loading={this.state.loading}
  />)

  stopButton = intl => () => (<TrainButton
    name={intl.formatMessage({ id: 'modelManagement.test.stop' })}
    handleClick={this.stopTraining}
    loading={this.state.loading}
  />)

  destroyButton = intl => () => (<TrainButton
    name={intl.formatMessage({ id: 'modelManagement.test.destroy' })}
    className={` ${classes.btn}`}
    handleClick={this.destroy}
    loading={this.state.loading}
  />)

  reStartButton = intl => () => (<TrainButton
    name={intl.formatMessage({ id: 'modelManagement.test.restart' })}
    className={` ${classes.btn}`}
    handleClick={this.reStart}
    loading={this.state.loading}
  />)

  BeginTraining = () => {
    const tmp = {
      state: 'training',
      command: 'start',
      modelId: this.props.rowDetail.id,
      viewId: this.props.rowDetail.viewId,
      deviceHash: this.props.rowDetail.deviceHash,
    }
    this.getActionTrainModel(tmp)
  }

  reStart = () => {
    const tmp = {
      state: 'training',
      command: 'restart',
      modelId: this.props.rowDetail.id,
      viewId: this.props.rowDetail.viewId,
      deviceHash: this.props.rowDetail.deviceHash,
    }
    this.getActionTrainModel(tmp)
  }

  stopTraining = () => {
    const tmp = {
      command: 'stop',
      state: 'training',
      modelId: this.props.rowDetail.id,
      viewId: this.props.rowDetail.viewId,
      deviceHash: this.props.rowDetail.deviceHash,
    }
    this.getActionTrainModel(tmp)
  }

  destroy = () => {
    const tmp = {
      state: 'training',
      command: 'destroy',
      modelId: this.props.rowDetail.id,
      viewId: this.props.rowDetail.viewId,
      deviceHash: this.props.rowDetail.deviceHash,
    }
    console.log('destroy', tmp, this.props.rowDetail)
    this.getActionTrainModel(tmp)
  }

  mainPage = () => {
    this.props.dispatch({
      type: PAGE_STATUS,
      payload: 'detailPage',
    })
    this.props.dispatch(getModelDetail(this.props.rowDetail.id))
  }

  gotoTesting = () => {
    this.props.dispatch({
      type: PAGE_STATUS,
      payload: 'startTestPage',
    })
  }

  props: Props;

  render() {
    const { intl } = this.props
    const detail = filter(this.props.modelList, element => (
      element.id === this.props.rowDetail.id))[0]

    const { trainingDetail = {
      gpu: '',
      gpuMemeory: '',
      gpuUtilization: '',
      temperature: '',
      trainingProgress: {
        loseRate: [],
        accuracy: [],
      },
    } } = detail

    if (trainingDetail.status === 'started' && trainingDetail.percent * 1 === 1) {
      trainingDetail.status = 'done'
    }

    const { currentState, isTrained } = this.props.rowDetail
    const { status } = trainingDetail
    let buttons = ''

    switch (status) {
      case 'inited': case 'initing': default:
        buttons = (<TrainDiv>{this.startButton(intl)}{this.mainPageButton(intl)}</TrainDiv>)
        break

      case 'starting': case 'started': case 'training':
        buttons = (<TrainDiv>{this.stopButton(intl)}{this.mainPageButton(intl)}</TrainDiv>)
        break

      case 'stopping': case 'error': case 'stopped':
        buttons = (<TrainDiv>{this.destroyButton(intl)}{this.reStartButton(intl)}{this.mainPageButton(intl)}</TrainDiv>)
        break

      case 'done':
        buttons = (<TrainDiv>{this.destroyButton(intl)}{this.mainPageButton(intl)}</TrainDiv>)
        break
      case 'destroying': case 'destroyed':
        buttons = (<TrainDiv>{this.goToTestingButton(intl)}{this.mainPageButton(intl)}</TrainDiv>)
    }

    if (currentState === 'testing' ||
    (status === 'none' && trainingDetail.percent * 1 === 1) ||
    (currentState === 'none' && isTrained)) {
      buttons = (<TrainDiv>{this.goToTestingButton(intl)}{this.mainPageButton(intl)}</TrainDiv>)
    }
    if ((status === 'none' && trainingDetail.percent * 1 !== 1)) {
      buttons = (<TrainDiv>{this.startButton(intl)}{this.mainPageButton(intl)}</TrainDiv>)
    }
    return (
      <div className={classes.container}>
        <div className={classes.top}>
          <div className={classes['top-left']}>
            <div>
              <div className={classes.strong}>
                <WrapperFormattedMessage id="modelManagement.modelTraining" />
              </div>
              <div className={classes.strong}>
                ID：{this.props.rowDetail.id}
              </div>
            </div>
            {buttons}
          </div>
        </div>
        <div className={classes.top}>
          <div className={classes['top-left']}>
            <div className={classes.strong}><WrapperFormattedMessage id="modelManagement.trainingProgress" /> </div>
          </div>
        </div>
        <div className={classes.progress}>
          <ModelTrainingProgress
            lossRate={trainingDetail.trainingProgress.loseRate}
            accuracy={trainingDetail.trainingProgress.accuracy}
          />
        </div>
        <div className={classes.content}>
          <div className={classes.left}>
            {
              currentState === 'testing' ?
                <div className={classes.strong}><WrapperFormattedMessage id="modelManagement.status" />
                  none
                </div> :
                <div className={classes.strong}><WrapperFormattedMessage id="modelManagement.status" />
                  {trainingDetail.status}
                </div>
            }
            <Progress
              type="circle"
              percent={(trainingDetail.percent * 100).toFixed(0)}
              format={percent => `${percent}%`}
            />
          </div>
          <div className={classes.center}>
            <div className={classes.strong}><WrapperFormattedMessage id="modelManagement.test.time" /></div>
            {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.initializedAt' })}`, trainingDetail.initializedAt).getRender()}
            {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.runningAt' })}`, trainingDetail.runningAt).getRender()}
            {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.willFinish' })}`, trainingDetail.willFinish).getRender()}
            <div>
              <div className={classes.strong}><WrapperFormattedMessage id="modelManagement.test.hardwareUsage" /></div>
              {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.GPU' })}`, trainingDetail.gpu).getRender()}
              {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.GPUMemory' })}`, trainingDetail.gpuMemory).getRender()}
              {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.GPUUtilization' })}`, trainingDetail.gpuUtilization).getRender()}
              {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.Temperature' })}`, trainingDetail.temperature).getRender()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(connect((state) => {
  return {
    token: state.auth.token,
    modelList: state.modelManagement.modelList,
  }
})(Train))
