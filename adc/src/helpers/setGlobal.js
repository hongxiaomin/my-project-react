const setGlobalUrl = (url) => {
  global.__URL__ = `http://${url}:50080/api`
  global.__MQTT__ = `wss://${url}:59001`
}

export default setGlobalUrl
