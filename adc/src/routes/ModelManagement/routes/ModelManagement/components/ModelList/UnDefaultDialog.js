import React from 'react'
import { isEmpty } from 'lodash'
import { Button, Dialog } from '@blueprintjs/core'
import { connect } from 'react-redux'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { defaultModel } from '../../modules'
import classes from './Dialog.scss'

type Props = {
  dataDetail: Number,
  unDefaultOpen: Boolean,
  toggleunDefault: Function,
  dispatch: Function,
};

export class UnDefaultDialog extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const tmp = {
      modelId: this.props.dataDetail.original.id,
      asDefault: false,
    }
    console.log('undefault', tmp)
    this.props.dispatch(defaultModel(tmp))
    this.props.toggleunDefault()
  }
  props: Props;
  render() {
    return (
      <div className={classes['Dialog-container']}>
        {
          !isEmpty(this.props.dataDetail) &&
          <Dialog
            isOpen={this.props.unDefaultOpen}
            onClose={this.props.toggleunDefault}
            className={classes.dialog}
          >
            <div className={classes.header}>
              <h6 className={classes.headerTitle}><WrapperFormattedMessage id="confirmation" /></h6>
            </div>
            <div className={classes.dialogBody}>
              <br />
              <p className={classes.cn}>
                <WrapperFormattedMessage id="modelManagement.unDefaultDialog.note" />
              </p>
              <div className={classes.btnGroup}>
                <Button className={classes.btnCancel} onClick={this.props.toggleunDefault}>
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

export default connect()(UnDefaultDialog)
