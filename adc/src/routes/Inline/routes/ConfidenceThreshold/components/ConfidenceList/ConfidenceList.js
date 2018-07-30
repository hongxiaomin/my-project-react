import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import ReactTable from 'components/ADCTable'
import classes from './ConfidenceList.scss'

const activeRowStyle = {
  background: 'skyblue',
  color: '#fff',
  height: '35px',
  lineHeight: '20px',
}

export class ConfidenceList extends React.Component {
  constructor() {
    super()
    this.state = {
      highlightedIndex: -1,
      totalPages: null,
      loading: true,
      isOpen: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(row) {
    this.setState({
      isOpen: true,
    })
    this.props.isDetail(true, row)
  }

  render() {
    const { intl, confidenceList } = this.props

    return (
      <div style={{ margin: '30px 40px' }}>
        <div className={classes['top-left']}><WrapperFormattedMessage id='confidenceThreshold.confidenceList.searchResult' /></div>
        <ReactTable
          data={confidenceList}
          style={{
            height: '255px',
          }}
          columns={[
            {
              Header: intl.formatMessage({ id: 'serviceManagement.dialogFilter.model' }),
              accessor: 'modelName',
              style: {
                textAlign: 'center',
              },
            },
            {
              Header: intl.formatMessage({ id: 'processId' }),
              accessor: 'processName',
              style: {
                textAlign: 'center',
              },
            },
            {
              Header: intl.formatMessage({ id: 'productId' }),
              accessor: 'productName',
              style: {
                textAlign: 'center',
              },
            },
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
          getTrProps={(...params) => {
            const rowInfo = params[1]
            if (rowInfo) {
              return {
                style: (this.state.selectedIndex === rowInfo.index) ? activeRowStyle : { height: '35px', lineHeight: '20px' },
                onClick: () => {
                  this.setState({
                    selectedIndex: rowInfo.index,
                  })
                  this.handleClick(rowInfo.row)
                },
              }
            }
            return {}
          }}
        />
      </div>
    )
  }
}

ConfidenceList.propTypes = {
  intl: PropTypes.object.isRequired,
  confidenceList: PropTypes.array.isRequired,
  isDetail: PropTypes.func.isRequired,
}

export default connect(
  ({ auth, confidenceThreshold, intl: { locale } }) => ({
    locale,
    token: auth.token,
    confidenceList: confidenceThreshold.confidenceList,
  }),
)(injectIntl(ConfidenceList))
