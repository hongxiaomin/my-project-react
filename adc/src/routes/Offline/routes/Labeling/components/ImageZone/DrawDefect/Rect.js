/* eslint no-unused-expressions: 0, import/no-named-as-default: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { loadImage, slicing } from 'Utils'
import { connect } from 'react-redux'
import Circle from './Circle'
import { UPDATE_SELECTED_IMAGE_INFO } from '../../../modules'

const isRight = num => (isNaN(num) || num < 0)

export class Rect extends React.Component {
  constructor() {
    super()

    this.rect = null
    this.down = false
    this.binded = false
    this.startInfo = {
      x: 0,
      y: 0,
    }
    this.state = {
      scale: {
        x: 1,
        y: 1,
      },
      offset: {
        x: 0,
        y: 0,
      },
    }
  }

  componentDidMount() {
    // 框的移动
    this.rect && this.bind()
  }

  componentWillReceiveProps() {
    if (!this.binded && this.rect) {
      this.bind()
    }

    window.addEventListener('mousemove', (e) => {
      const offset = {
        x: e.offsetX - this.startInfo.x,
        y: e.offsetY - this.startInfo.y,
      }
      const nodeName = e.target.nodeName
      if (!this.down) return
      if (nodeName !== 'rect' && nodeName !== 'svg') return

      // 禁止拖动出四边, IE11不兼容， 之后调整
      // if (
      //   (this.props.info.x + offset.x) <= 0 || // 红框是否处于大框中
      //   (this.props.info.y + offset.y) <= 0 ||
      //   (this.props.info.x + offset.x + this.props.info.width) >
      //   (this.props.imageInfo.width * this.props.aspectRatio) ||
      //   (this.props.info.y + offset.y + this.props.info.height) >
      //   (this.props.imageInfo.height * this.props.aspectRatio)
      // ) return

      this.setState({
        offset,
      })

      e.stopPropagation()
      e.preventDefault()
    })
    window.addEventListener('mouseup', () => {
      if (!this.down) return
      this.down = false

      // 更新redux
      //  defectInfo
      const { info, aspectRatio } = this.props
      const tmp = {
        x: (parseInt(info.x, 10) + parseInt(this.state.offset.x, 10)) / aspectRatio,
        y: (parseInt(info.y, 10) + parseInt(this.state.offset.y, 10)) / aspectRatio,
        endX: (parseInt(info.endX, 10) + parseInt(this.state.offset.x, 10)) / aspectRatio,
        endY: (parseInt(info.endY, 10) + parseInt(this.state.offset.y, 10)) / aspectRatio,
      }

      this.updateInfo(tmp, () => {
        this.setState({
          offset: {
            x: 0,
            y: 0,
          },
        })
      })
    })
  }

  change = (x, y) => {
    this.setState({
      scale: {
        x: x < 0 ? 0.1 : x,
        y: y < 0 ? 0.1 : y,
      },
    })
  }

  updateInfo = (info, cb) => {
    const tmp = info
    loadImage(this.props.selectedImageInfo.path)
    .then((img) => {
      const slicingURL = slicing(this.props.selectedImageInfo.path, img.width, img.height)
      tmp.preview = slicingURL(tmp.x, tmp.y, tmp.endX - tmp.x, tmp.endY - tmp.y)
    })
    .then(() => {
      const { selectedImageInfo,
        dispatch, info: propsInfo, selectedImageInfo: { defectInfo } } = this.props
      // 这个地方需要更新
      dispatch({
        type: UPDATE_SELECTED_IMAGE_INFO,
        data: {
          ...selectedImageInfo,
          defectCurrentId: propsInfo.id,
          defectInfo: defectInfo.map((item) => {
            if (item.id === propsInfo.id) {
              return {
                ...item,
                ...tmp,
              }
            }
            return item
          }),
        },
      })

      cb && cb()
    })
  }

  end = () => {
    const { info, aspectRatio } = this.props
    const tmp = {
      x: parseInt(info.x, 10) / aspectRatio,
      y: parseInt(info.y, 10) / aspectRatio,
      endX: (info.x + (info.width * this.state.scale.x)) / aspectRatio,
      endY: (info.y + (info.height * this.state.scale.y)) / aspectRatio,
    }

    this.updateInfo(tmp, () => {
      this.setState({
        scale: {
          x: 1,
          y: 1,
        },
      })
    })
  }

  bind = () => {
    this.rect.addEventListener('mousedown', (e) => {
      if (e.ctrlKey) return
      this.down = true
      this.startInfo = {
        x: e.offsetX,
        y: e.offsetY,
      }

      e.stopPropagation()
      e.preventDefault()
    })

    this.binded = true
  }

  render() {
    const { info, borderColor } = this.props
    const style = {
      cursor: 'move',
      vectorEffect: 'non-scaling-stroke',
      transform: `translate(${this.state.offset.x}px, ${this.state.offset.y}px) scale(${this.state.scale.x}, ${this.state.scale.y})`,
      transformOrigin: `${this.props.info.x}px ${this.props.info.y}px`,
    }

    // style.transformOrigin = `${info.x}px ${info.y}px`
    if (isRight(info.x) || isRight(info.y) || isRight(info.width) || isRight(info.height)) {
      return null
    }

    // 文字的坐标
    let textX
    let textY
    const textStyle = {
      fontSize: 18,
      transform: `translate(${this.state.offset.x}px, ${this.state.offset.y}px)`,
      transformOrigin: `${this.props.info.x}px ${this.props.info.y}px`,
    }
    if (info.width > info.height) {
      textX = info.x
      textY = info.y < 25 ? (info.y + info.height + 20) : info.y - 7
    } else {
      textX = info.x < 25 ? (info.x + info.width + 17) : info.x - 15
      textY = info.y
      textStyle.writingMode = 'tb'
    }

    return (<g>
      {info.defectCode
        ? <text
          x={textX}
          y={textY}
          fill={borderColor}
          style={textStyle}
        >{info.defectCode}</text>
        : ''
      }
      <rect
        ref={x => (this.rect = x)}
        stroke={borderColor}
        x={info.x}
        y={info.y}
        width={info.width}
        height={info.height}
        strokeWidth={2 / this.props.scale}
        fill="rgba(0, 0, 0, 0)"
        style={style}
      />
      <Circle
        cx={this.props.info.endX}
        cy={this.props.info.endY}
        width={info.width}
        height={info.height}
        onChange={this.change}
        end={this.end}
      />
    </g>)
  }
}

Rect.propTypes = {
  borderColor: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
  scale: PropTypes.number.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  imageInfo: PropTypes.object.isRequired,
  selectedImageInfo: PropTypes.object.isRequired,
}

export default connect(state => ({
  scale: state.labelingTool.controlPanel.zoom,
  selectedImageInfo: state.labelingTool.selectedImageInfo,
}))(Rect)
