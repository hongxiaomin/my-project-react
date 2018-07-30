import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import Dialog from './Dialog'
import { createUser } from '../../modules'


export class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      isOpen: false,
    }
  }

  handleSubmit(values, cb, error) {
    this.props.dispatch(createUser(values, cb, error))
  }

  toggleDialog = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const buttonText = {
      create: 'Create',
    }
    const titleText = {
      create: this.props.intl.formatMessage({ id: 'userAndLicenseManagement.edit.createUser' }),
    }
    const { type } = this.props
    return (
      <div>
        <button
          style={{ width: '80px' }}
          type='button'
          onClick={this.toggleDialog}
          className={'pt-button pt-intent-primary'}
        >
          {buttonText[this.props.type]}
        </button>
        <Dialog
          dialogTitle={titleText[type]}
          dialogBtnContent={buttonText[type]}
          isOpen={this.state.isOpen}
          handleSubmit={this.handleSubmit}
          toggleDialog={this.toggleDialog}
        />
      </div>
    )
  }
}

CreateUser.propTypes = {
  intl: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({ intl: { locale } }) => ({
  locale,
}))(injectIntl(CreateUser))
