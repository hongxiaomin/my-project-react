/* eslint import/no-named-as-default: 0, jsx-a11y/no-static-element-interactions: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { getKeyNameByKeyCode } from 'Utils'
import DefectCode from '../DefectCode'
import ControlPanel from '../ControlPanel'
import ImageZone from '../ImageZone'
import ImagePath from '../ImagePath'
import ImageList from '../ImageList'
import LabelingList from '../LabeledList'
import HotKeysForm from '../HotKeys/HotKeysForm'
import './LabelingToolExpand.scss'
import { UPDATE_SOMETHING, updateCurrentId } from '../../modules'

export class LabelingToolExpand extends React.Component {
  constructor() {
    super()

    this.isUpdate = true
    this.state = {
      drawer: false,
      visible: false,
    }
  }

  componentDidMount() {
    // this.isUpdate = false
  }

  handleClose = () => {
    this.props.dispatch({
      type: UPDATE_SOMETHING,
      data: {
        expandView: false,
      },
    })
  }


  handleRight = () => {
    if (!this.props.selectedImageInfo.path) return
    this.props.dispatch(updateCurrentId('next'))
  }

  handleLeft = () => {
    if (!this.props.selectedImageInfo.path) return
    this.props.dispatch(updateCurrentId('prev'))
  }

  showDrawer = () => {
    this.setState({
      drawer: !this.state.drawer,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  render() {
    const { hotKeys, intl } = this.props
    const iconStyle = {
      fontSize: 45,
      position: 'absolute',
      top: '50%',
      left: 10,
      marginTop: '-20px',
    }
    let button = (<Icon type="right" style={{ fontSize: 16 }} />)

    const drawerStyle = {
      left: '-30%',
    }

    if (this.state.drawer) {
      drawerStyle.left = '0'
      button = (<Icon type="left" style={{ fontSize: 16 }} />)
    }

    return (!this.props.expandView)
        ? null
        : (<div styleName="LabelingToolExpand">
          <HotKeysForm visible={this.state.visible} handleCancel={this.handleCancel} />
          <div styleName="labelingPath" style={drawerStyle}>
            <div styleName="labelingPathContent">
              <ImagePath style={{ padding: '10px' }} />
              <ImageList style={{ padding: '0 10px' }} />
              <LabelingList style={{ padding: '10px' }} />
            </div>
            <button
              title={this.state.drawer ? intl.formatMessage({ id: 'close' }) : intl.formatMessage({ id: 'open' })}
              styleName="handle"
              onClick={this.showDrawer}
            >
              {button}
            </button>
          </div>
          <div>
            <h4 styleName="labelingInfo">
              <a styleName="left" onClick={this.handleClose}>
                <Icon type="close-circle" style={{ fontSize: 28, verticalAlign: 'middle' }} />
              </a>
              <WrapperFormattedMessage tagName='em' id="labelingTool.expand.labelingInfomation" />
              <a styleName="right" onClick={this.handleCancel}>
                <Icon
                  type="keyboard_icon"
                  style={{
                    fontSize: 20,
                    marginRight: 5,
                    position: 'relative',
                    top: 2,
                  }}
                /><WrapperFormattedMessage id="labelingTool.hotKey.title" /></a>
            </h4>
            <div styleName="controlLabel">
              <div styleName="selectDefectCode">
                <DefectCode />
              </div>
              <div styleName="imageInfo">
                <div
                  styleName="imageInfoLeft"
                  onClick={this.handleLeft}
                  title={`${getKeyNameByKeyCode(hotKeys.previous) ? `${intl.formatMessage({ id: 'labelingTool.controlPanel.previousImage' })}(${getKeyNameByKeyCode(hotKeys.previous)})` : intl.formatMessage({ id: 'labelingTool.controlPanel.previousImage' })}`}
                >
                  <Icon type="left-circle" style={iconStyle} />
                </div>
                <div styleName="imageInfoBox">
                  <ImageZone isUpdate={this.isUpdate} />
                </div>
                <div
                  styleName="imageInfoRight"
                  onClick={this.handleRight}
                  title={`${getKeyNameByKeyCode(hotKeys.next) ? `${intl.formatMessage({ id: 'labelingTool.controlPanel.nextImage' })}(${getKeyNameByKeyCode(hotKeys.next)})` : intl.formatMessage({ id: 'labelingTool.controlPanel.nextImage' })}`}
                >
                  <Icon type="right-circle" style={iconStyle} />
                </div>
              </div>
              <div styleName="buttons">
                <ControlPanel styleType="control-panel-2" />
              </div>
            </div>
          </div>
        </div>)
  }
}

LabelingToolExpand.propTypes = {
  selectedImageInfo: PropTypes.object.isRequired,
  hotKeys: PropTypes.object.isRequired,
  expandView: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}

export default connect(({ labelingTool, intl: { locale } }) => ({
  locale,
  expandView: labelingTool.expandView,
  selectedImageInfo: labelingTool.selectedImageInfo,
  hotKeys: labelingTool.hotKeys,
}))(injectIntl(LabelingToolExpand))
