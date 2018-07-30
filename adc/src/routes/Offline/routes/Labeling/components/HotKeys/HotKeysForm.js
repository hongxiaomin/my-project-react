import React from 'react'
import propTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Form, Modal, Input, Button } from 'antd'
import { getKeyNameByKeyCode, showMessage, keyMapping } from 'Utils'
import { updateKeyCode } from '../../modules'

export const formatHotKeys = (hotKeys) => {
  const keys = Object.keys(hotKeys)
  const values = Object.values(hotKeys)
  const obj = {}
  keys.forEach((key, i) => {
    obj[key] = getKeyNameByKeyCode(values[i])
  })

  return obj
}

const FormItem = Form.Item
export class HotKeysForm extends React.Component {
  constructor(props) {
    super(props)

    this.hotKeys = Object.assign({}, this.props.hotKeys)
    this.stateHotKeys = {}

    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    const { hotKeys } = this.props
    this.updateInputValue(hotKeys)
  }

  componentWillReceiveProps(nextProps) {
    this.hotKeys = Object.assign({}, nextProps.hotKeys)
  }

  onkeydown = type => (e) => {
    e.preventDefault()
    const { setFieldsValue } = this.props.form

    this.stateHotKeys[type] = e.keyCode
    setFieldsValue({
      [type]: getKeyNameByKeyCode(e.keyCode),
    })
  }

  updateInputValue = (hotKeys) => {
    const { setFieldsValue } = this.props.form

    setFieldsValue(formatHotKeys(hotKeys))
  }

  handleOk = () => {
    // 校验值是否都符合规则
    const fieldsInfo = {}
    const fieldsValues = this.props.form.getFieldsValue()
    const keys = Object.keys(fieldsValues)
    const values = Object.values(fieldsValues)
    const controlValue = Object.values(keyMapping())
    controlValue.push('')
    const valuesTmp = values.filter((value, i) => {
      const tmp = controlValue.includes(value)
      if (!tmp) {
        fieldsInfo[keys[i]] = {
          value,
          errors: ['Please enter the correct value.'],
        }
      }
      return tmp
    })
    if (valuesTmp.length !== values.length) {
      this.props.form.setFields(fieldsInfo)
      return
    }

    // 校验 keycode 是否有设置相同的
    const tmpArr = {}
    const hotKeys = Object.assign({}, this.hotKeys, this.stateHotKeys)
    Object.values(hotKeys).forEach((key) => {
      tmpArr[key] = 1
    })

    if (Object.keys(tmpArr).length !== Object.values(hotKeys).length) {
      showMessage({
        text: 'Shortcuts can not be the same',
        type: 'warning',
      })
      return
    }

    this.setState({
      loading: true,
    })

    this.props.updateKeyCode(hotKeys, (hide) => {
      this.setState({
        loading: false,
      })
      if (hide) {
        this.props.handleCancel(false)
      }
    })
  }

  handleCancel = (e, resetHotKeys = true) => {
    this.hotKeys = Object.assign({}, this.props.hotKeys)
    this.stateHotKeys = {}
    this.props.handleCancel(resetHotKeys)
  }

  render() {
    const { intl } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }

    return (<Modal
      visible={this.props.visible}
      title={intl.formatMessage({ id: 'labelingTool.hotKey.title' })}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      footer={[
        <Button key="back" size="large" onClick={this.handleCancel}>
          <WrapperFormattedMessage id="cancel" />
        </Button>,
        <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
          <WrapperFormattedMessage id="Save" />
        </Button>,
      ]}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({ id: 'labelingTool.hotKey.zoomIn' })}
        >
          {getFieldDecorator('zoomIn', {
            rules: [{
              required: false, message: intl.formatMessage({ id: 'labelingTool.hotKey.zoomInError' }),
            }],
          })(<Input onKeyDown={this.onkeydown('zoomIn')} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({ id: 'labelingTool.hotKey.zoomOut' })}
        >
          {getFieldDecorator('zoomOut', {
            rules: [{
              required: false, message: intl.formatMessage({ id: 'labelingTool.hotKey.zoomOutError' }),
            }],
          })(<Input onKeyDown={this.onkeydown('zoomOut')} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({ id: 'labelingTool.hotKey.originalSize' })}
        >
          {getFieldDecorator('restore', {
            rules: [{
              required: false, message: intl.formatMessage({ id: 'labelingTool.hotKey.originalSizeError' }),
            }],
          })(<Input onKeyDown={this.onkeydown('restore')} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({ id: 'labelingTool.hotKey.saveLabel' })}
        >
          {getFieldDecorator('save', {
            rules: [{
              required: false, message: intl.formatMessage({ id: 'labelingTool.hotKey.saveLabelError' }),
            }],
          })(<Input onKeyDown={this.onkeydown('save')} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({ id: 'labelingTool.hotKey.addLabel' })}
        >
          {getFieldDecorator('add', {
            rules: [{
              required: false, message: intl.formatMessage({ id: 'labelingTool.hotKey.addLabelError' }),
            }],
          })(<Input onKeyDown={this.onkeydown('add')} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({ id: 'labelingTool.hotKey.deleteLabel' })}
        >
          {getFieldDecorator('delete', {
            rules: [{
              required: false, message: intl.formatMessage({ id: 'labelingTool.hotKey.deleteLabelError' }),
            }],
          })(<Input onKeyDown={this.onkeydown('delete')} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({ id: 'labelingTool.hotKey.previousImage' })}
        >
          {getFieldDecorator('previous', {
            rules: [{
              required: false, message: intl.formatMessage({ id: 'labelingTool.hotKey.previousImageError' }),
            }],
          })(<Input onKeyDown={this.onkeydown('previous')} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage({ id: 'labelingTool.hotKey.nextImage' })}
        >
          {getFieldDecorator('next', {
            rules: [{
              required: false, message: intl.formatMessage({ id: 'labelingTool.hotKey.nextImageError' }),
            }],
          })(<Input onKeyDown={this.onkeydown('next')} />)}
        </FormItem>
      </Form>
    </Modal>)
  }
}

HotKeysForm.propTypes = {
  hotKeys: propTypes.object.isRequired,
  updateKeyCode: propTypes.func.isRequired,
  visible: propTypes.bool.isRequired,
  handleCancel: propTypes.func.isRequired,
  form: propTypes.object.isRequired,
  intl: propTypes.object.isRequired,
}


export default connect(state => ({
  hotKeys: state.labelingTool.hotKeys,
}), {
  updateKeyCode,
})(Form.create({
  mapPropsToFields: (props) => {
    const hotKeys = formatHotKeys(props.hotKeys)
    const values = Object.values(hotKeys)
    const obj = {}
    Object.keys(hotKeys).forEach((key, index) => {
      obj[key] = {
        value: values[index],
      }
    })
    return obj
  },
})(injectIntl(HotKeysForm)))
