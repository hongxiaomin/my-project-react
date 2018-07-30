/* eslint import/no-named-as-default: 0 */

import React from 'react'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import ReactTable from 'components/ADCTable'
import Title from './Title'
import DefectFilter from './DefectFilter'
import { getDefectInfoByImage } from '../../modules'
import './ImageList.scss'


export class ImageList extends React.Component {
  constructor() {
    super()
    this.state = {
      pageSize: 5,
      page: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pageSize, page } = this.state
    const { selectedImageList, currentId } = nextProps
    const state = {}
    if (Math.ceil(selectedImageList.length / pageSize) < (page + 1)) state.page = 0
    // 根据当前currentId判断当前页码
    selectedImageList.forEach((item, i) => {
      if (item.imageId === currentId) {
        state.page = Math.floor(i / pageSize)
      }
    })

    this.setState(state)
  }

  handlePageChange = (page) => {
    this.setState({
      page,
    })
  }

  handleTrClidk = (info) => {
    const { dispatch } = this.props
    dispatch(getDefectInfoByImage(info.original))
  }

  render() {
    const { selectedImageList, imageListLoading, currentId, style, intl } = this.props
    const getTrProps = (state, rowInfo) => {
      const tmpStyle = { textAlign: 'center' }
      if (rowInfo && rowInfo.original.imageId === currentId) {
        tmpStyle.background = '#CAE6F5'
      }
      return {
        onClick: () => {
          this.handleTrClidk(rowInfo)
        },
        style: tmpStyle,
      }
    }
    return (<div styleName="image-list" style={style}>
      <Title />
      <div style={{ marginTop: '10px' }}>
        <ReactTable
          loading={imageListLoading}
          sortable={false}
          resizable={false}
          className="-striped -highlight"
          page={this.state.page}
          pageSize={this.state.pageSize}
          showPageSizeOptions={false}
          data={selectedImageList}
          onPageChange={this.handlePageChange}
          getTrProps={getTrProps}
          style={{
            height: '237px',
          }}
          columns={[
            {
              id: intl.formatMessage({ id: 'labelingTool.imageList.defect' }),
              Header: <DefectFilter />,
              Cell: cellInfo => (<p title={cellInfo.original.defectCode.join(',')}>{cellInfo.original.defectCode.join(',')}</p>),
              width: 120,
            },
            {
              Header: intl.formatMessage({ id: 'labelingTool.imageList.name' }),
              accessor: 'path',
              Cell: cellInfo => (<p title={cellInfo.original.path.split('/').pop()} style={{ cursor: 'pointer', textAlign: 'left' }}>{cellInfo.original.path.split('/').pop()}</p>),
            },
          ]}
        />
        <p style={{ lineHeight: '30px' }}>
          <WrapperFormattedMessage id="totalNumber" /> {selectedImageList.length}</p>
      </div>
    </div>)
  }
}

ImageList.propTypes = {
  style: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  selectedImageList: PropTypes.array.isRequired,
  currentId: PropTypes.string.isRequired,
  imageListLoading: PropTypes.bool.isRequired,
}

ImageList.defaultProps = {
  style: {},
}

export default connect(({ labelingTool, intl }) => ({
  intl,
  currentId: labelingTool.currentId,
  selectedImageList: labelingTool.selectedImageList,
  imageListLoading: labelingTool.imageListLoading,
}))(injectIntl(ImageList))

