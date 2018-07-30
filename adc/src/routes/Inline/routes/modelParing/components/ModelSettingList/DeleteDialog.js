import React from 'react'
import { isEmpty } from 'lodash'
import { Button, Dialog } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { deleteModel } from '../../modules/ModelParing'
import classes from './Dialog.scss'

type Props = {
  dataDetail: Number,
  delOpen: Boolean,
  toggleDel: Function,
  dispatch: Function
};

export class DeleteDialog extends React.Component {


  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.dispatch(deleteModel(this.props.dataDetail.original.configId))
    this.props.toggleDel()
  }
  props: Props;
  render() {
    return (
      <div className={classes['Dialog-container']}>
        {
          !isEmpty(this.props.dataDetail) &&
          <Dialog
            isOpen={this.props.delOpen}
            onClose={this.props.toggleDel}
            className={classes.dialog}
          >
            <div className={classes.header}>
              <h6 className={classes.headerTitle}>Confirmation</h6>
            </div>
            <div className={classes.dialogBody}>
              <br />
              <p className={classes.cn}>{'Are you certain that you want to delete this model pairing?'}</p>
              <div className={classes.btnGroup}>
                <Button className={classes.btnCancel} onClick={this.props.toggleDel}>
                  Cancel
                </Button>
                <Button className={`pt-button pt-intent-primary ${classes.btnEdit}`} onClick={this.handleSubmit}>
                  Save
                </Button>
              </div>
            </div>
          </Dialog>
        }
      </div>
    )
  }
}

export default connect()(DeleteDialog)
