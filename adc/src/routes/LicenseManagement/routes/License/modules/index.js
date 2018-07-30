/* eslint no-unused-expressions: 0 */
import { assign } from 'lodash'
import { showMessage } from 'Utils'
import { simpleFetch } from 'helpers/fetchWrapper'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_LICENSE_LIST = 'GET_LICENSE_LIST'
export const GET_USER_EMAIL = 'GET_USER_EMAIL'
export const GET_USER_LIST = 'GET_USER_LIST'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const UPDATE_LICENSE_DEVICEGPUS = 'UPDATE_LICENSE_DEVICEGPUS'
// ------------------------------------
// Async actions
// ------------------------------------


export const getLicenseList = () => dispatch =>
  // fetch('/api/ojs/licenseList', {
  simpleFetch('devices')
  .then((res) => {
    if (res.code === 200000) {
      dispatch({
        type: GET_LICENSE_LIST,
        payload: JSON.parse(res.result),
      })
    }
  })

/**
 * @param {id, trainingOrJudging} obj
 */
export const trainingOrJudging = obj => (dispatch, getState) => {
  return simpleFetch('device/op_mode', {
    method: 'PUT',
    body: obj,
  })
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ type: 'warning', text: data.message })
        const { licenseManagement: { licenseList } } = getState()
        const list = licenseList.map((item) => {
          if (item.id === obj.id * 1) {
            return Object.assign({}, item, { isTrainingDevice: !obj.isTrainingDevice })
          }
          return item
        })
        dispatch({
          type: GET_LICENSE_LIST,
          payload: list,
        })
      } else {
        showMessage({ type: 'success', text: data.message })

        // 根据返回值更新列表
        const { licenseManagement: { licenseList } } = getState()
        const list = licenseList.map((item) => {
          if (item.id === obj.id * 1) {
            return Object.assign({}, item, { isTrainingDevice: obj.isTrainingDevice })
          }
          return item
        })
        dispatch({
          type: GET_LICENSE_LIST,
          payload: list,
        })
      }
    })
}

/**
 * @param {*} obj id, deviceName
 * @param {*} cb Func
 */
export const save = (obj, cb) => (dispatch, getState) => {
  return simpleFetch('device/name', {
    method: 'PUT',
    body: obj,
  })
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ type: 'warning', text: data.message })
        return
      }
      if (data.code === 200000) {
        showMessage({ type: 'success', text: data.message })
      }
      if (cb) cb()
      // 根据返回值更新列表
      const { licenseManagement: { licenseList } } = getState()
      const list = licenseList.map((item) => {
        if (item.id === obj.id * 1) {
          return Object.assign({}, item, { name: obj.name })
        }
        return item
      })
      dispatch({
        type: GET_LICENSE_LIST,
        payload: list,
      })
    })
}

/**
 * 激活
 * @param {*} obj id, license
 */
export const activate = obj => (dispatch, getState) => {
  return simpleFetch('license/activate', {
    method: 'PUT',
    body: obj,
  })
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ type: 'warning', text: data.message })
        return
      }
      if (data.code === 200000) {
        showMessage({ type: 'success', text: data.message })
        const { licenseManagement: { licenseList } } = getState()
        const list = licenseList.map((item) => {
          if (item.id === obj.id * 1) {
            return Object.assign({}, item, { isActivate: true })
          }
          return item
        })
        dispatch({
          type: GET_LICENSE_LIST,
          payload: list,
        })
      }
    })
}

// get license
export const getLicense = obj => (dispatch, getState) => {
  return simpleFetch('license/serial_number', {
    method: 'POST',
    body: obj,
  })
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ type: 'warning', text: data.message })
        return
      }
      if (data.code === 200000) {
        showMessage({ type: 'success', text: data.message })

        const { licenseManagement: { licenseList } } = getState()
        const list = licenseList.map((item) => {
          if (item.id === obj.id * 1) {
            return Object.assign({}, item, { license: data.result })
          }
          return item
        })
        dispatch({
          type: GET_LICENSE_LIST,
          payload: list,
        })
      }
    })
}

export const getUserList = () => (dispatch) => {
  return simpleFetch('users')
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ type: 'warning', text: data.message })
        return
      }
      dispatch({
        type: GET_USER_LIST,
        data: data.result,
      })
    })
}

export const createUser = (postData, success, error) => (dispatch, getState) => {
  const { intl: { messages } } = getState()
  return simpleFetch('user', {
    method: 'POST',
    body: postData,
  })
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ type: 'error', text: data.message })
        error && error()
        return
      }
      showMessage({ text: messages.createSuccess })
      success && success()
      dispatch(getUserList())
    })
    .catch(() => {
      error && error()
    })
}

export const updateUser = (postData, success, error) => (dispatch, getState) => {
  const { intl: { messages } } = getState()
  return simpleFetch('user', {
    method: 'PUT',
    body: postData,
  })
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ type: 'error', text: data.message })
        error && error()
        return
      }
      success && success()
      showMessage({ text: messages.updateSuccess })
      dispatch(getUserList())
    })
}

export const deleteUser = userId => (dispatch, getState) => {
  const { intl: { messages } } = getState()
  return simpleFetch('user', {
    method: 'DELETE',
    body: { userId },
  })
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ type: 'error', text: data.message })
        return
      }

      const { licenseManagement: { userList } } = getState()
      const userListTmp = userList.filter(item => item.userId !== userId)
      showMessage({ text: messages.deleteSuccess })
      dispatch({
        type: GET_USER_LIST,
        data: userListTmp,
      })
    })
}

export const reload = () => dispatch =>
    // fetch('/api/ojs/licenseList', {
    simpleFetch('devices')
    .then((res) => {
      if (res.code === 200000) {
        dispatch({
          type: GET_LICENSE_LIST,
          payload: JSON.parse(res.result),
        })
        showMessage({ type: 'success', text: res.message })
      }
    })

export const getEmail = () => (dispatch) => {
  return simpleFetch('api/ojs/userEmail')
  .then((json) => {
    if (json.code === 200000) {
      dispatch({
        type: GET_USER_EMAIL,
        payload: json.result,
      })
      dispatch({
        type: CHANGE_STATUS,
        payload: true,
      })
    } else {
      dispatch({
        type: GET_USER_EMAIL,
        payload: json.result.data,
      })
    }
  })
}

const ACTION_HANDLERS = {
  [GET_LICENSE_LIST]: (state, action) => assign({}, state, {
    licenseList: action.payload,
  }),
  [GET_USER_EMAIL]: (state, action) => assign({}, state, {
    userEmail: action.payload,
  }),
  [CHANGE_STATUS]: (state, action) => assign({}, state, {
    status: action.payload,
  }),
  [GET_USER_LIST]: (state, action) => assign({}, state, {
    userList: action.data,
  }),
}


const initialState = {
  licenseList: [],
  userList: [],
  userEmail: '',
  status: false,
}

const licenseReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default licenseReducer
