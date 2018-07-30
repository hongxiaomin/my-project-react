import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import ReactTable from 'components/ADCTable'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { getQueueStatus } from 'Utils'
import { Button, Popconfirm, Icon, Checkbox } from 'antd'
import { queueAction, getQueueList, resetService } from '../../modules/Service/'
import classes from './QueueList.scss'


const CheckboxGroup = Checkbox.Group
export class Table extends React.Component {
  constructor(props) {
    super(props)

    const { startTime, endTime } = this.formatCondition(this.props.condition)
    this.filterElemOffset = { top: 'auto', left: 'auto' }
    this.state = {
      highlightedIndex: -1,
      expanded: {},
      expandedObject: {},
      startTime,
      endTime,
      pageSize: window.localStorage.getItem('pageSize') || 5, // 每页多少条
      pageNow: 0, // 当前页
      filter: false,
      statusFilterData: getQueueStatus(),
    }
  }

  componentWillReceiveProps(nextProps) {
    const { startTime, endTime } = this.formatCondition(nextProps.condition)
    if (this.state.startTime !== startTime || this.state.endTime !== endTime) {
      // 获取数据
      const { pageSize, pageNow, statusFilterData } = this.state
      this.setState({
        startTime,
        endTime,
      })
      this.props.dispatch(getQueueList({
        pageSize,
        pageNow,
        startTime,
        endTime,
        status: JSON.stringify(statusFilterData),
      }))
    }

    // 计算当前列表展开的位置
    const indexs = []
    const messageIds = Object.keys(this.state.expandedObject)
    const expandedObject = {}

    nextProps.queueList.forEach((item, i) => {
      if (messageIds.includes(item.messageId.toString())) {
        indexs.push(i)
        expandedObject[item.messageId] = 1
      }
    })

    if (indexs.length) {
      const expanded = {}
      indexs.forEach((index) => {
        expanded[index] = {}
      })

      this.setState({
        expanded,
        expandedObject,
      })
    } else {
      this.setState({
        expanded: {},
        expandedObject: {},
      })
    }
  }

  getQueueButtonColor = (job, isLoading) => {
    if (job.messageStatus === 'received' && !isLoading) {
      return '#0099FF'
    }

    return ''
  }

  getGlassButtonColor = (glass, jobStatus, isLoading) => {
    if (glass.glassStatus === 'waiting' && (jobStatus === 'waiting' || jobStatus === 'running') && !isLoading) {
      return '#0099FF'
    }
    return ''
  }

  getGlassColumns = (job) => {
    const { intl } = this.props
    const columnsStyle = { textAlign: 'center' }
    const columns = [
      {
        Header: intl.formatMessage({ id: 'serviceManagement.queueList.glassId' }),
        accessor: 'glassName',
        minWidth: 'auto',
        resizable: false,
        style: { ...columnsStyle },
      },
      {
        Header: intl.formatMessage({ id: 'serviceManagement.queueList.status' }),
        accessor: 'glassStatus',
        minWidth: 'auto',
        width: 80,
        resizable: false,
        style: { ...columnsStyle },
        Cell: row => (
          <div style={{
            width: '100%',
            color: (() => {
              switch (row.value.toLowerCase()) {
                case 'done': return '#66cc00'
                case 'processing': return 'orange'
                default: return ''
              }
            })(),
          }}
          >{row.value}
          </div>
        ),
      },
    ]
    if (this.props.showAction) {
      columns.push({
        Header: intl.formatMessage({ id: 'serviceManagement.queueList.action' }),
        minWidth: 'auto',
        width: 45,
        resizable: false,
        style: { ...columnsStyle },
        Cell: (row) => {
          const isLoading = this.props.loading.includes(`glass_${row.original.glassId}`)
          const color = this.getGlassButtonColor(row.original,
            job.original.messageStatus, isLoading)
          return (<Button
            icon={isLoading ? 'loading' : 'caret-right'}
            title={intl.formatMessage({ id: 'serviceManagement.queueList.startJudging' })}
            disabled={!color}
            style={{
              color,
              border: 'none',
              background: 'none',
            }}
            onClick={this.handeleGlasses(row, isLoading)}
          />)
        },
      })
    }
    return columns
  }

  filterClose = () => {
    this.setState({
      filter: false,
    })
    document.removeEventListener('click', this.filterClose)
  }

  filterToggle = (e) => {
    e.nativeEvent.stopImmediatePropagation()
    this.setState({
      filter: !this.state.filter,
    })
    if (!this.state.filter) {
      document.addEventListener('click', this.filterClose)
    }
  }

  filterChange = (v) => {
    this.setState({
      statusFilterData: v,
    })
  }

  boxChange = (e) => {
    e.nativeEvent.stopImmediatePropagation()
  }

