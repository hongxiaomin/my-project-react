/* eslint import/no-named-as-default: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { getStorage } from 'Utils'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import SetPath from './SetPath'
import FileUpload from './FileUpload'
// import SearchImages from './SearchImages'
import DirTree from './DirTree'
import Eda from './EDA'
import './ImagePath.scss'

const userInfo = JSON.parse(getStorage('loginInfo'))
export const ImagePath = ({ style }) => (<div styleName='image-path' style={style}>
  <h3>
    {userInfo.roleIds.includes('admin')
      ? <Eda />
      : ''}
    {/* <SearchImages /> */}
    <FileUpload />
    <DirTree />
    <WrapperFormattedMessage
      id="labelingTool.setPath.imagePath"
    />
  </h3>
  <div style={{ height: '10px' }} />
  <SetPath />
</div>)

ImagePath.propTypes = {
  style: PropTypes.object,
}

ImagePath.defaultProps = {
  style: {},
}

export default ImagePath
