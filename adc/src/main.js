/* eslint global-require: "off" */
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { setGlobalUrl } from 'helpers'
import 'babel-polyfill'

import Perf from 'react-addons-perf'

// ========================================================
// CSS Library Initializtion
// ========================================================
import 'normalize.css'
import '@blueprintjs/core/dist/blueprint.css'
import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/theme-fresh.css'
import 'antd/dist/antd.css'
import 'react-table/react-table.css'
import createStore from './store/createStore'
import './styles/main.scss'

window.Perf = Perf
// ========================================================
// Mock Fetch
// ========================================================
if (__DEV__) {
  require('./mockFetch')
}

// ========================================================
// Set Global URL
// ========================================================
setGlobalUrl()

// ========================================================
// Store Instantiation
// ========================================================
const store = createStore(window.__INITIAL_STATE__)

// ========================================================
// History Instantiation
// ========================================================
const history = syncHistoryWithStore(browserHistory, store)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App').default
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <App store={store} routes={routes} history={history} />,
    MOUNT_NODE,
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  // Enable logdown output
  localStorage.debug = '*'

  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './routes/index',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      }),
    )
  }
}

// ========================================================
// Go!
// ========================================================
if (!__TEST__) render()
