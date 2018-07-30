import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Modal, Button, Alert } from 'antd'

/**
 * 连接MQTT失败，您可以尝试一下两种办法解决问题！
 * 1. 如果您的浏览器有设置代理，请去掉代理后刷新页面！
 * 2. 您可能还没有获取连接凭证，请尝试“点击获取凭证”后，刷新页面！
 */

const mqttUrl = `https://${location.hostname}:59001`
const typeAndMessage = {
  false: {
    type: 'error',
    message: 'MQTT connection lost!',
  },
  true: {
    type: 'success',
    message: 'MQTT successfully connected!',
  },
  loading: {
    type: 'info',
    message: 'Loading!',
  },
}

const AlertMqttError = ({ intl, isOpen, isError, handleCancel }) => (<div>
  <div style={{ position: 'absolute', top: 80, right: 40 }}>
    <Alert
      message={intl.formatMessage({ id: `alertMqttError.${typeAndMessage[isError].type}` })}
      type={typeAndMessage[isError].type}
      closable
    />
  </div>
  <Modal
    visible={isOpen}
    title='Warning'
    onCancel={handleCancel}
    footer={[
      <Button key="cancel" onClick={handleCancel}><WrapperFormattedMessage id='OK' /></Button>,
    ]}
  >
    <p><WrapperFormattedMessage id='alertMqttError.p1' />: </p>
    <p><WrapperFormattedMessage id='alertMqttError.p2' /></p>
    <p><WrapperFormattedMessage id='alertMqttError.p3' /> <a href={mqttUrl} target="_blank"><WrapperFormattedMessage id='alertMqttError.getCertificate' /></a> </p>
  </Modal>
</div>)

AlertMqttError.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isError: PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
  ]).isRequired,
  handleCancel: PropTypes.func.isRequired,
}

export default connect(({ intl: { locale } }) => ({
  locale,
}))(injectIntl(AlertMqttError))
