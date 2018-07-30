import React from 'react'
import { isEmpty } from 'lodash'
import { Button, Dialog } from '@blueprintjs/core'
import { connect } from 'react-redux'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { actionModel } from '../../modules'
import classes from './Dialog.scss'

type Props = {
  dataDetail: Number,
  unPublishOpen: Boolean,
  toggleUnPublish: Function,
  dispatch: Function,
};

export class UnPublishDialog extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const tmp = {
      modelId: this.props.dataDetail.original.id,
      actionType: 'deprecate',
    }
    console.log('unPublishOpen', tmp)
    this.props.dispatch(actionModel(tmp))
    this.props.toggleUnPublish()
  }
  props: Props;
  render() {
    return (
      <div className={classes['Dialog-container']}>
        {
          !isEmpty(this.props.dataDetail) &&
          <Dialog
            isOpen={this.props.unPublishOpen}
            onClose={this.props.toggleUnPublish}
            className={classes.dialog}
          >
            <div className={classes.header}>
              <h6 className={classes.headerTitle}><WrapperFormattedMessage id="confirmation" /></h6>
            </div>
            <div className={classes.dialogBody}>
              <br />
              <p className={classes.cn}>
                <WrapperFormattedMessage id="modelManagement.unPublishDialog.note" />
              </p>
              <div className={classes.btnGroup}>
                <Button className={classes.btnCancel} onClick={this.props.toggleUnPublish}>
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

export default connect()(UnPublishDialog)
