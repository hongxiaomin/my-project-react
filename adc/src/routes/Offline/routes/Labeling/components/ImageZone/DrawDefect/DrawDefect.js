
/* eslint import/no-named-as-default: 0 */
import React from 'react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadImage, slicing } from 'Utils'
import Rect from './Rect'
import { UPDATE_SELECTED_IMAGE_INFO } from '../../../modules'

export class DrawDefect extends React.Component {

  constructor(props) {
    super(props)

    this.drawDefect = null
    this.svg = null
    this.down = false
    this.moved = false
    this.binded = false
    this.startInfo = {
      x: 0,
      y: 0,
    }

    this.state = {
      rect: {}, // 新增的时候， 保存信息
    }
  }

  componentDidMount() {
    this.bind()
  }

  componentWillReceiveProps() {
    if (!this.binded) {
      this.bind()
    }
  }

  getAddLabeling = (event, aspectRatio = 1) => {
    const info = {
      id: Symbol(Date.now()),
    }
    const { x: startX, y: startY } = this.startInfo

    // 两种情况
    if (startX < event.offsetX) {
      info.x = startX / aspectRatio
      info.endX = event.offsetX / aspectRatio
    } else {
      info.x = event.offsetX / aspectRatio
      info.endX = startX / aspectRatio
    }

    if (startY < event.offsetY) {
      info.y = startY / aspectRatio
      info.endY = event.offsetY / aspectRatio
    } else {
      info.y = event.offsetY / aspectRatio
      info.endY = startY / aspectRatio
    }

    const { selectedDefaultDefect } = this.props
    if (!isEmpty(selectedDefaultDefect)) {
      info.defectId = selectedDefaultDefect.defectId
      info.defectCode = selectedDefaultDefect.defectCode
    }
    return info
  }

  bind = () => {
    this.drawDefect.addEventListener('mousedown', (e) => {
      if (e.ctrlKey) return
      /**
       * 记录初始化位置
       * 1. 从浏览器左上角开始计算， 要加入下拉框位置
       */

      this.startInfo = { x: e.offsetX, y: e.offsetY }
      this.down = true
      this.moved = false
    })

    this.drawDefect.addEventListener('mousemove', this.move)

    window.addEventListener('mouseup', (e) => {
      if (!this.down) return
      if (!this.moved) {
        this.down = false
        return
      }
      // 考虑在框外部释放鼠标的可能性
      this.down = false

      const { selectedImageInfo, imageInfo, dispatch } = this.props
      loadImage(selectedImageInfo.path)
        .then((img) => {
          const slicingURL = slicing(selectedImageInfo.path, img.width, img.height)
          const tmp = this.getAddLabeling(e, this.props.imageInfo.aspectRatio)
          tmp.preview = slicingURL(tmp.x, tmp.y, tmp.endX - tmp.x, tmp.endY - tmp.y)
          return tmp
        })
        .then((tmp) => {
          // 新增一条数据， 查找所有的数据是否已经都有defectCode, 如果没有， 删掉
          const defectInfo = []
          selectedImageInfo.defectInfo.forEach((item) => {
            if (!item.defectCode) return
            defectInfo.push(item)
          })
          dispatch({
            type: UPDATE_SELECTED_IMAGE_INFO,
            data: {
              ...selectedImageInfo,
              defectCurrentId: tmp.id,
              defectInfo: defectInfo.map(item => ({
                ...item,
                x: item.x / imageInfo.aspectRatio,
                y: item.y / imageInfo.aspectRatio,
                endX: item.endX / imageInfo.aspectRatio,
                endY: item.endY / imageInfo.aspectRatio,
              })).concat(tmp),
            },
          })
          this.setState({
            rect: {},
          })
        })
    })

    this.binded = true
  }

  move = (e) => {
    if (!this.down) return
    if (this.startInfo.x !== e.offsetX || this.startInfo.y !== e.offsetY) {
      this.moved = true
    }
    this.setState({
      rect: this.getAddLabeling(e),
    })
  }

  render() {
    let Rects = []
    const styles = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    }
    const {
      selectedImageInfo: {
        defectInfo = [],
        defectCurrentId,
      },
    } = this.props

    Rects = [...defectInfo]
    if (!isEmpty(this.state.rect)) {
      Rects.push(this.state.rect)
    }

    return (<div
      ref={(x) => { this.drawDefect = x }}
      style={styles}
    >
      <svg
        ref={(c) => { this.svg = c }}
        width='100%'
        height='100%'
        preserveAspectRatio="xMinYMin meet"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>Labeling Tool</title>
        {Rects.map(item => (<Rect
          key={item.id.toString()}
          aspectRatio={this.props.imageInfo.aspectRatio}
          imageInfo={this.props.imageInfo}
          info={{
            id: item.id,
            x: item.x,
            y: item.y,
            endX: item.endX,
            endY: item.endY,
            width: item.endX - item.x,
            height: item.endY - item.y,
            defectCode: item.defectCode,
          }}
          borderColor={(defectCurrentId === item.id) ? 'red' : '#FF9B98'}
        />))}
      </svg>
    </div>)
  }
}

DrawDefect.propTypes = {
  imageInfo: PropTypes.object.isRequired,
  selectedImageInfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedDefaultDefect: PropTypes.object.isRequired,
}

export default connect((state, ownProps) => {
  const { labelingTool } = state
  const selectedImageInfo = labelingTool.selectedImageInfo
  const selectedDefaultDefect = labelingTool.selectedDefaultDefect
  let info = []

  if (selectedImageInfo && selectedImageInfo.defectInfo && selectedImageInfo.defectInfo.length) {
    info = selectedImageInfo.defectInfo.map(item => ({
      ...item,
      x: item.x * ownProps.imageInfo.aspectRatio,
      y: item.y * ownProps.imageInfo.aspectRatio,
      endX: item.endX * ownProps.imageInfo.aspectRatio,
      endY: item.endY * ownProps.imageInfo.aspectRatio,
    }))
  }

  return {
    selectedDefaultDefect,
    selectedImageInfo: {
      ...labelingTool.selectedImageInfo,
      defectInfo: info,
    },
  }
})(DrawDefect)
