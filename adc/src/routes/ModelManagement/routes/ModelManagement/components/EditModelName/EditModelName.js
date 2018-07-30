import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'
import { injectIntl } from 'react-intl'
import DialogFilter from './Dialog'
import {
  updateModel,
} from '../../modules'

type Props = {
  toggleEdit: Function,
  dataDetail: Object,
  editOpen: Boolean,
  dispatch: Function,
  intl: Object,
}

export class EditModelName extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      modelName: this.props.dataDetail.original.name,
      description: this.props.dataDetail.original.description,
    }
  }

  handleOk = () => {
    // 把获得的数据放到store中, 然后隐藏弹框
    const tmp = {
      modelId: this.props.dataDetail.original.id,
      modelName: this.state.modelName,
      description: this.state.description,
      actionType: 'update',
    }
    console.log('tmp', tmp)
    this.props.dispatch(updateModel(tmp))
    this.toggle()
  }

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    })
    this.props.toggleEdit(this.state.visible)
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
    this.props.toggleEdit(this.state.visible)
  }

  props: Props

  render() {
    const { intl } = this.props
    return (
      <div>
        <Modal
          title={intl.formatMessage({ id: 'modelManagement.actionModel.editModel' })}
          visible={this.props.editOpen}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          okText={intl.formatMessage({ id: 'Save' })}
        >
          <DialogFilter that={this} />
        </Modal>
      </div>
    )
  }
}

export default injectIntl(connect(
  state => ({
    token: state.auth.token,
  }),
)(EditModelName))
