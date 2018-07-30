import { assign } from 'lodash'

const authReducer = (state = {
  token: '',
  userRole: [],
  failureMessage: '',
  lockScreen: false,
}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'LOGIN_FAILURE':
    case 'LOGOUT_SUCCESS':
    case 'VALIDATE_TOKEN_SUCCESS':
    case 'REFRESH_TOKEN':
    case 'SHOW_LOCK_SCREEN':
      return assign({}, state, { ...action.payload })
    default:
      return state
  }
}

export default authReducer
