import React from 'react'
import { Slider } from '@blueprintjs/core'
import { showMessage } from 'Utils'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import classes from './ActionModel.scss'
import { COPY_MODEL_DETAIL } from '../../modules'

type Props = {
  dispatch: Function,
  iteration: String,
  lossRate: String,
  name: String,
  description: String,
  intl: Object,
};
export class OneStep extends React.Component {

  constructor(props) {
    super(props)
    this.handleSliderChange = this.handleSliderChange.bind(this)
    this.handleSliderChangeLossRate = this.handleSliderChangeLossRate.bind(this)
    this.state = {

    }
  }

  handleSliderChange(value) {
    this.props.dispatch({
      type: COPY_MODEL_DETAIL,
      data: {
        ...this.props,
        iteration: value,
      },
    })
    this.refs.iteration.value = value
  }

  handleSliderChangeLossRate(value) {
    this.props.dispatch({
      type: COPY_MODEL_DETAIL,
      data: {
        ...this.props,
        lossRate: +value.toFixed(5),
      },
    })
    this.refs.lossRate.value = +value.toFixed(5)
  }

  inputChange(type) {
    return (e) => {
      if (type === 'iteration' || type === 'lossRate') {
        this.props.dispatch({
          type: COPY_MODEL_DETAIL,
          data: {
            ...this.props,
            [type]: +e.target.value.toFixed(5),
          },
        })
      } else {
        this.props.dispatch({
          type: COPY_MODEL_DETAIL,
          data: {
            ...this.props,
            [type]: e.target.value,
          },
        })
      }
    }
  }

  inputBlur(type, intl) {
    return (e) => {
      if (type === 'iteration' || type === 'lossRate') {
        this.props.dispatch({
          type: COPY_MODEL_DETAIL,
          data: {
            ...this.props,
            [type]: +e.target.value,
          },
        })
        if (type === 'iteration') {
          const max = 100000
          const min = 100
          if (max < e.target.value || min > e.target.value) {
            showMessage({ text: `${intl.formatMessage({ id: 'modelManagement.oneStep.error' })}`, type: 'error' })
            e.target.value = 100
            this.props.dispatch({
              type: COPY_MODEL_DETAIL,
              data: {
                ...this.props,
                [type]: 100,
              },
            })
          }
        }
        if (type === 'lossRate') {
          const max = 0.1
          const min = 0.00001
          if (max < e.target.value || min > e.target.value) {
            showMessage({ text: `${intl.formatMessage({ id: 'modelManagement.oneStep.error' })}`, type: 'error' })
            e.target.value = 0.00001
            this.props.dispatch({
              type: COPY_MODEL_DETAIL,
              data: {
                ...this.props,
                [type]: 0.00001,
              },
            })
          }
        }
      } else {
        this.props.dispatch({
          type: COPY_MODEL_DETAIL,
          data: {
            ...this.props,
            [type]: e.target.value,
          },
        })
      }
    }
  }

  props: Props;
  render() {
    const { intl } = this.props
    return (
      <div className={classes['OneStep-container']}>
        <div className={classes.dialogBody}>
          <div>
            <div className={classes.filter}>
              <WrapperFormattedMessage
                id="modelManagement.modelList.numberOfIteration"
              />
              <Slider
                max={100000}
                min={100}
                stepSize={100}
                labelStepSize={100000}
                onChange={this.handleSliderChange}
                value={this.props.iteration || 100}
                className={classes.slider}
              />
              <input
                type='text'
                className={`pt-input ${classes.iterations}`}
                ref='iteration'
                value={this.props.iteration || 100}
                onChange={this.inputChange('iteration')}
                onBlur={this.inputBlur('iteration', intl)}
              />
            </div>
            <div className={classes.filter}>
              <WrapperFormattedMessage
                id="modelManagement.oneStep.lossRate"
              />
              <Slider
                min={0.00000}
                max={0.1}
                stepSize={0.00001}
                labelStepSize={0.1}
                onChange={this.handleSliderChangeLossRate}
                value={this.props.lossRate || 0.00001}
                className={classes.slider}
              />
              <input
                type='text'
                className={`pt-input ${classes.iterations}`}
                ref='lossRate'
                value={this.props.lossRate || 0.00001}
                onChange={this.inputChange('lossRate')}
                onBlur={this.inputBlur('lossRate', intl)}
              />
            </div>
            <div className={classes.filter}>
              <WrapperFormattedMessage
                id="modelName"
              />
              <input
                type='text'
                value={this.props.name}
                className={'pt-input'}
                onChange={this.inputChange('name')}
              />
            </div>
            <div className={classes.filter}>
              <WrapperFormattedMessage
                id="description"
              />
              <textarea
                style={{ width: '200px' }}
                value={this.props.description}
                className={'pt-input'}
                onChange={this.inputChange('description')}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(connect()(OneStep))

