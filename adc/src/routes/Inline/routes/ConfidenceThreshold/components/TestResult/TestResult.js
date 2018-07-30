import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { Slider, InputNumber, Checkbox, Row, Col } from 'antd'
import { uniqBy } from 'lodash'
import { connect } from 'react-redux'
import classes from './TestResult.scss'

import {
  getTestResultType,
  updateMessage,
} from '../../modules/ConfidenceThreshold'

const CheckboxGroup = Checkbox.Group
export class TestResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indeterminate: true,
      indeterminate2: true,
      checkedProcessList: [this.props.rowDetail._original.processId],
      checkedProductList: [this.props.rowDetail._original.productId],
    }
    this.getChangeHandler = this.getChangeHandler.bind(this)
    this.checkProcessGroup = this.checkProcessGroup.bind(this)
    this.checkProductGroup = this.checkProductGroup.bind(this)
    this.onCheckAllChange = this.onCheckAllChange.bind(this)
    this.onCheckAllChange2 = this.onCheckAllChange2.bind(this)
    this.update = this.update.bind(this)
    this.reset = this.reset.bind(this)
  }

// 获取defectcode
  componentDidMount() {
    this.props.dispatch(getTestResultType(this.props.rowDetail._original.configId))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rowDetail !== nextProps.rowDetail) {
      this.props.dispatch(getTestResultType(nextProps.rowDetail._original.configId))
      this.setState({
        checkedProcessList: [nextProps.rowDetail._original.processId],
        checkedProductList: [nextProps.rowDetail._original.productId],
        checkProductAll: false,
        checkProductAll2: false,
        indeterminate: true,
        indeterminate2: true,
      })
    }
  }

// process全选功能函数
  onCheckAllChange(plainOptions) {
    const newAll = []
    plainOptions.forEach((item) => {
      newAll.push(item.value)
    })
    return (e) => {
      this.setState({
        checkedProcessList: e.target.checked ? newAll :
        [this.props.rowDetail._original.processId],
        indeterminate: false,
        checkProcessAll: e.target.checked,
      })
    }
  }

  // product全选功能函数
  onCheckAllChange2(plainOptions2) {
    const newAll = []
    plainOptions2.forEach((item) => {
      newAll.push(item.value)
    })
    return (e) => {
      this.setState({
        checkedProductList: e.target.checked ? newAll :
         [this.props.rowDetail._original.productId],
        indeterminate2: false,
        checkProductAll: e.target.checked,
      })
    }
  }

  // 滑动Slider改变confidence
  getChangeHandler(keyIndex) {
    return (value) => {
      this.props.dispatch({
        type: 'UPDATE_MODEL_TEST_RESULT_TYPE',
        data: {
          keyIndex,
          confidence: value,
        },
      })
    }
  }
