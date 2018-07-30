/* eslint jsx-a11y/no-static-element-interactions: 0, */
import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTable from 'components/ADCTable'
import { Modal, Steps, Button, DatePicker, Select, Form } from 'antd'
import { IMAGE_LIST, UPDATE_IMAGE_LIST_REMOVE_DEFECT_INFO, ISLABELED_LIST, getImageListBySearch, updateResetKeyCodeStatus } from '../../modules'

const Step = Steps.Step
const Option = Select.Option
const FormItem = Form.Item
const disabledEndDate = getFieldValue => (current) => {
  // Can not select days before today and today
  return current && (current.valueOf() > Date.now() || (getFieldValue('startTime') && current.valueOf() < getFieldValue('startTime').valueOf()))
}

const disabledStartDate = getFieldValue => (current) => {
  return current && (current.valueOf() > Date.now() || (getFieldValue('endTime') && current.valueOf() > getFieldValue('endTime').valueOf()))
}

// 默认值需要在外边通过setFieldsValue进行设置
const StepForm = ({ product, process, defect, form }) => {
  const { getFieldDecorator, getFieldValue } = form
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
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  }

  return (<Form className="search-images-form">
    <FormItem
      {...formItemLayout}
      label="Start Time"
    >
      {getFieldDecorator('startTime', {
        rules: [{ required: true, message: 'Please input start time!' }],
      })(
        <DatePicker
          showTime
          disabledDate={disabledStartDate(getFieldValue)}
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Start Time"
        />,
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="End Time"
    >
      {getFieldDecorator('endTime', {
        rules: [{ required: true, message: 'Please input end time!' }],
      })(
        <DatePicker
          showTime
          disabledDate={disabledEndDate(getFieldValue)}
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="End Time"
        />,
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="Process ID"
    >
      {getFieldDecorator('processId', {
        rules: [{ required: true, message: 'Please input process ID!' }],
      })(
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Process ID"
          optionFilterProp="children"
        >
          {processNode}
        </Select>,
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="Product ID"
    >
      {getFieldDecorator('productId', {
        rules: [{ required: true, message: 'Please input product ID!' }],
      })(
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Product ID"
          optionFilterProp="children"
        >
          {productNode}
        </Select>,
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="Defect Code"
    >
      {getFieldDecorator('defectCode', {
        rules: [{ required: true, message: 'Please input defect name!' }],
      })(
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Defect Code"
          optionFilterProp="children"
        >
          {defectNode}
        </Select>,
      )}
    </FormItem>
  </Form>)
}

StepForm.propTypes = {
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
    this.values = {}
    this.state = {
      visible: false,
      step: 0,
    }
  }

  toggle = () => {
    this.props.dispatch(updateResetKeyCodeStatus(true))
    this.setState({
      visible: !this.state.visible,
    })
  }

  handleCancel = () => {
    this.props.dispatch(updateResetKeyCodeStatus(false))
    this.setState({
      visible: false,
    })
  }

  handleOk = () => {
    if (this.state.step === 0) {
      this.doSearch()
    } else {
      // 把获得的数据放到store中, 然后隐藏弹框
      this.props.dispatch({
        type: UPDATE_IMAGE_LIST_REMOVE_DEFECT_INFO,
        data: this.props.data,
      })
      this.props.dispatch({
        type: ISLABELED_LIST,
        data: {
          labeledType: 'all',
          imageList: this.props.data,
        },
      })
      this.toggle()
    }
  }

  doSearch = () => {
    this.wrappedStepForm.validateFields((err, values) => {
      // 得到数据values, 发送给后台， 获取列表, 异步改变当前step状态
      if (err) return

      this.values = values
      this.props.dispatch(getImageListBySearch(values, () => {
        this.setState({
          step: 1,
        })
      }))
    })
  }

  firstStep = () => {
    this.setState({
      step: 0,
    }, () => {
      this.wrappedStepForm.setFieldsValue(this.values)
    })
  }

  render() {
    const { process, product, defect, data } = this.props
    const Table = (<div>
      <ReactTable
        data={data}
        defaultPageSize={5}
        columns={[
          {
            Header: 'Image Path',
            accessor: 'imagePath',
            Cell: row => (<p title={row.original.imagePath}>{row.original.imagePath}</p>),
          },
        ]}
      />
      <p>Total number {data.length}</p>
    </div>)
    const content = [
      <WrappedStepForm
        ref={(c) => { this.wrappedStepForm = c }}
        process={process}
        product={product}
        defect={defect}
      />,
      Table,
    ]
    const footer = [
      <Button key="back" size="large" onClick={this.handleCancel}>Cancel</Button>,
      <Button key="submit" type="primary" size="large" onClick={this.handleOk}>{this.state.step === 0 ? 'Next' : 'Ok'}</Button>,
    ]
    if (this.state.step === 1) {
      footer.unshift(<Button key="prev" size="large" onClick={this.firstStep} style={{ float: 'left' }}>Back</Button>)
    }

    return (<div style={{ display: 'inline' }}>
      <a onClick={this.toggle}>Filter</a>
      <Modal
        title="Filter"
        visible={this.state.visible}
        footer={footer}
        onCancel={this.handleCancel}
      >
        <Steps current={this.state.step} size="small">
          <Step title="Filter" />
          <Step title="Confirmation" />
        </Steps>
        <div style={{ height: '20px' }} />
        {content[this.state.step]}
      </Modal>
    </div>)
  }
}

SearchImages.propTypes = {
  process: propTypes.array.isRequired,
  product: propTypes.array.isRequired,
  defect: propTypes.array.isRequired,
  data: propTypes.array.isRequired,
  dispatch: propTypes.func.isRequired,
  // getImageListBySearch: propTypes.func.isRequired,
  // searchListAddImageList: propTypes.func.isRequired,
  // updateResetKeyCodeStatus: propTypes.func.isRequired,
}

export default connect((state) => {
  const { labelingTool } = state
  return {
    process: labelingTool.processList,
    product: labelingTool.productList,
    defect: labelingTool.defectCodeList,
    data: labelingTool.searchImageList,
  }
})(SearchImages)
