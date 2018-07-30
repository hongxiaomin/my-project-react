import { createActions } from 'redux-actions'
import { push, replace } from 'react-router-redux'
import { setStorage } from 'Utils'
import { saveState } from '../helpers'
import { simpleFetch, jwtFetch } from '../helpers/fetchWrapper'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const VALIDATE_TOKEN_SUCCESS = 'VALIDATE_TOKEN_SUCCESS'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const SHOW_LOCK_SCREEN = 'SHOW_LOCK_SCREEN'

const { loginSuccess, loginFailure, logoutSuccess, validateTokenSuccess } = createActions(
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  VALIDATE_TOKEN_SUCCESS,
)

export const APPLOCALE = 'APPLOCALE'
export const changeLanguage = locale => (dispatch) => {
  // 当做常用语言保存到本地
  setStorage('intl', locale)
  // fetch(`http://localhost/${locale}.json`)
  // .then(res => res.json())
  // .then((messages) => {
  //   dispatch({
  //     type: APPLOCALE,
  //     data: {
  //       locale,
  //       antdLocale: locale.replace('-', '_'),
  //       messages,
  //     },
  //   })
  // })

  // 把语言设置发送给后台
  // fetch('/language', {
  //   method: 'POST',
  //   body: {
  //     language: locale,
  //   },
  // })
  //   .then((data) => {
  //     console.log('data', data)
  //   })

  dispatch({
    type: APPLOCALE,
    data: {
      locale,
      antdLocale: locale.replace('-', '_'),
      messages: require(`../locale/${locale}.json`),
    },
  })
}


/**
 * Thunk Action Creator
 * [authenticate description]
 * @param  {String} username
 * @param  {String} password
 * If authenticated successfully, the items below will execute
 *  1. Save the token to localstorage
 *  2. Redirect to /offline page (If lockScreen state was true, do not redirect.)
 *  3. set inactive timer
 *  4. set refresh token timer
 */
export const authenticate = (username, password) => (dispatch, getState) => {
  if (!username || !password) {
    dispatch(loginFailure({
      failureMessage: '帐号或密码不可为空白',
    }))
    return
  }

  const { lockScreen } = getState().auth
  simpleFetch({
    path: '/login',
    method: 'POST',
    body: {
      name: username,
      password,
    },
  })
  .then((json) => {
    if (json.code !== 200000) {
      dispatch(loginFailure({
        failureMessage: '登入失败，请重新尝试',
      }))
      return
    }

    dispatch(loginSuccess({
      token: json.result.token,
      userRole: json.result.rolesId[0],
      failureMessage: '',
      lockScreen: false,
    }))
    saveState('auth')({
      token: json.result.token,
    })

    if (!lockScreen) {
      if (json.result.rolesId[0] === 'admin') {
        dispatch(push('/inline/service'))
      } else dispatch(push('/offline/labeling'))
    }
  })
  .catch((err) => {
    console.log(err)
    dispatch(loginFailure({
      failureMessage: '登入失败，请重新尝试',
    }))
  })
}

/**
 * [deauthenticate description]
 * If deauthenticated successfully, the items below will execute
 *  1. Remove the token from localstorage
 *  2. Redirect to / page
 */
export const deauthenticate = () => dispatch =>
  simpleFetch('logout', {
    method: 'POST',
  })
  .then(() => {
    setStorage('loginInfo', '')
    dispatch(replace('/'))
  })
  .catch((err) => {
    console.log(err)
    dispatch(replace('/'))
  })

export const validateToken = token => dispatch =>
  jwtFetch({
    token,
    path: '/security',
    method: 'POST',
    body: {
      token,
    },
  })
  .then((json) => {
    if (json.code === 200000 && json.result.isValid === true) {
      dispatch(validateTokenSuccess({
        token,
        userRole: json.result.user_role,
      }))
      return {
        tokenIsValid: true,
        userRole: json.result.user_role,
      }
    }
    dispatch(logoutSuccess({
      token: '',
    }))
    return {
      tokenIsValid: false,
    }
  })
  .catch(() => {
    dispatch(logoutSuccess({
      token: '',
    }))
    return {
      tokenIsValid: false,
    }
  })
