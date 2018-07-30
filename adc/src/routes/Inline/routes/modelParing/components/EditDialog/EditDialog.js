import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { isNumber } from 'lodash'
import DialogFilter from './DialogFilter'
import { CHANGE_STATUS, updateProcessProduct } from '../../modules/ModelParing'

export class EditDialog extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      model: this.props.dataDetail.original.modelName,
      isTrialRun: true,
    }
  }
  componentDidMount() {
    // this.props.dispatch(getEditModelOption())
  }

  handleSubmit() {
    let tmp
    if (!isNumber(this.props.dataDetail.original.productId)) {
      if (this.state.model === '') {
        tmp = {
          modelId: this.props.dataDetail.original.modelId.toString(),
          processId: this.props.dataDetail.original.processId.toString(),
          configId: this.props.dataDetail.original.configId.toString(),
          isTrialRun: this.state.isTrialRun,
        }
      } else {
        tmp = {
          modelId: this.state.model,
          processId: this.props.dataDetail.original.processId.toString(),
          configId: this.props.dataDetail.original.configId.toString(),
          isTrialRun: this.state.isTrialRun,
        }
      }
    } else {
      if (this.state.model === '') {
        tmp = {
          modelId: this.props.dataDetail.original.modelId.toString(),
          processId: this.props.dataDetail.original.processId.toString(),
          configId: this.props.dataDetail.original.configId.toString(),
          productId: this.props.dataDetail.original.productId.toString(),
          isTrialRun: this.state.isTrialRun,
        }
      } else {
        tmp = {
          modelId: this.state.model,
          processId: this.props.dataDetail.original.processId.toString(),
          configId: this.props.dataDetail.original.configId.toString(),
          productId: this.props.dataDetail.original.productId.toString(),
          isTrialRun: this.state.isTrialRun,
        }
      }
    }
    this.props.dispatch(updateProcessProduct(tmp))
    this.props.toggleEdit()
    this.props.dispatch({
      type: CHANGE_STATUS,
      payload: false,
    })
  }

  render() {
    const { intl } = this.props
    return (
      <div>
        <DialogFilter
          DialogTitle={intl.formatMessage({ id: 'modelPairing.createModelParing.editTitle' })}
          DialogID=''
          dataDetail={this.props.dataDetail}
          modelList={this.props.modelList}
          editOpen={this.props.editOpen}
          toggleEdit={this.props.toggleEdit}
          handleSubmit={this.handleSubmit}
          that={this}
          dispatch={this.props.dispatch}
          status={this.props.status}
        />
      </div>
    )
  }
}

EditDialog.propTypes = {
  editOpen: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  dataDetail: PropTypes.object.isRequired,
  modelList: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
}

export default connect(
  ({ auth, modelParing, intl: { locale } }) => ({
    locale,
    token: auth.token,
    editModelOption: modelParing.editModelOption,
    status: modelParing.status,
  }),
)(injectIntl(EditDialog))
