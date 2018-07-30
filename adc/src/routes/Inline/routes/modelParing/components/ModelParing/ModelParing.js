/* eslint import/no-named-as-default: 0 */
import React from 'react'
import { connect } from 'react-redux'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { Select } from 'antd'
import { assign } from 'lodash'
import classes from './ModelParing.scss'
import ModelSettingList from '../ModelSettingList'
import SearchCondition from '../../../SearchCondition'
import CreateModelParing from '../CreateModelParing'
import { CHANGE_STATUS, GET_MODEL_OPTION,
   getSelectInfo,
   getModelSettingList,
   getModelList,
   MODEL_STATUS,
   CHECK_ERROR } from '../../modules/ModelParing'

type Props = {
  dispatch: Function,
  processList: Array,
  productList: Array,
  modelList: Array,
};


export class ModelParing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDialogOpen: false,
      processId: '',
      productId: '',
      modelId: '',
    }
  }

  componentDidMount() {
    this.props.dispatch(getSelectInfo())
    this.props.dispatch(getModelList())
  }
  handleChange = type => (value) => {
    this.setState({
      [type]: value,
    })
  }
  search = () => {
    const tmp = {
      processId: this.state.processId,
      productId: this.state.productId,
      modelId: this.state.modelId,
      queryType: 'list',
    }
    this.props.dispatch(getModelSettingList(tmp))
  }

  toggleDialog = () => {
    this.setState({
      isDialogOpen: !this.state.isDialogOpen,
    })
    this.props.dispatch({
      type: CHANGE_STATUS,
      payload: false,
    })
    this.props.dispatch({
      type: GET_MODEL_OPTION,
      payload: [],
    })
    this.props.dispatch({
      type: MODEL_STATUS,
      payload: '',
    })
    this.props.dispatch({
      type: CHECK_ERROR,
      payload: '',
    })
  }
  props: Props
  render() {
    const { processId, productId, modelId } = this.state
    const filter = []
    this.props.modelList.forEach((item) => {
      if (item.isPublished === true) {
        filter.push(item)
      }
    })
    const model = filter.map(item => ((item.isDefault) ? assign({}, item, { name: `${item.name}(Default Model)` }) : item))
    return (
      <div>
        <div className={classes.container}>
          <div className={classes.top}>
            <h4 className={classes.model}><WrapperFormattedMessage id='modelPairing.modelParing.modelPairingSetting' /></h4>
            <button
              style={{ width: '80px' }}
              type='button'
              onClick={this.toggleDialog}
              className={'pt-button pt-intent-primary'}
            >
              <WrapperFormattedMessage id='create' />
            </button>
          </div>
          <SearchCondition
            processList={this.props.processList}
            productList={this.props.productList}
            modelList={model}
            handleChange={this.handleChange}
            searchChange={this.search}
            isClick={false}
          />
        </div>
        <ModelSettingList
          modelList={this.props.modelList}
          searchParam={{
            processId,
            productId,
            modelId,
          }}
        />
        <CreateModelParing
          toggleDialog={this.toggleDialog}
          isOpen={this.state.isDialogOpen}
        />
      </div>
    )
  }
}
export default connect(
  ({ auth, modelParing, intl }) => ({
    intl,
    token: auth.token,
    processList: modelParing.processList,
    productList: modelParing.productList,
    modelOption: modelParing.modelOption,
    modelList: modelParing.modelList,
  }),
)(ModelParing)
