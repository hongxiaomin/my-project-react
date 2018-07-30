import React from 'react'
import { Slider, InputNumber } from 'antd'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import ResultTable from './ResultTable'
import classes from './TestResultCopy.scss'

import {
  updateConfidence,
  getTestResultType,
} from '../../modules'

type Props = {
  id: Number,
  dispatch: Function,
  modelResultType: Array,
};

const marks = { 0: '0%', 20: '20%', 40: '40%', 60: '60%', 80: '80%', 100: '100%' }

export class TestResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: {},
    }
    this.onChange = this.onChange.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getTestResultType(this.props.id))
  }

// 手动输入/滑动Slider改变confidence
  onChange(keyIndex) {
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
  // 保存更新的数据
  update() {
    const newData = this.props.modelResultType.map((item) => {
      return { defectId: item.defectId.toString(), value: item.defaultConfidence }
    })
    const tmp = {
      modelId: this.props.id,
      thresholds: newData,
    }
    this.props.dispatch(updateConfidence(tmp))
  }

  props: Props;

  render() {
    return (
      <div className={classes['TestResultCopy-container']}>
        <div className={classes['top-left']}>
          <span className={classes.productGlass}>
            <WrapperFormattedMessage id="modelManagement.TestResultCopy.testingResult" />
          </span>
          <button
            className={`pt-button pt-intent-primary ${classes.button}`}
            style={{ width: '80px', marginLeft: '20px' }}
            type='button'
            onClick={this.update}
          >
            <WrapperFormattedMessage id="Save" />
          </button>
        </div>
        <div className={classes.confidence}>
          <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
            <ResultTable id={this.props.id} />
            <div className={classes.confidenceHeader}>
              <span style={{ fontSize: '16px' }}><WrapperFormattedMessage id="confidence" /></span>
            </div>
            {
              !isEmpty(this.props.modelResultType) &&
              this.props.modelResultType.map((item, index) => {
                return (
                  <div style={{ display: 'flex', marginTop: '30px' }} key={item.defectId}>
                    <div style={{ display: 'flex', marginLeft: '30px', marginTop: '10px', marginBottom: '10px' }}>
                      <span style={{ marginRight: '30px', paddingTop: '5px' }}>{item.defectCode}</span>
                      <Slider
                        className={classes.slider}
                        min={0}
                        max={100}
                        step={1}
                        marks={marks}
                        onChange={this.onChange(index)}
                        value={item.defaultConfidence}
                      />
                      <InputNumber
                        min={0}
                        max={100}
                        step={1}
                        style={{ height: '30px' }}
                        value={item.defaultConfidence}
                        onChange={this.onChange(index)}
                      />
                    </div>
                    {
                      item.defaultConfidence !== 0 ?
                        <div style={{ display: 'flex', marginLeft: '2%', marginTop: '10px', width: '100%' }}>
                          <div style={{ marginLeft: '6%' }}><WrapperFormattedMessage id="recall" /><span>{item.count[item.defaultConfidence - 1].recall}%</span></div>
                          <div style={{ marginLeft: '6%' }}><WrapperFormattedMessage id="errorRate" /><span>{item.count[item.defaultConfidence - 1].error}%</span></div>
                          <div style={{ marginLeft: '6%' }}><WrapperFormattedMessage id="others" /><span>{item.count[item.defaultConfidence - 1].others}%</span></div>
                        </div> :
                        <div style={{ display: 'flex', marginLeft: '2%', marginTop: '10px', width: '100%' }}>
                          <div style={{ marginLeft: '6%' }}><WrapperFormattedMessage id="recall" /><span>0%</span></div>
                          <div style={{ marginLeft: '6%' }}><WrapperFormattedMessage id="errorRate" /><span>0%</span></div>
                          <div style={{ marginLeft: '6%' }}><WrapperFormattedMessage id="others" /><span>0%</span></div>
                        </div>
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    token: state.auth.token,
    modelResultType: state.modelManagement.modelResultType,
  }),
)(TestResult)
