import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setGlobalUrl } from 'helpers'
import { Dialog } from '@blueprintjs/core'
import LoginForm from 'containers/LoginForm'

export class PageLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    lockScreen: PropTypes.bool.isRequired,
  }

  constructor() {
    super()
    this.state = {
      url: '172.22.34.220',
    }
  }

  componentDidMount() {
    setGlobalUrl(this.state.url)
  }

  render() {
    return (
      <div>
        {
          (this.props.lockScreen) ? (
            <Dialog
              isOpen
              style={{
                width: '540px',
              }}
            >
              <LoginForm />
            </Dialog>
          ) : null
        }
        {this.props.children}
      </div>
    )
  }
}

export default connect(state => ({
  lockScreen: state.auth.lockScreen,
}))(PageLayout)
