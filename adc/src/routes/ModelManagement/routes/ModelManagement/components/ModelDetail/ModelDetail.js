import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import Property from './PropertyDetail'
import classes from './ModelDetail.scss'
import {
  PAGE_STATUS,
} from '../../modules'

type Props = {
  dispatch: Function,
  rowDetail: Object,
  modelDetail: Object,
  trainingPercent: String,
  testingPercent: String,
  modelId: String,
  intl: Object,
};

export class TextField {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  getRenderNoWrap(btn) {
    return (
      <div className={classes.textField}>
        <div className={classes.key}>
          {this.key}
        </div>
        <div className={classes.valueNoWrap}>
          {this.value}
          {btn}
        </div>
      </div>
    )
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

export class ModelDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.toggelTrain = this.toggelTrain.bind(this)
    this.toggleTest = this.toggleTest.bind(this)
  }

  toggelTrain() {
    this.props.dispatch({
      type: PAGE_STATUS,
      payload: 'startTrainPage',
    })
  }
  toggleTest() {
    this.props.dispatch({
      type: PAGE_STATUS,
      payload: 'startTestPage',
    })
  }
  props: Props
  render() {
    const { intl } = this.props
    let traingingPercent
    let testingPercent
    if (this.props.trainingPercent !== '0' && this.props.modelId === this.props.rowDetail.id.toString()) {
      traingingPercent = `${(this.props.trainingPercent * 100).toFixed(0)}%`
    } else {
      traingingPercent = `${(this.props.modelDetail.trainingInfo.trainingProgress * 100).toFixed(0)}%`
    }
    if (this.props.testingPercent !== '0' && this.props.modelId === this.props.rowDetail.id.toString()) {
      testingPercent = `${(this.props.testingPercent * 100).toFixed(0)}%`
    } else {
      testingPercent = `${(this.props.modelDetail.testingInfo.testingProgress * 100).toFixed(0)}%`
    }
    return (
      <div className={classes.container}>
        <div className={classes['top-left']}>
          <span>
            <WrapperFormattedMessage id="modelManagement.ModelDetail.modelDetailInformation" />
          </span>
          <div>{this.props.rowDetail.name} / <WrapperFormattedMessage id="training" />
            {
              traingingPercent === '100%' ?
                <span style={{ color: 'rgb(102, 204, 0)' }}> <WrapperFormattedMessage id="complete" /> </span> :
                <span style={{ color: 'rgb(102, 204, 0)' }}> <WrapperFormattedMessage id="incomplete" /> </span>
            }
            / <WrapperFormattedMessage id="testing" />
            {
              testingPercent === '100%' ?
                <span style={{ color: 'rgb(102, 204, 0)' }}> <WrapperFormattedMessage id="complete" /> </span> :
                <span style={{ color: 'rgb(102, 204, 0)' }}> <WrapperFormattedMessage id="incomplete" /> </span>
            }
          </div>
        </div>
        <div className={classes.divContainer}>
          <div className={classes.singleDiv}>
            <div className={classes.title}>
              <WrapperFormattedMessage id="attribute" />
            </div>
            <div className={classes.detail}>
              {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.createTime' })}`, this.props.modelDetail.modelAttributes.createTime).getRenderNoWrap()}
              {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.pairedProcessID' })}`, this.props.modelDetail.modelAttributes.process.join(' / ')).getRenderNoWrap()}
              {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.pairedProductID' })}`, this.props.modelDetail.modelAttributes.product.join(' / ')).getRenderNoWrap()}
              {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.pairedDefect' })}`, this.props.modelDetail.modelAttributes.defect.join(' / ')).getRenderNoWrap()}
            </div>
            <Property
              data={this.props.modelDetail.modelAttributes}
              isDetail={this.props.rowDetail}
            />
          </div>
          <div className={classes.singleDiv}>
            <div className={classes.title}>
              <WrapperFormattedMessage id="training" />
            </div>
            {
              this.props.modelDetail.trainingInfo.trainingProgress === 1 ?
                <div className={classes.detail}>
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.trainingAt' })}`, this.props.modelDetail.trainingInfo.trainingBeginTime).getRender()}
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.doneAt' })}`, this.props.modelDetail.trainingInfo.trainingEndTime).getRender()}
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.progress' })}`, traingingPercent).getRender()}
                </div> :
                <div className={classes.detail}>
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.trainingAt' })}`, this.props.modelDetail.trainingInfo.trainingBeginTime).getRender()}
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.estimatedRemaining' })}`, this.props.modelDetail.trainingInfo.trainingEndTime).getRender()}
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.progress' })}`, traingingPercent).getRender()}
                </div>
            }
            <button
              style={{ width: '80px', position: 'absolute', bottom: '6%', right: '4%' }}
              type='button'
              onClick={this.toggelTrain}
              className={'pt-button pt-intent-primary'}
            >
              <WrapperFormattedMessage id="enter" />
            </button>
          </div>
          <div className={classes.singleDiv} style={{ borderRight: 'none' }}>
            <div className={classes.title}>
              <WrapperFormattedMessage id="testing" />
            </div>
            {
              this.props.modelDetail.testingInfo.testingProgress === 1 ?
                <div className={classes.detail}>
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.testingAt' })}`, this.props.modelDetail.testingInfo.testingBeginTime).getRender()}
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.doneAt' })}`, this.props.modelDetail.testingInfo.testingEndTime).getRender()}
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.progress' })}`, testingPercent).getRender()}
                </div> :
                <div className={classes.detail}>
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.testingAt' })}`, this.props.modelDetail.testingInfo.testingBeginTime).getRender()}
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.estimatedRemaining' })}`, this.props.modelDetail.testingInfo.TestingEndTime).getRender()}
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.ModelDetail.progress' })}`, testingPercent).getRender()}
                </div>
            }
            <button
              style={{ width: '80px', position: 'absolute', bottom: '6%', right: '4%' }}
              type='button'
              onClick={this.toggleTest}
              disabled={this.props.rowDetail.status === 'Idle' || this.props.rowDetail.status === 'Training' || this.props.rowDetail.status === 'None'}
              className={'pt-button pt-intent-primary'}
            >
              <WrapperFormattedMessage id="enter" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default injectIntl(connect(
  state => ({
    token: state.auth.token,
    pageStatus: state.modelManagement.pageStatus,
    modelDetail: state.modelManagement.modelDetail,
  }),
)(ModelDetail))
