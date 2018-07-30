import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'confidenceThreshold',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ConfidenceThreshold = require('./components/Confidence').default
      const { confidenceThresholdReducer } = require('./modules/ConfidenceThreshold')

      /*  Add the reducer to the store on key 'service'  */
      injectReducer(store, { key: 'confidenceThreshold', reducer: confidenceThresholdReducer })

      /*  Return getComponent   */
      cb(null, ConfidenceThreshold)

    /* Webpack named bundle   */
    }, 'confidenceThreshold')
  },
})
