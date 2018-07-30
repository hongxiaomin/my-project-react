import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import ActionModel from '../ActionModel'


export class CreateModel extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
    }
  }

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  render() {
    const { intl } = this.props
    return (
      <div>
        <button
          type='button'
          style={{ width: '80px' }}
          onClick={this.toggle}
          className={'pt-button pt-intent-primary'}
        >
          <WrapperFormattedMessage
            id="create"
          />
        </button>
        {
          this.state.visible &&
          <ActionModel
            title={intl.formatMessage({ id: 'modelManagement.createModel.createModel' })}
            toggle={this.toggle}
            visible={this.state.visible}
          />
        }
      </div>
    )
  }
}

CreateModel.propTypes = {
  intl: PropTypes.object.isRequired,
}

export default injectIntl(CreateModel)
