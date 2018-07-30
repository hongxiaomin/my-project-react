/* eslint no-shadow: 0 */
import { handleActions } from 'redux-actions'
import { getStorage,
  loadImage,
  setStorage,
  showMessage,
  getInfoPath,
  getShowPath,
  formatImageList,
  imageListFilter,
  defectInfoMerge,
  defectInfoSplit,
  stringToFirstUpperCase,
} from 'Utils'
import { simpleFetch } from 'helpers/fetchWrapper'

const DEFAULT_DEFECT_CODE_LIST = 'DEFAULT_DEFECT_CODE_LIST'
const defaultDefectCodeList = JSON.parse(getStorage(DEFAULT_DEFECT_CODE_LIST)) || []

export const INIT_IMAGE_LIST = 'INIT_IMAGE_LIST'
export const UPDATE_SELECTED_IMAGE_LIST = 'UPDATE_SELECTED_IMAGE_LIST'
export const UPDATE_CURRENT_ID = 'UPDATE_CURRENT_ID'
export const UPDATE_SOMETHING = 'UPDATE_SOMETHING'
export const UPDATE_SELECTED_IMAGE_INFO = 'UPDATE_SELECTED_IMAGE_INFO'
export const UPDATE_DEFAULT_DEFECT_CODE_LIST = 'UPDATE_DEFAULT_DEFECT_CODE_LIST'

/**
* paths Array [path]
*/
export const getImageListByPath = paths => (dispatch, getState) => {
  dispatch({
    type: UPDATE_SOMETHING,
    data: { imageListLoading: true },
  })

  return simpleFetch('labeling/images', {
    method: 'POST',
    body: paths,
  })
    .then(({ code, message, result }) => {
      if (code !== 200000 || !result) {
        showMessage({ text: stringToFirstUpperCase(message), type: 'error' })
        return
      }
      const { labelingTool: { selectedType } } = getState()
      let selectedImageList = []
      const { imageList, defectCodeFilterList } = formatImageList(result)
      selectedImageList = imageListFilter(imageList, selectedType, defectCodeFilterList)

      dispatch({
        type: UPDATE_SOMETHING,
        data: {
          imageList,
          selectedImageList,
          defectCodeFilterList,
          selectedDefectCode: [...defectCodeFilterList],
          imageListLoading: false,
        },
      })
    })
}

const defectInfo = path =>
simpleFetch(`labeling/image/defect/info?imagePath=${getInfoPath(path)}`)
  .then(({ code, message, result }) => {
    if (code !== 200000) {
      showMessage({ text: stringToFirstUpperCase(message), type: 'error' })
      throw stringToFirstUpperCase(message)
    }

    return result
  })

const defectInfoByEda = path =>
simpleFetch(`eda/labelinfo?imagePath=${getInfoPath(path)}`)
  .then(({ code, message, result }) => {
    if (code !== 200000) {
      showMessage({ text: stringToFirstUpperCase(message), type: 'error' })
      return false
    }

    const tmpDefectInfo = {}
    if (result.labelInfo) {
      result.labelInfo.forEach((item) => {
        tmpDefectInfo[item.ADC_DEFECT_CODE] = tmpDefectInfo[item.ADC_DEFECT_CODE] || []
        tmpDefectInfo[item.ADC_DEFECT_CODE].push(`${item.COORDINATE_X1}_${item.COORDINATE_Y1}_${item.COORDINATE_X2}_${item.COORDINATE_Y2}`)
      })
    }

    const values = Object.values(tmpDefectInfo)
    const defectInfo = Object.keys(tmpDefectInfo).forEach((code, i) => ({
      defectCode: code,
      defectId: '', // 缺少defectID
      coordinate: values[i],
    }))


    return {
      id: Symbol('imageId'),
      defectInfo: JSON.stringify(defectInfo),
      imagePath: result.path,
    }
  })

