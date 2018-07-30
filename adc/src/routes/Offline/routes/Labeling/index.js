import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'labeling',
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const LabelingTool = require('./components/LabelingTool').default
      const { reducer } = require('./modules')

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'labelingTool', reducer })

      /*  Return getComponent   */
      cb(null, LabelingTool)

    /* Webpack named bundle   */
    }, 'labelingTool')
  },
})
