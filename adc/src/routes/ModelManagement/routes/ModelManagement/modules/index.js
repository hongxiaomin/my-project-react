/* eslint no-param-reassign: 0 */
import { showMessage, stringToFirstUpperCase } from 'Utils'
import { assign, map, isEmpty, uniqWith, isEqual } from 'lodash'
import { simpleFetch } from 'helpers/fetchWrapper'

// const __HOST__ = 'http://172.22.40.161:5005/'
// const __HOST__ = 'http://172.22.34.10:5005/'
// ------------------------------------
// Constants
// ------------------------------------
export const MODEL_LIST = 'MODEL_LIST'
export const MODEL_DETAIL = 'MODEL_DETAIL'
export const UPDATE_MODELLIST_TRAIN = 'UPDATE_MODELLIST_TRAIN'
export const UPDATE_MODELLIST_TEST = 'UPDATE_MODELLIST_TEST'
export const TRAINING_DETAIL = 'TRAINING_DETAIL'
export const TRAINING_CHANGE_MESSAGE = 'TRAINING_CHANGE_MESSAGE' // 推送来的消息
export const TESTING_CHANGE_MESSAGE = 'TESTING_CHANGE_MESSAGE'
export const TESTING_DETAIL = 'TESTING_DETAIL'
export const PAGE_STATUS = 'PAGE_STATUS' // 跳转切换页面
export const IMAGE_LIST = 'LABELINGTOOL.IMAGE_LIST'
export const SEARCH_IMAGE_LIST = 'SEARCH_IMAGE_LIST'
export const PRODUCT_PROCESS_CODE = 'PRODUCT_PROCESS_CODE'
export const GET_MODEL_TEST_RESULT_TYPE = 'GET_MODEL_TEST_RESULT_TYPE'
export const UPDATE_MODEL_TEST_RESULT_TYPE = 'UPDATE_MODEL_TEST_RESULT_TYPE'
export const UPDATE_ALL_MODEL_TEST_RESULT_TYPE = 'UPDATE_ALL_MODEL_TEST_RESULT_TYPE'
export const TESTING_TOTAL_COUNT = 'TESTING_TOTAL_COUNT'
export const IMPORT_MODEL_FLAG = 'IMPORT_MODEL_FLAG'
export const ALL_DEFCTCODE = 'ALL_DEFCTCODE'
export const TEST_RESULT_LIST = 'TEST_RESULT_LIST'
export const LOAD_FILE_MESSAGE = 'LOAD_FILE_MESSAGE'
export const GET_LICENSE_LIST = 'GET_LICENSE_LIST'
export const COPY_MODEL_DETAIL = 'COPY_MODEL_DETAIL'
export const VIEW_ID = 'VIEW_ID'
// ------------------------------------
// Async actions
// ------------------------------------
const imageList = [
  {
    imageId: 1,
    name: 'image1',
    path: '/test1.jpg',
    isLabeled: true,
  },
  {
    imageId: 2,
    name: 'image2',
    path: '/test2.jpg',
    isLabeled: true,
  },
  {
    imageId: 3,
    name: 'image3',
    path: '/test1.jpg',
    isLabeled: false,
  },
]


export const updateCopyModelDetail = obj => (dispatch, getState) => {
  dispatch({
    type: COPY_MODEL_DETAIL,
    data: {
      ...getState().modelManagement.copyModelDetail,
      ...obj,
    },
  })
}

export const imageListCheck = (params, type) => (dispatch, getState) => {
  return simpleFetch('labeling/label/search', {
    method: 'POST',
    body: params,
  })
  .then((json) => {
    if (json.code === 200000) {
      if (type === 'edit') {
        console.log('getState', getState().modelManagement.copyModelDetail)
        const detail = getState().modelManagement.copyModelDetail

        const targetCode = JSON.parse(json.result.targetCode)
        const othersCode = JSON.parse(json.result.othersCode)
        dispatch({
          type: COPY_MODEL_DETAIL,
          data: {
            ...detail,
            imageSourceCondition: {
              ...detail.imageSourceCondition,
              targetCode,
              othersCode,
            },
          },
        })
      } else {
        dispatch({
          type: ALL_DEFCTCODE,
          data: {
            targetCode: JSON.parse(json.result.targetCode),
            othersCode: JSON.parse(json.result.othersCode),
          },
        })
      }
    }
  })
}

export const getImageByPath = paths => (dispatch) => {
  // 通过path获取图片路径， path为array
  return simpleFetch('model/images', {
    method: 'POST',
    body: paths,
  })
    .then((data) => {
      if (data.code === 200000) {
        showMessage({ text: stringToFirstUpperCase(data.message), type: 'success' })
        dispatch({
          type: TESTING_TOTAL_COUNT,
          data: data.result.total,
        })
      } else {
        showMessage({ text: stringToFirstUpperCase(data.message), type: 'error' })
      }
    })
}

