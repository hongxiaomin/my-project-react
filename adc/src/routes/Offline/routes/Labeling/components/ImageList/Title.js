import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { connect } from 'react-redux'
import { Select } from 'antd'
import { UPDATE_SELECTED_IMAGE_LIST } from '../../modules'

const Option = Select.Option
export const Title = ({ listType, selectedType, handleChange }) => (<h3>
  <Select
    value={selectedType}
    onChange={handleChange}
    style={{
      width: 100,
      float: 'right',
      marginTop: 5,
    }}
  >
    {listType.map(v => (<Option key={v} value={v}><WrapperFormattedMessage id={`labelingTool.imageList.${v}`} /></Option>))}
  </Select>
  <WrapperFormattedMessage id="labelingTool.imageList.imageList" />
</h3>)

Title.defaultProps = {
  listType: ['All', 'Labeled', 'Unlabeled'],
}

Title.propTypes = {
  listType: PropTypes.array,
  selectedType: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default connect(({ labelingTool, intl }) => ({
  intl,
  selectedType: labelingTool.selectedType,
}), dispatch => ({
  handleChange: selectedType => dispatch({
    type: UPDATE_SELECTED_IMAGE_LIST,
    data: { selectedType },
  }),
}))(Title)
