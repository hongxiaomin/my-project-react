import React, { Component } from 'react'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { assign } from 'lodash'
import { Button } from 'antd'
import { loadState, saveState } from 'helpers'
import { simpleFetch } from 'helpers/fetchWrapper'
import { setStorage } from 'Utils'
import { authenticate } from 'actions'
import { push } from 'react-router-redux'
import './LoginForm.scss'

const propTypes = {
  goIndex: PropTypes.func.isRequired,
}

export class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.onBtnClick = this.onBtnClick.bind(this)
    // this.togglePasswordKeeping = this.togglePasswordKeeping.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.state = {
      rememberMe: true,
      username: '',
      password: '',
      authFailureMessage: '',
      loading: false,
    }
  }

  componentWillMount() {
    const clientState = loadState('client')
    if (clientState) {
      this.setState(assign({}, this.state, {
        username: clientState.username,
      }))
    }

    // 绑定回车键
    window.addEventListener('keypress', this.onKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.onKeyDown)
  }

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.onBtnClick()
    }
  }

  onBtnClick() {
    if (!this.state.username || !this.state.password) {
      this.setState({
        authFailureMessage: 'Please enter user name and password.',
      })
      return
    }
    this.setState({
      loading: true,
    })
    simpleFetch('login', {
      method: 'POST',
      body: {
        userId: this.state.username,
        password: this.state.password,
      },
    })
      .then((data) => {
        if (data.code !== 200000) {
          this.setState({
            loading: false,
            authFailureMessage: data.message,
          })
          return
        }
        // 保存信息到sessionstorage
        setStorage('loginInfo', JSON.stringify(data.result))
        // 从result中取出内容
        setStorage('intl', 'zh-CN')
        this.props.goIndex()
      })
  }

  // togglePasswordKeeping() {
  //   this.setState(assign({}, this.state, { rememberMe: !this.state.rememberMe }))
  // }

  handleUsernameChange(e) {
    this.setState(assign({}, this.state, { username: e.target.value }))
  }

  handlePasswordChange(e) {
    this.setState(assign({}, this.state, { password: e.target.value }))
  }

  clearErrorMessage = () => {
    if (this.state.authFailureMessage) {
      this.setState({
        authFailureMessage: '',
      })
    }
  }

  render() {
    const { intl } = this.props

    return (
      <form styleName='form'>
        <span styleName='submessage'><WrapperFormattedMessage id='signIn' /></span>
        <p style={{
          color: 'red',
          textAlign: 'center',
          height: '40px',
        }}
        >{this.state.authFailureMessage}</p>
        <input
          styleName='form-input'
          type='text'
          placeholder={intl.formatMessage({ id: 'userAndLicenseManagement.license.userID' })}
          value={this.state.username}
          onChange={this.handleUsernameChange}
          onFocus={this.clearErrorMessage}
        />
        <br />
        <input
          styleName='form-input'
          type='password'
          placeholder={intl.formatMessage({ id: 'password' })}
          value={this.state.password}
          onChange={this.handlePasswordChange}
          onFocus={this.clearErrorMessage}
        />
        <br />
        {/* <Checkbox
          checked={this.state.rememberMe}
          onChange={this.togglePasswordKeeping}
        >
          记住我
        </Checkbox> */}
        <Button
          type="primary"
          onClick={this.onBtnClick}
          loading={this.state.loading}
        >
          <WrapperFormattedMessage id='signIn' />
        </Button>
      </form>
    )
  }
}

LoginForm.propTypes = propTypes

const mapStateToProps = state => ({
  token: state.auth.token,
  authFailureMessage: state.auth.failureMessage,
})

const mapDispatchToProps = dispatch => ({
  authenticate: (username, password, rememberMe) => {
    // 如果使用者選擇 rememberMe ， 就把目前的 username 存到 localStorage
    if (rememberMe) {
      saveState('client')({
        username,
      })
    } else {
      saveState('client')({
        username: '',
      })
    }
    dispatch(authenticate(username, password))
  },
  goIndex: () => {
    if (JSON.parse(sessionStorage.getItem('loginInfo')).roleIds[0] === 'admin') {
      return dispatch(push('/inline/service'))
    }
    return dispatch(push('/offline/labeling'))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginForm))
