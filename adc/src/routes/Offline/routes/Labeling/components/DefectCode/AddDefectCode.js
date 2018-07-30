import React from 'react'
import { Modal, Button, Form, Input } from 'antd'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addDefectCode } from '../../modules'

const FormItem = Form.Item
export class AddDefectCode extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: false,
    }
  }

  handleOk = (e) => {
    const { resetFields } = this.props.form
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return
      this.setState({
        loading: true,
      })
      this.props.dispatch(addDefectCode(values.defectCode.toUpperCase(), () => {
        this.setState({
          loading: false,
        })
        resetFields()
        this.props.handleCancel()
      }))
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
        sm: { span: 14 },
      },
    }
    return (<Modal
      visible={this.props.visible}
      title={intl.formatMessage({ id: 'labelingTool.defectCode.addNewDefectCode' })}
      onOk={this.handleOk}
      onCancel={this.props.handleCancel}
      footer={[
        <Button key="back" size="large" onClick={this.props.handleCancel}>
          <WrapperFormattedMessage id="cancel" />
        </Button>,
        <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
          <WrapperFormattedMessage id="Save" />
        </Button>,
      ]}
    >
      <Form>
        <FormItem
          label={intl.formatMessage({ id: 'labelingTool.defectCode.defectCode' })}
          {...formItemLayout}
        >
          {getFieldDecorator('defectCode', {
            rules: [{
              required: true, message: intl.formatMessage({ id: 'labelingTool.defectCode.defectCodeError' }),
            }],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>)
  }
}

AddDefectCode.propTypes = {
  visible: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}

const DefectCodeForm = Form.create()(injectIntl(AddDefectCode))
export default connect()(DefectCodeForm)
