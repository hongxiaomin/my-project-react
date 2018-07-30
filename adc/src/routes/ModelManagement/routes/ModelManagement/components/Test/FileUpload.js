import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { simpleFetch } from 'helpers/fetchWrapper'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { showMessage, stringToFirstUpperCase } from 'Utils'

export class FileUpload extends React.Component {
  constructor() {
    super()
    this.file = null
    this.state = {}
  }

  handleClick = () => this.file.click()

  handleChange = intl => () => {
    const file = this.file.files[0]
    if (!this.file) return
    const formData = new FormData()
    const totalImage = `${intl.formatMessage({ id: 'modelManagement.test.totalImage' })}`
    const errorImage = `${intl.formatMessage({ id: 'modelManagement.test.errorImage' })}`
    const tips = `${intl.formatMessage({ id: 'modelManagement.test.tips' })}`
    formData.append('file', file)
    this.props.that.setState({
      message: `${intl.formatMessage({ id: 'modelManagement.test.uploading' })}`,
      messageColor: 'orange',
    })
    simpleFetch(`webapi/model/testing/images?param=[${this.props.rowDetail},"$FILE:${file.name}"]`, {
      method: 'POST',
      body: formData,
      headers: {},
    })
    .then((json) => {
      if (json.code === 200000) {
        showMessage({ text: json.message, type: 'success' })
        this.props.that.setState({
          isLoad: true,
          messageColor: '#21cc0c',
          message: `${totalImage}${json.result.imageCount}, ${errorImage}${json.result.errorImageCount}）`,
        })
      } else if (json.code === 400001) {
        this.props.that.setState({
          messageColor: 'red',
          message: `${tips} ${json.message}）`,
        })
        showMessage({ text: stringToFirstUpperCase(json.message), type: 'error' })
      } else {
        this.props.that.setState({
          messageColor: 'red',
          message: `${tips} ${json.data}）`,
        })
      }
    })
    .catch((error) => {
      console.log('error')
      this.props.that.setState({
        messageColor: 'red',
        message: `${tips} ${error}）`,
      })
    })
  }

  render() {
    const { intl } = this.props
    return (<span>
      <a onClick={this.handleClick}><WrapperFormattedMessage id="labelingTool.dirTree.loadPathFile" /></a>
      <input
        id='file'
        ref={(file) => { this.file = file }}
        type="file"
        style={{ display: 'none' }}
        onChange={this.handleChange(intl)}
      />
    </span>)
  }
}

FileUpload.propTypes = {
  that: propTypes.object.isRequired,
  rowDetail: propTypes.object.isRequired,
}

export default injectIntl(connect()(FileUpload))
