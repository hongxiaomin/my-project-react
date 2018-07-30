import React from 'react'
import { isEmpty } from 'lodash'
import { Button, Dialog } from '@blueprintjs/core'
import { connect } from 'react-redux'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { deleteModel } from '../../modules'
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
    this.props.dispatch(deleteModel(this.props.dataDetail.original.id))
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
              <h6 className={classes.headerTitle}><WrapperFormattedMessage id="confirmation" /></h6>
            </div>
            <div className={classes.dialogBody}>
              <br />
              <p className={classes.cn}>
                <WrapperFormattedMessage id="modelManagement.deleteDialog.note" />
              </p>
              <div className={classes.btnGroup}>
                <Button className={classes.btnCancel} onClick={this.props.toggleDel}>
                  <WrapperFormattedMessage id="cancel" />
                </Button>
                <Button className={`pt-button pt-intent-primary ${classes.btnEdit}`} onClick={this.handleSubmit}>
                  <WrapperFormattedMessage id="Save" />
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
