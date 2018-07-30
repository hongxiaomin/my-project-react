import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { Button, Dialog } from '@blueprintjs/core'
import './Dialog.scss'

export const CommonDialog = ({ title, isOpen, toggleDialog, handleSubmit }) => (<div styleName='Dialog-container'>
  <Dialog
    isOpen={isOpen}
    onClose={toggleDialog}
    styleName='dialog'
  >
    <div>
      <h6 styleName='headerTitle'><WrapperFormattedMessage id='serviceManagement.serviceCard.confirmation' /></h6>
    </div>
    <div styleName='dialogBody'>
      <br />
      <p styleName='cn'>{title}</p>
      <div styleName='btnGroup'>
        <Button styleName='btnCancel' onClick={toggleDialog}>
          <WrapperFormattedMessage id='cancel' />
        </Button>
        <Button styleName='btnEdit' onClick={handleSubmit}>
          <WrapperFormattedMessage id='Save' />
        </Button>
      </div>
    </div>
  </Dialog>
</div>)

CommonDialog.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default CommonDialog
