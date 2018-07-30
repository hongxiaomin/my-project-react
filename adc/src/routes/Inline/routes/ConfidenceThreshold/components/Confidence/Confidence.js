/* eslint import/no-named-as-default: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import classes from './Confidence.scss'
import ConfidenceList from '../ConfidenceList'
import SearchCondition from '../../../SearchCondition'
import TestResult from '../TestResult'
import { getSelectInfo,
  getModelList,
  getConfidenceList,
 } from '../../modules/ConfidenceThreshold'

export class Confidence extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDialogOpen: false,
      isDetail: false,
      row: {},
      processId: '',
      productId: '',
      modelId: '',
    }
  }

  componentDidMount() {
    this.props.dispatch(getSelectInfo())
    this.props.dispatch(getModelList())
  }

  handleChange = type => (value) => {
    this.setState({
      [type]: value,
    })
  }

  search = () => {
    const tmp = {
      processId: this.state.processId,
      productId: this.state.productId,
      modelId: this.state.modelId,
      queryType: 'config',
    }
    this.props.dispatch(getConfidenceList(tmp))
  }
  isDetail = (isOpen, rowDetail) => {
    this.setState({
      isDetail: isOpen,
      row: rowDetail,
    })
  }

  render() {
    // checkData数组是result所需要的复选框的数据
    const checkData = []
    if (!isEmpty(this.props.confidenceList)) {
      this.props.confidenceList.forEach((item) => {
        checkData.push({
          process: { processId: item.processId, processName: item.processName },
          product: { productId: item.productId, productName: item.productName },
          configId: item.configId,
          disabled: false })
      })
    }
    // 限定最少输入两个搜索条件。
    const isClick = (isEmpty(this.state.processId) && isEmpty(this.state.productId)) ||
    (isEmpty(this.state.processId) && isEmpty(this.state.modelId)) ||
    (isEmpty(this.state.productId) && isEmpty(this.state.modelId))
    return (
      <div>
        <div className={classes.container}>
          <div className={classes.top}>
            <h4 className={classes.model}><WrapperFormattedMessage id='confidenceThreshold.confidenceList.confidenceThresholdSetting' /></h4>
          </div>
          <SearchCondition
            processList={this.props.processList}
            productList={this.props.productList}
            modelList={this.props.modelList}
            handleChange={this.handleChange}
            searchChange={this.search}
            isClick={isClick}
          />
        </div>
        <ConfidenceList
          confidenceList={this.props.confidenceList}
          checkData={checkData}
          isDetail={this.isDetail}
        />
        {
          this.state.isDetail &&
          <TestResult
            checkData={checkData}
            rowDetail={this.state.row}
            confidenceList={this.props.confidenceList}
          />
        }
      </div>
    )
  }
}

Confidence.propTypes = {
  confidenceList: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  processList: PropTypes.array.isRequired,
  productList: PropTypes.array.isRequired,
  modelList: PropTypes.array.isRequired,
}

export default connect(
  ({ auth, confidenceThreshold, intl: { locale } }) => ({
    locale,
    token: auth.token,
    processList: confidenceThreshold.processList,
    productList: confidenceThreshold.productList,
    modelList: confidenceThreshold.modelList,
    confidenceList: confidenceThreshold.confidenceList,
    selectData: confidenceThreshold.selectData,
  }),
)(Confidence)
