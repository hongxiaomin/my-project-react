import React from 'react'
import { isEmpty } from 'lodash'
import { Button, Dialog } from '@blueprintjs/core'
import { Select, Input } from 'antd'
import classes from './EditDialog.scss'

const Option = Select.Option
type Props = {
  editOpen: Boolean,
  DialogID: Number,
  DialogTitle:String,
  dataDetail: Object,
  modelList: Array,
  toggleDialog: Function,
  handleSubmit: Function,
  that: Object,
  // dispatch: Function,
};
export class DialogFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(type) {
    return (value) => {
      this.props.that.setState({
        [type]: value,
      })
      // this.props.dispatch({
      //   type: CHANGE_STATUS,
      //   payload: true,
      // })
    }
  }

  props: Props;

  render() {
    return (
      <div>
        {
          !isEmpty(this.props.dataDetail) &&
          <Dialog
            isOpen={this.props.editOpen}
            onClose={this.props.toggleDialog}
            className={classes.dialog}
          >
            <div className={classes.header}>
              <h6 className={this.props.DialogID === '' ? classes.onlyHeaderTitle : classes.headerTitle}>
                {this.props.DialogTitle}
              </h6>
            </div>
            <div className={classes.dialogBody}>
              <div className={classes.filter}>
                Name
                <Input
                  readOnly='true'
                  defaultValue={this.props.dataDetail.serviceName}
                />
              </div>
              {/* <div className={classes.filter}>
                Device ID
                <Input
                  readOnly='true'
                  defaultValue={this.props.dataDetail.deviceId}
                />
              </div> */}
              <div className={classes.filter}>
                 Model
                 <Select
                   name='model'
                   style={{ width: 200 }}
                   placeholder="Please select"
                   onChange={this.handleChange('model')}
                 >
                   {
                     !isEmpty(this.props.modelList) ?
                     this.props.modelList.map(item => (<Option
                       key={item.id}
                     >{item.path}</Option>)) :
                     [].map(item => (<Option
                       key={item.id}
                     >{item.path}</Option>))
                   }
                 </Select>
              </div>
              <div className={classes.btnGroup}>
                <Button className={classes.btnCancel} onClick={this.props.toggleDialog}>
                 Cancel
                </Button>
                <Button
                  className={`pt-button pt-intent-primary ${classes.btnEdit}`}
                  onClick={this.props.handleSubmit}
                >
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
export default DialogFilter
