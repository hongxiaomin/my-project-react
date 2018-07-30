import React from 'react'
import { assign } from 'lodash'
import classes from './EditModelName.scss'

type Props = {
  that: Object,
};
class Dialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  inputChange(type) {
    return (e) => {
      this.props.that.setState(assign({}, this.props.that.state, {
        [type]: e.target.value,
      }))
    }
  }

  props: Props;
  render() {
    return (
      <div className={classes['OneStep-container']}>
        <div className={classes.dialogBody}>
          <div>
            <div className={classes.filter}>
              Model Name:
              <input
                type='text'
                className={'pt-input'}
                value={this.props.that.state.modelName}
                onChange={this.inputChange('modelName')}
              />
            </div>
            <div className={classes.filter}>
              Description:
              <textarea
                style={{ width: '200px' }}
                className={'pt-input'}
                value={this.props.that.state.description}
                onChange={this.inputChange('description')}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dialog
