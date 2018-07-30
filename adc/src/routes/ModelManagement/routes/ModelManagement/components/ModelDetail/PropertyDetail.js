import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import classes from './ModelDetail.scss'

type Props = {
  isDetail: Object,
  data: Object,
  intl: Object,
}
export class TextField {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  getRender(btn) {
    return (
      <div className={classes.textField}>
        <div className={classes.key}>
          {this.key}
        </div>
        <div className={classes.value}>
          {this.value}
          {btn}
        </div>
      </div>
    )
  }
}
export class PropertyDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
    }
  }

  componentDidMount() {
    // this.props.dispatch(getModelList())
  }

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  props: Props

  render() {
    const { intl } = this.props
    const footer = [
      <Button key="back" size="large" onClick={this.handleCancel}>
        <WrapperFormattedMessage id="cancel" />
      </Button>,
    ]
    return (
      <div>
        <button
          style={{ position: 'absolute', right: '4%', bottom: '6%' }}
          type='button'
          onClick={this.toggle}
          disabled={this.props.isDetail.status === 'Idle' || this.props.isDetail.status === 'Training'}
          className={'pt-button pt-intent-primary'}
        >
          <WrapperFormattedMessage id="modelManagement.ModelDetail.showMore" />
        </button>
        <Modal
          closable={false}
          title={intl.formatMessage({ id: 'modelManagement.ModelDetail.modelDetails' })}
          footer={footer}
          visible={this.state.visible}
        >
          <div className={classes.detail}>
            {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.createTime' })}`, this.props.data.createTime).getRender()}
            {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.pairedProcessID' })}`, this.props.data.process.join(' / ')).getRender()}
            {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.pairedProductID' })}`, this.props.data.product.join(' / ')).getRender()}
            {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.pairedDefect' })}`, this.props.data.defect.join(' / ')).getRender()}
          </div>
        </Modal>
      </div>
    )
  }
}

export default injectIntl(connect(
  state => ({
    token: state.auth.token,
  }),
)(PropertyDetail))
