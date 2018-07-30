import React from 'react'
import { showMessage } from 'Utils'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { assign, isEmpty, isNumber } from 'lodash'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import AddDefectCode from './AddDefectCode'
import classes from './AddImportModel.scss'
import {
  importModel,
} from '../../modules'

type Props = {
  dispatch: Function,
  intl: Object,
}

export class AddImportModel extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      defaultModel: false,
      imagePath: '',
      modelName: '',
      discription: '',
    }
    this.uuid = 1
    this.checkboxDefault = this.checkboxDefault.bind(this)
  }

  // Modal Ok 按钮 提交表单，并清空表单数据。
  handleOk = intl => (e) => {
    const form = this.form
    e.preventDefault()
    const defect = []
    form.validateFields((err, values) => {
      if (!err) {
        const key = values.keys.length
        for (let i = 1; i <= key; i++) {
          defect.push({ defectCode: values[`names_${i}`], threshold: values[`value_${i}`] })
        }
      }
    })
    // 验证
    if (this.state.modelName === '' || this.state.discription === '' || this.state.imagePath === '') {
      showMessage({ text: `${intl.formatMessage({ id: 'modelManagement.addImportModel.informationErrir' })}`, type: 'warning' })
      return
    } else if (isEmpty(defect[0].defectCode)) {
      showMessage({ text: `${intl.formatMessage({ id: 'modelManagement.addImportModel.saveError' })}`, type: 'warning' })
      return
    }
    for (let i = 0; i < defect.length; i++) {
      if (!isNumber(defect[i].threshold)) {
        showMessage({ text: `${intl.formatMessage({ id: 'modelManagement.addImportModel.thresholdError' })}`, type: 'warning' })
        return
      }
    }
    const tmp = {
      asDefault: this.state.defaultModel,
      modelName: this.state.modelName,
      modelPath: this.state.imagePath.trim(),
      description: this.state.discription,
      defectAndThreshold: defect,
    }
    this.props.dispatch(importModel(tmp))
    this.toggle()
    this.setState({
      imagePath: '',
      modelName: '',
      discription: '',
      defaultModel: false,
    })
    this.uuid = 1
  }
  // 控制Modal开关
  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }
  // Modal 取消按钮
  handleCancel = () => {
    this.setState({
      visible: false,
      imagePath: '',
      modelName: '',
      description: '',
      defaultModel: false,
    })
  }
  // 是否设置为默认 Model
  checkboxDefault(e) {
    this.setState(assign({}, this.state, {
      defaultModel: e.target.checked,
    }))
  }

  inputChange(type) {
    return (e) => {
      this.setState(assign({}, this.state, {
        [type]: e.target.value,
      }))
    }
  }

  saveFormRef = (form) => {
    this.form = form
  }

  props: Props
  render() {
    const { intl } = this.props
    return (
      <div>
        <button
          style={{ width: '80px' }}
          type='button'
          onClick={this.toggle}
          className={'pt-button pt-intent-primary'}
        >
          <WrapperFormattedMessage id="modelManagement.addImportModel.import" />
        </button>
        <div className={classes.dialogBody}>
          <AddDefectCode that={this} ref={this.saveFormRef} />
        </div>
      </div>
    )
  }
}

export default injectIntl(connect(
  state => ({
    importFlag: state.modelManagement.importFlag,
  }),
)(AddImportModel))
