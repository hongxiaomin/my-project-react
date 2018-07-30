/* eslint no-param-reassign: 0, guard-for-in:0, no-restricted-syntax: 0, no-unused-expressions: 0 */
import { assign, concat, filter, map } from 'lodash'
import { showMessage, stringToFirstUpperCase, getQueueStatus } from 'Utils'
import { simpleFetch } from 'helpers/fetchWrapper'
import OurToaster from '../../../../components/OurToaster'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SERVICE_LIST_SUCCESS = 'GET_SERVICE_LIST_SUCCESS'
export const GET_QUEUQ_LIST = 'GET_QUEUQ_LIST'
export const ADD_SERVICE_SUCCESS = 'ADD_SERVICE_SUCCESS'
export const DEL_SERVICE_SUCCESS = 'DEL_SERVICE_SUCCESS'
export const GET_MODEL_LIST_SUCCESS = 'GET_MODEL_LIST_SUCCESS'
export const SERVICEDETAIL = 'SERVICEDETAIL'
export const SUCCESSFULLY_UPDATE_SERVICE_STATUS = 'SUCCESSFULLY_UPDATE_SERVICE_STATUS'
export const GET_SERVICE_INFO = 'GET_SERVICE_INFO'
export const BUTTON_LOADING_ADD = 'BUTTON_LOADING_ADD' // 按钮loading效果
export const BUTTON_LOADING_REMOVE = 'BUTTON_LOADING_REMOVE' // 去掉loading效果
export const UPDATE_QUEUE_MODE = 'UPDATE_QUEUE_MODE'
export const QUEUQ_FILTER_PARAMS = 'QUEUQ_FILTER_PARAMS'
// ------------------------------------
// Async actions
// ------------------------------------

// 队列action按钮接口
export const queueAction = (obj) => (dispatch) => {
  dispatch({
    type: BUTTON_LOADING_ADD,
    data: {
      key: 'queue',
      data: `${obj.type}_${obj.id}`,
    },
  })

  simpleFetch('judging/job/action', {
    method: 'POST',
    body: obj,
  })
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ text: stringToFirstUpperCase(data.message), type: 'warning' })
        dispatch({
          type: BUTTON_LOADING_REMOVE,
          data: {
            key: 'queue',
            data: `${obj.type}_${obj.id}`,
          },
        })
        return
      }
      showMessage({ text: stringToFirstUpperCase(data.message) })
    })
    .catch(() => {
      dispatch({
        type: BUTTON_LOADING_REMOVE,
        data: {
          key: 'queue',
          data: `${obj.type}_${obj.id}`,
        },
      })
    })
}

// 发送命令给后台, init service 和 edit service
export const sendCommand = (info, cb) => (dispatch, getState) => {
  dispatch({
    type: BUTTON_LOADING_ADD,
    data: {
      key: 'service',
      data: info.serviceId,
    },
  })

  simpleFetch('judging/edit', {
    method: 'POST',
    body: info,
  })
    .then((data) => {
      if (cb) cb()
      if (data.code !== 200000) {
        showMessage({ text: data.message, type: 'warning' })
        dispatch({
          type: BUTTON_LOADING_REMOVE,
          data: {
            key: 'service',
            data: info.serviceId,
          },
        })
        return
      }

      // 更新service和model
      const { service: { serviceList, modelList } } = getState()

      let isChange = false
      const tmp = serviceList.map((item) => {
        const o = Object.assign({}, item)
        if (item.serviceId === info.serviceId) {
          // 修改serviceName时候
          if (info.serviceName) {
            o.serviceName = info.serviceName
            isChange = true
          }
          // 修改model时候
          if (info.modelId && item.modelId !== info.modelId) {
            o.modelId = info.modelId
            modelList.forEach((model) => {
              if (model.id.toString() === info.modelId) {
                o.modelName = model.name
              }
            })
            isChange = true
          }

          // destroy命令 去掉model
          if (info.command === 'destroy') {
            o.modelId = ''
            o.modelName = ''
            isChange = true
          }
        }

        return o
      })

      if (isChange) {
        dispatch({
          type: GET_SERVICE_LIST_SUCCESS,
          payload: tmp,
        })
      }
    })
    .catch(() => {
      dispatch({
        type: BUTTON_LOADING_REMOVE,
        data: {
          key: 'service',
          data: info.serviceId,
        },
      })
    })
}

// 通过后台推送信息， 更新卡片状态
export const updateServiceList = info => (dispatch, getState) => {
  if (!info.viewId) return

  const tmp = info.status.split('_')
  if (tmp.length === 2) {
    info.status = tmp[0]
    info.progress = `${((+tmp[1]) * 100).toFixed(0)}%`
  }

  const serviceList = getState().service.serviceList.concat()
  const serviceListTmp = serviceList.map((item) => {
    if (item.viewId === info.viewId) {
      return info
    }
    return item
  })

  dispatch({
    type: GET_SERVICE_LIST_SUCCESS,
    payload: serviceListTmp,
  })

  // 更新labelong状态
  dispatch({
    type: BUTTON_LOADING_REMOVE,
    data: {
      key: 'service',
      data: info.serviceId,
    },
  })
}