export const getDefectInfoByImage = imageInfo => (dispatch, getState) => {
  const { labelingTool:
    { defectCodeFilterList, selectedDefectCode, selectedImageList, imageList },
  } = getState()
  /**
   * 做一些数据初始化的工作
   * 1. 重置图片缩放
   * 2. 重置当前选中图片和详细信息
   */

  const selectedImageInfo = {
    imageId: imageInfo.imageId,
    path: imageInfo.path,
    imageInfo: {},
    defectInfo: [],
  }
  const defectList = []
  let defectCodeList = []

  const promiseArr = [loadImage(getShowPath(imageInfo.path)), defectInfo(imageInfo.path)]
  if (imageInfo.eda) {
    promiseArr[1] = defectInfoByEda(imageInfo.path)
  }

  Promise.all(promiseArr)
    .then(([image, info]) => {
      selectedImageInfo.imageInfo = {
        width: image.width,
        height: image.height,
      }

      if (info) {
        selectedImageInfo.imagePath = info.imagePath
        let defectInfo
        try {
          defectInfo = JSON.parse(info.defectInfo)
        } catch (e) {
          throw new Error('DefectInfo is not a json')
        }

        selectedImageInfo.defectInfo = defectInfoSplit(defectInfo)
        .map((item) => {
          const tmp = Object.assign({}, item)
          const coordinate = tmp.coordinate.split('_')
          tmp.id = Symbol(`id-${tmp.coordinate}`)
          tmp.x = parseInt(coordinate[0], 10)
          tmp.y = parseInt(coordinate[1], 10)
          tmp.endX = parseInt(coordinate[2], 10)
          tmp.endY = parseInt(coordinate[3], 10)
          defectCodeList.push(item.defectCode)
          return tmp
        })
        defectCodeList = [...new Set(defectCodeList)]
        // 判断defectCode是否是最新的， 图片列表中的defectCode是否最新
        defectCodeList.forEach((defectCode) => {
          if (!defectCodeFilterList.includes(defectCode)) defectList.push(defectCode)
        })
      }
    })
    .then(() => {
      // 更新stroe
      const updateObject = {}
      updateObject.currentId = imageInfo.imageId
      updateObject.selectedImageInfo = selectedImageInfo
      updateObject.selectedImageList = selectedImageList.map((item) => {
        if (item.imageId !== imageInfo.imageId) return item
        return {
          ...item,
          defectCode: defectCodeList,
        }
      })
      updateObject.imageList = imageList.map((item) => {
        if (item.imageId !== imageInfo.imageId) return item
        return {
          ...item,
          defectCode: defectCodeList,
        }
      })
      if (defectList.length) {
        updateObject.defectCodeFilterList = [...defectCodeFilterList, ...defectList]
        updateObject.selectedDefectCode = [...selectedDefectCode, ...defectList]
      }

      dispatch({
        type: UPDATE_SOMETHING,
        data: updateObject,
      })
    })
    .catch(e => showMessage({ text: e, type: 'error' }))
}

// 下一张或者上一张
/**
 * type: next | prev
 */
export const updateCurrentId = type => (dispatch, getState) => {
  let index = null
  const { labelingTool: { currentId, selectedImageList } } = getState()
  selectedImageList.forEach((item, i) => {
    if (item.imageId === currentId) {
      index = i
    }
  })

  if (index === null ||
    (type === 'prev' && index === 0) ||
    (type === 'next' && index === (selectedImageList.length - 1))) return

  if (type === 'prev') index -= 1
  if (type === 'next') index += 1

  dispatch(getDefectInfoByImage(selectedImageList[index]))
}

/**
 * 获取所有的defectCode列表
 */
export const getSelectInfo = () => (dispatch, getState) => simpleFetch('labeling/image/search')
.then(({ code, message, result }) => {
  if (code !== 200000 || result === null) {
    showMessage({ text: stringToFirstUpperCase(message), type: 'error' })
    return
  }
  const { labelingTool: { defaultDefectCodeList } } = getState()
  const list = []
  const { defect: defectList } = result
  defaultDefectCodeList.forEach((item) => {
    if (defectList.some(defect => defect.defectId === item.defectId)) {
      list.push(item)
    }
  })

  dispatch({
    type: UPDATE_SOMETHING,
    data: {
      defaultDefectCodeList: list,
      defectCodeList: result.defect,
      productList: result.product,
      processList: result.process,
    },
  })
})

/**
 * 更新默认选中的defectcode, 如果同时有已经选中的defect框， 也要进行更新
 */
export const updateSelectedDefaultDefect = defect => (dispatch, getState) => {
  const { labelingTool: { selectedImageInfo } } = getState()
  const updateInfo = { selectedDefaultDefect: defect }
  if (selectedImageInfo.defectCurrentId) {
    const defectInfo = selectedImageInfo.defectInfo
    updateInfo.selectedImageInfo = {
      ...selectedImageInfo,
      defectInfo: defectInfo.map((item) => {
        if (item.id !== selectedImageInfo.defectCurrentId) return item
        return {
          ...item,
          ...defect,
        }
      }),
    }
  }

  dispatch({
    type: UPDATE_SOMETHING,
    data: updateInfo,
  })
}

