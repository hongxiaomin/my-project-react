import React from 'react'
import { injectIntl } from 'react-intl'
import { Form, Input, Icon, Button, Checkbox, Modal, InputNumber } from 'antd'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import classes from './AddImportModel.scss'

type Props = {
  that: Object,
  form: Object,
  intl: Object,
}

const FormItem = Form.Item
class DynamicFieldSet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uuid: this.props.that.uuid,
    }
  }
  componentWillReceiveProps() {
    if (this.props.that.state.visible === false) {
      this.props.form.resetFields()
    }
  }

  // 删除一个defectCode
  remove = (k) => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one passenger
    if (keys.length === 1) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }

  // 添加一个defectCode
  add = () => {
    // uuid = uuid + 1
    this.setState({
      uuid: this.state.uuid + 1,
    }, () => {
      const { form } = this.props
      // can use data-binding to get
      const keys = form.getFieldValue('keys')

      const nextKeys = keys.concat(this.state.uuid)
      let newNextKeys = []
      newNextKeys = nextKeys.map((index) => {
        return newNextKeys.push(index)
      })
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: newNextKeys,
      })
    })
  }

  props: Props
  render() {
    const { intl } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form
    getFieldDecorator('keys', { initialValue: [1] })
    const keys = getFieldValue('keys')
    // formItems 代表defectCode 可以添加 可以删除
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          required={false}
          key={k}
        >
          <div style={{ display: 'flex', justifyContent: 'start', margin: '10px 10px 0 10px' }}>
            <WrapperFormattedMessage
              id="modelManagement.addImportModel.defectCodeName"
            />{index + 1}：
            {getFieldDecorator(`names_${k}`, {
            })(
              <Input
                placeholder={intl.formatMessage({ id: 'modelManagement.addImportModel.defectCodeName' })}
                style={{ width: '40%', marginRight: 8 }}
              />,
            )}
            <WrapperFormattedMessage
              id="modelManagement.addImportModel.threshold"
            />
            {getFieldDecorator(`value_${k}`, {
            })(
              <InputNumber
                min={0}
                max={100}
                placeholder={intl.formatMessage({ id: 'modelManagement.addImportModel.threshold' })}
                style={{ width: '20%', marginRight: 8 }}
              />,
            )}
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            ) : null}
          </div>
        </FormItem>
      )
    })
    return (
      <Modal
        title={intl.formatMessage({ id: 'modelManagement.addImportModel.importModel' })}
        visible={this.props.that.state.visible}
        onCancel={this.props.that.handleCancel}
        onOk={this.props.that.handleOk(intl)}
      >
        <Form>
          <FormItem>
            <div className={classes.filter}>
              <WrapperFormattedMessage
                id="modelName"
              />
              <input
                type='text'
                className={'pt-input'}
                value={this.props.that.state.modelName}
                onChange={this.props.that.inputChange('modelName')}
              />
            </div>
          </FormItem>
          <FormItem>
            <div className={classes.filter}>
              <WrapperFormattedMessage
                id="description"
              />
              <textarea
                style={{ width: '200px' }}
                className={'pt-input'}
                value={this.props.that.state.discription}
                onChange={this.props.that.inputChange('discription')}
              />
            </div>
          </FormItem>
          <FormItem>
            <div className={classes.filter}>
              <WrapperFormattedMessage
                id="modelManagement.addImportModel.path"
              />
              <input
                type='text'
                className={'pt-input'}
                value={this.props.that.state.imagePath}
                onChange={this.props.that.inputChange('imagePath')}
              />
            </div>
          </FormItem>
          <FormItem>
            <div className={classes.filter} style={{ justifyContent: 'start' }}>
              <WrapperFormattedMessage
                id="modelManagement.addImportModel.defaultModel"
              />
              <Checkbox
                style={{ width: '200px', marginLeft: '50px' }}
                checked={this.props.that.state.defaultModel}
                onChange={this.props.that.checkboxDefault}
              ><WrapperFormattedMessage
                id="modelManagement.addImportModel.setAsDefault"
              /></Checkbox>
            </div>
          </FormItem>
          <div style={{ height: '150px', overflowY: 'scroll' }}>
            {formItems}
            <Button style={{ marginLeft: '380px', marginRight: '10px' }} type="primary" shape="circle" icon="plus" onClick={this.add} />
          </div>
        </Form>
      </Modal>
    )
  }
}

const AddDefectCode = Form.create()(DynamicFieldSet)
export default injectIntl(AddDefectCode)
