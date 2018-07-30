import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'service',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ServiceManagement = require('./components/ServiceManagement').default
      const { serviceReducer } = require('./modules/Service')

      /*  Add the reducer to the store on key 'service'  */
      injectReducer(store, { key: 'service', reducer: serviceReducer })

      /*  Return getComponent   */
      cb(null, ServiceManagement)

    /* Webpack named bundle   */
    }, 'service')
  },
})
