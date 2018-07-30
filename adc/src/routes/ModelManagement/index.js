import ModelRoute from './routes/ModelManagement'

import Model from './components/Model'

export default store => ({
  path: 'model',
  indexRoute: {
    component: Model,
  },
  /*  Async getComponent is only invoked when route matches   */
  getChildRoutes(location, cb) {
    require.ensure([], () => {
      cb(null, [
        ModelRoute(store),
      ])
    })
  },
})
