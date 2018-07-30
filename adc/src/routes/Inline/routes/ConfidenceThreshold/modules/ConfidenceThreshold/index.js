import { showMessage } from 'Utils'
import { assign, map, isEmpty } from 'lodash'
import { simpleFetch } from 'helpers/fetchWrapper'

// ------------------------------------
// Constants
// ------------------------------------
export const PRODUCT_PROCESS_DEFECTCODE = 'PRODUCT_PROCESS_DEFECTCODE'
export const MODEL_LIST = 'MODEL_LIST'
export const GET_CONFIDENCE_LIST = 'GET_CONFIDENCE_LIST'
export const SELECT_DATA = 'SELECT_DATA'
export const GET_MODEL_TEST_RESULT_TYPE = 'GET_MODEL_TEST_RESULT_TYPE'
export const UPDATE_MODEL_TEST_RESULT_TYPE = 'UPDATE_MODEL_TEST_RESULT_TYPE'
export const UPDATE_ALL_MODEL_TEST_RESULT_TYPE = 'UPDATE_ALL_MODEL_TEST_RESULT_TYPE'


// ------------------------------------
// Async actions
// ------------------------------------
export const getSelectInfo = () => (dispatch) => {
  // 请求获取product, process, defectcode 信息
  simpleFetch('labeling/image/search')
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ text: data.message, type: 'error' })
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
export const getConfidenceList = data => (dispatch) => {
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
        type: GET_CONFIDENCE_LIST,
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
// export const getSelectData = () => (dispatch) =>
//     // simpleFetch(`${__URL__}/ojs/services`, {
//     simpleFetch(`judging/configuration/detail?configId=${id}`, {
//       headers: {
//         Accept: 'application/json',
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
export function getTestResultType(id) {
  return (dispatch) => {
    // simpleFetch(`${__QCA__}/aiModel/defectCode?id=${id}`, {
    simpleFetch(`judging/configuration/detail?configId=${id}`)
    .then((data) => {
      if (data.code === 200000) {
        dispatch({
          type: GET_MODEL_TEST_RESULT_TYPE,
          data: JSON.parse(data.result).defectType,
        })
      } else {
        // dispatch({
        //   type: GET_MODEL_TEST_RESULT_TYPE,
        //   data: data.result.data,
        // })
      }
    })
    .catch(err => console.log(err))
  }
}
export const updateMessage = data => (dispatch) => {
  console.log('data',data)
  // search接口，任选一个条件
  simpleFetch('judging/configuration/threshold', {
    method: 'PUT',
    body: data,
  })
  .then((json) => {
    if (json.code === 200000) {
      dispatch(getTestResultType(data.configId[0]))
      showMessage({ text: json.message, type: 'success' })
    } else {
      showMessage({ text: json.message, type: 'error' })
    }
  })
}

const ACTION_HANDLERS = {
  [PRODUCT_PROCESS_DEFECTCODE]: (state, action) => {
    console.log('aeeeee', action.data)
    return Object.assign(
      {},
      state,
      {
        defectCodeList: action.data.defect,
        productList: action.data.product,
        processList: action.data.process,
      },
    )
  },
  [MODEL_LIST]: (state, action) => assign({}, state, {
    modelList: action.payload,
  }),
  [GET_CONFIDENCE_LIST]: (state, action) => {
    return assign({}, state, {
      confidenceList: action.payload,
    })
  },
  [SELECT_DATA]: (state, action) => assign({}, state, {
    selectData: action.payload,
  }),
  [GET_MODEL_TEST_RESULT_TYPE]: (state, action) => {
    return assign({}, state, {
      modelResultType: action.data,
    })
  },
  [UPDATE_MODEL_TEST_RESULT_TYPE]: (state, action) => {
    let { modelResultType } = state
    // console.log('state', )
    const { confidence, keyIndex } = action.data
    modelResultType = map(modelResultType, (element, index) => (
      (keyIndex === index) ? assign({}, element, { threshold: confidence }) : element
    ))
    return assign({}, state, { modelResultType })
  },
}

const initialState = {
  productList: [],
  processList: [],
  modelResultType: [],
  selectData: [],
  modelList: [],
  confidenceList: [],
}

export const confidenceThresholdReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
