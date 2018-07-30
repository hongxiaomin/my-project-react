import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isNumber } from 'lodash'
import { Button, Dialog } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { updateProcessProduct, getModelSettingList } from '../../modules/ModelParing'
import classes from './Dialog.scss'

export class TrialRun extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    let tmp
    if (!isNumber(this.props.dataDetail.original.productId)) {
      tmp = {
        modelId: this.props.dataDetail.original.modelId.toString(),
        processId: this.props.dataDetail.original.processId.toString(),
        configId: this.props.dataDetail.original.configId.toString(),
        isTrialRun: !this.props.dataDetail.original.isTrialRun,
      }
    } else {
      tmp = {
        modelId: this.props.dataDetail.original.modelId.toString(),
        processId: this.props.dataDetail.original.processId.toString(),
        configId: this.props.dataDetail.original.configId.toString(),
        productId: this.props.dataDetail.original.productId.toString(),
        isTrialRun: !this.props.dataDetail.original.isTrialRun,
      }
    }

    this.props.dispatch(updateProcessProduct(tmp, () => {
      this.props.dispatch(getModelSettingList({ queryType: 'list', ...this.props.searchParam }))
    }))
    this.props.trialRun()
  }

  render() {
    return (
      <div className={classes['Dialog-container']}>
        {
          !isEmpty(this.props.dataDetail) &&
          <Dialog
            isOpen={this.props.trialRunOpen}
            onClose={this.props.trialRun}
            className={classes.dialog}
          >
            <div className={classes.header}>
              <h6 className={classes.headerTitle}>Confirmation</h6>
            </div>
            <div className={classes.dialogBody}>
              <br />
              {
                !this.props.dataDetail.original.isTrialRun ?
                  <p className={classes.cn}>{'Do you set the model as trial run?'}</p> :
                  <p className={classes.cn}>{'Do you cancel set the model as trial run?'}</p>
              }

              <div className={classes.btnGroup}>
                <Button className={classes.btnCancel} onClick={this.props.trialRun}>
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

TrialRun.propTypes = {
  dataDetail: PropTypes.object.isRequired,
  searchParam: PropTypes.object.isRequired,
  trialRunOpen: PropTypes.bool.isRequired,
  trialRun: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(TrialRun)