// 获取service列表和队列信息
export const getServiceInfo = cb => (dispatch) => {
  simpleFetch('judging/info')
    .then((data) => {
      if (cb) cb()
      if (data.code !== 200000) {
        showMessage({ text: data.message, type: 'warning' })
        return
      }
      if (!data.result) return
      const result = data.result
      const runningService = result.map((item) => {
        const status = item.status.split('_')
        const tmp = Object.assign({}, item)
        if (status[1]) {
          tmp.progress = `${((+status[1]) * 100).toFixed(0)}%`
          tmp.status = status[0]
        }
        return tmp
      })
      // 这个接口去掉队列
      dispatch({
        type: GET_SERVICE_INFO,
        payload: {
          runningService,
          // serviceQueue: result.serviceQueue,
        },
      })
    })
}

export const getServiceList = () => (dispatch, getState) =>
  // fetch(`${__URL__}/ojs/services`, {
  simpleFetch('api/ojs/services')
  .then(({ code, result, message }) => {
    if (code !== 200000) {
      showMessage({ text: stringToFirstUpperCase(message), type: 'warning' })
      return
    }
    dispatch({
      type: GET_SERVICE_LIST_SUCCESS,
      payload: result.data,
    })
  })

export const getQueueList = query => (dispatch) => {
  let url = 'judging/jobs'
  let saveQueue
  if (query) {
    saveQueue = Object.assign({}, query)
    const params = []
    query.pageNum = query.pageNow + 1
    delete query.pageNow

    for (const key in query) {
      query[key] && params.push(`${key}=${query[key]}`)
    }
    url = `${url}?${params.join('&')}`
  } else {
    url += `?pageNum=1&pageSize=${window.localStorage.getItem('pageSize') || 5}&status=${JSON.stringify(getQueueStatus())}`
  }

  simpleFetch(url)
  .then((json) => {
    if (json.code !== 200000) {
      showMessage({ text: stringToFirstUpperCase(json.message), type: 'warning' })
      return
    }

    let result = {}
    let count

    try {
      const data = JSON.parse(json.result)
      count = data.count
      result = data.result.map((item) => {
        return item
      })
    } catch (e) {
      console.error('Result is not a json!')
      return
    }
    // 把时间格式化成第8区
    dispatch({
      type: GET_QUEUQ_LIST,
      payload: {
        count,
        result,
      },
    })
    dispatch({
      type: QUEUQ_FILTER_PARAMS,
      payload: saveQueue,
    })
  })
}

// 根据推送信息 给队列新增一条信息
export const addJobToQueueList = () => (dispatch, getState) => {
  getQueueList(getState().service.filterParams)(dispatch, getState)
}

export const getModel = () => dispatch =>
simpleFetch('models')
  .then((json) => {
    if (json.code !== 200000) {
      showMessage({ text: json.message, type: 'warning' })
      return
    }

    if (!json.result) return
    dispatch({
      type: GET_MODEL_LIST_SUCCESS,
      payload: json.result,
    })
  })
  .catch((error) => {
    console.error(error)
  })

export const createService = data => (dispatch, getState) =>
  simpleFetch('ojs/service', {
    method: 'POST',
    body: data,
  })
  .then((json) => {
    const { intl: { messages } } = getState
    if (json.code === 200000) {
      dispatch({
        type: ADD_SERVICE_SUCCESS,
        payload: json.result,
      })
      OurToaster.show({ message: messages.addSuccess })
    } else {
      OurToaster.show({ message: messages.addFailure })
    }
  })

/**
 * [deleteService description]
 * @param  {Number} id The service id you hoped to remove.
 */
export const deleteService = id => (dispatch, getState) =>
  simpleFetch('ojs/service', {
    method: 'DELETE',
    body: { id: `${id}` },
  })
  .then((json) => {
    const { intl: { messages } } = getState
    if (json.code === 200000) {
      dispatch({
        type: DEL_SERVICE_SUCCESS,
        payload: { id },
      })
      OurToaster.show({ message: messages.deleteSuccess })
    } else {
      OurToaster.show({ message: messages.deleteFailure })
    }
  })

export const resetService = (postData, queueData) => (dispatch, getState) =>
  simpleFetch('judging/reset', {
    method: 'POST',
    body: postData,
  })
  .then((json) => {
    const { intl: { messages } } = getState
    if (json.code === 200000) {
      dispatch(getServiceInfo())
      dispatch(getQueueList(queueData))
      OurToaster.show({ message: messages.resetSuccess })
    } else {
      OurToaster.show({ message: messages.resetFailure })
    }
  })

export function getServiceDetail(putData, cb) {
  return (dispatch, getState) => {
    simpleFetch('ojs/service', {
      method: 'PUT',
      body: putData,
    })
    .then(response => response.json())
    .then((data) => {
      cb(data)
      dispatch({
        type: SERVICEDETAIL,
        data: putData,
      })
    })
  }
}