// process单个选择
  checkProcessGroup(plainOptions) {
    return (checkedProcessList) => {
      this.setState({
        checkedProcessList,
        indeterminate: !!checkedProcessList.length &&
         (checkedProcessList.length < plainOptions.length),
        checkProcessAll: checkedProcessList.length === plainOptions.length,
      })
    }
  }

  // product单个选择
  checkProductGroup(plainOptions2) {
    return (checkedProductList) => {
      this.setState({
        checkedProductList,
        indeterminate2: !!checkedProductList.length &&
         (checkedProductList.length < plainOptions2.length),
        checkProductAll: checkedProductList.length === plainOptions2.length,
      })
    }
  }

  getObj() {
    const { confidenceList: tmp } = this.props
    const { checkedProcessList, checkedProductList } = this.state
    const obj = []
    tmp.forEach((item) => {
      if (checkedProcessList.includes(item.processId) &&
      checkedProductList.includes(item.productId)) {
        obj.push(item.configId)
      }
    })
    return obj
  }

  // 保存更新的数据
  update() {
    this.props.dispatch(updateMessage({ configId: this.getObj(),
      defectArray: this.props.modelResultType }))
  }

  reset() {
    this.props.dispatch(updateMessage({ configId: this.getObj(),
      modelId: this.props.rowDetail._original.modelId.toString() }))
  }

  render() {
    const marks = { 0: '0%', 20: '20%', 40: '40%', 60: '60%', 80: '80%', 100: '100%' }
    // plainOptions, plainOptions2这两个数组是去重以后复选框所需要的格式
    let plainOptions = []
    let plainOptions2 = []

    const { checkData, rowDetail } = this.props
    checkData.forEach((item) => {
      const { disabled,
        process: { processId, processName },
        product: { productId, productName },
      } = item
      const obj1 = { value: processId, label: processName, disabled }
      const obj2 = { value: productId, label: productName, disabled }
      if (processId === rowDetail._original.processId) {
        obj1.disabled = true
      }
      if (productId === rowDetail._original.productId) {
        obj2.disabled = true
      }
      plainOptions.push(obj1)
      plainOptions2.push(obj2)
    })

    plainOptions = uniqBy(plainOptions, 'label')
    plainOptions2 = uniqBy(plainOptions2, 'label')
    return (
      <div className={classes['TestResult-container']}>
        <div className={classes['top-left']}>
          <span className={classes.productGlass}>
            <WrapperFormattedMessage id="confidenceThreshold.confidenceList.confidenceThresholdSetting" />：{this.props.rowDetail.model}
          </span>
          <div style={{ display: 'flex' }}>
            <button
              className={`pt-button pt-intent-primary ${classes.button}`}
              onClick={this.reset}
              type='button'
            ><WrapperFormattedMessage id='confidenceThreshold.confidenceList.restoreDefault' /></button>
            <button
              className={`pt-button pt-intent-primary ${classes.button}`}
              style={{ width: '80px', marginLeft: '20px' }}
              type='button'
              onClick={this.update}
            >
              <WrapperFormattedMessage id='update' />
            </button>
          </div>
        </div>
        <div className={classes.confidence}>
          <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', marginLeft: '30px' }}>
              <span style={{ fontSize: '16px' }}><WrapperFormattedMessage id='confidence' /></span>
            </div>
            {
              this.props.modelResultType.map((item, index) => (
                <Row key={index} style={{ margin: '10px 30px' }}>
                  <Col span={1}>
                    <div style={{ marginTop: '4px' }}>{item.defectCode}</div>
                  </Col>
                  <Col span={10}>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      marks={marks}
                      onChange={this.getChangeHandler(index)}
                      value={item.threshold}
                    />
                  </Col>
                  <Col span={4} >
                    <InputNumber
                      min={0}
                      max={100}
                      step={1}
                      style={{ marginLeft: '16px', height: '30px' }}
                      value={item.threshold}
                      onChange={this.getChangeHandler(index)}
                    />
                  </Col>
                </Row>
              ))
            }
          </div>
          <div style={{ display: 'flex', padding: '30px 30px' }}>
            <div style={{ width: '45%' }}>
              <h5><WrapperFormattedMessage id='confidenceThreshold.confidenceList.applyProcesses' />：</h5>
              <div style={{ display: 'flex', padding: '30px 0px' }}>
                <div style={{ marginRight: '60px' }}><WrapperFormattedMessage id='confidenceThreshold.confidenceList.optionalProcessID' /></div>
                {
                  plainOptions.length === 1 ?
                    <div style={{ position: 'relative', width: '80%', height: '300px', padding: '30px 30px', border: '1px solid #eee' }}>
                      <CheckboxGroup
                        defaultValue={this.state.checkedProcessList}
                        options={plainOptions}
                        value={this.state.checkedProcessList}
                        onChange={this.checkProcessGroup(plainOptions)}
                      />
                    </div> :
                    <div style={{ position: 'relative', width: '80%', height: '300px', padding: '30px 30px', border: '1px solid #eee' }}>
                      <CheckboxGroup
                        options={plainOptions}
                        value={this.state.checkedProcessList}
                        onChange={this.checkProcessGroup(plainOptions)}
                      />
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange(plainOptions)}
                        checked={this.state.checkProcessAll}
                        style={{ position: 'absolute', right: '10px', bottom: '10px' }}
                      >
                        <WrapperFormattedMessage id='confidenceThreshold.confidenceList.selectAll' />
                      </Checkbox>
                    </div>
                }
              </div>
            </div>
            <div style={{ width: '45%', marginLeft: '10%' }}>
              <h5><WrapperFormattedMessage id='confidenceThreshold.confidenceList.applyProducts' />：</h5>
              <div style={{ display: 'flex', padding: '30px 0px' }}>
                <div style={{ marginRight: '60px' }}><WrapperFormattedMessage id='confidenceThreshold.confidenceList.optionalProductID' /></div>
                {
                  plainOptions2.length === 1 ?
                    <div style={{ position: 'relative', width: '80%', height: '300px', padding: '30px 30px', border: '1px solid #eee' }}>
                      <CheckboxGroup
                        defaultValue={this.state.checkedProductList}
                        options={plainOptions2}
                        value={this.state.checkedProductList}
                        onChange={this.checkProductGroup(plainOptions2)}
                      />
                    </div> :
                    <div style={{ position: 'relative', width: '80%', height: '300px', padding: '30px 30px', border: '1px solid #eee' }}>
                      <CheckboxGroup
                        options={plainOptions2}
                        value={this.state.checkedProductList}
                        onChange={this.checkProductGroup(plainOptions2)}
                      />
                      <Checkbox
                        indeterminate={this.state.indeterminate2}
                        onChange={this.onCheckAllChange2(plainOptions2)}
                        checked={this.state.checkProductAll}
                        style={{ position: 'absolute', right: '10px', bottom: '10px' }}
                      >
                        <WrapperFormattedMessage id='confidenceThreshold.confidenceList.selectAll' />
                      </Checkbox>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TestResult.propTypes = {
  checkData: PropTypes.array.isRequired,
  rowDetail: PropTypes.object.isRequired, // 表格中的一行的数据
  dispatch: PropTypes.func.isRequired,
  confidenceList: PropTypes.array.isRequired,
  modelResultType: PropTypes.array.isRequired,
}

export default connect(
  ({ auth, confidenceThreshold, intl: { locale } }) => ({
    locale,
    token: auth.token,
    modelResultType: confidenceThreshold.modelResultType,
  }),
)(TestResult)