export const addDefectCode = (defectCode, cb) => (dispatch, getState) =>
simpleFetch('labeling/defect', {
  method: 'POST',
  body: { defectCode },
})
  .then((data) => {
    if (cb) cb()
    if (data.code !== 200000) {
      showMessage({ text: stringToFirstUpperCase(data.message), type: 'error' })
      return
    }

    // 获得id后把当前这条添加到defectCodeList中
    const { labelingTool: { defectCodeList } } = getState()
    dispatch({
      type: UPDATE_SOMETHING,
      data: {
        defectCodeList: defectCodeList.concat({ defectId: data.result, defectCode }),
      },
    })
  })


export const saveLabel = () => (dispatch, getState) => {
  const {
    intl: {
      messages,
    },
    labelingTool: {
      currentId,
      imageList,
      selectedType,
      selectedImageInfo,
      selectedDefectCode,
      defectCodeFilterList,
    },
  } = getState()
  const putData = {}
  let flag = false
  const defectInfo = selectedImageInfo.defectInfo.map((item) => {
    if (!item.defectCode) flag = true
    return {
      ...item,
      coordinate: `${item.x}_${item.y}_${item.endX}_${item.endY}`,
    }
  })
  const defectCode = []
  if (flag) {
    showMessage({ text: messages['labelingTool.controlpanel.warning'], type: 'warning' })
    return false
  }

  putData.imagePath = getInfoPath(selectedImageInfo.path)
  putData.defectInfo = []

  // 把defectInfo转为想要的格式
  defectInfoMerge(defectInfo).forEach((item) => {
    defectCode.push(item.defectCode)
    putData.defectInfo.push({
      coordinate: item.coordinate,
      defectCode: item.defectCode,
      defectId: item.defectId,
    })
  })

  putData.defectInfo = JSON.stringify(putData.defectInfo)
  return simpleFetch('labeling/label', {
    method: 'PUT',
    body: putData,
  })
    .then(({ code, message }) => {
      if (code !== 200000) {
        showMessage({ text: stringToFirstUpperCase(message), type: 'error' })
        return
      }
      showMessage({ text: stringToFirstUpperCase(message) })

      // 更新list中的defectCode
      const codeList = [...new Set(defectCode.concat(defectCodeFilterList))]
      const selectedCodeList = [...new Set(defectCode.concat(selectedDefectCode))]
      const list = imageList.map((item) => {
        if (item.imageId !== currentId) return item
        return {
          ...item,
          isLabeled: true,
          defectCode,
        }
      })

      dispatch({
        type: UPDATE_SOMETHING,
        data: {
          imageList: list,
          selectedImageList: imageListFilter(list, selectedType, selectedCodeList),
          defectCodeFilterList: codeList,
          selectedDefectCode: selectedCodeList,
          selectedImageInfo: {
            ...selectedImageInfo,
            defectCurrentId: '',
          },
        },
      })
    })
}

/**
 * 获取目录树数据
 */

export const getDirTree = () => dispatch => simpleFetch('labeling/dirtree', {
  method: 'POST',
})
  .then((data) => {
    if (data.code !== 200000) {
      showMessage({ text: stringToFirstUpperCase(data.message), type: 'error' })
      return
    }

    dispatch({
      type: UPDATE_SOMETHING,
      data: {
        dirTree: [JSON.parse(data.result)],
      },
    })
  })

/**
 * 通过product和process获取model的code
 */

export const getModelDefect = (values) => {
  const url = `eda/defects?processId=${values.processId}&productId=${values.productId.join()}`
  return simpleFetch(url)
}

/**
* obj Object {zoom: 1, add: 0}
*/
export const updateControlPanel = obj => (dispatch, getState) => {
  dispatch({
    type: UPDATE_SOMETHING,
    data: {
      controlPanel: {
        ...getState().labelingTool.controlPanel,
        ...obj,
      },
    },
  })
}

export const updateKeyCode = (obj, cb) => (dispatch, getState) => simpleFetch('labeling/shortcuts', {
  method: 'PUT',
  body: obj,
})
  .then((data) => {
    if (data.code !== 200000) {
      if (cb) cb(false)
      showMessage({ text: stringToFirstUpperCase(data.message), type: 'error' })
      return
    }

    if (cb) cb(true)
    dispatch({
      type: UPDATE_SOMETHING,
      data: {
        hotKeys: {
          ...getState().labelingTool.hotKeys,
          ...obj,
        },
        resetHotKeys: false,
      },
    })
  })

