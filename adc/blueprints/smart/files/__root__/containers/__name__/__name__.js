import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const propTypes = {

}

export class <%= pascalEntityName %> extends Component {
  render() {
    return (
      <div></div>
    )
  }
}

<%= pascalEntityName %>.propTypes = propTypes

export default connect()(<%= pascalEntityName %>)
