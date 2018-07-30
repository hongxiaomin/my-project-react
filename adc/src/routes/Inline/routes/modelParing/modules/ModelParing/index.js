import { assign, filter, isEmpty } from 'lodash'
import { showMessage, stringToFirstUpperCase } from 'Utils'
import { simpleFetch } from 'helpers/fetchWrapper'


// ------------------------------------
// Constants
// ------------------------------------
export const PRODUCT_PROCESS_DEFECTCODE = 'PRODUCT_PROCESS_DEFECTCODE'
export const CHECK_ERROR = 'CHECK_ERROR'
export const GET_MODEL_SETTING_LIST = 'GET_MODEL_SETTING_LIST'
export const GET_MODEL_OPTION = 'GET_MODEL_OPTION'
export const MODEL_LIST = 'MODEL_LIST'
export const GET_MODEL_DEFECT = 'GET_MODEL_DEFECT'
export const SELECT_DATA = 'SELECT_DATA'
export const GET_EDIT_MODEL_OPTION = 'GET_EDIT_MODEL_OPTION'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const DELETE_MODEL = 'DELETE_MODEL'
export const MODEL_STATUS = 'MODEL_STATUS'
// ------------------------------------
// Async actions
// ------------------------------------
export const getSelectInfo = () => (dispatch) => {
  // 请求获取product, process, defectcode 信息
  simpleFetch('labeling/image/search')
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ text: stringToFirstUpperCase(data.message), type: 'error' })
        return
      }
      const result = data.result
      dispatch({
        type: PRODUCT_PROCESS_DEFECTCODE,
        data: result,
      })
    })
}
export const getModelList = () => (dispatch) => {
    // 请求获取model
  simpleFetch('models')
  .then((data) => {
    if (data.code === 200000) {
      dispatch({
        type: MODEL_LIST,
        payload: data.result,
      })
    }
  })
}
export const getModelDefect = (id) => (dispatch) => {
    // simpleFetch('/api/defectCode')
  simpleFetch(`model/defect?modelId=${id}`)
  // .then(response => response.json())
  .then((data) => {
    if (data.code === 200000) {
      dispatch({
        type: GET_MODEL_DEFECT,
        data: data.result,

      })
    }
  })
  .catch(err => console.log(err))
}
export const getModelSettingList = data => (dispatch) => {
  // search接口，任选一个条件
  let processId = data.processId
  let productId = data.productId
  let modelId = data.modelId
  if (isEmpty(data.processId)) {
    processId = ''
  }
  if (isEmpty(data.productId)) {
    productId = ''
  }
  if (isEmpty(data.modelId)) {
    modelId = ''
  }
  simpleFetch(`judging/configuration?queryType=${data.queryType}&` +
    `processId=${processId}&productId=${productId}&modelId=${modelId}`)
  .then((json) => {
    if (json.code === 200000) {
      dispatch({
        type: GET_MODEL_SETTING_LIST,
        payload: JSON.parse(json.result),
      })
    } else {
      // dispatch({
      //   type: GET_MODEL_SETTING_LIST,
      //   payload: json.result.data,
      // })
    }
  })
}
export const addProcessProduct = state => (dispatch) => {
  // search接口，任选一个条件
  simpleFetch('judging/configuration', {
    method: 'POST',
    body: state,
  })
  .then((json) => {
    if (json.code === 200000) {
      dispatch(getModelSettingList({ queryType: 'list' }))
      showMessage({ text: json.message, type: 'success' })
    } else {
      showMessage({ text: json.message, type: 'error' })
    }
  })
}
export const updateProcessProduct = (state, cb) => () => {
  simpleFetch('judging/configuration', {
    method: 'PUT',
    body: state,
  })
  .then((json) => {
    if (json.code === 200000) {
      showMessage({ text: json.message, type: 'success' })
      if (cb) cb()
    } else {
      showMessage({ text: json.message, type: 'error' })
    }
  })
}
// export const getSelectData = () => (dispatch, getState) =>
//     // simpleFetch(`${__URL__}/ojs/services`, {
//     simpleFetch('/api/ojs/selectData', {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: getState().auth.token,
//       },
//     })
//     .then((json) => {
//       if (json.code === 200000) {
//         dispatch({
//           type: SELECT_DATA,
//           payload: json.result.data,
//         })
//       } else {
//         dispatch({
//           type: SELECT_DATA,
//           payload: json.result.data,
//         })
//       }
//     })
export const getModelOption = (processId, productId) => (dispatch) => {
  // 根据process和product校验model
  simpleFetch(`judging/configuration/check?processId=${processId}&productId=${productId}`)
  .then((json) => {
    if (json.code === 200000) {
      dispatch({
        type: GET_MODEL_OPTION,
        payload: JSON.parse(json.result),
      })
      dispatch({
        type: CHANGE_STATUS,
        payload: true,
      })
    } else {
      dispatch({
        type: CHECK_ERROR,
        payload: json.message,
      })
    }
  })
}
export const deleteModel = id => dispatch =>
        // simpleFetch(`${__URL__}/ojs/services`, {
  simpleFetch('judging/configuration', {
    method: 'DELETE',
    body: { configId: id.toString() },
  })
  .then((json) => {
    if (json.code === 200000) {
      dispatch({
        type: DELETE_MODEL,
        payload: { configId: id },
      })
      showMessage({ text: json.message, type: 'success' })
    } else {
      showMessage({ text: json.message, type: 'error' })
    }
  })

const ACTION_HANDLERS = {
  [PRODUCT_PROCESS_DEFECTCODE]: (state, action) => {
    return Object.assign(
      {},
      state,
      {
        // defectCodeList: action.data.defect,
        productList: action.data.product,
        processList: action.data.process,
      },
    )
  },
  [GET_MODEL_SETTING_LIST]: (state, action) => assign({}, state, {
    modelSettingList: action.payload,
  }),
  [MODEL_LIST]: (state, action) => assign({}, state, {
    modelList: action.payload,
  }),
  [CHECK_ERROR]: (state, action) => assign({}, state, {
    checkError: action.payload,
  }),
  [GET_MODEL_OPTION]: (state, action) => {
    return assign({}, state, {
      modelOption: action.payload,
    })
  },
  [SELECT_DATA]: (state, action) => assign({}, state, {
    selectData: action.payload,
  }),
  [GET_EDIT_MODEL_OPTION]: (state, action) => assign({}, state, {
    editModelOption: action.payload,
  }),
  [DELETE_MODEL]: (state, action) => {
    const { configId } = action.payload
    return assign({}, state, {
      modelSettingList: filter(state.modelSettingList, el => el.configId * 1 !== configId * 1),
    })
  },
  [CHANGE_STATUS]: (state, action) => assign({}, state, {
    status: action.payload,
  }),
  [MODEL_STATUS]: (state, action) => assign({}, state, {
    modelstatus: action.payload,
  }),
  [GET_MODEL_DEFECT]: (state, action) => {
    return assign({}, state, {
      modelDefect: action.data
    })
  },
}


const initialState = {
  modelSettingList: [],
  modelOption: [],
  checkError: '',
  editModelOption: [],
  status: false,
  selectData: [],
  modelstatus: '',
  productList: [],
  processList: [],
  modelList: [],
}

export const modelParingReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
