import React from 'react'
import { connect } from 'react-redux'
import { isEmpty, filter } from 'lodash'
import { Progress, Button } from 'antd'
import propTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import TestResult from '../TestResultCopy'
import FileUpload from './FileUpload'
import SearchImages from './SearchImages'
import classes from './Test.scss'
import {
  PAGE_STATUS,
  getImageByPath,
  getModelTestDetail,
  actionTrainModel,
  getModelDetail,
  getSelectInfo,
} from '../../modules'

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

export class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confidence: 60,
      inputValue: '',
      status: 'Ready',
      progress: 1,
      result: false,
      run: '',
      isLoad: false,
      message: '',
      messageColor: '',
      buttonLoading: false,
    }
    this.inputChange = this.inputChange.bind(this)
    this.BeginTesting = this.BeginTesting.bind(this)
    this.restart = this.restart.bind(this)
    this.destroy = this.destroy.bind(this)
    this.stopTesting = this.stopTesting.bind(this)
    this.mainPage = this.mainPage.bind(this)
    this.setButton = this.setButton.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getSelectInfo())
    this.props.dispatch(getModelTestDetail(this.props.rowDetail.id)) // 传 id
  }

  // 手动输入imagepath
  setButton() {
    const tmp = {
      sourceType: 'path',
      modelId: this.props.rowDetail.id,
      imageSource: this.state.inputValue.trim(),
    }
    this.props.dispatch(getImageByPath(tmp))
  }

  getActionTestModel = (tmp) => {
    this.setState({
      buttonLoading: true,
    })
    this.props.dispatch(actionTrainModel(tmp, () => {
      this.setState({
        buttonLoading: false,
      })
    }))
  }
  BeginTesting() {
    const tmp = {
      state: 'testing',
      command: 'start',
      modelId: this.props.rowDetail.id,
      viewId: this.props.rowDetail.viewId,
      deviceHash: this.props.rowDetail.deviceHash,
    }
    this.getActionTestModel(tmp)
  }
  restart() {
    const tmp = {
      state: 'testing',
      command: 'restart',
      modelId: this.props.rowDetail.id,
      viewId: this.props.rowDetail.viewId,
      deviceHash: this.props.rowDetail.deviceHash,
    }
    this.getActionTestModel(tmp)
  }
  stopTesting() {
    const tmp = {
      command: 'stop',
      state: 'testing',
      modelId: this.props.rowDetail.id,
      viewId: this.props.rowDetail.viewId,
      deviceHash: this.props.rowDetail.deviceHash,

    }
    this.getActionTestModel(tmp)
  }
  destroy() {
    const tmp = {
      state: 'testing',
      command: 'destroy',
      modelId: this.props.rowDetail.id,
      viewId: this.props.rowDetail.viewId,
      deviceHash: this.props.rowDetail.deviceHash,
    }
    this.getActionTestModel(tmp)
  }
  inputChange(e) {
    this.setState({
      inputValue: e.target.value,
    })
  }

  mainPage() {
    this.props.dispatch({
      type: PAGE_STATUS,
      payload: 'detailPage',
    })
    this.props.dispatch(getModelDetail(this.props.rowDetail.id))
  }

  render() {
    const { intl } = this.props
    const detail = filter(this.props.modelList, element => (
      element.id === this.props.rowDetail.id))[0]
    const { testingDetail = {} } = detail
    if (testingDetail.status === 'started' && testingDetail.percent * 1 === 1) {
      testingDetail.status = 'done'
    }
    let testingImageCountDiv = <div />
    if (this.props.testingImageCount !== 0) {
      testingImageCountDiv = <div style={{ padding: '5px 0 0 10px' }}>The number of images is {this.props.testingImageCount}</div>
    }
    return (<div className={classes['Test-container']} style={{ marginTop: '30px' }}>
      {
        (isEmpty(this.props.rowDetail)) ? null : (
          <div style={{ marginTop: '30px 0px' }}>
            <div className={classes.top} style={{ borderBottom: 'none' }}>
              <div>
                <div className={classes.test}>
                  <WrapperFormattedMessage id="modelManagement.modelTest" />
                </div>
                <div className={`${classes.strong}`}>
                  ID：{this.props.rowDetail.id}
                </div>
              </div>
              <div style={{ marginLeft: '40px', display: 'flex', width: '80%' }}>
                <div style={{ marginLeft: '40px', paddingTop: '3px', display: 'flex' }}>
                  <FileUpload rowDetail={this.props.rowDetail.id} that={this} />
                  <div style={{ color: this.state.messageColor }}>{this.state.message}</div>
                </div>
                <SearchImages rowDetail={this.props.rowDetail.id} />
                <span style={{ marginLeft: '40px', fontWeight: 'bold', paddingTop: '3px' }}><WrapperFormattedMessage id="labelingTool.setPath.imagePath" /></span>
                <input
                  className='pt-input'
                  style={{ marginLeft: '20px', width: '40%' }}
                  type='text'
                  onChange={this.inputChange}
                />
                <Button
                  type='primary'
                  className={'pt-button pt-intent-primary'}
                  style={{ marginLeft: '20px', height: '30px' }}
                  onClick={this.setButton}
                  disabled={this.state.inputValue === ''}
                >
                  <WrapperFormattedMessage id="modelManagement.test.set" />
                </Button>
                {testingImageCountDiv}
              </div>
            </div>
            <div className={classes.top2}>
              <div className={classes.rightTraning}>
                {(() => {
                  if (testingDetail.status === 'inited' ||
                    testingDetail.status === 'none' ||
                    testingDetail.status === 'initing') {
                    return (
                      <div style={{ display: 'flex', height: '30px' }}>
                        <Button
                          type='primary'
                          style={{ marginRight: '20px' }}
                          className={'pt-button pt-intent-primary'}
                          onClick={this.BeginTesting}
                          loading={this.state.buttonLoading}
                          disabled={this.props.testingImageCount === 0 && this.state.isLoad === false}
                        ><WrapperFormattedMessage id="modelManagement.test.start" /></Button>
                        <Button
                          type='primary'
                          className={'pt-button pt-intent-primary'}
                          onClick={this.mainPage}
                        ><WrapperFormattedMessage id="modelManagement.test.mainPage" /></Button>
                      </div>
                    )
                  } else if (testingDetail.status === 'starting' ||
                   testingDetail.status === 'started' ||
                   testingDetail.status === 'feeding' ||
                   testingDetail.status === 'feeded') {
                    return (
                      <div style={{ display: 'flex', height: '30px' }}>
                        <Button
                          type='primary'
                          style={{ marginRight: '20px' }}
                          onClick={this.stopTesting}
                          loading={this.state.buttonLoading}
                          className={'pt-button pt-intent-primary'}
                        ><WrapperFormattedMessage id="modelManagement.test.stop" /></Button>
                        <Button
                          type='primary'
                          className={'pt-button pt-intent-primary'}
                          onClick={this.mainPage}
                        ><WrapperFormattedMessage id="modelManagement.test.mainPage" /></Button>
                      </div>
                    )
                  } else if (testingDetail.status === 'stopping' ||
                    testingDetail.status === 'stopped' || testingDetail.status === 'error') {
                    return (
                      <div style={{ display: 'flex', height: '30px' }}>
                        <Button
                          type='primary'
                          style={{ marginRight: '20px' }}
                          className={'pt-button pt-intent-primary'}
                          loading={this.state.buttonLoading}
                          onClick={this.destroy}
                        ><WrapperFormattedMessage id="modelManagement.test.destroy" /></Button>
                        <Button
                          type='primary'
                          className={'pt-button pt-intent-primary'}
                          style={{ marginRight: '20px' }}
                          loading={this.state.buttonLoading}
                          onClick={this.restart}
                        ><WrapperFormattedMessage id="modelManagement.test.restart" /></Button>
                        <Button
                          type='primary'
                          className={'pt-button pt-intent-primary'}
                          onClick={this.mainPage}
                        ><WrapperFormattedMessage id="modelManagement.test.mainPage" /></Button>
                      </div>
                    )
                  } else if (testingDetail.status === 'done') {
                    return (
                      <div style={{ display: 'flex', height: '30px' }}>
                        <Button
                          type="primary"
                          className={'pt-button pt-intent-primary'}
                          style={{ marginRight: '20px' }}
                          loading={this.state.buttonLoading}
                          onClick={this.destroy}
                        ><WrapperFormattedMessage id="modelManagement.test.destroy" /></Button>
                        <Button
                          type="primary"
                          className={'pt-button pt-intent-primary'}
                          onClick={this.mainPage}
                        ><WrapperFormattedMessage id="modelManagement.test.mainPage" /></Button>
                      </div>
                    )
                  } else if (testingDetail.status === 'destroying' ||
                    testingDetail.status === 'destroyed') {
                    return (
                      <div style={{ display: 'flex', height: '30px' }}>
                        <Button
                          type="primary"
                          style={{ marginRight: '20px' }}
                          onClick={this.BeginTesting}
                          loading={this.state.buttonLoading}
                          className={'pt-button pt-intent-primary'}
                        ><WrapperFormattedMessage id="modelManagement.test.start" /></Button>
                        <Button
                          type="primary"
                          style={{ width: '100px' }}
                          className={'pt-button pt-intent-primary'}
                          onClick={this.mainPage}
                        ><WrapperFormattedMessage id="modelManagement.test.mainPage" /></Button>
                      </div>
                    )
                  }
                })()}
              </div>
            </div>
            <div className={classes.content}>
              <div className={classes.left}>
                <div className={classes.strong} style={{ marginLeft: '12%' }}>Status: {testingDetail.status}</div>
                <Progress
                  type="circle"
                  percent={(testingDetail.percent * 100).toFixed(0)}
                  format={percent => `${percent}%`}
                />
              </div>
              <div className={classes.center}>
                <div className={classes.time}>
                  <div className={classes.strong}><WrapperFormattedMessage id="modelManagement.test.time" /></div>
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.initializedAt' })}`, testingDetail.initializedAt).getRender()}
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.runningAt' })}`, testingDetail.runningAt).getRender()}
                  {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.willFinish' })}`, testingDetail.willFinish).getRender()}
                </div>
              </div>
              <div className={classes.right}>
                <div className={classes.strong}><WrapperFormattedMessage id="modelManagement.test.hardwareUsage" /></div>
                {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.GPU' })}`, testingDetail.gpu).getRender()}
                {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.GPUMemory' })}`, testingDetail.gpuMemory).getRender()}
                {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.GPUUtilization' })}`, testingDetail.gpuUtilization).getRender()}
                {new TextField(`${intl.formatMessage({ id: 'modelManagement.train.Temperature' })}`, testingDetail.temperature).getRender()}
              </div>
            </div>
          </div>
        )
      }
      {
        (testingDetail.percent * 1 === 1 &&
        (testingDetail.status === 'feeded' ||
        testingDetail.status === 'none' ||
        testingDetail.status === 'done' ||
        testingDetail.status === 'destroying' ||
        testingDetail.status === 'destroyed' ||
        testingDetail.status === 'stopping' ||
        testingDetail.status === 'stopped')) &&
          <TestResult id={this.props.rowDetail.id} />
      }
    </div>
    )
  }
}

Test.propTypes = {
  dispatch: propTypes.func.isRequired,
  rowDetail: propTypes.object.isRequired,
  modelList: propTypes.array.isRequired,
  testingImageCount: propTypes.number.isRequired,
  intl: propTypes.object.isRequired,
}
export default injectIntl(connect((state) => {
  return {
    token: state.auth.token,
    modelList: state.modelManagement.modelList,
    productList: state.modelManagement.productList,
    testingImageCount: state.modelManagement.testingImageCount,
  }
})(Test))
