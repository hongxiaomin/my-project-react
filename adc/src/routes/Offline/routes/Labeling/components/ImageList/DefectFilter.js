import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { Icon, Checkbox } from 'antd'
import { getOffset, getScroll } from 'Utils'
import { UPDATE_SELECTED_IMAGE_LIST } from '../../modules'
import './ImageList.scss'

const CheckboxGroup = Checkbox.Group
export class DefectFilter extends React.Component {

  constructor() {
    super()

    this.filterElem = null
    this.filterElemOffset = { top: 'auto', left: 'auto' }
    this.state = {
      filter: false,
    }
  }

  componentDidMount() {
    this.filterElemOffset = getOffset(this.filterElem)

    document.addEventListener('scroll', () => {
      this.setState({
        filter: false,
      })

      this.filterElemOffset.top = getOffset(this.filterElem).top - getScroll().scrollTop
    })
  }

  filterClose = () => {
    this.setState({
      filter: false,
    })
    document.removeEventListener('click', this.filterClose)
  }

  filterToggle = (e) => {
    this.setState({
      filter: !this.state.filter,
    })
    if (!this.state.filter) {
      document.addEventListener('click', this.filterClose)
    }
    e.nativeEvent.stopImmediatePropagation()
  }

  boxChange = (e) => {
    e.nativeEvent.stopImmediatePropagation()
  }

  render() {
    const { defectCodeFilterList, selectedDefectCode, filterChange, intl } = this.props

    return (<div ref={(x) => { this.filterElem = x }} styleName="filter-elem-w">
      <span><WrapperFormattedMessage id="labelingTool.imageList.defect" /></span>
      <Icon
        type="filter"
        onClick={this.filterToggle}
        style={{
          cursor: 'pointer',
          fontSize: 16,
          position: 'relative',
          left: 3,
          top: 4,
        }}
      />
      <div
        styleName="filter-elem"
        style={{
          display: this.state.filter ? 'block' : 'none',
          top: this.filterElemOffset.top + 10,
        }}
        onClick={this.boxChange}
      >
        {defectCodeFilterList.length
          ? (<CheckboxGroup
            value={selectedDefectCode}
            onChange={filterChange}
          >
            {defectCodeFilterList.map(defect => (<p key={defect}><Checkbox value={defect}>{defect}</Checkbox></p>))}
          </CheckboxGroup>)
          : (<p>{intl.formatMessage({ id: 'labelingTool.dirTree.noData' })}</p>)
        }
      </div>
    </div>)
  }
}

DefectFilter.propTypes = {
  defectCodeFilterList: PropTypes.array.isRequired,
  selectedDefectCode: PropTypes.array.isRequired,
  filterChange: PropTypes.func.isRequired,
}

export default connect(({ labelingTool }) => ({
  defectCodeFilterList: labelingTool.defectCodeFilterList,
  selectedDefectCode: labelingTool.selectedDefectCode,
}), dispatch => ({
  filterChange: selectedDefectCode => dispatch({
    type: UPDATE_SELECTED_IMAGE_LIST,
    data: { selectedDefectCode },
  }),
}))(injectIntl(DefectFilter))
