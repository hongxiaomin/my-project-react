import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Button, Dialog } from '@blueprintjs/core'
import { Select, Input } from 'antd'
import { isEmpty } from 'lodash'
import classes from './DialogFilter.scss'
import { showMessage } from 'Utils'
import { sendCommand } from '../../modules/Service'

const Option = Select.Option

export class DialogFilter extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      modelId: '', // this.props.info.modelId,
      serviceName: '', //this.props.info.serviceName,
    }
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   modelId: nextProps.info.modelId,
    //   serviceName: nextProps.info.serviceName,
    // })
  }

  handleSelectChange = (value) => {
    this.setState({
      modelId: value,
    })
  }

  handleInputChanage = (e) => {
    this.setState({
      serviceName: e.target.value,
    })
  }

  handleSubmit = () => {
    const { info } = this.props
    const { modelId, serviceName } = this.state
    // 对数据进行校验
    if ((serviceName === '' && info.serviceName === '') || (!modelId && !info.modelId)) {
      showMessage({ text: 'serviceName or model is empty', type: 'warning' })
      return
    }

    const obj = {
      serviceId: info.serviceId,
      serviceName: serviceName || info.serviceName,
    }

    if (this.props.info.status === 'none' && (modelId && info.modelId !== modelId)) {
      obj.command = 'init'
      obj.modelId = modelId
    }

    // 对数据进行验证
    this.props.sendCommand(obj, () => {
      this.props.toggleDialog()
    })
  }

  render() {
    const { info, intl } = this.props
    const modelList = this.props.modelList.filter(item => item.isPublished === true)
    return (
      <div className={classes['DialogFilter-container']}>
        <Dialog
          isOpen={this.props.isOpen}
          onClose={this.props.toggleDialog}
          className={classes.dialog}
        >
          <div className={classes.header}>
            <h6 className={classes.headerTitle}>
              {this.props.DialogTitle}
            </h6>
          </div>
          <div className={classes.dialogBody}>
            <div className={classes.filter}>
              <WrapperFormattedMessage id='labelingTool.imageList.name' />
              <div>
                <Input
                  type='text'
                  defaultValue={info.serviceName}
                  onChange={this.handleInputChanage}
                  placeholder={intl.formatMessage({ id: 'serviceName' })}
                />
              </div>
            </div>
            <div className={classes.filter}>
              <WrapperFormattedMessage id='serviceManagement.dialogFilter.model' />
              <div>
                {
                  (!isEmpty(modelList)) ? (
                    <Select
                      defaultValue={info.modelId && info.modelId.toString()}
                      disabled={this.props.info.status !== 'none'}
                      className={classes.select}
                      placeholder={intl.formatMessage({ id: 'pleaseSelect' })}
                      onChange={this.handleSelectChange}
                    >
                      {modelList.map(item => (<Option
                        key={item.id}
                        value={item.id.toString()}
                      >{item.name}</Option>))}
                    </Select>
                  ) : null
                }
              </div>
            </div>
            <div className={classes.btnGroup}>
              <Button className={classes.btnCancel} onClick={this.props.toggleDialog}>
                <WrapperFormattedMessage id='cancel' />
              </Button>
              <Button
                className={`pt-button pt-intent-primary ${classes.btnEdit}`}
                onClick={this.handleSubmit}
              >
                <WrapperFormattedMessage id='Save' />
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

DialogFilter.propTypes = {
  intl: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  modelList: PropTypes.array.isRequired,
  DialogTitle: PropTypes.string.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  sendCommand: PropTypes.func.isRequired,
}

export default connect(({ service, intl: { locale } }) => ({
  locale,
  modelList: service.modelList,
}), {
  sendCommand,
})(injectIntl(DialogFilter))
