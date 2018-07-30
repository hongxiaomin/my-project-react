import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import Dialog from './Dialog'
import { updateUser } from '../../modules'

export class EditUser extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.defaultValue)) {
      this.form.setFieldsValue({
        userId: nextProps.defaultValue.userId,
        userName: nextProps.defaultValue.userName,
        roleIds: nextProps.defaultValue.roleIds[0],
      })
    }
  }

  handleUpdate = (values, success, error) => {
    this.props.dispatch(updateUser(values, success, error))
  }

  render() {
    return (<Dialog
      ref={f => (this.form = f)}
      isOpen={this.props.isOpen}
      dialogTitle={this.props.intl.formatMessage({ id: 'userAndLicenseManagement.edit.EditUser' })}
      dialogBtnContent='Update'
      defaultValue={{}}
      handleSubmit={this.handleUpdate}
      toggleDialog={this.props.toggleDialog}
    />)
  }
}

EditUser.propTypes = {
  intl: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  defaultValue: PropTypes.object.isRequired,
}

export default connect()(injectIntl(EditUser))
