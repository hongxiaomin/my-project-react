import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import Dialog from './Dialog'
import { GET_MODEL_OPTION, MODEL_STATUS, getSelectInfo, addProcessProduct } from '../../modules/ModelParing'

export class CreateModelParing extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      processId: '',
      productId: '',
      model: this.props.modelstatus,
      isTrialRun: true,
    }
  }
  componentDidMount() {
    this.props.dispatch(getSelectInfo())
  }

  handleSubmit() {
    const tmp = {
      modelId: this.state.model.toString(),
      processId: this.state.processId,
      productId: this.state.productId,
      isTrialRun: this.state.isTrialRun,
    }

    this.props.dispatch(addProcessProduct(tmp))
    this.setState({
      processId: '',
      productId: '',
      model: '',
      isTrialRun: true,
    })
    this.props.toggleDialog()
    this.props.dispatch({
      type: GET_MODEL_OPTION,
      payload: [],
    })
    this.props.dispatch({
      type: MODEL_STATUS,
      payload: '',
    })
  }

  render() {
    return (
      <div>
        <Dialog
          DialogTitle={this.props.intl.formatMessage({ id: 'modelPairing.createModelParing.createTitle' })}
          DialogID=''
          DialogBtnContent='Create'
          processId={this.props.processList}
          productId={this.props.productList}
          isOpen={this.props.isOpen}
          toggleDialog={this.props.toggleDialog}
          handleSubmit={this.handleSubmit}
          that={this}
          modelOption={this.props.modelOption}
          dispatch={this.props.dispatch}
          status={this.props.status}
          checkError={this.props.checkError}
          modelstatus={this.props.modelstatus}
        />
      </div>
    )
  }
}

CreateModelParing.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  modelOption: PropTypes.object.isRequired,
  status: PropTypes.bool.isRequired,
  modelstatus: PropTypes.string.isRequired,
  productList: PropTypes.array.isRequired,
  processList: PropTypes.array.isRequired,
  checkError: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
}

export default connect(
  ({ auth, modelParing, intl: { locale } }) => ({
    locale,
    token: auth.token,
    modelOption: modelParing.modelOption,
    status: modelParing.status,
    productList: modelParing.productList,
    processList: modelParing.processList,
    modelstatus: modelParing.modelstatus,
    checkError: modelParing.checkError,
  }),
)(injectIntl(CreateModelParing))
