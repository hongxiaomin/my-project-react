import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import Mqtt from 'mqtt'
import { connect } from 'react-redux'
import AlertMqttError from 'components/AlertMqttError'
import classes from './ServiceManagementList.scss'
import ServiceCard from '../ServiceCard'
import { updateServiceList, updateQueueStatus, addJobToQueueList } from '../../modules/Service'

export class ServiceManagementList extends React.Component {
  constructor(props) {
    super(props)
    this.client = null
    this.state = {
      isOpen: false,
      selectedIndex: -1,
      kernelIdArray: [],
      progress: '',
      mqttError: 'loading',
      visible: false,
    }
  }

  componentDidMount() {
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
      mqttClient.subscribe('autojudge/service/queue')
      mqttClient.subscribe('autojudge/service/info')
    })

    mqttClient.on('message', (topic, message) => {
      let msgArray
      try {
        msgArray = JSON.parse(message.toString())
      } catch (e) {
        console.error('Json parsing fails！')
        return
      }

      // 新增一条队列信息
      if (topic === 'autojudge/service/queue') {
        if (msgArray.type === 'create') {
          this.props.addJobToQueueList(msgArray.data)
        } else if (msgArray.type === 'update') {
          this.props.updateQueueStatus(msgArray.data)
        }
        return
      }

      // 更新service卡片信息
      if (topic === 'autojudge/service/info') {
        this.props.updateServiceList(msgArray)
      }
    })

    this.client = mqttClient
  }

  handleMqttError = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    return (
      <div className={classes['ServiceManagementList-container']}>
        <section className={`${classes.title} ${classes.clear}`}>
          <h4 className={`${classes.left}`}><WrapperFormattedMessage id="nav.serviceManagement" /></h4>
        </section>
        <div className={classes.cards}>
          {
            this.props.serviceList.map(item => (<ServiceCard
              item={item}
              key={item.viewId}
              loading={this.props.loading.includes(item.serviceId)}
            />))
          }
        </div>
        <AlertMqttError
          isOpen={this.state.visible}
          isError={this.state.mqttError}
          handleCancel={this.handleMqttError}
        />
      </div>
    )
  }
}

ServiceManagementList.propTypes = {
  updateServiceList: PropTypes.func.isRequired,
  updateQueueStatus: PropTypes.func.isRequired,
  addJobToQueueList: PropTypes.func.isRequired,
  serviceList: PropTypes.array.isRequired,
  loading: PropTypes.array.isRequired,
}

export default connect(
  ({ auth, service, intl }) => ({
    intl,
    token: auth.token,
    serviceList: service.serviceList,
    loading: service.loading.service,
  }), {
    updateServiceList,
    updateQueueStatus,
    addJobToQueueList,
  })(ServiceManagementList)
