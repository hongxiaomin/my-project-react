import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'modelManagement',
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ModelManagement = require('./components/ModelManagement').default
      const { modelManagement } = require('./modules/index')
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'modelManagement', reducer: modelManagement })

      /*  Return getComponent   */
      cb(null, ModelManagement)

    /* Webpack named bundle   */
    }, 'modelManagement')
  },
})
