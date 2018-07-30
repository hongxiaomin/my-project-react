import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import defaultMessages from 'locale/en-US.json'

const WrapperFormattedMessage = (props) => (<FormattedMessage
  {...props}
  defaultMessage={defaultMessages[props.id]}
/>)

WrapperFormattedMessage.propTypes = {
  id: PropTypes.string.isRequired,
}

export default WrapperFormattedMessage
