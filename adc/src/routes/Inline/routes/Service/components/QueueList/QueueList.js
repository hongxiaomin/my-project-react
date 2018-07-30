/* eslint import/no-named-as-default: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Radio, DatePicker } from 'antd'
import Table from './Table'
import { queueModeSwitch, getQueueMode } from '../../modules/Service'
import './QueueList.scss'

const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

export class QueueList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // status: 'manualMode', // autoMode
      date: [],
    }
  }

  componentDidMount() {
    this.props.dispatch(getQueueMode())
  }

  onChange = (date, dateString) => {
    this.setState({
      date: dateString,
    })
  }

  handleStatusChange = (e) => {
    this.props.dispatch(queueModeSwitch(e.target.value))
  }

  disabledDate = current => (current && current.valueOf() > Date.now())

  render() {
    const { intl } = this.props
    return (
      <div style={{ width: '50%' }}>
        <h4 style={{ paddingTop: '10px' }}>
          <WrapperFormattedMessage id="serviceManagement.queueList.queueInformation" />
        </h4>
        <div styleName="top-left">
          <div style={{ padding: '10px 0' }}>
            <span style={{ fontSize: '14px' }}>
              <WrapperFormattedMessage id="serviceManagement.queueList.filter" />: </span>
            <RangePicker
              onChange={this.onChange}
              placeholder={[intl.formatMessage({ id: 'startTime' }), intl.formatMessage({ id: 'endTime' })]}
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={this.disabledDate}
              showTime
            />
          </div>
          <div style={{ padding: '10px 0' }}>
            <RadioGroup value={this.props.queueModel} onChange={this.handleStatusChange}>
              <RadioButton value="manualMode"><WrapperFormattedMessage id="serviceManagement.edit.manualMode" /></RadioButton>
              <RadioButton value="autoMode"><WrapperFormattedMessage id="serviceManagement.edit.autoMode" /></RadioButton>
            </RadioGroup>
          </div>
        </div>
        <Table
          condition={this.state.date}
          showAction={this.props.queueModel === 'manualMode'}
        />
      </div>
    )
  }
}

QueueList.propTypes = {
  queueModel: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}

export default connect(({ service, intl: { locale } }) => ({
  locale,
  queueModel: service.queueModel,
}))(injectIntl(QueueList))
