import React from 'react'
import propTypes from 'prop-types'
import DialogFilter from '../DialogFilter'

export const CreateServiceDialog = ({ isOpen, toggleDialog, info }) => (
  <DialogFilter
    DialogTitle='Init Service'
    isOpen={isOpen}
    toggleDialog={toggleDialog}
    info={info}
  />
)

CreateServiceDialog.propTypes = {
  info: propTypes.object.isRequired,
  isOpen: propTypes.bool.isRequired,
  toggleDialog: propTypes.func.isRequired,
}

export default CreateServiceDialog