// 获取model列表
export const getModelList = () => (dispatch) => {
    // 请求获取model
  return simpleFetch('models')
  .then((data) => {
    if (data.code === 200000) {
      dispatch({
        type: MODEL_LIST,
        payload: data.result,
      })
    }
  })
}

// 新建model
export const createModel = (state, cb, cb2) => (dispatch) => {
  return simpleFetch('model', {
    method: 'POST',
    body: state,
  })
  .then((json) => {
    if (json.code === 200000) {
      if (cb) {
        cb()
      }
      dispatch(getModelList())
      showMessage({ text: json.message, type: 'success' })
    } else {
      if (cb2) {
        cb2()
      }
      showMessage({ text: json.message, type: 'error' })
    }
  })
}

// copy model
export const copyModel = (state, cb, cb2) => (dispatch, getState) => {
  const { intl: { messages } } = getState()
  return simpleFetch('model', {
    method: 'POST',
    body: state,
  })
  .then((json) => {
    if (json.code === 200000) {
      if (cb) {
        cb()
      }
      dispatch(getModelList())
      showMessage({ text: messages['modelManguage.copy.success'], type: 'success' })
    } else {
      if (cb2) {
        cb2()
      }
      showMessage({ text: json.message, type: 'error' })
    }
  })
}
// 编辑model
export const updateModel = (data, cb, cb2) => (dispatch) => {
  return simpleFetch('model', {
    method: 'PUT',
    body: data,
  })
  .then((json) => {
    if (json.code === 200000) {
      if (cb) {
        cb()
      }
      dispatch(getModelList())
      showMessage({ text: json.message, type: 'success' })
    } else {
      if (cb2) {
        cb2()
      }
      showMessage({ text: json.message, type: 'error' })
    }
  })
}

// 导入model
export const importModel = state => (dispatch) => {
  return simpleFetch('model/default', {
    method: 'POST',
    body: state,
  })
  .then((json) => {
    if (json.code === 200000) {
      dispatch(getModelList())
      showMessage({ text: json.message, type: 'success' })
    } else {
      showMessage({ text: json.message, type: 'error' })
    }
  })
}

// 发布下架model
export const actionModel = state => (dispatch) => {
  return simpleFetch('model', {
    method: 'PUT',
    body: state,
  })
  .then((json) => {
    if (json.code === 200000) {
      showMessage({ text: json.message, type: 'success' })
      dispatch(getModelList())
    } else {
      showMessage({ text: json.message, type: 'error' })
    }
  })
}
// 设置默认model
export const defaultModel = state => (dispatch) => {
  return simpleFetch('model/default', {
    method: 'PUT',
    body: state,
  })
  .then((json) => {
    if (json.code === 200000) {
      showMessage({ text: json.message, type: 'success' })
      dispatch(getModelList())
    } else {
      showMessage({ text: json.message, type: 'error' })
    }
  })
}
// 删除 model
export const deleteModel = state => (dispatch) => {
  return simpleFetch('model', {
    method: 'DELETE',
    body: { modelId: state },
  })
  .then((json) => {
    if (json.code === 200000) {
      showMessage({ text: json.message, type: 'success' })
      dispatch(getModelList())
    } else {
      showMessage({ text: json.message, type: 'error' })
    }
  })
}
export const getLicenseList = () => dispatch =>
  simpleFetch('devices')
  .then((res) => {
    if (res.code === 200000) {
      dispatch({
        type: GET_LICENSE_LIST,
        payload: JSON.parse(res.result),
      })
    }
  })

// 训练或者测试中的model的操作
export const actionTrainModel = (state, cb) => (dispatch) => {
  if (state.command === 'start') {
    return simpleFetch('model/progress', {
      method: 'POST',
      body: state,
    })
    .then((json) => {
      if (json.code === 200000) {
        showMessage({ text: json.message, type: 'success' })
        if (cb) {
          cb()
        }
        const tmp = {
          id: state.modelId,
          deviceHash: json.result.deviceHash,
          viewId: json.result.viewId,
        }
        dispatch({
          type: VIEW_ID,
          data: tmp,
        })
      } else {
        if (cb) {
          cb()
        }
        showMessage({ text: json.message, type: 'error' })
      }
    })
  } else if (state.command === 'restart') {
    return simpleFetch('model/progress', {
      method: 'POST',
      body: state,
    })
    .then((json) => {
      if (json.code === 200000) {
        showMessage({ text: json.message, type: 'success' })
        if (cb) {
          cb()
        }
      } else {
        if (cb) {
          cb()
        }
        showMessage({ text: json.message, type: 'error' })
      }
    })
  } else {
    console.log('state', state)
    return simpleFetch('model/progress', {
      method: 'POST',
      body: state,
    })
    .then((json) => {
      if (json.code === 200000) {
        if (cb) {
          cb()
        }
        dispatch(getLicenseList())
        showMessage({ text: json.message, type: 'success' })
      } else {
        if (cb) {
          cb()
        }
        showMessage({ text: json.message, type: 'error' })
      }
    })
  }
}


