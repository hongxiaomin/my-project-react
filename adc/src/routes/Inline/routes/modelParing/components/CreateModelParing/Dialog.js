import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { isEmpty } from 'lodash'
import { Button, Dialog } from '@blueprintjs/core'
import { Select, Checkbox } from 'antd'
import classes from './CreateModelParing.scss'
import { getModelOption, CHANGE_STATUS, MODEL_STATUS } from '../../modules/ModelParing'

const Option = Select.Option
export class DialogFilter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this)
    this.trim = this.trim.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.checkboxDefault = this.checkboxDefault.bind(this)
  }

  trim(str) {
    if (!str) return ''
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }

  onBlur() {
    if (!isEmpty(this.props.that.state.processId) &&
     !isEmpty(this.props.that.state.productId)) {
      this.props.dispatch(getModelOption(this.props.that.state.processId,
         this.props.that.state.productId))
      this.props.dispatch({
        type: CHANGE_STATUS,
        payload: false,
      })
    }
    if (!isEmpty(this.props.that.state.processId) &&
     isEmpty(this.props.that.state.productId)) {
      this.props.dispatch(getModelOption(this.props.that.state.processId, ''))
      this.props.dispatch({
        type: CHANGE_STATUS,
        payload: false,
      })
    }
  }
  // 是否设置为试运行
  checkboxDefault(e) {
    this.props.that.setState({
      isTrialRun: e.target.checked,
    })
  }
  handleChange(type) {
    return (value) => {
      if (type === 'model') {
        this.props.dispatch({
          type: MODEL_STATUS,
          payload: value,
        })
      }
      this.props.that.setState({
        [type]: this.trim(value),
      })
    }
  }

  render() {
    const { intl } = this.props
    let defectCode
    if (!isEmpty(this.props.modelstatus) && !isEmpty(this.props.modelOption.modelList)) {
      defectCode = this.props.modelOption.modelList.filter((item) => {
        return item.modelId.toString() === this.props.that.state.model
      })
      defectCode = defectCode[0].defectList.join('/')
    }
    if (isEmpty(this.props.modelOption.modelList) && isEmpty(this.props.modelstatus)) {
      defectCode = []
    }
    return (
      <div>
        <Dialog
          isOpen={this.props.isOpen}
          onClose={this.props.toggleDialog}
          className={classes.dialog}
        >
          <div className={classes.header}>
            <h6 className={this.props.DialogID === '' ? classes.onlyHeaderTitle : classes.headerTitle}>
              {this.props.DialogTitle}
            </h6>
          </div>
          <div className={classes.dialogBody}>
            <div className={classes.filter}>
              <WrapperFormattedMessage id='processId' />
              <Select
                allowClear
                showSearch
                name='processId'
                optionFilterProp="children"
                style={{ width: 200 }}
                placeholder={intl.formatMessage({ id: 'pleaseSelect' })}
                onChange={this.handleChange('processId')}
                onBlur={this.onBlur}
              >
                {this.props.processId.map(item => (<Option
                  key={item.processName}
                  value={item.processId.toString()}
                >{item.processName}</Option>))}
              </Select>
            </div>
            <div className={classes.filter}>
              <WrapperFormattedMessage id='productId' />
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                name='productId'
                style={{ width: 200 }}
                placeholder={intl.formatMessage({ id: 'pleaseSelect' })}
                onChange={this.handleChange('productId')}
                onBlur={this.onBlur}
              >
                {this.props.productId.map(item => (<Option
                  key={item.productId}
                  value={item.productId.toString()}
                >{item.productName}</Option>))}
              </Select>
            </div>
            {
              !isEmpty(this.props.checkError) &&
              <div style={{ color: 'red', margin: '0 10px' }}>Tips：{this.props.checkError}</div>
            }
            <div className={classes.filter}>
              <WrapperFormattedMessage id='modelName' />
              <Select
                showSearch
                name='model'
                optionFilterProp="children"
                style={{ width: 200 }}
                placeholder={intl.formatMessage({ id: 'pleaseSelect' })}
                onChange={this.handleChange('model')}
              >
                {
                  !isEmpty(this.props.modelOption.modelList) ?
                  this.props.modelOption.modelList.map(item => (<Option
                    key={item.modelId}
                    value={item.modelId.toString()}
                  >{item.modelName}</Option>)) :
                  [].map(item => (<Option
                    key={item.modelId}
                    value={item.modelId.toString()}
                  >{item.modelName}</Option>))
                }
              </Select>
            </div>
            {
              this.props.status === true &&
              !isEmpty(this.props.modelstatus) ?
                <div className={classes.filterDefect}>
                  <WrapperFormattedMessage id='labelingTool.eda.defectCode' />
                  <div style={{ width: '200px',
                    wordWrap: 'break-word',
                    backgroundColor: '#eee',
                    margin: '10px',
                    borderRadius: '5px',
                    padding: '10px' }}
                  >
                    {defectCode}
                  </div>
                </div> :
                <div />
            }
            <div className={classes.filter}>
              <WrapperFormattedMessage id='modelPairing.dialogFilter.trialRun' />
              <Checkbox
                style={{ width: '200px', marginLeft: '50px' }}
                checked={this.props.that.state.isTrialRun}
                onChange={this.checkboxDefault}
              ><WrapperFormattedMessage id='modelPairing.dialogFilter.setAsTrialRun' /></Checkbox>
            </div>
            <div className={classes.btnGroup}>
              <Button className={classes.btnCancel} onClick={this.props.toggleDialog}>
                <WrapperFormattedMessage id='cancel' />
              </Button>
              <Button
                className={`pt-button pt-intent-primary ${classes.btnEdit}`}
                onClick={this.props.handleSubmit}
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
  isOpen: PropTypes.bool.isRequired,
  DialogID: PropTypes.string.isRequired,
  DialogTitle: PropTypes.string.isRequired,
  processId: PropTypes.array.isRequired,
  productId: PropTypes.array.isRequired,
  modelOption: PropTypes.object.isRequired,
  modelstatus: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  that: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  checkError: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
}

export default injectIntl(DialogFilter)
