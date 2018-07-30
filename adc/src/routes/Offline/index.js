import LabelingRoute from './routes/Labeling'

import OfflinePage from './components/OfflinePage'

export default store => ({
  path: 'offline',
  indexRoute: {
    component: OfflinePage,
  },
  /*  Async getComponent is only invoked when route matches   */
  getChildRoutes(location, cb) {
    require.ensure([], () => {
      cb(null, [
        LabelingRoute(store),
      ])
    })
  },
})
