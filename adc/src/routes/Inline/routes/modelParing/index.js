import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'modelPairing',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ModelParing = require('./components/ModelParing').default
      const { modelParingReducer } = require('./modules/ModelParing')

      /*  Add the reducer to the store on key 'service'  */
      injectReducer(store, { key: 'modelParing', reducer: modelParingReducer })

      /*  Return getComponent   */
      cb(null, ModelParing)

    /* Webpack named bundle   */
    }, 'modelParing')
  },
})