// 获取每行model的detail
export const getModelDetail = state => (dispatch) => {
  return simpleFetch(`model?modelId=${state}`)
  .then((json) => {
    if (json.code === 200000) {
      dispatch({
        type: MODEL_DETAIL,
        payload: json.result,
      })
    }
  })
}

// 获取training时的detail信息
export const getModelTrainDetail = id => (dispatch) => {
  return simpleFetch(`model/progress?modelId=${id}&state=training`)
  .then((data) => {
    if (data.code === 200000) {
      dispatch({
        type: UPDATE_MODELLIST_TRAIN,
        payload: Object.assign(data.result, { id }),
      })
    }
  })
}

// 获取testing时的detail信息
export const getModelTestDetail = id => (dispatch) => {
    // 请求获取model
  return simpleFetch(`model/progress?modelId=${id}&state=testing`)
  .then((data) => {
    if (data.code === 200000) {
      dispatch({
        type: UPDATE_MODELLIST_TEST,
        payload: Object.assign(data.result, { id }),
      })
    }
  })
}

export const getSelectInfo = () => (dispatch) => {
  // 请求获取product, process, code 信息
  return simpleFetch('labeling/image/search')
    .then((data) => {
      if (data.code !== 200000) {
        showMessage({ text: data.message, type: 'error' })
        return
      }
      const result = data.result
      dispatch({
        type: PRODUCT_PROCESS_CODE,
        data: result,
      })
    })
    .catch((e) => {
      console.log('e:', e)
    })
}

export const getTestResultList = id => (dispatch) => {
  return simpleFetch(`model/testing/result?modelId=${id}`)
  .then((data) => {
    if (data.code === 200000) {
      dispatch({
        type: TEST_RESULT_LIST,
        data: data.result,
      })
    }
  })
  .catch(err => console.log(err))
}

export function getTestResultType(id) {
  return (dispatch) => {
    // simpleFetch('/api/defectCode')
    return simpleFetch(`model/defect?modelId=${id}`)
    // .then(response => response.json())
    .then((data) => {
      if (data.code === 200000) {
        dispatch({
          type: GET_MODEL_TEST_RESULT_TYPE,
          data: data.result,
        })
      }
    })
    .catch(err => console.log(err))
  }
}

export function updateConfidence(state) {
  return () => {
    simpleFetch('model/defect', {
      method: 'PUT',
      body: state,
    })
    .then((json) => {
      if (json.code === 200000) {
        showMessage({ text: json.message, type: 'success' })
      } else {
        showMessage({ text: json.message, type: 'error' })
      }
    })
    .catch(err => console.log(err))
  }
}

