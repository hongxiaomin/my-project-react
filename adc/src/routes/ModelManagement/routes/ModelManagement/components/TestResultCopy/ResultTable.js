import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, remove, last } from 'lodash'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import ReactTable from 'components/ADCTable'
import {
  getTestResultList,
} from '../../modules'

export class ResultTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch(getTestResultList(this.props.id))
  }
  render() {
    if (!isEmpty(this.props.testResultList)) {
      const columns = [
        {
          Header: 'Defect Code',
          id: 'defectCode',
          accessor: d => d.defectCode,
        },
        {
          Header: 'Recall',
          id: 'recall',
          accessor: d => d.recall,
        },
      ]
      const keys = Object.keys(this.props.testResultList[0])
      remove(keys, n => (n === 'defectCode' || n === 'recall'))
      keys.map((item) => {
        return columns.splice(1, 0, { Header: item.toString(), accessor: item.toString() })
      })
      const lastData = last(this.props.testResultList)
      const data = this.props.testResultList.filter((item) => {
        return item.defectCode !== 'Replace Rate'
      })
      return (
        <div>
          <ReactTable
            style={{ margin: '10px 30px' }}
            className="-striped -highligh-t"
            defaultPageSize={data.length}
            showPagination={false}
            data={data}
            columns={columns}
            getTrProps={() => {
              return {
                style: { textAlign: 'center', height: '28px', lineHeight: '14px' },
              }
            }}
          />
          <div style={{ display: 'flex', width: '40%', margin: '30px auto', justifyContent: 'space-between' }}>
            <div><WrapperFormattedMessage id="modelManagement.resultTable.correctRateAvg" /> {lastData.correcRateAvg}</div>
            <div><WrapperFormattedMessage id="modelManagement.resultTable.errorRateAvg" /> {lastData.errorRateAvg}</div>
            <div><WrapperFormattedMessage id="modelManagement.resultTable.replaceRate" /> {lastData.replaceRate}</div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

ResultTable.propTypes = {
  testResultList: propTypes.array.isRequired,
  dispatch: propTypes.func.isRequired,
  id: propTypes.number.isRequired,
}
export default connect(
  state => ({
    token: state.auth.token,
    testResultList: state.modelManagement.testResultList,
  }),
)(ResultTable)
