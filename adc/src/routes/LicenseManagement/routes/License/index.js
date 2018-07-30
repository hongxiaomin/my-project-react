import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'licenseManagement',
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const LicenseManagement = require('./components/License').default
      const re = require('./modules').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'licenseManagement', reducer: re })

      /*  Return getComponent   */
      cb(null, LicenseManagement)

    /* Webpack named bundle   */
    }, 'licenseManagement')
  },
})
