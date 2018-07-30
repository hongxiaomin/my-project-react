import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { Input, Tabs } from 'antd'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { getSelectInfo, COPY_MODEL_DETAIL } from '../../modules'
import Filter from './Filter'
import classes from './ActionModel.scss'

const TabPane = Tabs.TabPane

export class TwoStep extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeKey: this.props.copyModelDetail.sourceType === 'filter' ? '3' : '2',
    }
    this.inputChange = this.inputChange.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getSelectInfo())
  }

  onChangeDate(type) {
    return (date, dateString) => {
      this.props.dispatch({
        type: COPY_MODEL_DETAIL,
        data: {
          ...this.props.copyModelDetail,
          [type]: dateString,
        },
      })
    }
  }

  handleChange(type) {
    return (e) => {
      const value = e.target.value
      this.setState({
        [type]: value,
      })
    }
  }
  inputChange() {
    return (e) => {
      this.props.dispatch({
        type: COPY_MODEL_DETAIL,
        data: {
          ...this.props.copyModelDetail,
          imageSourceCondition: {
            ...this.props.copyModelDetail.imageSourceCondition,
            path: e.target.value,
          },
        },
      })
    }
  }

  tabsChange = (activeKey) => {
    if (activeKey.toString() === '3') {
      this.props.dispatch({
        type: COPY_MODEL_DETAIL,
        data: {
          ...this.props.copyModelDetail,
          sourceType: 'filter',
          imageSourceCondition: {
            ...this.props.copyModelDetail.imageSourceCondition,
          },
        },
      })
    } else {
      this.props.dispatch({
        type: COPY_MODEL_DETAIL,
        data: {
          ...this.props.copyModelDetail,
          sourceType: 'path',
        },
      })
    }
    this.setState({
      activeKey,
    })
  }

  render() {
    const { process, product, defect, intl } = this.props
    return (
      <div className={classes.twoStep}>
        <div className={classes.dialogBody}>
          <Tabs activeKey={this.state.activeKey} onChange={this.tabsChange}>
            <TabPane tab={intl.formatMessage({ id: 'labelingTool.setPath.imagePath' })} key="2">
              <div>
                <span style={{ paddingLeft: '15px' }}>
                  <WrapperFormattedMessage id="modelManagement.twoStep.InputImagePath" />
                </span>
                <Input
                  style={{ margin: '30px 0px', width: '200px' }}
                  type='text'
                  value={this.props.copyModelDetail.imageSourceCondition.path}
                  onChange={this.inputChange()}
                />
              </div>
            </TabPane>
            <TabPane tab={intl.formatMessage({ id: 'modelManagement.twoStep.filter' })} key="3">
              {
                this.props.copyModelDetail.sourceType === 'filter' &&
                <Filter
                  title={this.props.title}
                  activeKey={this.state.activeKey}
                  process={process}
                  product={product}
                  defect={defect}
                  copyModelDetail={this.props.copyModelDetail}
                  dispatch={this.props.dispatch}
                />
              }
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
TwoStep.propTypes = {
  intl: propTypes.object.isRequired,
  title: propTypes.string.isRequired,
  defect: propTypes.array.isRequired,
  process: propTypes.array.isRequired,
  product: propTypes.array.isRequired,
  dispatch: propTypes.func.isRequired,
  sourceType: propTypes.string.isRequired,
  copyModelDetail: propTypes.object.isRequired,
}

export default injectIntl(connect((state) => {
  return {
    process: state.modelManagement.processList,
    product: state.modelManagement.productList,
    defect: state.modelManagement.defectCodeList,
  }
})(TwoStep))
