import React from 'react'
import { Router } from 'react-router'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'
// import enUS from 'antd/lib/locale-provider/en_US'
import { LocaleProvider } from 'antd'

import { IntlProvider, addLocaleData } from 'react-intl'
import zh from 'react-intl/locale-data/zh'
import en from 'react-intl/locale-data/en'
import { changeLanguage } from 'actions'

addLocaleData([...en, ...zh])
const WrapperIntlProvider = connect(state => ({
  locale: state.intl.locale,
  messages: state.intl.messages,
}))(IntlProvider)


const WrapperLocaleProvider = ({ locale, children }) => {
  let message = require('antd/lib/locale-provider/zh_TW') // {}
  if (locale !== 'zh_CN') {
    message = require(`antd/lib/locale-provider/${locale}`)
  }

  console.log('message:', message)

  // Object.assign({}, enUS, {
  //   DatePicker: {
  //     ...enUS.DatePicker,
  //     lang: {
  //       ...enUS.DatePicker.lang,
  //       previousMonth: 'Previous month',
  //       nextMonth: 'Next month',
  //       previousYear: 'Last year',
  //       nextYear: 'Next year',
  //     },
  //   },
  // })
  return (<LocaleProvider locale={message}>{children}</LocaleProvider>)
}
// const WrapperConnectLocaleProvider = connect(state => ({ locale: state.intl.antdLocale }))(WrapperLocaleProvider)
const WrapperConnectLocaleProvider = connect(({ intl: { antdLocale } }) => ({ locale: require(`antd/lib/locale-provider/${antdLocale}`) }))(LocaleProvider)

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { store } = this.props
    store.dispatch(changeLanguage(store.getState().intl.locale))
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <WrapperConnectLocaleProvider>
          <WrapperIntlProvider>
            <div style={{ height: '100%' }}>
              <Router history={this.props.history}>
                {this.props.routes}
              </Router>
            </div>
          </WrapperIntlProvider>
        </WrapperConnectLocaleProvider>
      </Provider>
    )
  }
}

export default App
