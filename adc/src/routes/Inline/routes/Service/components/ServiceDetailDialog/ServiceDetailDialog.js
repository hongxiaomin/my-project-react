import React from 'react'
import { connect } from 'react-redux'
import classes from './ServiceDetailDialog.scss'
import DialogFilter from '../DialogFilter'
import OurToaster from '../../../../components/OurToaster'

type Props = {
  isOpen: boolean,
  DialogID: Number,
  DialogName: String,
  modelId: Number,
  kernelId: Number,
  toggleDialog: Function,
  getModel: Function,
  getServiceDetail: Function,
  that: Object,
  modelList: Array
};
export class ServiceDetailDialog extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cb = this.cb.bind(this)
    this.state = {
      name: undefined,
      modelId: undefined,
      isChanged: false,
      kernelIds: [],
    }
  }

  componentDidMount() {
    // this.props.getModel()
  }

  handleSubmit() {
    const tmp = {
      name: this.state.name || this.props.DialogName,
      modelId: this.state.modelId || this.props.modelId,
      kernelId: this.props.kernelId,
      dataSource: '/image/T00B351BP/',
      description: 'Test',
      id: this.props.DialogID,
    }
    this.props.getServiceDetail(tmp, this.cb)
  }

  cb(data) {
    if (data.code === 200000) {
      this.props.that.isEdit = true
      this.props.toggleDialog()
      OurToaster.show({ message: '更新成功！' })
    } else {
      OurToaster.show({ message: '更新失败！' })
    }
  }

  props: Props;

  render() {
    return (
      <div className={classes['ServiceDetailDialog-container']}>
        <DialogFilter
          DialogTitle='Service Detail'
          DialogID={this.props.DialogID}
          modelId={(this.state.modelId === undefined && this.props.modelId) || this.state.modelId}
          DialogName={this.props.DialogName}
          DialogBtnContent='Edit'
          isOpen={this.props.isOpen}
          toggleDialog={this.props.toggleDialog}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          getModel={this.props.getModel}
          isChanged={this.state.isChanged}
          that={this}
          modelList={this.props.modelList}
          kernelId={this.props.kernelId}
          kernelIds={[this.props.kernelId]}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    modelList: state.service.modelList,
  }),
)(ServiceDetailDialog)
