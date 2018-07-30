import React from 'react'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'

const Confirm = ({ intl, isOpen, title, handleOk, handleCancel }) => (<Modal
  visible={isOpen}
  title={intl.formatMessage({ id: 'serviceManagement.serviceCard.confirmation' })}
  onOk={handleOk}
  onCancel={handleCancel}
  footer={[
    <Button key="no" onClick={handleCancel}><WrapperFormattedMessage id='no' /></Button>,
    <Button key="yes" type="primary" onClick={handleOk}>
      <WrapperFormattedMessage id='yes' />
    </Button>,
  ]}
>{title}</Modal>)

Confirm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
}

export default connect(({ intl: { locale } }) => ({
  locale,
}))(injectIntl(Confirm))
