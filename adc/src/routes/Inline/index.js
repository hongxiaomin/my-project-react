import ServiceRoute from './routes/Service'
import ModelParingRoute from './routes/modelParing'
import ConfidenceThreshold from './routes/ConfidenceThreshold'

export default store => ({
  path: 'inline',
  getChildRoutes(location, cb) {
    require.ensure([], () => {
      // If token is valid, user could access private route (e.g. Inline, Offline)
      cb(null, [
        ServiceRoute(store),
        ModelParingRoute(store),
        ConfidenceThreshold(store),
      ])
    })
  },
})