  filterOk = () => {
    const { pageSize, pageNow, startTime, endTime, statusFilterData } = this.state
    this.props.dispatch(getQueueList({
      pageSize,
      pageNow,
      startTime,
      endTime,
      status: JSON.stringify(statusFilterData),
    }))
  }

  formatCondition = condition => ({
    startTime: condition[0],
    endTime: condition[1],
  })

  handleQueue = (row, isLoading) => () => {
    if (row.original.messageStatus !== 'received' || isLoading) return
    this.props.dispatch(queueAction({
      type: 'message',
      id: row.original.messageId.toString(),
    }))
  }

  handeleGlasses = (row, isLoading) => () => {
    if (row.original.glassStatus !== 'waiting' || isLoading) return
    this.props.dispatch(queueAction({
      type: 'glass',
      id: row.original.glassId.toString(),
    }))
  }

  handleExpandedChange = (newExpanded, index) => {
    const expanded = Object.assign({}, newExpanded)
    const expandedObject = Object.assign({}, this.state.expandedObject)
    if (!expanded[index]) {
      delete expandedObject[this.props.queueList[index].messageId]
    } else {
      expandedObject[this.props.queueList[index].messageId] = 1
    }
    this.setState({
      expanded,
      expandedObject,
    }, () => {
      console.log(this.state.expanded, this.state.expandedObject)
    })
  }

  handlePageChange = (pageNow) => {
    // 传入当前的页码数， 还有其他的一些参数
    const { pageSize, startTime, endTime, statusFilterData } = this.state
    this.props.dispatch(getQueueList({
      pageNow,
      pageSize,
      startTime,
      endTime,
      status: JSON.stringify(statusFilterData),
    }))
    this.setState({
      pageNow,
      expanded: {},
      expandedObject: {},
    })
  }

  handlePageSize = (pageSize, pageNow) => {
    window.localStorage.setItem('pageSize', pageSize)
    // 当更改pageSize的时候要注意， 当前页和每页条数， 超过总数的情况
    // 先做成， 改变每页条数， 当前页变成0
    const { startTime, endTime, statusFilterData } = this.state
    this.setState({
      pageNow: 0,
      pageSize,
    })

    this.props.dispatch(getQueueList({
      pageNow: 0,
      pageSize,
      startTime,
      endTime,
      status: JSON.stringify(statusFilterData),
    }))
  }

  handleSorted = (newSorted, column, shiftKey) => {
    // shiftKey 会把排序删掉
    if (shiftKey) return
    const { pageSize, pageNow, startTime, endTime, statusFilterData } = this.state
    const sorted = newSorted[0] || {}
    const field = sorted.id
    const desc = sorted.desc

    this.props.dispatch(getQueueList({
      pageSize,
      pageNow,
      startTime,
      endTime,
      field,
      desc,
      status: JSON.stringify(statusFilterData),
    }))
  }

  cell = name => ({ original }) => <span title={original[name]}>{original[name]}</span>

  reset = row => () => {
    const { pageSize, pageNow, startTime, endTime, statusFilterData } = this.state
    this.props.dispatch(resetService({
      messageId: row.original.messageId.toString(),
    }, {
      pageSize,
      pageNow,
      startTime,
      endTime,
      status: JSON.stringify(statusFilterData),
    }))
  }

  filterReset = () => {
    this.setState({
      statusFilterData: getQueueStatus(),
    }, () => {
      const { pageSize, pageNow, startTime, endTime, statusFilterData } = this.state
      this.props.dispatch(getQueueList({
        pageNow,
        pageSize,
        startTime,
        endTime,
        status: JSON.stringify(statusFilterData),
      }))
    })
  }

