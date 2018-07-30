import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import ReactTable from 'components/ADCTable'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { slicing, getShowPath } from 'Utils'
import { UPDATE_SELECTED_IMAGE_INFO } from '../../modules'
import './LabelingList.scss'

export class LabelingList extends React.Component {
  constructor() {
    super()

    this.state = {
      labeledList: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedImageInfo } = nextProps
    if (selectedImageInfo.defectInfo.length === 0) {
      // 当没有图片的时候
      this.setState({
        labeledList: [],
      })
    } else if (selectedImageInfo.defectInfo.length &&
      (this.props.selectedImageInfo.path !== selectedImageInfo.path ||
        this.props.selectedImageInfo.defectInfo.length !== selectedImageInfo.defectInfo.length)) {
      // 当path有变化的时候
      this.getThumb(selectedImageInfo)
    } else {
      // 当信息有更新的时候
      const { labeledList } = this.state
      this.setState({
        labeledList: labeledList.map((item) => {
          const tmp = selectedImageInfo.defectInfo.find(info => info.id === item.id)
          return {
            ...item,
            ...tmp,
          }
        }),
      })
    }
  }

  getThumb = (selectedImageInfo) => {
    const { path, imageInfo, defectInfo } = selectedImageInfo
    const slicingURL = slicing(getShowPath(path), imageInfo.width, imageInfo.height)
    const defectInfoTmp = []
    defectInfo.forEach((info) => {
      const obj = info
      const infoTmp = {
        ...info,
        preview: slicingURL(obj.x, obj.y, obj.endX - obj.x, obj.endY - obj.y),
      }

      defectInfoTmp.push(infoTmp)
    })

    this.setState({
      labeledList: defectInfoTmp,
    })
  }

  handleTrClidk = (data) => {
    this.props.dispatch({
      type: UPDATE_SELECTED_IMAGE_INFO,
      data: {
        ...this.props.selectedImageInfo,
        defectCurrentId: data.id,
      },
    })
  }

  // 单纯的只是删除state中的数据
  del = data => (e) => {
    e.stopPropagation()
    const { selectedImageInfo, dispatch } = this.props
    dispatch({
      type: UPDATE_SELECTED_IMAGE_INFO,
      data: {
        ...selectedImageInfo,
        defectInfo: selectedImageInfo.defectInfo.filter(item => item.id !== data.id),
      },
    })
  }

  render() {
    const { labeledList } = this.state
    const { selectedImageInfo, intl } = this.props
    return (<div styleName="labeling-list" style={this.props.style}>
      <h3><WrapperFormattedMessage id="labelingTool.labeledList.labeledTitle" /></h3>
      <div style={{ marginTop: '10px' }}>
        <ReactTable
          className="-striped -highlight"
          pageSize={labeledList.length > 4 ? labeledList.length : 4}
          showPagination={false}
          data={labeledList}
          getTrProps={(state, rowInfo) => {
            const style = { textAlign: 'center' }
            if (rowInfo) {
              style.background = selectedImageInfo.defectCurrentId === rowInfo.original.id ? '#CAE6F5' : ''
            }
            return {
              onClick: () => {
                this.handleTrClidk(rowInfo.original, rowInfo.index)
              },
              style,
            }
          }}

          style={{
            height: '225px',
          }}

          columns={[
            {
              Header: intl.formatMessage({ id: 'labelingTool.labeledList.no' }),
              accessor: '',
              Cell: ({ index }) => (<span>{index + 1}</span>),
            },
            {
              Header: intl.formatMessage({ id: 'labelingTool.imageList.name' }),
              accessor: 'defectCode',
              Cell: row => (<span title={row.original.defectCode}>{row.original.defectCode}</span>),
            },
            {
              Header: intl.formatMessage({ id: 'labelingTool.labeledList.thumbnail' }),
              accessor: '',
              Cell: data => (<div style={data.original.preview} />),
            },
            {
              Header: intl.formatMessage({ id: 'labelingTool.labeledList.delete' }),
              accessor: '',
              Cell: ({ original }) => (<Icon
                type="close-circle"
                title={intl.formatMessage({ id: 'labelingTool.labeledList.delete' })}
                style={{ cursor: 'pointer', color: '#D0011B' }}
                onClick={this.del(original)}
              />),
            },
          ]}
        />
      </div>
    </div>)
  }
}

LabelingList.propTypes = {
  selectedImageInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  style: PropTypes.object,
}

LabelingList.defaultProps = {
  style: {},
}

export default connect(({ labelingTool, intl }) => ({
  intl,
  selectedImageInfo: labelingTool.selectedImageInfo,
}))(injectIntl(LabelingList))
