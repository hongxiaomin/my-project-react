import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { Form, Input, Button, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { getImageListByPath, updateResetKeyCodeStatus } from '../../modules'

const FormItem = Form.Item
export class SetPath extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploading) {
      nextProps.form.resetFields()
    }
  }

  handleSubmit = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(getImageListByPath({
          path: [
            values.path.trim(),
          ],
        }))
      }
    })

    e.preventDefault()
    return false
  }

  handleFocus = () => {
    this.props.dispatch(updateResetKeyCodeStatus(true))
  }

  handleBlur = () => {
    this.props.dispatch(updateResetKeyCodeStatus(false))
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { imageListLoading, intl } = this.props

    return (<Form>
      <Row>
        <Col span={19}>
          <FormItem>
            {getFieldDecorator('path', {
              rules: [{ required: true, message: intl.formatMessage({ id: 'labelingTool.setPath.inputPath' }) }],
            })(<Input onFocus={this.handleFocus} onBlur={this.handleBlur} type="text" placeholder={intl.formatMessage({ id: 'labelingTool.setPath.path' })} />)}
          </FormItem>
        </Col>
        <Col span={1}>&nbsp;</Col>
        <Col span={4}>
          <FormItem>
            <Button
              type="primary"
              onClick={this.handleSubmit}
              loading={imageListLoading}
            >

              <WrapperFormattedMessage id="labelingTool.setPath.get" />
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>)
  }
}

SetPath.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  imageListLoading: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
}

export default connect(({ labelingTool, intl }) => ({
  intl,
  imageListLoading: labelingTool.imageListLoading,
  uploading: labelingTool.uploading,
}))(Form.create()(injectIntl(SetPath)))