  render() {
    const { intl } = this.props
    const fitlerElem = (<div styleName="filter-elem-w">
      <span><WrapperFormattedMessage id="serviceManagement.queueList.status" /></span>
      <Icon
        type="filter"
        onClick={this.filterToggle}
        style={{
          cursor: 'pointer',
          fontSize: 16,
          position: 'relative',
          left: 3,
          top: 4,
        }}
      />
      <div
        styleName="filter-elem"
        style={{
          display: this.state.filter ? 'block' : 'none',
          top: this.filterElemOffset.top + 10,
        }}
        onClick={this.boxChange}
      >
        <CheckboxGroup
          defaultValue={this.state.statusFilterData}
          value={this.state.statusFilterData}
          onChange={this.filterChange}
        >
          {getQueueStatus().map((item, i) => (<p key={item}><Checkbox key={item} value={item}>{item}</Checkbox></p>))}
        </CheckboxGroup>
        <p styleName="cut-off" />
        <a
          onClick={this.filterOk}
          style={{
            float: 'left',
          }}
        >OK</a>
        <a
          onClick={this.filterReset}
          style={{
            float: 'right',
          }}
        ><WrapperFormattedMessage id="reset" /></a>
      </div>
    </div>)
    const columnsStyle = { textAlign: 'center' }
    const queueColumns = [
      {
        Header: intl.formatMessage({ id: 'processId' }),
        accessor: 'processName',
        minWidth: 'auto',
        resizable: false,
        Cell: this.cell('processName'),
        style: { ...columnsStyle },
      },
      {
        Header: intl.formatMessage({ id: 'productId' }),
        accessor: 'productName',
        minWidth: 'auto',
        resizable: false,
        Cell: this.cell('productName'),
        style: { ...columnsStyle },
      },
      {
        Header: intl.formatMessage({ id: 'serviceManagement.dialogFilter.model' }),
        accessor: 'modelName',
        minWidth: 'auto',
        resizable: false,
        Cell: this.cell('modelName'),
        style: { ...columnsStyle },
      },
      {
        Header: fitlerElem,
        accessor: 'messageStatus',
        minWidth: 'auto',
        width: 80,
        resizable: false,
        style: { ...columnsStyle },
        Cell: row => (
          <div style={{
            width: '100%',
            color: (() => {
              switch (row.value.toLowerCase()) {
                case 'done': return '#66cc00'
                case 'received': return 'orange'
                case 'running': return '#0099FF'
                default: return ''
              }
            })(),
          }}
          >{row.value}
          </div>
        ),
      },
      {
        Header: intl.formatMessage({ id: 'serviceManagement.queueList.arrivalTime' }),
        minWidth: 'auto',
        width: 120,
        resizable: false,
        accessor: 'arrivalTime',
        Cell: this.cell('arrivalTime'),
        style: { ...columnsStyle },
      },
    ]

    if (this.props.showAction) {
      queueColumns.push({
        Header: intl.formatMessage({ id: 'userAndLicenseManagement.license.action' }),
        minWidth: 'auto',
        width: 80,
        resizable: false,
        style: { ...columnsStyle },
        Cell: (row) => {
          const isLoading = this.props.loading.includes(`message_${row.original.messageId}`)
          return (<p>
            <Button
              icon={isLoading ? 'loading' : 'caret-right'}
              title={intl.formatMessage({ id: 'serviceManagement.queueList.chooseTask' })}
              disabled={isLoading || !this.getQueueButtonColor(row.original, isLoading)}
              style={{
                color: this.getQueueButtonColor(row.original, isLoading),
                border: 'none',
                background: 'none',
              }}
              onClick={this.handleQueue(row, isLoading)}
            />
            <Popconfirm
              title={intl.formatMessage({ id: 'serviceManagement.queueList.resetData' })}
              okText={intl.formatMessage({ id: 'yes' })}
              cancelText={intl.formatMessage({ id: 'no' })}
              placement="left"
              onConfirm={this.reset(row)}
            >
              <button
                style={{ fontSize: '14px' }}
                type="button"
                className={`pt-button pt-minimal pt-icon-history ${classes.reset}`}
                title={intl.formatMessage({ id: 'reset' })}
              />
            </Popconfirm>
          </p>)
        },
      })
    }

    const { queueList: list } = this.props

    return (
      <div>
        <ReactTable
          manual
          data={list}
          showPageJump
          sortable={false}
          pages={Math.ceil(this.props.queueListLength / this.state.pageSize)}
          className="-striped -highlight"
          defaultPageSize={this.state.pageSize}
          columns={queueColumns}
          expanded={this.state.expanded}
          pageSizeOptions={[5, 10, 15, 20, 30, 40, 50]}
          onExpandedChange={this.handleExpandedChange}
          onPageChange={this.handlePageChange}
          onPageSizeChange={this.handlePageSize}
          onSortedChange={this.handleSorted}
          getTrProps={() => ({ style: { height: '32px' } })}
          SubComponent={row => (<div style={{ padding: '10px' }}>
            <ReactTable
              data={row.original.glassList}
              columns={this.getGlassColumns(row)}
              defaultPageSize={row.original.glassList.length > 5
                ? row.original.glassList.length
                : 5
              }
              showPagination={false}
              getTrProps={() => ({ style: { height: '32px' } })}
              style={{
                height: '195px',
              }}
            />
          </div>)}

          style={{
            maxHeight: '475px',
            height: this.state.pageSize > 10 ? '475px' : 'auto',
          }}
        />
        <p style={{ lineHeight: '40px' }}><WrapperFormattedMessage id='totalNumber' /> {this.props.queueListLength}</p>
      </div>
    )
  }
}

Table.propTypes = {
  queueList: PropTypes.array.isRequired,
  queueListLength: PropTypes.number.isRequired,
  showAction: PropTypes.bool.isRequired,
  condition: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
}

export default connect(
  ({ auth, service, intl: { locale } }) => ({
    locale,
    token: auth.token,
    queueList: service.queueList,
    queueListLength: service.queueListLength,
    loading: service.loading.queue,
  }))(injectIntl(Table))
