import { throttle } from 'lodash'
import { saveState } from 'helpers'

export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const SHOW_LOCK_SCREEN = 'SHOW_LOCK_SCREEN'

const __URL__ = 'http://172.22.35.188:50080/api'

let RefreshTokenTimer = null
let InactiveTimer = null

/**
 * Default inactive time is 25 minute (1500000 millisecond)
 * Default refresh token time is 20 minute (1200000 millisecond)
 */
const inactiveTime = 1500000
const refreshTokenTime = 1200000

export const removeRefreshTokenTimer = () => {
  if (RefreshTokenTimer) {
    clearInterval(RefreshTokenTimer)
  }
}

/**
 * [setInactiveTimer description]
 * If the inactive time of user last longer than inactiveTime, it'll show lock screen.
 */
export const setInactiveTimer = () => (dispatch) => {
  const setTimer = () => {
    InactiveTimer = setTimeout(() => {
      document.onmousemove = () => {}
      removeRefreshTokenTimer()
      dispatch({
        type: SHOW_LOCK_SCREEN,
        payload: {
          token: '',
          lockScreen: true,
        },
      })
    }, inactiveTime)
  }
  const resetTimer = throttle(() => {
    if (InactiveTimer) {
      clearTimeout(InactiveTimer)
    }
    setTimer()
  }, 5000)
  document.onmousemove = resetTimer
}

/**
 * [setRefreshTokenTimer description]
 * It will refresh token every refreshTokenTime
 */
export const setRefreshTokenTimer = token => (dispatch) => {
  RefreshTokenTimer = setInterval(() => {
    fetch(`${__URL__}/security/token`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8;',
        Accept: 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        token,
      }),
    })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 200000) {
        dispatch({
          type: REFRESH_TOKEN,
          payload: {
            token: json.result.token,
          },
        })
        saveState('auth')({
          token: json.result.token,
        })
      } else {
        removeRefreshTokenTimer()
      }
    })
    .catch((err) => {
      console.log(err)
      removeRefreshTokenTimer()
    })
  }, refreshTokenTime)
}