// 请求后台, 得到默认的快捷键码， 更新到state中
export const initKeyCode = () => (dispatch, getState) => simpleFetch('labeling/shortcuts')
.then((data) => {
  if (data.code !== 200000) {
    showMessage({ text: stringToFirstUpperCase(data.message), type: 'error' })
    return
  }

  dispatch({
    type: UPDATE_SOMETHING,
    data: {
      hotKeys: {
        ...getState().labelingTool.hotKeys,
        ...data.result,
      },
      resetHotKeys: false,
    },
  })
})

/**
 * @param {Bool} status
 */
export const updateResetKeyCodeStatus = status => (dispatch) => {
  dispatch({
    type: UPDATE_SOMETHING,
    data: {
      resetHotKeys: status,
    },
  })
}

// export const getImageListBySearch = (params, cb) => (dispatch) => {
//   if (
//     !params ||
//     !(params instanceof Object) ||
//     params.startTime === undefined ||
//     params.endTime === undefined ||
//     params.defectCode === undefined ||
//     params.processId === undefined ||
//     params.productId === undefined
//   ) {
//     return
//   }
//   const postData = { ...params }
//   postData.startTime = postData.startTime.format('YYYY-MM-DD HH:mm:ss')
//   postData.endTime = postData.endTime.format('YYYY-MM-DD HH:mm:ss')
//   let url = 'labeling/image/filter?'
//   url += `startTime=${postData.startTime}&`
//   url += `endTime=${postData.endTime}&`
//   url += `processId=${postData.processId}&`
//   url += `productId=${postData.productId}&`
//   url += `defectCode=${postData.defectCode}`

//   // url = 'labeling/image/filter?processId=18850&productId=TC57001AAC00&defectCode=TNDAC1'

//   return simpleFetch(`${url}`)
//     .catch((err) => {
//       showMessage({ text: stringToFirstUpperCase(err), type: 'error' })
//     })
//     .then((data) => {
//       if (data.code !== 200000) {
//         showMessage({ text: stringToFirstUpperCase(data.message), type: 'error' })
//         return
//       }
//       if (!data.result.length) {
//         showMessage({ text: 'Unable to find a list of images', type: 'error' })
//         return
//       }

//       const imageList = data.result.map(item => ({
//         ...item,
//         isfilter: true,
//         isLabeled: item.isJudged,
//         path: getShowPath(item.imagePath),
//       }))


//       if (cb) cb()
//     })
// }

const initialState = {
  dirTree: [],
  currentId: '',
  imageList: [],
  uploading: false,
  expandView: false,
  defectCodeList: [], // 所有的defect
  selectedType: 'All',
  defaultDefectCodeList, // 保存被选中的defectCode
  selectedImageList: [], // 筛选过后的图片列表
  selectedDefectCode: [], // 筛选的defectCode
  imageListLoading: false, // 是否加载图片列表
  defectCodeFilterList: [], // defectCode筛选列表
  selectedDefaultDefect: {}, // 选中的
  selectedImageInfo: {
    path: '',
    defectInfo: [],
    defectCurrentId: '', // 当前选中的defect list中的数据
  },
  controlPanel: {
    zoom: 1, // 图片缩放
  },
  hotKeys: {
    add: 76,
    next: 39,
    previous: 37,
    zoomIn: 187,
    save: 13,
    zoomOut: 189,
    delete: 46,
    restore: 79,
  },
  productList: [],
  processList: [],
  resetHotKeys: false,
}

export const reducer = handleActions({
  [INIT_IMAGE_LIST]: (state, action) => Object.assign({}, state, { ...action.data }),
  [UPDATE_SELECTED_IMAGE_LIST]: (state, action) => {
    // 当type和defectcode 更新的时候， 列表也需要更新
    const selectedType = action.data.selectedType || state.selectedType
    const selectedDefectCode = action.data.selectedDefectCode || state.selectedDefectCode
    return Object.assign({}, state, {
      selectedType,
      selectedDefectCode,
      selectedImageList: imageListFilter(state.imageList, selectedType, selectedDefectCode),
    })
  },
  // 更新当前图片id
  [UPDATE_CURRENT_ID]: (state, action) => Object.assign({}, state, { currentId: action.data }),
  // 跟新一些内容
  [UPDATE_SOMETHING]: (state, action) => Object.assign({}, state, { ...action.data }),
  [UPDATE_SELECTED_IMAGE_INFO]: (state, action) =>
    Object.assign({}, state, { selectedImageInfo: action.data }),
  [UPDATE_DEFAULT_DEFECT_CODE_LIST]: (state, action) => {
    setStorage(DEFAULT_DEFECT_CODE_LIST, JSON.stringify(action.data))
    return Object.assign({}, state, { defaultDefectCodeList: action.data })
  },
}, initialState)
