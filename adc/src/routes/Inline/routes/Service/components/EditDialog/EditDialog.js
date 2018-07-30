import React from 'react'
import propTypes from 'prop-types'
import DialogFilter from '../DialogFilter'

export const EditDialog = ({ editOpen, toggleDialog, info }) => (
  <DialogFilter
    DialogTitle='Edit Service'
    isOpen={editOpen}
    toggleDialog={toggleDialog}
    info={info}
  />
)

EditDialog.propTypes = {
  editOpen: propTypes.bool.isRequired,
  toggleDialog: propTypes.func.isRequired,
  info: propTypes.object.isRequired,
}

export default EditDialog
