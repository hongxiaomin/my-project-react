import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import ReactTable from 'react-table'

export const ADCTable = props => (<ReactTable
  {...props}
  previousText={props.intl.formatMessage({ id: 'table.previousText' })}
  nextText={props.intl.formatMessage({ id: 'table.nextText' })}
  loadingText={props.intl.formatMessage({ id: 'table.loadingText' })}
  noDataText={props.intl.formatMessage({ id: 'table.noDataText' })}
  pageText={props.intl.formatMessage({ id: 'table.pageText' })}
  ofText={props.intl.formatMessage({ id: 'table.ofText' })}
  rowsText={props.intl.formatMessage({ id: 'table.rowsText' })}
/>)

ADCTable.propTypes = {
  intl: PropTypes.object.isRequired,
}

export default injectIntl(ADCTable)
