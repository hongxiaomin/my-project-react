import React from 'react'
import { connect } from 'react-redux'
import classes from './ServiceManagement.scss'
import SMList from '../ServiceManagementList'
import SMQueueList from '../QueueList'
import { getModel, getServiceInfo, getQueueList } from '../../modules/Service'

type Props = {
  getModel: Function,
  getServiceInfo: Function,
  getQueueList: Function,
};

export class ServiceManagement extends React.Component {
  componentDidMount() {
    this.props.getServiceInfo()
    this.props.getQueueList()
    this.props.getModel()
  }

  props: Props

  render() {
    return (
      <div className={classes['ServiceManagement-container']}>
        <SMList
          setDetail={this.setDetail}
        />
        <SMQueueList />
      </div>
    )
  }
}

export default connect(
  state => ({
    data: state.service,
  }), {
    getModel,
    getServiceInfo,
    getQueueList,
  })(ServiceManagement)
