import React from 'react'
import PropTypes from 'prop-types'
import {
  IntlProvider,
  defineMessages,
  FormattedMessage,
  addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import * as MessagePackages from '../translations'
import './style.less'

addLocaleData([...en, ...zh])

const componentMessages = defineMessages({
  headerTitle: {
    id: 'header.title',
    defaultMessage: 'Welcome to sample code of i18n',
  },
})
class Languages extends React.Component {
  constructor(props) {
    super(props)
    this.state = { locale: 'en' }
    this.onSelectChange = this.onSelectChange.bind(this)
  }
  onSelectChange(e) {
    const userLocale = e.target.value
    this.setState({ locale: userLocale })
  }
  render() {
    return (
      <div className={this.props.containerClassName}>
        <select className={this.props.selectClassName} onChange={this.onSelectChange}>
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
        <IntlProvider locale={this.state.locale} messages={MessagePackages[this.state.locale]}>
          <div className={this.props.messageClassName}>
            <FormattedMessage {...componentMessages.headerTitle} />
          </div>
        </IntlProvider>
      </div>
    )
  }
}
Languages.defaultProps = {
  containerClassName: 'languages-container',
  selectClassName: 'languages-select',
  messageClassName: 'languages-message',
}
Languages.propTypes = {
  containerClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  messageClassName: PropTypes.string,
}

export default Languages
