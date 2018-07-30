import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import ReactTable from 'components/ADCTable'
import Title from './Title'
import './DefectCode.scss'
import { getSelectInfo, UPDATE_DEFAULT_DEFECT_CODE_LIST, updateSelectedDefaultDefect } from '../../modules'


export class DefectCode extends React.Component {
  constructor() {
    super()
    this.state = {
      index: undefined,
    }
  }

  componentDidMount() {
    this.props.dispatch(getSelectInfo())
  }

  handleTrClick = (data) => {
    this.props.dispatch(updateSelectedDefaultDefect(data))
  }

  del = ({ original }) => (e) => {
    const { dispatch, defaultDefectCodeList } = this.props
    dispatch({
      type: UPDATE_DEFAULT_DEFECT_CODE_LIST,
      data: defaultDefectCodeList.filter(item => item.defectId !== original.defectId),
    })
    e.stopPropagation()
  }

  handleTrMouseOver = (rowInfo) => {
    this.setState({
      index: rowInfo.index,
    })
  }

  handleTrMouseLeave = () => {
    this.setState({
      index: undefined,
    })
  }

  render() {
    const { defaultDefectCodeList, selectedDefaultDefect, intl } = this.props
    return (<div styleName="defect-code">
      <Title />
      <ReactTable
        pageSize={14}
        showPagination={false}
        data={defaultDefectCodeList}
        getTrProps={(state, rowInfo) => {
          const style = { textAlign: 'center', height: '35px' }
          if (rowInfo && rowInfo.original.defectCode === selectedDefaultDefect.defectCode) {
            style.background = '#CAE6F5'
          }
          return {
            onClick: () => {
              this.handleTrClick(rowInfo.original)
            },
            onMouseEnter: () => {
              this.handleTrMouseOver(rowInfo)
            },
            onMouseLeave: this.handleTrMouseLeave,
            style,
          }
        }}
        columns={[
          {
            Header: intl.formatMessage({ id: 'labelingTool.defectCode.defectCode' }),
            accessor: 'defectCode',
            Cell: row => (<div style={{ position: 'relative', cursor: 'pointer' }}>
              <span
                title={row.value}
                style={{
                  wordWrap: 'break-word',
                }}
              >
                {row.value}
              </span>
              <Icon
                alt={`${intl.formatMessage({ id: 'delete' })} ${row.value}`}
                title={`${intl.formatMessage({ id: 'delete' })} ${row.value}`}
                type="close-circle"
                style={{
                  float: 'right',
                  position: 'absolute',
                  right: 3,
                  top: 3,
                  color: '#D0011B',
                  background: row.original.defectCode === selectedDefaultDefect.defectCode ? '#CAE6F5' : '#fff',
                  cursor: 'pointer',
                  display: this.state.index === row.index ? '' : 'none',
                }}
                onClick={this.del(row)}
              />
            </div>),
          },
        ]}
        style={{
          height: '555px',
        }}
      />
    </div>)
  }
}

DefectCode.propTypes = {
  dispatch: PropTypes.func.isRequired,
  defaultDefectCodeList: PropTypes.array.isRequired,
  selectedDefaultDefect: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
}

export default connect(({ labelingTool, intl: { locale } }) => ({
  locale,
  defaultDefectCodeList: labelingTool.defaultDefectCodeList,
  selectedDefaultDefect: labelingTool.selectedDefaultDefect,
}))(injectIntl(DefectCode))
