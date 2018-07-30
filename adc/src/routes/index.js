import { replace } from 'react-router-redux'
import { loadState } from 'helpers'
import CoreLayout from 'layouts/PageLayout'
import NavBar from 'containers/NavBar'
import HomeView from './components/HomeView'
import { validateToken } from '../actions'
import InlineRoute from './Inline'
import OfflineRoute from './Offline'
import LicenseRoute from './LicenseManagement'
import ModelRoute from './ModelManagement'
import { getStorage } from 'Utils'
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: {
    component: HomeView,
  },
  getChildRoutes(location, cb) {
    const userInfoStr = getStorage('loginInfo')
    if (userInfoStr) {
      let childRoutes = [
        InlineRoute(store),
        OfflineRoute(store),
        LicenseRoute(store),
        ModelRoute(store),
      ]
      // 判断权限
      const userInfo = JSON.parse(userInfoStr) || {}
      if (userInfo.roleIds && userInfo.roleIds[0] !== 'admin') {
        childRoutes = [
          OfflineRoute(store),
        ]

        // 如果访问的不是/offline/labeling 跳转过去
        if (location.location.pathname !== '/offline/labeling') {
          store.dispatch(replace('/offline/labeling'))
          return
        }
      }

      require.ensure([], () => {
        // If token is valid, user could access private route (e.g. Inline, Offline)
        cb(null, [{
          component: NavBar,
          childRoutes,
        }])
      })
    } else {
      store.dispatch(replace('/'))
    }


    // Validate Token
    // let token = store.getState().auth.token
    // if (!token && loadState('auth')) {
    //   token = loadState('auth').token
    // }

    // store.dispatch(validateToken(token)).then(({ tokenIsValid }) => {
    //   if (tokenIsValid) {
    //     require.ensure([], () => {
    //       // If token is valid, user could access private route (e.g. Inline, Offline)
    //       cb(null, [{
    //         component: NavBar,
    //         childRoutes: [
    //           InlineRoute(store),
    //           OfflineRoute(store),
    //           LicenseRoute(store),
    //           ModelRoute(store),
    //         ],
    //       }])
    //     })
    //   } else {
    //     store.dispatch(replace('/'))
    //   }
    // })
  },
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