const ACTION_HANDLERS = {
  [MODEL_LIST]: (state, action) => {
    const tmp = action.payload
    tmp.map((item) => {
      if (!isEmpty(item.targetCodeId)) {
        item.targetCodeId = JSON.parse(item.targetCodeId)
        item.targetCodeId = item.targetCodeId.map(i => {
          return i.toString()
        })
      }
      if (!isEmpty(item.othersCodeId)) {
        item.othersCodeId = JSON.parse(item.othersCodeId)
        item.othersCodeId = item.othersCodeId.map(i => {
          return i.toString()
        })
      }
      if (!isEmpty(item.imageSourceCondition) && item.sourceType === 'filter') {
        item.imageSourceCondition = JSON.parse(item.imageSourceCondition)
      }
      return item
    })
    return assign({}, state, {
      modelList: tmp,
    })
  },
  [VIEW_ID]: (state, action) => {
    const modelList = state.modelList.map((item) => {
      let tmp = Object.assign({}, item)
      if (tmp.id == action.data.id) {
        tmp = { ...tmp,
          deviceHash: action.data.deviceHash,
          viewId: action.data.viewId,
        }
      }
      return tmp
    })
    return assign({}, state, { modelList })
  },
  [TEST_RESULT_LIST]: (state, action) => {
    return assign({}, state, { testResultList: action.data })
  },
  [COPY_MODEL_DETAIL]: (state, action) => {
    return assign({}, state, { copyModelDetail: action.data })
  },
  [MODEL_DETAIL]: (state, action) => assign({}, state, {
    modelDetail: action.payload,
  }),
  [TESTING_TOTAL_COUNT]: (state, action) => assign({}, state, {
    testingImageCount: action.data,
  }),
  [GET_LICENSE_LIST]: (state, action) => assign({}, state, {
    licenseList: action.payload,
  }),
  // 点击train详情以后接口返回的数据，把数据放进modellist里面。（方便后续推送操作以及页面的更新）
  [UPDATE_MODELLIST_TRAIN]: (state, action) => {
    const trainingDetail = action.payload
    const modelList = state.modelList.map((item) => {
      let tmp = Object.assign({}, item)
      if (tmp.id === action.payload.id) {
        tmp = Object.assign({}, item, { trainingDetail })
      }
      return tmp
    })
    return assign({}, state, { modelList }, { trainingDetail })
  },
  // 点击test详情以后接口返回的数据，把数据放进modellist里面。（方便后续推送操作以及页面的更新）
  [UPDATE_MODELLIST_TEST]: (state, action) => {
    const testingDetail = action.payload
    const modelList = state.modelList.map((item) => {
      let tmp = Object.assign({}, item)
      if (tmp.id == action.payload.id) {
        tmp = Object.assign({}, item, { testingDetail })
      }
      return tmp
    })
    return assign({}, state, { modelList }, { testingDetail })
  },
  // 获取到后台推送来的消息，显示到页面并且刷新training的status，以及modellist的status
  [TRAINING_CHANGE_MESSAGE]: (state, action) => {
    const trainingDetail = action.payload
    const modelList = state.modelList.map((item) => {
      let tmp = Object.assign({}, item)
      if (tmp.id == action.payload.modelId) {
        tmp = Object.assign({}, item, { trainingDetail })
        tmp = { ...tmp,
          status: action.payload.status,
          currentState: action.payload.currentState,
          isTrained: action.payload.isTrained,
          isVerified: action.payload.isVerified,
          divaErrorMessage: action.payload.divaErrorMessage,
        }
      }
      return tmp
    })
    return assign({}, state, { modelList })
  },
  // 获取到后台推送来的消息，显示到页面并且刷新testing的status，以及modellist的status
  [TESTING_CHANGE_MESSAGE]: (state, action) => {
    const testingDetail = action.payload
    const modelList = state.modelList.map((item) => {
      let tmp = Object.assign({}, item)
      if (tmp.id == action.payload.modelId) {
        tmp = Object.assign({}, item, { testingDetail })
        tmp = { ...tmp,
          status: action.payload.status,
          currentState: action.payload.currentState,
          isTrained: action.payload.isTrained,
          isVerified: action.payload.isVerified,
        }
      }
      return tmp
    })
    return assign({}, state, { modelList })
  },
  // 当前处在哪个页面。
  [PAGE_STATUS]: (state, action) => {
    return assign({}, state, {
      pageStatus: action.payload,
    })
  },
  [ALL_DEFCTCODE]: (state, action) => {
    return assign({}, state, {
      allDefectCode: action.data,
    })
  },
  [PRODUCT_PROCESS_CODE]: (state, action) => {
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
  [IMAGE_LIST]: (state, action) => {
    return Object.assign({}, state, { imageList: action.data })
  },
  [SEARCH_IMAGE_LIST]: (state, action) => {
    return Object.assign({}, state, { searchImageList: action.data })
  },
  [GET_MODEL_TEST_RESULT_TYPE]: (state, action) => {
    return assign({}, state, {
      modelResultType: action.data,
    })
  },
  [UPDATE_MODEL_TEST_RESULT_TYPE]: (state, action) => {
    let { modelResultType } = state
    const { confidence, keyIndex } = action.data
    modelResultType = map(modelResultType, (element, index) => {
      return (keyIndex === index) ? assign({}, element, { defaultConfidence: confidence }) : element
    })
    return assign({}, state, { modelResultType })
  },
}

const initialState = {
  modelList: [],
  modelDetail: {},
  pageStatus: 'detailPage',
  imageList: [],
  searchImageList: [],
  defectCodeList: [],
  productList: [],
  processList: [],
  testingImageCount: 0,
  allDefectCode: {},
  testResultList: [],
  licenseList: [],
  copyModelDetail: {
    description: '',
    imageSourceCondition: {
      dateRange: {
        startTime: '',
        endTime: '',
      },
      othersCode: [],
      processId: '',
      productId: [],
      targetCode: [],
      targetCodeId: [],
      othersCodeId: [],
    },
    iteration: 100,
    lossRate: 0.00001,
    name: '',
    sourceType: 'path',
  },
}

export const modelManagement = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