// 手动和自动模式切换
export const queueModeSwitch = mode => (dispatch) => {
  simpleFetch('judging/job/autojudge', {
    method: 'POST',
    body: { mode },
  })
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ text: data.message, type: 'warning' })
        return
      }

      // 更新redux
      dispatch({
        type: UPDATE_QUEUE_MODE,
        data: mode,
      })
    })
    .catch((e) => {
      showMessage({ text: e, type: 'warning' })
    })
}

export const getQueueMode = () => (dispatch) => {
  simpleFetch('judging/job/autojudge')
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ text: data.message, type: 'warning' })
        return
      }

      dispatch({
        type: UPDATE_QUEUE_MODE,
        data: data.result,
      })
    })
    .catch((e) => {
      showMessage({ text: e, type: 'warning' })
    })
}

// 通过后台推送信息，队列列表
export const updateQueueStatus = updateInfo => (dispatch, getState) => {
  const { service: { queueList, queueListLength, loading: { queue } } } = getState()
  const queueListTmp = []
  let flag = false
  let running = false

  queueList.forEach((item) => {
    if (item.messageId === updateInfo.messageId) {
      flag = true
      if (updateInfo.messageStatus === 'running') {
        running = true
        return
      }
      queueListTmp.push({ ...updateInfo })
    } else {
      queueListTmp.push({ ...item })
    }
  })

  if (running) {
    queueListTmp.unshift(updateInfo)
  }

  // 当推送的数据没有在第一页
  if (!flag) {
    // 当推送的数据没有在第一页且状态为running的时候
    if (updateInfo.messageStatus === 'running') {
      dispatch(getQueueList())
    }
    return
  }

  dispatch({
    type: GET_QUEUQ_LIST,
    payload: {
      count: queueListLength,
      result: queueListTmp,
    },
  })

  if (queue.includes(`message_${updateInfo.messageId}`)) {
    dispatch({
      type: BUTTON_LOADING_REMOVE,
      data: {
        key: 'queue',
        data: `message_${updateInfo.messageId}`,
      },
    })
  }

  updateInfo.glassList.forEach((item) => {
    if (queue.includes(`glass_${item.glassId}`)) {
      dispatch({
        type: BUTTON_LOADING_REMOVE,
        data: {
          key: 'queue',
          data: `glass_${item.glassId}`,
        },
      })
    }
  })
}

const ACTION_HANDLERS = {
  [GET_SERVICE_LIST_SUCCESS]: (state, action) => assign({}, state, {
    serviceList: action.payload,
  }),
  [GET_QUEUQ_LIST]: (state, action) => assign({}, state, { queueList: action.payload.result, queueListLength: action.payload.count }),
  [ADD_SERVICE_SUCCESS]: (state, action) => assign({}, state, {
    serviceList: concat([], state.serviceList, action.payload),
  }),
  [DEL_SERVICE_SUCCESS]: (state, action) => assign({}, state, {
    serviceList: filter(state.serviceList, element => (element.id !== action.payload.id)),
  }),
  [GET_MODEL_LIST_SUCCESS]: (state, action) => assign({}, state, {
    modelList: action.payload,
  }),
  [SERVICEDETAIL]: (state, action) => assign({}, state, {
    serviceDetail: action.data,
  }),
  [SUCCESSFULLY_UPDATE_SERVICE_STATUS]: (state, action) => {
    let { serviceList } = state
    const { status, kernelId } = action.payload
    serviceList = map(serviceList, (el) => {
      if (el.kernelId === kernelId * 1) {
        return { ...el, status }
      }
      return el
    })
    return assign({}, state, { serviceList })
  },
  [GET_SERVICE_INFO]: (state, action) => Object.assign({}, state, {
    serviceList: action.payload.runningService,
    // queueList: action.payload.serviceQueue,
  }),
  [BUTTON_LOADING_ADD]: (state, action) => {
    const { key, data } = action.data
    return Object.assign({}, state, {
      loading: {
        ...state.loading,
        [key]: [
          ...state.loading[key],
          data,
        ],
      },
    })
  },
  [BUTTON_LOADING_REMOVE]: (state, action) => {
    const { key, data } = action.data
    const arr = state.loading[key].concat()
    const index = arr.indexOf(data)
    if (index < 0) return state

    arr.splice(index, 1)
    return Object.assign({}, state, {
      loading: {
        ...state.loading,
        [key]: arr,
      },
    })
  },
  [UPDATE_QUEUE_MODE]: (state, action) => Object.assign({}, state, {
    queueModel: action.data,
  }),
  [QUEUQ_FILTER_PARAMS]: (state, action) => Object.assign({}, state, {
    filterParams: action.payload,
  }),
}

const initialState = {
  queueModel: 'manualMode',
  serviceList: [],
  modelList: [],
  queueList: [],
  queueListLength: 20,
  loading: {
    service: [],
    queue: [],
  },
  filterParams: {},
}

export const serviceReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
