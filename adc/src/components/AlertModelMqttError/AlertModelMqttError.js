import React from 'react'
import propTypes from 'prop-types'
import { Modal, Button } from 'antd'

export class AlertModelMqttError extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen || true,
    }
  }
  handleCancel = () => {
    this.setState({
      isOpen: false,
    })
  }
  render() {
    return (
      <Modal
        visible={this.props.isOpen}
        title='Error'
        onCancel={this.handleCancel}
        footer={[
          <Button key="cancel" onClick={this.props.handleCancel}>OK</Button>,
        ]}
      >
        <p>{this.props.errorMsg}</p>
      </Modal>
    )
  }
}
AlertModelMqttError.propTypes = {
  isOpen: propTypes.bool.isRequired,
  errorMsg: propTypes.string.isRequired,
  handleCancel: propTypes.func.isRequired,
}
export default AlertModelMqttError
