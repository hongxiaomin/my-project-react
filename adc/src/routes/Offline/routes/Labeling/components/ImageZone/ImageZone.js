/* eslint import/no-named-as-default: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentStyle } from 'Utils'
import DragOrZoom from './DragOrZoom'
import ImageLoad from './ImageLoad'
import DrawDefect from './DrawDefect'

export class ImageZone extends React.Component {
  constructor(props) {
    super(props)

    this.keydown = false
    this.div = null
    this.imageInfo = {}
    this.state = {
      offset: { x: 0, y: 0 },
      imageInfo: { width: 0, height: 0, aspectRatio: 1 },
      boxStyle: {
        width: '100%',
        height: this.props.isUpdate ? '600px' : '300px',
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.path === '') {
      this.setState({
        boxStyle: {
          width: '100%',
          height: nextProps.isUpdate ? '600px' : '300px',
        },
      })
    }
  }

  getImageInfo = ({ width, height, imgWidth, aspectRatio }) => {
    /**
     * 1. 如果height > width 得到浏览器最大高度， 计算出框的最大高度, 根据宽高比， 得到框的宽度
     * 框的宽度和图片的宽度都是根据宽高比和高度相比得来
     */

    const dHeight = document.documentElement.clientHeight || document.body.clientHeight
    const divWidth = parseInt(getCurrentStyle(this.div, 'width'), 10)

    const state = {
      imageInfo: {
        width,
        height,
        imgWidth,
        aspectRatio,
      },
    }

    let t = 60 + 40 + 50 + 40 + 15 + 10 + 10 // 除去图片展示框的其它元素的高度
    if (this.props.isUpdate) {
      t = 50 + 20
    }
    // 根据宽高比的不同， 调整展示图片的框的大小
    if (height > width) {
      const boxHeight = dHeight - t
      const boxWidth = boxHeight * (width / height)
      state.boxStyle = {
        height: boxHeight,
        width: boxWidth,
      }
      state.imageInfo.aspectRatio = boxWidth / width
    } else if (height < width) {
      let boxWidth = divWidth
      let boxHeight = divWidth * (height / width)
      if (boxHeight > (dHeight - t)) {
        boxWidth = divWidth * ((dHeight - t) / boxHeight)
        boxHeight = dHeight - t
      }
      state.boxStyle = {
        height: boxHeight,
        width: boxWidth,
      }
      state.imageInfo.aspectRatio = boxWidth / width
    } else if (height === width) {
      const boxHeight = dHeight - t
      state.boxStyle = {
        height: boxHeight,
        width: boxHeight,
      }
      state.imageInfo.aspectRatio = boxHeight / width
    }

    this.setState({
      ...state,
    })
  }

  dragOrZoomChange = (offset) => {
    this.setState({
      offset,
    })
  }

  render() {
    return (<div
      ref={(x) => { this.div = x }}
      style={{
        ...this.state.boxStyle,
        overflow: 'hidden',
        position: 'resative',
        border: '1px solid #ccc',
        margin: this.props.isUpdate ? '0 auto' : '',
      }}
    >
      <DragOrZoom
        scale={this.props.scale}
        onChange={this.dragOrZoomChange}
      >
        <ImageLoad
          imgPath={this.props.path}
          onChange={this.getImageInfo}
        >
          <DrawDefect
            scale={this.props.scale}
            offset={this.state.offset}
            imageInfo={this.state.imageInfo}
            div={this.div}
          />
        </ImageLoad>
      </DragOrZoom>
    </div>)
  }
}

ImageZone.propTypes = {
  scale: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool,
}

ImageZone.defaultProps = {
  isUpdate: false,
}

export default connect(({ labelingTool }) => ({
  scale: labelingTool.controlPanel.zoom,
  path: labelingTool.selectedImageInfo.path,
}))(ImageZone)
