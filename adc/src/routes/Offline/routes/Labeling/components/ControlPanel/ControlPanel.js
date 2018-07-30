/* eslint jsx-a11y/no-static-element-interactions:0 */

import React from 'react'
import propTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { Button, Icon, Select } from 'antd'
import { connect } from 'react-redux'
import { getKeyNameByKeyCode, showMessage } from 'Utils'
import { updateControlPanel,
  saveLabel,
  initKeyCode,
  updateCurrentId,
  UPDATE_SELECTED_IMAGE_INFO } from '../../modules'
import './ControlPanel.scss'

const Option = Select.Option

export class ControlPanel extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.bindHotKeys()
    this.props.dispatch(initKeyCode())
  }

  componentDidUpdate() {
    this.unbindHotKeys()
    this.bindHotKeys()
  }

  componentWillUnmount() {
    this.unbindHotKeys()
  }

  hotKeys = (e) => {
    // 如果resetHotKeys为true说明正在设置快捷键
    if (this.props.resetHotKeys || (this.props.expandView && this.props.styleType === 'control-panel')) return
    // 快捷键和方法的映射
    const keyToFunc = {
      add: 'addLabel',
      next: 'next',
      previous: 'prev',
      zoomIn: 'zoomIn',
      save: 'save',
      zoomOut: 'zoomOut',
      delete: 'clear',
      restore: 'zoomReset',
    }
    const keyCodes = Object.values(this.props.hotKeys)
    const keyNames = Object.keys(this.props.hotKeys)
    if (!keyCodes.includes(e.keyCode)) return
    this[keyToFunc[keyNames[keyCodes.indexOf(e.keyCode)]]]()
  }

  bindHotKeys = () => {
    window.addEventListener('keydown', this.hotKeys)
  }

  unbindHotKeys = () => {
    window.removeEventListener('keydown', this.hotKeys)
  }

  addLabel = () => {
    // 单纯检查， 所有的label是否都已经有defectCode
    const { selectedImageInfo, dispatch } = this.props

    if (!selectedImageInfo.defectInfo.every(item => item.defectCode)) {
      showMessage({ text: 'Please select defect code', type: 'warning' })
      return
    }

    dispatch({
      type: UPDATE_SELECTED_IMAGE_INFO,
      data: {
        ...selectedImageInfo,
        defectCurrentId: '',
      },
    })
  }

  zoomIn = () => {
    this.props.dispatch(updateControlPanel({
      zoom: this.props.controlPanel.zoom + 1,
    }))
  }

  zoomOut = () => {
    this.props.dispatch(updateControlPanel({
      zoom: ((this.props.controlPanel.zoom > 1) ? (this.props.controlPanel.zoom - 1) : 1),
    }))
  }

  clear = () => {
    // 删除当前选中的，labeling
    const { selectedImageInfo, dispatch,
      selectedImageInfo: { defectCurrentId, defectInfo } } = this.props
    if (!defectCurrentId) return

    dispatch({
      type: UPDATE_SELECTED_IMAGE_INFO,
      data: {
        ...selectedImageInfo,
        defectCurrentId: '',
        defectInfo: defectInfo.filter(item => item.id !== defectCurrentId),
      },
    })
  }

  next = () => {
    if (!this.props.selectedImageInfo.path) return
    this.props.dispatch(updateCurrentId('next'))
  }

  prev = () => {
    if (!this.props.selectedImageInfo.path) return
    this.props.dispatch(updateCurrentId('prev'))
  }

  save = () => {
    if (!this.props.selectedImageInfo.path) return
    this.props.dispatch(saveLabel())
  }

  selectChange = (v) => {
    this.props.dispatch(updateControlPanel({
      zoom: parseInt(v, 10),
    }))
  }

  render() {
    const { hotKeys, intl } = this.props
    const zoomSelect = [1, 2, 3, 4]
    const zoom = this.props.controlPanel.zoom

    return (<div styleName={this.props.styleType}>
      <div styleName="div">
        <span styleName="control-panel-button add" onClick={this.addLabel}>
          <Icon
            type="plus-square"
            style={{
              position: 'relative',
              top: 1,
            }}
          />
          <i> {intl.formatMessage({ id: 'labelingTool.hotKey.addLabel' })}{getKeyNameByKeyCode(hotKeys.add) ? `(${getKeyNameByKeyCode(hotKeys.add)})` : ''}</i>
        </span>
      </div>
      <div styleName="div">
        <span
          styleName="control-panel-button delete"
          onClick={this.clear}
        >
          <Icon
            type="delete"
            style={{
              position: 'relative',
              top: 1,
            }}
          />
          <i> {intl.formatMessage({ id: 'labelingTool.hotKey.deleteLabel' })}{getKeyNameByKeyCode(hotKeys.delete) ? `(${getKeyNameByKeyCode(hotKeys.delete)})` : ''}</i>
        </span>
      </div>
      <div styleName="div cut">
        <span
          styleName="control-panel-button"
          onClick={this.zoomIn}
          title={`${intl.formatMessage({ id: 'labelingTool.controlPanel.zoomIn' })}${getKeyNameByKeyCode(hotKeys.zoomIn) ? `(${getKeyNameByKeyCode(hotKeys.zoomIn)})` : ''}`}
        >
          <Icon
            type="zoomin"
            style={{
              padding: 5,
            }}
          />
          <em><WrapperFormattedMessage id="labelingTool.controlPanel.zoomIn" /></em>
        </span>
        <span
          styleName="control-panel-button"
          onClick={this.zoomOut}
          disabled={this.props.controlPanel.zoom === 1}
          title={`${intl.formatMessage({ id: 'labelingTool.controlPanel.zoomOut' })}${getKeyNameByKeyCode(hotKeys.zoomOut) ? `(${getKeyNameByKeyCode(hotKeys.zoomOut)})` : ''}`}
        >
          <Icon
            type="zoomout"
            style={{
              padding: 5,
            }}
          />
          <em><WrapperFormattedMessage id='labelingTool.controlPanel.zoomOut' /></em>
        </span>
      </div>
      <div styleName="div cut">
        <span styleName="control-panel-button">
          <Select defaultValue="1" onChange={this.selectChange} value={zoomSelect.includes(zoom) ? zoom.toString() : `${zoom * 100}%`} style={{ width: 80 }}>
            {zoomSelect.map(n => <Option key={n} title={`${n * 100}%`} value={n.toString()}>{n * 100}%</Option>)}
          </Select>
        </span>
      </div>
      <div styleName="div cut">
        <span
          styleName="control-panel-button"
          onClick={this.prev}
          title={`${getKeyNameByKeyCode(hotKeys.previous) ? `${intl.formatMessage({ id: 'labelingTool.controlPanel.previousImage' })}(${getKeyNameByKeyCode(hotKeys.previous)})` : ''}`}
        >
          <Icon
            type="left"
            style={{
              padding: 5,
            }}
          />
        </span>
        <span
          styleName="control-panel-button"
          onClick={this.next}
          title={`${getKeyNameByKeyCode(hotKeys.next) ? `${intl.formatMessage({ id: 'labelingTool.controlPanel.nextImage' })}(${getKeyNameByKeyCode(hotKeys.next)})` : ''}`}
        >
          <Icon
            type="right"
            style={{
              padding: 5,
            }}
          />
        </span>
      </div>
      <div styleName="div">
        <span>
          <Button
            type="primary"
            onClick={this.save}
          ><WrapperFormattedMessage id="Save" />{getKeyNameByKeyCode(hotKeys.save) ? `(${getKeyNameByKeyCode(hotKeys.save)})` : ''}</Button>
        </span>
      </div>
    </div>)
  }
}

ControlPanel.propTypes = {
  hotKeys: propTypes.object.isRequired,
  resetHotKeys: propTypes.bool.isRequired,
  controlPanel: propTypes.object.isRequired,
  selectedImageInfo: propTypes.object.isRequired,
  dispatch: propTypes.func.isRequired,
  expandView: propTypes.bool.isRequired,
  styleType: propTypes.string,
  intl: propTypes.object.isRequired,
}

ControlPanel.defaultProps = {
  styleType: 'control-panel',
}

export default connect(({ labelingTool, intl: { locale } }) => ({
  locale,
  controlPanel: labelingTool.controlPanel,
  selectedImageInfo: labelingTool.selectedImageInfo,
  hotKeys: labelingTool.hotKeys,
  resetHotKeys: labelingTool.resetHotKeys,
  expandView: labelingTool.expandView,
}))(injectIntl(ControlPanel))
