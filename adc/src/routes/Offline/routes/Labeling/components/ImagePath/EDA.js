/* eslint react/no-multi-comp: 0, jsx-a11y/no-static-element-interactions: 0 */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { saveAs } from 'filesaver.js-npm'
import { isEmpty, trim } from 'lodash'
import ReactTable from 'components/ADCTable'
import { simpleFetch } from 'helpers/fetchWrapper'
import { obj2Csv, getShowPath, showMessage, stringToFirstUpperCase, formatImageList, imageListFilter } from 'Utils'
import { Modal, Button, Form, DatePicker, Checkbox, Select, InputNumber, Input, Radio, Row, Col } from 'antd'
import { getModelDefect, updateResetKeyCodeStatus, UPDATE_SOMETHING } from '../../modules'
import './ImagePath.scss'

const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
const Option = Select.Option
const OptGroup = Select.OptGroup
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },
}

class EdaForm extends React.Component {
  constructor() {
    super()

    this.state = {
      getImageInfoFormADC: false,
    }
  }

  handleChange = () => {
    const { setFieldsValue } = this.props.form
    this.setState({
      getImageInfoFormADC: !this.state.getImageInfoFormADC,
    })
    setFieldsValue({
      defectCode: [],
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { product, defect, defectCodeGroup, intl } = this.props
    const rtirMode = ['A', 'R']
    const rtirModeStr = [intl.formatMessage({ id: 'labelingTool.eda.production' }), intl.formatMessage({ id: 'labelingTool.eda.trialRun' })]
    const productNode = product.map(item => (
      <Option
        key={item.productId}
        label={item.productName}
        value={item.productName.toString()}
      >{item.productName}</Option>
    ))
    const defectNode = defect.map(item => (
      <Option key={item.defectCode} value={item.defectCode.toString()}>{item.defectCode}</Option>
    ))
    const models = Object.keys(defectCodeGroup)
    const codes = Object.values(defectCodeGroup)
    const defectGroupNode = models.map((model, i) => (<OptGroup key={model} label={model}>
      {
        codes[i].map(code => (<Option key={code} value={code}>{code}</Option>))
      }
    </OptGroup>))

    return (<Form className="search-images-form">
      <FormItem
        {...formItemLayout}
        label={intl.formatMessage({ id: 'time' })}
      >
        {getFieldDecorator('time', {
          rules: [{ required: true, message: intl.formatMessage({ id: 'labelingTool.eda.timeError' }) }],
        })(
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={[intl.formatMessage({ id: 'startTime' }), intl.formatMessage({ id: 'endTime' })]}
          />,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={intl.formatMessage({ id: 'productId' })}
      >
        {getFieldDecorator('productId', {
          rules: [{ required: true, message: intl.formatMessage({ id: 'productError' }) }],
        })(
          <Select
            mode="tags"
            placeholder={intl.formatMessage({ id: 'productId' })}
            optionFilterProp="value"
            style={{ width: 300 }}
          >
            {productNode}
          </Select>,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={intl.formatMessage({ id: 'processId' })}
      >
        {getFieldDecorator('processId', {
          rules: [{ required: true, message: intl.formatMessage({ id: 'processError' }) }],
        })(
          // <Select
          //   showSearch
          //   style={{ width: 200 }}
          //   placeholder="Process ID"
          //   optionFilterProp="children"
          // >
          //   {processNode}
          // </Select>,
          <Input style={{ width: 200 }} placeholder={intl.formatMessage({ id: 'processId' })} />,
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={intl.formatMessage({ id: 'labelingTool.eda.defectCode' })}
      >
        {getFieldDecorator('defectCode', {
          rules: [{ required: true, message: intl.formatMessage({ id: 'defectError' }) }],
        })(
          <Select
            mode={this.state.getImageInfoFormADC ? 'multiple' : 'tags'}
            style={{ width: 200 }}
            placeholder={intl.formatMessage({ id: 'labelingTool.eda.defectCode' })}
            optionFilterProp="children"
          >
            {this.state.getImageInfoFormADC
              ? defectGroupNode
              : defectNode
            }
          </Select>,
        )}
      </FormItem>

      {this.state.getImageInfoFormADC
        ? (<FormItem
          {...formItemLayout}
          label={intl.formatMessage({ id: 'labelingTool.eda.adcProcessId' })}
        >
          {getFieldDecorator('adcProcessId', {
            rules: [{ required: true, message: intl.formatMessage({ id: 'labelingTool.eda.adcProcessIdError' }) }],
          })(
            <Input style={{ width: 200 }} placeholder={intl.formatMessage({ id: 'labelingTool.eda.adcProcessId' })} />,
          )}
        </FormItem>)
        : ''
      }
      {this.state.getImageInfoFormADC
        ? (<FormItem
          {...formItemLayout}
          label={intl.formatMessage({ id: 'labelingTool.eda.trirModel' })}
        >
          {getFieldDecorator('rtirMode', {
            rules: [{ required: true, message: intl.formatMessage({ id: 'labelingTool.eda.rtirModeError' }) }],
            initialValue: 'A',
          })(
            <Select
              style={{ width: 200 }}
              placeholder={intl.formatMessage({ id: 'labelingTool.eda.trirModel' })}
            >
              {rtirMode.map((item, i) =>
                (<Option key={item} label={item} value={item.toString()}>{rtirModeStr[i]}</Option>))
              }
            </Select>,
          )}
        </FormItem>)
        : ''
      }

      <FormItem
        {...formItemLayout}
        label=""
      >
        <div
          style={{
            paddingLeft: 120,
            width: 435,
          }}
        >
          {getFieldDecorator('compare', {
            rules: [{ required: false }],
            initialValue: this.state.getImageInfoFormADC,
          })(
            <Checkbox onChange={this.handleChange}>
              <WrapperFormattedMessage id="labelingTool.eda.compare" />
            </Checkbox>,
          )}
          {this.state.getImageInfoFormADC
            ? (<Button
              type="primary"
              onClick={this.props.getDefectTop5}
            >
              <WrapperFormattedMessage id="labelingTool.eda.get" />
            </Button>)
            : ''
          }
        </div>
      </FormItem>

    </Form>)
  }
}
EdaForm.propTypes = {
  form: PropTypes.object.isRequired,
  product: PropTypes.array.isRequired,
  defect: PropTypes.array.isRequired,
  defectCodeGroup: PropTypes.array.isRequired,
  getDefectTop5: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}
const EdaFormWrapper = Form.create()(injectIntl(EdaForm))

class EdaList extends React.Component {
  constructor() {
    super()

    this.numberChange = false
    this.state = {
      number: 1,
      exportCsv: 'defect', // number
    }
  }

  /**
   * type [defect, number]
   */
  exportCSV = () => {
    const { exportCsv: type } = this.state
    let data = {}
    const dataList = this.props.data

    if (type === 'defect') {
      const dataObj = {}
      dataList.forEach((item) => {
        item.defect.forEach((defectCode) => {
          if (!dataObj[defectCode]) dataObj[defectCode] = []
          dataObj[defectCode].push(item)
        })
      })
      data = dataObj
    } else {
      const { number } = this.state
      dataList.forEach((item, i) => {
        const pageNow = i % number
        if (!data[pageNow]) data[pageNow] = []
        data[pageNow].push(item)
      })
    }
    const keys = Object.keys(data)
    const values = Object.values(data)
    values.forEach((item, i) => {
      let fileName = keys[i]
      if (type === 'number') fileName = +fileName + 1
      item.unshift({
        defect: 'DEFECT',
        img: 'IMG',
        name: 'NAME',
        product: 'PRODUCT',
      })

      saveAs(new Blob(
        [obj2Csv(item, ['defect', 'img', 'name', 'product'])],
        { type: 'text/plain' },
      ),
      `${fileName}.csv`)
    })

    // data.forEach((item, i) => {
    //   item.unshift({
    //     defect: 'DEFECT',
    //     img: 'IMG',
    //     name: 'NAME',
    //     product: 'PRODUCT',
    //   })

    //   saveAs(new Blob(
    //     [obj2Csv(item, ['defect', 'img', 'name', 'product'])],
    //     { type: 'text/plain' },
    //   ),
    //   `${type}-${i}.csv`)
    // })
  }

  handleNumberChange = (v) => {
    if (this.props.data.length < v) return
    this.setState({
      number: v,
    })
  }

  handleRadioChange = (v) => {
    this.setState({
      exportCsv: v.target.value,
    })
  }

  render() {
    const dataList = this.props.data
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    }
    const pageSize = dataList.length < 6 ? 6 : 20
    return (<div>
      <ReactTable
        showPagination={dataList.length > 20}
        showPageSizeOptions={false}
        data={dataList}
        pageSize={pageSize}
        columns={[
          {
            Header: 'Defect',
            accessor: 'defect',
            Cell: row => row.original.defect.join(','),
          },
          {
            Header: 'Path',
            accessor: 'img',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Product',
            accessor: 'product',
          },
        ]}
        style={{
          height: 225,
        }}
        className="-striped -highlight"
      />
      <div styleName="hr" />
      <div className="ant-modal-title">
        <WrapperFormattedMessage
          id="labelingTool.eda.exportCSV"
        />
      </div>
      <Row>
        <Col span={20}>
          <RadioGroup onChange={this.handleRadioChange} value={this.state.exportCsv}>
            <Radio style={radioStyle} value="defect">
              <WrapperFormattedMessage id="labelingTool.eda.byDefectCode" />
            </Radio>
            <Radio style={radioStyle} value="number"><WrapperFormattedMessage id="labelingTool.eda.byNumberStart" /><InputNumber
              style={{ width: 50 }}
              size="small"
              min={1}
              max={10}
              value={this.state.number}
              onChange={this.handleNumberChange}
            /> <WrapperFormattedMessage
              id="labelingTool.eda.byNumberEnd"
            /></Radio>
          </RadioGroup>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            disabled={!dataList.length}
            style={{ marginTop: 20 }}
            onClick={this.exportCSV}
          ><WrapperFormattedMessage
            id="labelingTool.eda.export"
          /></Button>
        </Col>
      </Row>
      <div styleName="hr" />
      <div className="ant-modal-title">
        <WrapperFormattedMessage
          id="labelingTool.eda.loadImageList"
        />
      </div>
      <Row>
        <Col span={20}>
          <p>
            <WrapperFormattedMessage
              id="labelingTool.eda.loadIntoImageList"
            />
          </p>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            disabled={!dataList.length}
            onClick={this.props.loadToImageList}
          >&nbsp;&nbsp;
            <WrapperFormattedMessage
              id="labelingTool.eda.load"
            />
          &nbsp;</Button>
        </Col>
      </Row>
    </div>)
  }
}

EdaList.propTypes = {
  data: PropTypes.array.isRequired,
  loadToImageList: PropTypes.func.isRequired,
}

export class Eda extends React.Component {
  constructor() {
    super()

    this.EdaForm = null
    this.state = {
      step: 0,
      visible: false,
      defectCodeGroup: [],
      data: [],
      values: {},
      nextLoading: false,
    }
  }

  getDefectTop5 = () => {
    const values = this.EdaForm.getFieldsValue(['adcProcessId', 'productId'])
    const error = {}

    if (!values.adcProcessId) {
      error.adcProcessId = {
        errors: [new Error(this.props.intl.formatMessage({ id: 'labelingTool.eda.adcProcessIdError' }))],
      }
    }

    if (!values.productId || values.productId.length === 0) {
      error.productId = {
        errors: [new Error(this.props.intl.formatMessage({ id: 'productError' }))],
      }
    }

    if (!isEmpty(error)) {
      error.compare = {
        value: false,
      }
      this.EdaForm.setFields(error)
    } else {
      // 根据 product 和 process 获取model的defect code列表
      getModelDefect({
        processId: values.adcProcessId,
        productId: values.productId,
      })
        .then(({ code, result, message }) => {
          const defectCodeGroup = {}
          if (code !== 200000 || isEmpty(result)) {
            const text = (code === 200000) ? this.props.intl.formatMessage({ id: 'labelingTool.eda.emptyData' }) : stringToFirstUpperCase(message)
            showMessage({
              text,
              type: 'warning',
            })
            return
          }

          if (result) {
            result.forEach((item) => {
              defectCodeGroup[item.modelName] = item.defects
            })
          }
          this.setState({
            defectCodeGroup,
          })
          // 成功之后去掉 defect Code的值
          this.EdaForm.setFields({
            defectCode: {
              value: [],
            },
          })
        })
        .catch((e) => {
          showMessage({ text: e, type: 'warning' })
        })
    }
  }

  back = () => {
    if (this.state.step === 0) {
      this.toggle()
      return
    }
    this.setState({
      step: 0,
    }, () => {
      this.EdaForm.setFieldsValue(this.values)
    })
  }

  toggle = (step) => {
    const state = {
      visible: !this.state.visible,
      nextLoading: false,
    }
    if (step === 0) {
      state.step = 0
    }
    this.setState(state, () => {
      if (!this.state.visible) {
        this.EdaForm.resetFields()
      }
    })
    this.props.dispatch(updateResetKeyCodeStatus(!this.state.visible))
  }

  loadToImageList = () => {
    const { dispatch, selectedType } = this.props
    const dataList = this.state.data.map(item => ({
      defectCode: item.defect,
      path: getShowPath(item.imgForLabeling),
      isLabeled: false,
      eda: this.values.compare,
    }))

    // UPDATE_SOMETHING
    /*
    * imageList
    * selecteImageList
    * defectCodeList
    * selecteDefectCodeList
    *
    * */
    const { imageList, defectCodeFilterList } = formatImageList(dataList)
    dispatch({
      type: UPDATE_SOMETHING,
      data: {
        imageList,
        defectCodeFilterList,
        selectedDefectCode: defectCodeFilterList,
        selectedImageList: imageListFilter(imageList, selectedType, defectCodeFilterList),
      },
    })

    this.toggle(0)
  }

  handleOk = () => {
    if (this.state.step === 0) {
      this.EdaForm.validateFields((err, values) => {
        if (err) return
        this.setState({
          nextLoading: true,
        })
        this.values = values

        let url = `eda/search?flag=${values.compare}&processId=${trim(values.processId)}&productId=${values.productId.join(',')}&startTime=${values.time[0].format('Y-M-D h:m:s')}&endTime=${values.time[1].format('Y-M-D h:m:s')}&defect=${values.defectCode.join(',')}`
        if (values.compare) {
          url += `&rtirMode=${values.rtirMode}`
        }

        simpleFetch(url)
        .then((data) => {
          if (data.code !== 200000 || !data.result) {
            this.setState({
              nextLoading: false,
            })
            showMessage({
              text: stringToFirstUpperCase(data.message),
              type: 'warning',
            })
            return
          }
          this.setState({
            data: data.result,
            nextLoading: false,
            step: 1,
          })
        })
        .catch(() => {
          this.setState({
            nextLoading: false,
          })
        })
      })
    } else {
      this.toggle(0)
    }
  }

  render() {
    const { process, product, defect, intl } = this.props
    const stepBox = [
      <EdaFormWrapper
        ref={x => (this.EdaForm = x)}
        process={process}
        product={product}
        defect={defect}
        getDefectTop5={this.getDefectTop5}
        defectCodeGroup={this.state.defectCodeGroup}
      />,
      <EdaList data={this.state.data} loadToImageList={this.loadToImageList} />,
    ]

    return (<div>
      <a onClick={this.toggle}>EDA</a>
      <Modal
        title="EDA"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={() => this.toggle(0)}
        footer={[
          <Button key="back" onClick={this.back}>
            {[intl.formatMessage({ id: 'cancel' }), intl.formatMessage({ id: 'Back' })][this.state.step]}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={this.state.nextLoading}
            onClick={this.handleOk}
          >
            {[intl.formatMessage({ id: 'Next' }), intl.formatMessage({ id: 'OK' })][this.state.step]}
          </Button>,
        ]}
      >
        {stepBox[this.state.step]}
      </Modal>
    </div>)
  }
}

Eda.propTypes = {
  process: PropTypes.array.isRequired,
  product: PropTypes.array.isRequired,
  defect: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedType: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
}

export default connect(({ labelingTool, intl }) => ({
  intl,
  process: labelingTool.processList,
  product: labelingTool.productList,
  defect: labelingTool.defectCodeList,
  selectedType: labelingTool.selectedType,
}))(injectIntl(Eda))
