import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { isEmpty } from 'lodash'
import { Button, Dialog } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { Select, Input, Checkbox } from 'antd'
import classes from './EditDialog.scss'
import { CHANGE_STATUS, getModelDefect } from '../../modules/ModelParing'

const Option = Select.Option
export class DialogFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this)
    this.checkboxDefault = this.checkboxDefault.bind(this)
  }
  // 是否设置为试运行
  checkboxDefault(e) {
    this.props.that.setState({
      isTrialRun: e.target.checked,
    })
  }

  handleChange(type) {
    return (value) => {
      this.props.that.setState({
        [type]: value,
      }, () => {
        this.props.dispatch({
          type: CHANGE_STATUS,
          payload: true,
        })
        this.props.dispatch(getModelDefect(value))
      })
    }
  }

  render() {
    const modelList = this.props.modelList.filter(item => item.isPublished === true)
    let defectCode = []
    if (this.props.status && this.props.that.state.model !== '' && !isEmpty(this.props.modelDefect)) {
      this.props.modelDefect.map(item => (defectCode.push(item.defectCode)))
    }
    defectCode = defectCode.join('/')
    return (
      <div>
        {
          !isEmpty(this.props.dataDetail) &&
          <Dialog
            isOpen={this.props.editOpen}
            onClose={this.props.toggleEdit}
            className={classes.dialog}
          >
            <div className={classes.header}>
              <h6 className={this.props.DialogID === '' ? classes.onlyHeaderTitle : classes.headerTitle}>
                {this.props.DialogTitle}
              </h6>
            </div>
            <div className={classes.dialogBody}>
              <div className={classes.filter}>
                <WrapperFormattedMessage id='processId' />
                <Input
                  readOnly='true'
                  defaultValue={this.props.dataDetail.original.processName}
                />
              </div>
              <div className={classes.filter}>
                <WrapperFormattedMessage id='productId' />
                <Input
                  readOnly='true'
                  defaultValue={this.props.dataDetail.original.productName}
                />
              </div>
              <div className={classes.filter}>
                <WrapperFormattedMessage id='modelName' />
                <Select
                  showSearch
                  name='model'
                  style={{ width: 200 }}
                  defaultValue={this.props.dataDetail.original.modelName}
                  value={this.props.that.state.model}
                  onChange={this.handleChange('model')}
                >
                  {
                    !isEmpty(modelList) ?
                     modelList.map(item => (<Option
                       key={item.id.toString()}
                       value={item.id.toString()}
                     >{item.name}</Option>)) :
                     [].map(item => (<Option
                       key={item.id.toString()}
                       value={item.id.toString()}
                     >{item.name}</Option>))
                  }
                </Select>
              </div>
              {
                this.props.status ?
                  <div className={classes.filterDefect}>
                    Defect Code
                    <div style={{ width: '200px',
                      wordWrap: 'break-word',
                      backgroundColor: '#eee',
                      margin: '10px',
                      borderRadius: '5px',
                      padding: '10px' }}
                    >
                      {defectCode}
                    </div>
                  </div> :
                  <div />
              }
              <div className={classes.filter}>
                <WrapperFormattedMessage id='modelPairing.dialogFilter.trialRun' />
                <Checkbox
                  style={{ width: '200px', marginLeft: '50px' }}
                  defaultChecked={this.props.dataDetail.original.isTrialRun}
                  onChange={this.checkboxDefault}
                ><WrapperFormattedMessage id='modelPairing.dialogFilter.setAsTrialRun' /></Checkbox>
              </div>
              <div className={classes.btnGroup}>
                <Button className={classes.btnCancel} onClick={this.props.toggleEdit}>
                  <WrapperFormattedMessage id='cancel' />
                </Button>
                <Button
                  className={`pt-button pt-intent-primary ${classes.btnEdit}`}
                  onClick={this.props.handleSubmit}
                >
                  <WrapperFormattedMessage id='Save' />
                </Button>
              </div>
            </div>
          </Dialog>
        }
      </div>
    )
  }
}

DialogFilter.propTypes = {
  editOpen: PropTypes.bool.isRequired,
  DialogID: PropTypes.number.isRequired,
  DialogTitle: PropTypes.string.isRequired,
  dataDetail: PropTypes.object.isRequired,
  modelList: PropTypes.array.isRequired,
  status: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  that: PropTypes.object.isRequired,
  modelDefect: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(
  ({ auth, modelParing, intl: { locale } }) => ({
    locale,
    token: auth.token,
    modelDefect: modelParing.modelDefect,
  }),
)(DialogFilter)
