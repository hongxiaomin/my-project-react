/* eslint import/no-named-as-default: 0, jsx-a11y/no-static-element-interactions: 0 */
import React from 'react'
import propTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import HotKeysForm from './HotKeysForm'
import { updateResetKeyCodeStatus, UPDATE_SOMETHING } from '../../modules'
import './HotKeys.scss'

export class HotKeys extends React.Component {
  constructor() {
    super()

    this.state = {
      visible: false,
    }
  }

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    })
    if (!this.state.visible) {
      this.props.dispatch(updateResetKeyCodeStatus(true))
    }
  }

  showExpandView = () => {
    this.props.dispatch({
      type: UPDATE_SOMETHING,
      data: {
        expandView: true,
      },
    })
  }

  handleCancel = (resetHotKeys) => {
    this.setState({
      visible: false,
    })
    if (resetHotKeys) {
      this.props.dispatch(updateResetKeyCodeStatus(false))
    }
  }

  render() {
    const IconStyle = {
      fontSize: 20,
      marginRight: 5,
      position: 'relative',
      top: 2,
    }
    return (<div styleName="hot-keys">
      <h3>
        <a onClick={this.toggle}><Icon
          type="keyboard_icon"
          style={IconStyle}
        /><WrapperFormattedMessage id="labelingTool.hotKey.title" /></a>
        <a onClick={this.showExpandView}><Icon type="scan" style={IconStyle} /><WrapperFormattedMessage id="labelingTool.hotKey.expandView" /></a>
        <sapn><WrapperFormattedMessage id="labelingTool.hotKey.imageLabeling" /></sapn>
      </h3>
      <HotKeysForm visible={this.state.visible} handleCancel={this.handleCancel} />
    </div>)
  }
}

HotKeys.propTypes = {
  dispatch: propTypes.func.isRequired,
  intl: propTypes.object.isRequired,
}

export default connect(({ intl }) => ({ intl, }))(HotKeys)
