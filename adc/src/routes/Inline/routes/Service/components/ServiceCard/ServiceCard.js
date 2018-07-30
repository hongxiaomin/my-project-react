import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import EditDialog from '../EditDialog'
import CreateServiceDialog from '../CreateServiceDialog'
import classes from './ServiceCard.scss'
import { sendCommand, resetService, deleteService } from '../../modules/Service'
import CommonDialog from './CommonDialog'

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

export class ServiceCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: '',
      status: this.props.item.status || '',
      addOpen: false,
      editOpen: false,
      deleteOpen: false,
      destroyOpen: false,
      stopOpen: false,
      startOpen: false,
      resetOpen: false,
    }
  }

  toggleDialog = type => () => {
    const key = `${type}Open`
    this.setState({
      [key]: !this.state[key],
    })
  }

  handleSubmit = type => () => {
    this.props.dispatch(sendCommand({
      serviceId: this.props.item.serviceId,
      command: type,
    }, () => {
      this.toggleDialog(type)()
    }))
  }

  handleResetSubmit = () => {
    this.props.dispatch(resetService({
      serviceId: this.props.item.serviceId,
    }))
    this.toggleDialog('reset')()
  }

  handleDeleteDialog = () => {
    this.props.dispatch(deleteService(this.props.item.deviceId))
    this.toggleDialog('delete')()
  }

  render() {
    const { item, loading, intl } = this.props
    let stopOrLoading = 'Stop'
    let status
    let color
    if (loading === 'stop') stopOrLoading = 'loading'

    switch (item.status.toLowerCase()) {
      case 'initing': case 'inited': case 'stopped': case 'stopping':
        status = 'Idle'
        color = '#ccc'
        break
      case 'starting':
        status = 'Creating'
        color = '#66cc00'
        break
      case 'started':
        status = 'Ready'
        color = '#0099ff'
        break
      case 'feeding': case 'feeded':
        status = 'In Progress'
        color = 'orange'
        break
      case '': case 'none': case 'destroyed': case 'destroying': default:
        status = 'Undefined'
        color = '#ccc'
    }

    return (
      <div style={{ width: '45%' }}>
        <div className={classes.container}>
          {this.props.loading
            ? <div className={classes.bg} ><WrapperFormattedMessage id='serviceManagement.serviceCard.stateIsUpdating' /></div>
            : ''
          }
          <div className={classes.top}>
            <h5 className={classes.h5} title={item.serviceName}>Service : {item.serviceName}</h5>
            <div style={{ whiteSpace: 'nowrap' }}>
              {
                status !== 'Undefined' ?
                  <button
                    type='button'
                    disabled={!['inited', 'stopped'].includes(item.status)}
                    onClick={this.toggleDialog('destroy')}
                    className={'pt-button pt-minimal pt-icon-delete'}
                    title={intl.formatMessage({ id: 'destroy' })}
                  /> :
                  <button
                    type='button'
                    onClick={this.toggleDialog('add')}
                    className={'pt-button pt-minimal pt-icon-add'}
                    title={intl.formatMessage({ id: 'serviceManagement.serviceCard.initService' })}
                  />
              }
              {
                status === 'Idle' ?
                  <button
                    type='button'
                    disabled={!['inited', 'stopped', 'feeded'].includes(item.status)}
                    onClick={this.toggleDialog('start')}
                    className={'pt-button pt-minimal pt-icon-play'}
                    title={intl.formatMessage({ id: 'serviceManagement.serviceCard.start' })}
                  /> :
                  <button
                    type='button'
                    disabled={!['started', 'feeding'].includes(item.status)}
                    onClick={this.toggleDialog('stop')}
                    className={'pt-button pt-minimal pt-icon-pause'}
                    title={stopOrLoading}
                  />
              }
              <button
                type='button'
                onClick={this.toggleDialog('edit')}
                disabled={status !== 'Idle'}
                className={'pt-button pt-minimal pt-icon-edit'}
                title={intl.formatMessage({ id: 'serviceManagement.serviceCard.edit' })}
              />
              <button
                type='button'
                // disabled={status !== 'In Progress'}
                onClick={this.toggleDialog('reset')}
                className={'pt-button pt-minimal pt-icon-history'}
                title={intl.formatMessage({ id: 'reset' })}
              />
              <EditDialog
                editOpen={this.state.editOpen}
                toggleDialog={this.toggleDialog('edit')}
                info={item}
              />
              <CreateServiceDialog
                isOpen={this.state.addOpen}
                toggleDialog={this.toggleDialog('add')}
                info={item}
              />
              <CommonDialog
                title={intl.formatMessage({ id: 'serviceManagement.serviceCard.isDelete' }, { id: item.id })}
                isOpen={this.state.deleteOpen}
                toggleDialog={this.toggleDialog('delete')}
                handleSubmit={this.handleDeleteDialog}
              />
              <CommonDialog
                title={intl.formatMessage({ id: 'serviceManagement.serviceCard.destroyService' })}
                isOpen={this.state.destroyOpen}
                toggleDialog={this.toggleDialog('destroy')}
                handleSubmit={this.handleSubmit('destroy')}
              />
              <CommonDialog
                title={intl.formatMessage({ id: 'serviceManagement.serviceCard.stopService' })}
                isOpen={this.state.stopOpen}
                toggleDialog={this.toggleDialog('stop')}
                handleSubmit={this.handleSubmit('stop')}
              />
              <CommonDialog
                title={intl.formatMessage({ id: 'serviceManagement.serviceCard.startService' })}
                isOpen={this.state.startOpen}
                toggleDialog={this.toggleDialog('start')}
                handleSubmit={this.handleSubmit('start')}
              />
              <CommonDialog
                title={intl.formatMessage({ id: 'serviceManagement.queueList.resetData' })}
                isOpen={this.state.resetOpen}
                toggleDialog={this.toggleDialog('reset')}
                handleSubmit={this.handleSubmit('reset')}
              />
            </div>
          </div>
          <div className={classes.id}>
            <span className={classes.span}><WrapperFormattedMessage id='serviceManagement.serviceCard.deviceName' />: {item.deviceName}</span>
            <span className={classes.span}><WrapperFormattedMessage id='modelManagement.ModelDetail.createTime' />: {item.createTime}</span>
          </div>
          <div className={classes.progress} style={{ backgroundColor: color }}>
            {status}{status === 'In Progress' ? `: ${item.progress || '0%'}` : ''}
          </div>
          <div className={classes.detail}>
            {new TextField(`${intl.formatMessage({ id: 'processId' })}：`, item.processName).getRender()}
            {new TextField(`${intl.formatMessage({ id: 'productId' })}：`, item.productName).getRender()}
            {new TextField(`${intl.formatMessage({ id: 'serviceManagement.queueList.glassId' })}：`, item.glassName).getRender()}
            {new TextField(`${intl.formatMessage({ id: 'serviceManagement.dialogFilter.model' })}：`, item.modelName).getRender()}
          </div>
        </div>
      </div>
    )
  }
}

ServiceCard.propTypes = {
  item: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}

export default connect(
  ({ auth, service, intl: { locale } }) => ({
    locale,
    token: auth.token,
    serviceList: service.serviceList,
  }))(injectIntl(ServiceCard))
