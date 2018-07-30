import LicenseRoute from './routes/License'

import LicensePage from './components/LicensePage'

export default store => ({
  path: 'license',
  indexRoute: {
    component: LicensePage,
  },
  /*  Async getComponent is only invoked when route matches   */
  getChildRoutes(location, cb) {
    require.ensure([], () => {
      cb(null, [
        LicenseRoute(store),
      ])
    })
  },
})
