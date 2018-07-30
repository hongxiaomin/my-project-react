import React from 'react'
import { connect } from 'react-redux'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import classes from './ServiceManagementEdit.scss'
import ServiceDetailDialog from '../ServiceDetailDialog'

type Props = {
  data: Object,
  ojsData: Object,
  statusType: Object,
  getModel: Function,
  getServiceDetail: Function,
};
export class ServiceManagementEdit extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
    this.isEdit = false

    this.state = {
      data: this.props.data,
    }
  }

  componentWillReceiveProps(nextProps) {
    // After the service is edited successfully, the input box is reset
    if (this.isEdit) {
      this.isEdit = false
      this.setState({
        data: {},
      })
    } else {
      this.setState({
        data: nextProps.data,
      })
    }
  }

  handleChange(type) {
    return (e) => {
      const { data } = this.state
      data[type] = e.target.value
      this.setState({
        data,
      })
    }
  }

  toggleDialog() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  props: Props;

  render() {
    const showField = {
      Name: 'name',
      Status: 'status',
      'Model ID': 'modelId',
      'Data Source': 'dataSource',
      'GPU ID': 'deviceId',
    }

    return (
      <div className={classes['ServiceManagementEdit-container']}>
        <section className={`${classes.title}`}>
          <h4><WrapperFormattedMessage id='serviceManagement.edit.serviceDetail' /></h4>
          <p><strong>ID {this.state.data.id ? this.state.data.id : ''}</strong></p>
          <button
            disabled={!this.state.data.id}
            type='button'
            onClick={this.toggleDialog}
            className={`${classes.edit} pt-button pt-intent-primary pt-large`}
          ><WrapperFormattedMessage id='serviceManagement.edit.editMode' /></button>
          <ServiceDetailDialog
            isOpen={this.state.isOpen}
            toggleDialog={this.toggleDialog}
            data={this.props.ojsData}
            getModel={this.props.getModel}
            DialogID={this.state.data.id}
            kernelId={this.state.data.kernelId}
            modelId={this.state.data.modelId}
            DialogName={this.state.data.name}
            getServiceDetail={this.props.getServiceDetail}
            that={this}
          />
        </section>
        <section>
          <div className={classes['form-group']}>
            {(() => {
              const names = Object.keys(showField)
              const fields = Object.values(showField)
              const { data } = this.state

              return names.map((name, i) => {
                let placeholder = name
                if (data[fields[i]] && fields[i] === 'status') {
                  placeholder = this.props.statusType[this.state.data[fields[i]]]
                } else if (data[fields[i]]) {
                  placeholder = this.state.data[fields[i]]
                }

                return (
                  <div className={classes['form-group-item']} key={`form-group-item-${i}`}>
                    <div className={classes.left}>
                      {name}
                    </div>
                    <div className={classes.right}>
                      <input
                        disabled
                        className={`${classes['right-input']} pt-input`}
                        type='text'
                        placeholder={placeholder}
                        onChange={this.handleChange(fields[i])}
                      />
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        </section>
      </div>
    )
  }
}

export default connect(
  ({ auth, intl: { locale } }) => ({
    locale,
    userRole: auth.userRole,
  }),
)(ServiceManagementEdit)
