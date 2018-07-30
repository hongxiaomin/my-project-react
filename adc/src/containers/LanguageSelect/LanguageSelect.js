import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { changeLanguage } from 'actions'
import { Select } from 'antd'

const Option = Select.Option
export class LanguageSelect extends React.Component {

  handleChange = (locale) => {
    this.props.dispatch(changeLanguage(locale))
  }

  render() {
    const { locale } = this.props
    return (<Select defaultValue={locale} style={{ width: 90, marginLeft: 10 }} onChange={this.handleChange}>
      <Option value="zh-CN">中文</Option>
      <Option value="en-US">English</Option>
    </Select>)
  }
}

LanguageSelect.propTypes = {
  locale: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ intl }) => ({
  locale: intl.locale,
}))(LanguageSelect)
