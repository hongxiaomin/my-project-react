import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { Form, Input, Select, Icon, Button, Modal } from 'antd'
import { trim } from 'lodash'
import { getRole, showMessage } from 'Utils'

const Option = Select.Option
const FormItem = Form.Item
export class DialogFilter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      passwordInputType: 'password',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  mouseDownEye = () => {
    console.log('this.mouseDown')
    this.setState({
      passwordInputType: 'text',
    })
  }

  mouseUpEye = () => {
    this.setState({
      passwordInputType: 'password',
    })
  }

  handleChange(e) {
    e.preventDefault()
    this.props.form.validateFields((err, objValues) => {
      if (!err) {
        this.setState({
          loading: true,
        })
        const postData = {}
        const keys = Object.keys(objValues)
        const values = Object.values(objValues)
        values.forEach((value, index) => (postData[keys[index]] = trim(value)))
        postData.roleIds = [postData.roleIds]

        this.props.handleSubmit(postData, () => {
          this.setState({
            loading: false,
          })
          this.props.toggleDialog()
          this.props.form.setFieldsValue({
            userId: '',
            userName: '',
            password: '',
            roleIds: '',
          })
          // 选中的数据清空
        }, () => {
          this.setState({
            loading: false,
          })
          showMessage({ text: 'Operation failed!', type: 'error' })
        })
      }
    })
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
        sm: { span: 18 },
      },
    }
    return (
      <Modal
        visible={this.props.isOpen}
        title={this.props.dialogTitle}
        onCancel={this.props.toggleDialog}
        footer={[
          <Button key="cancel" onClick={this.props.toggleDialog}>Cancel</Button>,
          <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleChange}>
            <WrapperFormattedMessage id='Save' />
          </Button>,
        ]}
      >
        <div style={{ padding: '0 20px 0 20px' }}>
          <Form>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({ id: 'userAndLicenseManagement.license.userID' })}
            >
              {getFieldDecorator('userId', {
                rules: [{ required: true, message: intl.formatMessage({ id: 'userAndLicenseManagement.edit.userIDError' }) }],
              })(
                <Input disabled={this.props.dialogBtnContent.toLowerCase() === 'update'} type="text" placeholder={intl.formatMessage({ id: 'userAndLicenseManagement.license.userID' })} />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({ id: 'userAndLicenseManagement.license.userName' })}
            >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: intl.formatMessage({ id: 'userAndLicenseManagement.edit.userNameError' }) }],
              })(
                <Input type="text" placeholder="User Name" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.props.dialogBtnContent !== 'Update' ? 'Password' : <span style={{ paddingLeft: '10px' }}><WrapperFormattedMessage id='password' /></span>}
            >
              {getFieldDecorator('password', {
                rules: [{ required: this.props.dialogBtnContent !== 'Update', message: intl.formatMessage({ id: 'userAndLicenseManagement.edit.passwordError' }) }],
              })(
                <Input
                  suffix={<Icon
                    type="eye"
                    onMouseDown={this.mouseDownEye}
                    onMouseUp={this.mouseUpEye}
                  />}
                  type={this.state.passwordInputType}
                  placeholder={intl.formatMessage({ id: 'password' })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage({ id: 'role' })}
            >
              {getFieldDecorator('roleIds', {
                rules: [{ required: true, message: intl.formatMessage({ id: 'userAndLicenseManagement.edit.roleError' }) }],
              })(
                <Select >
                  {(() => {
                    const roles = getRole()
                    const keys = Object.keys(roles)
                    const values = Object.values(roles)
                    return values.map((name, i) => (<Option
                      key={keys[i]}
                      value={keys[i]}
                    ><WrapperFormattedMessage id={name} /></Option>))
                  })()}
                </Select>
              )}
            </FormItem>

          </Form>
        </div>
      </Modal>
    )
  }
}


DialogFilter.propTypes = {
  dialogTitle: PropTypes.string.isRequired,
  dialogBtnContent: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
}

export default Form.create()(injectIntl(DialogFilter))
