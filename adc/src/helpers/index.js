/* eslint consistent-return: "off"*/
/**
 * [loadState description]
 * @param  {String} attr 'auth' or 'client'
 * @return {String} stringify-object
 */
export const loadState = (name) => {
  try {
    const serializeState = localStorage.getItem(name)
    if (serializeState === null) {
      return undefined
    }
    return JSON.parse(serializeState)
  } catch (err) {
    console.log(err)
    return undefined
  }
}

/**
 * [saveState description]
 * @param  {String} name the attribue e.g.'auth' or 'client'
 * @param  {Object} state the state need to be stored in localStorage
 */
export const saveState = name => (state) => {
  try {
    const serializeState = JSON.stringify(state)
    localStorage.setItem(name, serializeState)
  } catch (err) {
    return console.log(err)
  }
}

/**
 * [setGlobalUrl description]
 * @param {String} [url='172.22.34.220']
 */
export const setGlobalUrl = (url = '172.22.34.220') => {
  global.__URL__ = `http://${url}:50080/api`
  global.__MQTT__ = `wss://${url}:59001`
  global.__HOST__ = `http://${location.hostname}:${location.port}/api/`
  global.__HOST__ = 'http://172.22.34.220:50080/api/'
  // global.__HOST__ = 'http://10.120.138.137:50080/api/'
  // global.__HOST__ = 'http:// 10.147.64.115:5005/'
  // global.__HOST__ = 'http://10.147.76.180:5005/'
  // global.__HOST__ = 'http://172.16.240.42:50080/api/'
  // global.__HOST__ = 'http://10.120.138.138:50080/api/'
}
