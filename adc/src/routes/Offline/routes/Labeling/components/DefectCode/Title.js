import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import DataList from './DataList'
import DefectCodeForm from './AddDefectCode'
import { updateResetKeyCodeStatus, UPDATE_DEFAULT_DEFECT_CODE_LIST } from '../../modules'

export class Title extends React.Component {
  constructor() {
    super()

    this.state = {
      visible: false,
    }
  }

  toggle = () => {
    this.handleFocus()
    this.setState({
      visible: !this.state.visible,
    })
  }

  handleBlur = () => {
    this.props.dispatch(updateResetKeyCodeStatus(false))
  }

  handleFocus = () => {
    this.props.dispatch(updateResetKeyCodeStatus(true))
  }

  handleChange = (defect, cb) => {
    const { defaultDefectCodeList, dispatch } = this.props
    if (!defaultDefectCodeList.some(item => item.defectId === defect.defectId)) {
      dispatch({
        type: UPDATE_DEFAULT_DEFECT_CODE_LIST,
        data: defaultDefectCodeList.concat(defect),
      })
    }
    if (cb) cb()
  }

  handleCancel = () => {
    this.handleBlur()
    this.setState({
      visible: false,
    })
  }

  render() {
    const { defectCodeList, defaultDefectCodeList, intl } = this.props

    return (<div>
      <h4><WrapperFormattedMessage id="labelingTool.defectCode.selectDefectCode" /> <Icon
        alt={intl.formatMessage({ id: 'labelingTool.defectCode.addDefect' })}
        title={intl.formatMessage({ id: 'labelingTool.defectCode.addDefect' })}
        type="plus-circle-o"
        style={{ fontSize: 16, float: 'right', cursor: 'pointer' }}
        onClick={this.toggle}
      />
      </h4>
      <DataList
        data={defectCodeList}
        selectedData={defaultDefectCodeList}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />

      <DefectCodeForm
        visible={this.state.visible}
        handleCancel={this.handleCancel}
      />
    </div>)
  }
}

Title.propTypes = {
  defectCodeList: PropTypes.array.isRequired,
  defaultDefectCodeList: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}

export default connect(({ labelingTool, intl: { locale } }) => ({
  locale,
  defectCodeList: labelingTool.defectCodeList,
  defaultDefectCodeList: labelingTool.defaultDefectCodeList,
}))(injectIntl(Title))
