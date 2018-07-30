import { getStorage, getLanguage } from 'Utils'
import { addLocaleData } from 'react-intl'
import { APPLOCALE } from 'actions'

// 默认语言
let locale = getStorage('intl')
// 获取浏览器默认语言
if (!locale) {
  locale = getLanguage()
  // 判断浏览器默认语言是否被支持
}

const messages = {} // require(`../locale/${locale}.json`)
console.log('message:', messages)

const intl = (state = {
  locale,
  antdLocale: locale.replace('-', '_'),
  messages,
}, action) => {
  switch (action.type) {
    case APPLOCALE:
      addLocaleData(action.data.messages)
      return Object.assign({}, state, action.data)

    default:
      return state
  }
}

export default intl
