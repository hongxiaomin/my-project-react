/* eslint no-unused-expressions: 0, no-param-reassign: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { Button, Select, DatePicker } from 'antd'
import ReactTable from 'components/ADCTable'
import classes from './ActionModel.scss'
import { imageListCheck, COPY_MODEL_DETAIL } from '../../modules'

const Option = Select.Option
const { RangePicker } = DatePicker

const Table = ({ code, columns }) => (
  <ReactTable
    style={{ margin: '0 auto', width: '500px', height: '200px' }}
    className="-striped -highlight"
    showPagination={false}
    showPageSizeOptions={false}
    pageSize={code > 6 ? this.state.defectInfo.length : 6}
    data={code}
    getTrProps={() => {
      const obj = {
        style: { textAlign: 'center', height: '28px', lineHeight: '14px' },
      }
      return obj
    }}
    columns={columns}
  />
)

Table.propTypes = {
  code: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
}

export class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.newTabIndex = 0
    this.state = {
      totalNumbers: {},
      editData: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeKey !== nextProps.activeKey) {
      this.setState({
        totalNumbers: {},
        data: {},
      })
    }
  }

  onChangeDate = type => (value, dateString) => {
    const newdata = { startTime: dateString[0], endTime: dateString[1] }
    this.props.dispatch({
      type: COPY_MODEL_DETAIL,
      data: {
        ...this.props.copyModelDetail,
        imageSourceCondition: {
          ...this.props.copyModelDetail.imageSourceCondition,
          dateRange: newdata,
        },
      },
    })
  }

  inputChange = type => (value) => {
    this.props.dispatch({
      type: COPY_MODEL_DETAIL,
      data: {
        ...this.props.copyModelDetail,
        imageSourceCondition: {
          ...this.props.copyModelDetail.imageSourceCondition,
          [type]: value,
        },
      },
    })
    if (type === 'targetCodeId' || type === 'othersCodeId') {
      this.props.dispatch({
        type: COPY_MODEL_DETAIL,
        data: {
          ...this.props.copyModelDetail,
          [type]: value,
        },
      })
    }
  }

  blur = type => (value) => {
    if (type === 'targetCodeId') {
      this.props.dispatch({
        type: COPY_MODEL_DETAIL,
        data: {
          ...this.props.copyModelDetail,
          imageSourceCondition: {
            ...this.props.copyModelDetail.imageSourceCondition,
            targetCode: [],
          },
        },
      })
      value.forEach((item) => {
        this.props.defect.forEach((i) => {
          if (item * 1 === i.defectId) {
            i.disabled = true
            const tmp = Object.assign([], this.props.copyModelDetail.imageSourceCondition.targetCode)
            tmp.push(i)
            this.props.dispatch({
              type: COPY_MODEL_DETAIL,
              data: {
                ...this.props.copyModelDetail,
                imageSourceCondition: {
                  ...this.props.copyModelDetail.imageSourceCondition,
                  targetCode: tmp,
                },
              },
            })
          }
        })
      })
    }
    if (type === 'othersCodeId') {
      this.props.dispatch({
        type: COPY_MODEL_DETAIL,
        data: {
          ...this.props.copyModelDetail,
          imageSourceCondition: {
            ...this.props.copyModelDetail.imageSourceCondition,
            othersCode: [],
          },
        },
      })
      value.forEach((item) => {
        this.props.defect.forEach((i) => {
          if (item * 1 === i.defectId) {
            const tmp = Object.assign([], this.props.copyModelDetail.imageSourceCondition.othersCode)
            tmp.push(i)
            i.disabled = true
            this.props.dispatch({
              type: COPY_MODEL_DETAIL,
              data: {
                ...this.props.copyModelDetail,
                imageSourceCondition: {
                  ...this.props.copyModelDetail.imageSourceCondition,
                  othersCode: tmp,
                },
              },
            })
          }
        })
      })
    }
  }
  handleCheck = () => {
    const targetCodeArray = this.props.copyModelDetail.imageSourceCondition.targetCode.map(item => item.defectId)
    const othersCodeArray = this.props.copyModelDetail.imageSourceCondition.othersCode.map(item => item.defectId)
    const tmp = {
      dateRange: {
        startTime: this.props.copyModelDetail.imageSourceCondition.dateRange.startTime,
        endTime: this.props.copyModelDetail.imageSourceCondition.dateRange.endTime,
      },
      processId: this.props.copyModelDetail.imageSourceCondition.processId,
      productId: this.props.copyModelDetail.imageSourceCondition.productId,
      targetCode: {
        defectId: targetCodeArray,
      },
      othersCode: {
        defectId: othersCodeArray,
      },
    }
    this.props.dispatch({
      type: COPY_MODEL_DETAIL,
      data: {
        ...this.props.copyModelDetail,
        sourceType: 'filter',
        trainingData: tmp,
      },
    })
    this.props.dispatch(imageListCheck(tmp, 'edit'))
  }

  renderTragetEditable = (cellInfo) => {
    if (isEmpty(cellInfo.value)) {
      return '/'
    }
    const tmp = cellInfo.value.split('/')[0]
    const tmp2 = cellInfo.value.split('/')[1]
    return (
      <div>
        <input
          type='text'
          style={{ width: '50px', backgroundColor: '#fafafa', color: 'green' }}
          defaultValue={tmp}
          value={tmp}
          onChange={(e) => {
            const data = [...this.props.copyModelDetail.imageSourceCondition.targetCode]
            data[cellInfo.index][cellInfo.column.id] = `${e.target.value}/${tmp2}`
            this.props.dispatch({
              type: COPY_MODEL_DETAIL,
              data: {
                ...this.props.copyModelDetail,
                imageSourceCondition: {
                  ...this.props.copyModelDetail.imageSourceCondition,
                  targetCode: data,
                },
              },
            })
          }}
        />/<span>{tmp2}</span>
      </div>
    )
  }
  renderOthersEditable = (cellInfo) => {
    if (isEmpty(cellInfo.value)) {
      return '/'
    }
    const tmp = cellInfo.value.split('/')[0]
    const tmp2 = cellInfo.value.split('/')[1]
    return (
      <div>
        <input
          type='text'
          style={{ width: '50px', backgroundColor: '#fafafa', color: 'green' }}
          defaultValue={tmp}
          value={tmp}
          onChange={(e) => {
            const data = [...this.props.copyModelDetail.imageSourceCondition.othersCode]
            data[cellInfo.index][cellInfo.column.id] = `${e.target.value}/${tmp2}`
            this.props.dispatch({
              type: COPY_MODEL_DETAIL,
              data: {
                ...this.props.copyModelDetail,
                imageSourceCondition: {
                  ...this.props.copyModelDetail.imageSourceCondition,
                  othersCode: data,
                },
              },
            })
          }}
        />/<span>{tmp2}</span>
      </div>
    )
  }
  render() {
    const { intl } = this.props
    const {
      dateRange,
      processId,
      productId,
      targetCode,
      othersCode,
    } = this.props.copyModelDetail.imageSourceCondition
    const { startTime, endTime } = dateRange
    const RangePickerValue = dateRange &&
    [moment(startTime, 'YYYY-MM-DD HH:mm:ss'), moment(endTime, 'YYYY-MM-DD HH:mm:ss')]
    const columns = [
      {
        Header: 'Defect Code',
        id: 'defectId',
        sortable: false,
        accessor: d => d.defectCode,
        width: 130,
      },
    ]
    const columns2 = columns.concat()

    const { product } = this.props
    const productList = product.filter((item) => {
      if (isEmpty(productId)) return false
      return productId.includes(item.productId.toString())
    })
    productList.forEach((item, index) => {
      columns.splice(1 + index, 0,
        { Header: item.productName,
          accessor: item.productId.toString(),
          Cell: this.renderTragetEditable,
        })
      columns2.splice(1 + index, 0,
        { Header: item.productName,
          accessor: item.productId.toString(),
          Cell: this.renderOthersEditable,
        })
    })
    return (
      <div id={classes.abc} >
        <div>
          <div className={classes.filterTime}>
            <div style={{ width: '100px', textAlign: 'right' }}>
              <WrapperFormattedMessage id="modelManagement.filter.dateRange" />
            </div>
            {
              this.props.title === `${intl.formatMessage({ id: 'modelManagement.createModel.createModel' })}` ?
                <RangePicker
                  allowClear={false}
                  showTime={{ format: 'HH:mm:ss' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder={[`${intl.formatMessage({ id: 'startTime' })}`, `${intl.formatMessage({ id: 'endTime' })}`]}
                  onOk={this.onOk}
                  style={{ marginLeft: '10px' }}
                  onChange={this.onChangeDate('dateRange')}
                /> :
                <RangePicker
                  allowClear={false}
                  showTime={{ format: 'HH:mm:ss' }}
                  value={RangePickerValue}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder={[`${intl.formatMessage({ id: 'startTime' })}`, `${intl.formatMessage({ id: 'endTime' })}`]}
                  onOk={this.onOk}
                  style={{ marginLeft: '10px' }}
                  onChange={this.onChangeDate('dateRange')}
                />
            }
          </div>
          <div className={classes.filtertwo}>
            <div style={{ width: '100px', textAlign: 'right' }}>
              <WrapperFormattedMessage
                id="processId"
              />
            </div>
            {
              this.props.title === `${intl.formatMessage({ id: 'modelManagement.createModel.createModel' })}` ?
                <Select
                  showSearch
                  style={{ width: '200px', marginLeft: '10px' }}
                  placeholder={intl.formatMessage({ id: 'processId' })}
                  optionFilterProp="children"
                  onChange={this.inputChange('processId')}
                >
                  {
                    this.props.process.map(item => (
                      <Option
                        key={item.processId}
                        value={item.processId.toString()}
                      >{item.processName}
                      </Option>
                    ))
                  }
                </Select> :
                <Select
                  showSearch
                  style={{ width: '200px', marginLeft: '10px' }}
                  placeholder={intl.formatMessage({ id: 'processId' })}
                  optionFilterProp="children"
                  value={processId}
                  onChange={this.inputChange('processId')}
                >
                  {
                    this.props.process.map(item => (
                      <Option
                        key={item.processId}
                        value={item.processId.toString()}
                      >{item.processName}
                      </Option>
                    ))
                  }
                </Select>
            }
          </div>
          <div className={classes.filtertwo}>
            <div style={{ width: '100px', textAlign: 'right' }}>
              <WrapperFormattedMessage
                id="productId"
              />
            </div>
            <Select
              mode="multiple"
              showSearch
              style={{ width: '400px', marginLeft: '10px' }}
              placeholder={intl.formatMessage({ id: 'productId' })}
              optionFilterProp="children"
              value={productId}
              onChange={this.inputChange('productId')}
            >
              {
                this.props.product.map(item => (
                  <Option
                    key={item.productId}
                    value={item.productId.toString()}
                  >{item.productName}
                  </Option>
                ))
              }
            </Select>
          </div>
          <div className={classes.filtertwo}>
            <div style={{ width: '100px', textAlign: 'right' }}>
              <WrapperFormattedMessage
                id="modelManagement.targetCode"
              />
            </div>
            <Select
              mode="multiple"
              showSearch
              style={{ width: '400px', marginLeft: '10px' }}
              placeholder={intl.formatMessage({ id: 'modelManagement.targetCode' })}
              optionFilterProp="children"
              value={this.props.copyModelDetail.targetCodeId}
              onChange={this.inputChange('targetCodeId')}
              onBlur={this.blur('targetCodeId')}
            >
              {
                this.props.defect.map(item => (
                  <Option
                    key={item.defectId}
                    value={item.defectId.toString()}
                  >{item.defectCode}
                  </Option>
                ))
              }
            </Select>
          </div>
        </div>
        <Table code={targetCode} columns={columns} />
        <div className={classes.filtertwo}>
          <div style={{ width: '100px', textAlign: 'right' }}>
            <WrapperFormattedMessage
              id="modelManagement.othersCode"
            />
          </div>
          <Select
            mode="multiple"
            showSearch
            style={{ width: '400px', marginLeft: '10px' }}
            placeholder={intl.formatMessage({ id: 'modelManagement.othersCode' })}
            optionFilterProp="children"
            value={this.props.copyModelDetail.othersCodeId}
            onChange={this.inputChange('othersCodeId')}
            onBlur={this.blur('othersCodeId')}
          >
            {
              this.props.defect.map(item => (
                <Option
                  key={item.defectId}
                  value={item.defectId.toString()}
                  // disabled={item.disabled}
                >{item.defectCode}
                </Option>
              ))
            }
          </Select>
        </div>
        <Table code={othersCode} columns={columns2} />
        <Button
          style={{ margin: '10px 0px 0px 45%' }}
          disabled={
            isEmpty(dateRange) || isEmpty(processId) || isEmpty(productId) || isEmpty(targetCode)
          }
          onClick={this.handleCheck}
        ><WrapperFormattedMessage id="check" /></Button>
      </div>
    )
  }
}

Filter.propTypes = {
  intl: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  defect: PropTypes.array.isRequired,
  process: PropTypes.array.isRequired,
  product: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  activeKey: PropTypes.string.isRequired,
  targetCodeId: PropTypes.array.isRequired,
  othersCodeId: PropTypes.array.isRequired,
  copyModelDetail: PropTypes.object.isRequired,
}

export default injectIntl(Filter)
