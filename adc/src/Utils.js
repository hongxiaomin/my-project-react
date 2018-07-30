/* eslint no-param-reassign: 0, no-restricted-syntax: 0 */
import { message } from 'antd'
import { Base64 } from 'js-base64'

export const getShowPath = path => path.replace(/^\//, 'http://172.22.34.220:50080/')
// export const getShowPath = path => path
export const getInfoPath = path => path.replace('http://172.22.34.220:50080', '')
// export const getInfoPath = path => path

export const getLanguage = () => (navigator.language || navigator.browserLanguage)

/**
 * 这里要做的事情， 给列表中的图片添加ID
 * 得到所有的defectCode
  */

export const formatImageList = (result) => {
  const imageList = []
  const defectCodeFilterList = new Set()
  result.forEach((item) => {
    imageList.push({
      ...item,
      path: getShowPath(item.path),
      imageId: Base64.encode(item.path),
    })
    item.defectCode.forEach(defect => defectCodeFilterList.add(defect))
  })
  defectCodeFilterList.add('Other')

  return {
    imageList,
    defectCodeFilterList: [...defectCodeFilterList],
  }
}

/**
 * 对图片列表， 通过selectedType和defectCode进行筛选
 * imageList: []
 * type: string ['All', 'Labeled', 'Unlabeled' ]
 * defectCode: ['', '', '']
 */
export const imageListFilter = (imageList, type, defectCode) => {
  const getStatusByType = (item) => {
    if (type === 'All' ||
      (type === 'Labeled' && item.isLabeled) ||
      (type === 'Unlabeled' && !item.isLabeled)
    ) return true
    return false
  }

  const arrayCheck = (arr1, arr2) => arr1.some(item => arr2.includes(item))

  return imageList.filter(item => getStatusByType(item) && ((!item.defectCode.length && defectCode.includes('Other')) || arrayCheck(item.defectCode, defectCode)))
}

export const defectInfoSplit = (defectInfo) => {
  const tmp = []
  defectInfo.forEach((info) => {
    info.coordinate.forEach((point) => {
      tmp.push({
        defectId: info.defectId,
        defectCode: info.defectCode,
        coordinate: point,
      })
    })
  })
  return tmp
}
export const defectInfoMerge = (data) => {
  const obj = {}
  data.forEach((item) => {
    if (obj[item.defectCode]) {
      // 之前已经存在此类型的defectCode
      obj[item.defectCode].coordinate.push(item.coordinate)
    } else {
      const tmp = Object.assign({}, item)
      tmp.coordinate = []
      tmp.coordinate.push(item.coordinate)
      obj[item.defectCode] = tmp
    }
  })
  return Object.values(obj)
}
export const coordinate2Obj = (obj) => {
  const arr = obj.coordinate.split('_')
  return Object.assign({}, obj, {
    x: arr[0],
    y: arr[1],
    width: arr[2] - arr[0],
    height: arr[3] - arr[1],
  })
}
export const obj2coordinate = obj => Object.assign({}, obj, {
  coordinate: `${obj.x}_${obj.y}_${(obj.x * 1) + (obj.width * 1)}_${(obj.y * 1) + (obj.height * 1)}`,
  // `${obj.coordinate.x}_${obj.coordinate.y}_${obj.coordinate.x + obj.coordinate.width}_${obj.coordinate.y + obj.coordinate.height}`,
})
// 根据缩放比例算出框的位置
export const getInfoByScale = (defectInfo, scale) => {
  const obj = {}
  const values = Object.values(defectInfo)
  values.forEach((item) => {
    obj[item.id] = Object.assign({},
      item,
      {
        x: item.coordinate.x * scale,
        y: item.coordinate.y * scale,
        width: item.coordinate.width * scale,
        height: item.coordinate.height * scale,
      },
    )
  })
  return obj
}
export const getStorage = key => sessionStorage.getItem(key)
export const setStorage = (key, value) => sessionStorage.setItem(key, value)
export const addIndex = arr => arr.map((item, i) => Object.assign({}, item, { index: i }))
export const keyMapping = () => ({ 65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G', 72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O', 80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y', 90: 'Z', 48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 96: '0', 97: '1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7', 104: '8', 105: '9', 106: '*', 107: '+', 108: 'Enter', 13: 'Enter', 109: '-', 110: '.', 111: '/', 112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12', 27: 'Esc', 32: 'Spacebar', 33: 'Page Up', 34: 'Page Down', 35: 'End', 36: 'Home', 37: '←', 38: '↑', 39: '→', 40: '↓', 45: 'Insert', 46: 'Delete', 189: '-', 187: '+', 8: 'BackSpace' })

export const getKeyNameByKeyCode = (keyCode) => {
  const data = keyMapping()
  return data[keyCode] || ''
}
// 生成base64缩略图
export const loadImage = url =>
  new Promise((resolve, reject) => {
    const Img = new Image()
    Img.onload = () => {
      resolve(Img)
    }
    Img.onerror = (e) => {
      reject(e)
    }
    Img.src = url
  })
export const slicing = (url, imgWidth, imgHeight, divWidth = 40, divHeight = 40) => (...args) => {
  const div = {}
  const x = args[0]
  const y = args[1]
  const width = args[2]
  const height = args[3]
  let ratio
  if (width > height) {
    ratio = divWidth / width
    div.height = `${divWidth * (height / width)}px`
    div.width = `${divWidth}px`
  } else {
    ratio = divHeight / height
    div.width = `${divWidth * (width / height)}px`
    div.height = `${divHeight}px`
  }
  div.backgroundSize = `${imgWidth * ratio}px`
  div.backgroundImage = `url(${url})`
  div.backgroundPosition = `-${x * ratio}px -${y * ratio}px`
  div.backgroundRepeat = 'no-repeat'
  div.margin = '0 auto'
  return div
}
export const showMessage = ({ text = '', type = 'success' }) => {
  message.destroy()
  message[type](text)
}
export const getCurrentStyle = (obj, prop) => {
  try {
    return document.defaultView.getComputedStyle(obj, null)[prop]
  } catch (e) {
    return null
  }
}

export const stringToFirstUpperCase = str => str.replace(/^[a-z]/g, m => m.toUpperCase())
function judgingInfoTimer(doSomething) {
  setTimeout(() => {
    console.log('getServiceInfo')
    doSomething(() => {
      judgingInfoTimer(doSomething)
    })
  }, judgingInfoTimer.time)
}
judgingInfoTimer.time = 1000 * 10
export { judgingInfoTimer }
// modelList状态显示
export const modelListStatus = (modelList) => {
  modelList.forEach((item) => {
    if (item.currentState === 'none' && item.isTrained === false && item.isVerified === false) {
      item.status = 'Idle'
    }
    if (item.currentState === 'training' && item.isVerified === false && item.isTrained === false) {
      item.status = 'Training'
    }
    if (item.isTrained === true &&
       item.isVerified === false &&
       (item.currentState === 'training' || item.currentState === 'none')) {
      item.status = 'Trained'
    }
    if (item.currentState === 'testing' && item.isVerified === false && item.isTrained === true) {
      item.status = 'Testing'
    }
    if (item.isVerified === true &&
        item.isTrained === true &&
       (item.currentState === 'testing' || item.currentState === 'none')) {
      item.status = 'Tested'
    }
  })
  return modelList
}

// 根据时间返回时间戳
export const formatTime = time => Date.parse(time)
export const getLocalTime = i => (time) => {
  if (typeof i !== 'number') return false
  const d = new Date(time.replace('-', '/'))
  return d.getTime() + 3600000 * i
}
export const timestamp2String = (timesamp, format = 'yyyy-MM-dd h:m:s') => {
  const zeroize = n => (n < 10 ? `0${n}` : n)
  const _this = new Date(timesamp)
  const date = {
    'M+': zeroize(_this.getMonth() + 1),
    'd+': zeroize(_this.getDate()),
    'h+': zeroize(_this.getHours()),
    'm+': zeroize(_this.getMinutes()),
    's+': zeroize(_this.getSeconds()),
    'q+': zeroize(Math.floor((_this.getMonth() + 3) / 3)),
    'S+': zeroize(_this.getMilliseconds()),
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (`${_this.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  for (const k in date) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : (`00${date[k]}`).substr((`${date[k]}`).length))
    }
  }
  return format
}

// 用户之后角色扩展
export const getRole = () => ({
  admin: 'administrator',
  user: 'user',
})

export const getOffset = (e) => {
  let offset = {
    left: e.offsetLeft,
    top: e.offsetTop,
  }
  if (e.offsetParent != null) {
    const tmp = getOffset(e.offsetParent)
    offset = {
      left: offset.left + tmp.left,
      top: offset.top + tmp.top,
    }
  }
  return offset
}


export function getScroll() {
  let scrollTop = 0
  let scrollLeft = 0
  if (window.pageYOffset) {
    scrollTop = window.pageYOffset
    scrollLeft = window.pageXOffset
  } else if (document.compatMode && document.compatMode !== 'BackCompat') {
    scrollTop = document.documentElement.scrollTop
    scrollLeft = document.documentElement.scrollLeft
  } else if (document.body) {
    scrollTop = document.body.scrollTop
    scrollLeft = document.body.scrollLeft
  }
  return { scrollTop, scrollLeft }
}

export const getSuffix = (fileName) => {
  const tmp = fileName.split('.')
  if (tmp.length === 1) {
    return ''
  }
  return tmp.pop()
}

// 数组去重
export const distinct = (arr) => {
  const result = []
  arr.forEach((v, i) => {
    const bool = arr.indexOf(v, i + 1)
    if (bool === -1) {
      result.push(v)
    }
  })
  return result
}

export function obj2Csv(arr, fields) {
  if (!arr.length || !(arr instanceof Array)) return ''
  const strArr = []
  arr.forEach((item) => {
    const line = []
    fields.forEach((field) => {
      line.push(item[field])
    })
    strArr.push(line.join(','))
  })
  return strArr.join('\n')
}

// 获取inline service 队列所有状态
export const getQueueStatus = () => (['received', 'receiving', 'running', 'done', 'waiting'])
