import React from 'react'
import propTypes from 'prop-types'
import { showMessage } from 'Utils'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { Modal, Steps, Button, Spin } from 'antd'
import One from './OneStep'
import Two from './TwoStep'
import {
  copyModel,
  updateModel,
  createModel,
  COPY_MODEL_DETAIL,
} from '../../modules'

const Step = Steps.Step

export class ActionModel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      loading: false,
      confirmLoading: false,
      visible: this.props.visible,
    }
  }

  cb = () => {
    this.props.toggle()
    // 重置参数
    this.setState({
      step: 0,
      visible: false,
      confirmLoading: false,
    })
  }

  cb2 = () => {
    // 重置参数
    this.setState({
      loading: false,
      confirmLoading: false,
    })
  }

  handleOk = intl => () => {
    if (this.state.step === 0) {
      if (this.props.copyModelDetail.name === '' ||
      this.props.copyModelDetail.description === '') {
        showMessage({ text: `${intl.formatMessage({ id: 'modelManagement.addImportModel.informationErrir' })}`, type: 'warning' })
      } else {
        this.setState({
          step: 1,
        })
      }
    } else {
      this.setState({
        confirmLoading: true,
        loading: true,
      })
      // 把获得的数据放到store中, 然后隐藏弹框
      const tmp = {
        iterations: this.props.copyModelDetail.iteration,
        lossRate: this.props.copyModelDetail.lossRate,
        modelName: this.props.copyModelDetail.name,
        description: this.props.copyModelDetail.description,
        sourceType: this.props.copyModelDetail.sourceType,
        imageSource: this.props.copyModelDetail.sourceType === 'filter' ?
        this.props.copyModelDetail.imageSourceCondition :
        this.props.copyModelDetail.imageSourceCondition.path,
      }
      if (this.props.title === `${intl.formatMessage({ id: 'modelManagement.createModel.createModel' })}`) {
        this.props.dispatch(createModel(tmp, this.cb, this.cb2))
      } else if (this.props.title === `${intl.formatMessage({ id: 'modelManagement.actionModel.copyModel' })}`) {
        this.props.dispatch(copyModel(tmp, this.cb, this.cb2))
      } else {
        this.props.dispatch(updateModel({
          ...tmp,
          actionType: 'update',
          modelId: this.props.copyModelDetail.id,
        }, this.cb, this.cb2))
      }
    }
  }

  handleCancel = () => {
    this.props.dispatch({
      type: COPY_MODEL_DETAIL,
      data: {
        description: '',
        imageSourceCondition: {
          dateRange: {
            startTime: '',
            endTime: '',
          },
          path: '',
          othersCode: [],
          processId: '',
          productId: [],
          targetCode: [],
          targetCodeId: [],
          othersCodeId: [],
        },
        iteration: 100,
        lossRate: 0.00001,
        name: '',
        sourceType: 'path',
      },
    })
    this.cb()
  }

  back = () => {
    this.setState({
      step: 0,
    })
  }

  render() {
    const { intl } = this.props
    const content = [
      <One {...this.props.copyModelDetail} />,
      <Two
        title={this.props.title}
        dispatch={this.props.dispatch}
        copyModelDetail={this.props.copyModelDetail}
      />,
    ]
    // modal底部的按钮
    const footer = [
      <Button key="back" size="large" onClick={this.handleCancel}>
        <WrapperFormattedMessage id='cancel' />
      </Button>,
      <Button
        key="submit"
        type="primary"
        size="large"
        loading={this.state.confirmLoading}
        onClick={this.handleOk(intl)}
      >{this.state.step === 0 ? `${intl.formatMessage({ id: 'Next' })}` : `${intl.formatMessage({ id: 'Save' })}`}</Button>,
    ]
    if (this.state.step === 1) {
      footer.unshift(<Button key="prev" size="large" onClick={this.back} style={{ float: 'left' }}>
        <WrapperFormattedMessage
          id={intl.formatMessage({ id: 'Back' })}
        />
      </Button>)
    }

    return (<Modal
      width={600}
      title={this.props.title}
      visible={this.state.visible}
      footer={footer}
      maskClosable={false}
      onCancel={this.handleCancel}
    >
      <Steps current={this.state.step} size="small">
        <Step title={intl.formatMessage({ id: 'modelManagement.actionModel.parameters' })} />
        <Step title={intl.formatMessage({ id: 'modelManagement.actionModel.trainingImagePath' })} />
      </Steps>
      <div style={{ height: '20px' }} />
      <Spin spinning={this.state.loading}>
        {content[this.state.step]}
      </Spin>
    </Modal>)
  }
}

ActionModel.propTypes = {
  title: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
  dispatch: propTypes.func.isRequired,
  toggle: propTypes.func.isRequired,
  copyModelDetail: propTypes.object.isRequired,
  intl: propTypes.object.isRequired,
}

export default injectIntl(connect(
  state => ({
    token: state.auth.token,
    copyModelDetail: state.modelManagement.copyModelDetail,
  }),
)(ActionModel))
