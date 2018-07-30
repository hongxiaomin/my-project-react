import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Button, DatePicker, Select, Form } from 'antd'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { getImageByPath } from '../../modules'

const Option = Select.Option
const FormItem = Form.Item

type Props = {
  dispatch: Function,
  rowDetail: String,
};

// 默认值需要在外边通过setFieldsValue进行设置
const StepForm = ({ onChange, product, process, defect, form, intl }) => {
  const { getFieldDecorator } = form
  const processNode = process.map(item => (
    <Option key={item.processId} value={item.processId.toString()}>{item.processName}</Option>
  ))
  const productNode = product.map(item => (
    <Option key={item.productId} value={item.productId.toString()}>{item.productName}</Option>
  ))
  const defectNode = defect.map(item => (
    <Option key={item.defectId} value={item.defectId.toString()}>{item.defectCode}</Option>
  ))

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }
  return (<Form className="search-images-form">
    <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'startTime' })}>
      {getFieldDecorator('startTime', {
        rules: [{ required: true, message: `${intl.formatMessage({ id: 'modelManagement.searchImages.startTimeError' })}` }],
      })(
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={intl.formatMessage({ id: 'modelManagement.searchImages.startsFrom' })}
          onChange={onChange('start')}
        />,
      )}
    </FormItem>
    <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'endTime' })}>
      {getFieldDecorator('endTime', {
        rules: [{ required: true, message: `${intl.formatMessage({ id: 'modelManagement.searchImages.endTimeError' })}` }],
      })(
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={intl.formatMessage({ id: 'modelManagement.searchImages.ends' })}
          onChange={onChange('end')}
        />,
      )}
    </FormItem>
    <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'processId' })}>
      {getFieldDecorator('processId', {
        rules: [{ required: true, message: `${intl.formatMessage({ id: 'processError' })}` }],
      })(
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={intl.formatMessage({ id: 'processId' })}
          optionFilterProp="children"
        >
          {processNode}
        </Select>,
      )}
    </FormItem>
    <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'productId' })}>
      {getFieldDecorator('productId', {
        rules: [{ required: true, message: `${intl.formatMessage({ id: 'productError' })}` }],
      })(
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={intl.formatMessage({ id: 'productId' })}
          optionFilterProp="children"
        >
          {productNode}
        </Select>,
      )}
    </FormItem>
    <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'labelingTool.eda.defectCode' })}>
      {getFieldDecorator('defectName', {
        rules: [{ required: true, message: `${intl.formatMessage({ id: 'defectError' })}` }],
      })(
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={intl.formatMessage({ id: 'labelingTool.eda.defectCode' })}
          optionFilterProp="children"
        >
          {defectNode}
        </Select>,
      )}
    </FormItem>
  </Form>)
}

StepForm.propTypes = {
  onChange: propTypes.func.isRequired,
  product: propTypes.array.isRequired,
  process: propTypes.array.isRequired,
  defect: propTypes.array.isRequired,
  form: propTypes.object.isRequired,
}

const WrappedStepForm = Form.create()(StepForm)

export class SearchImages extends React.Component {
  constructor() {
    super()

    this.wrappedStepForm = null
    this.state = {
      visible: false,
      imageSource: {},
    }
  }

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  handleCancel = () => {
    this.wrappedStepForm.resetFields()
    this.setState({
      visible: false,
    })
  }

  handleOk = () => {
    this.wrappedStepForm.validateFields((err, values) => {
      // 得到数据values, 发送给后台， 获取列表, 异步改变当前step状态
      if (err) return
      this.setState({
        imageSource: values,
      })
      const tmp = {
        modelId: this.props.rowDetail,
        sourceType: 'filter',
        imageSource: values,
      }
      this.props.dispatch(getImageByPath(tmp))
    })
  }

  dateChange = type => ((date, dateString) => {
    this.setState({
      [type]: dateString,
    })
  })

  firstStep = () => {
    this.setState({
      step: 0,
    })
  }

  props: Props;
  render() {
    const { process, product, defect, intl } = this.props
    return (<div style={{ display: 'inline', paddingTop: '3px' }}>
      <a style={{ marginLeft: '40px' }} onClick={this.toggle}>
        <WrapperFormattedMessage id='modelManagement.twoStep.filter' />
      </a>
      <Modal
        title={intl.formatMessage({ id: 'modelManagement.twoStep.filter' })}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <WrappedStepForm
          ref={(c) => { this.wrappedStepForm = c }}
          onChange={this.dateChange}
          process={process}
          product={product}
          defect={defect}
          intl={intl}
        />
        <Button
          style={{ marginLeft: '44%' }}
          onClick={this.handleOk}
        >{intl.formatMessage({ id: 'check' })}</Button>
        <span> {this.data ? `The number of images is ${this.state.data}` : ''}</span>
      </Modal>
    </div>)
  }
}

SearchImages.propTypes = {
  process: propTypes.array.isRequired,
  product: propTypes.array.isRequired,
  defect: propTypes.array.isRequired,
  intl: propTypes.object.isRequired,
}

export default injectIntl(connect((state) => {
  return {
    process: state.modelManagement.processList,
    product: state.modelManagement.productList,
    defect: state.modelManagement.defectCodeList,
    // data: state.modelManagement.searchImageList,
  }
})(SearchImages))
