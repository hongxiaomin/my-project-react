/* eslint jsx-a11y/alt-text: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { loadImage, getCurrentStyle } from 'Utils'

export class ImageLoad extends React.Component {

  constructor() {
    super()

    this.img = null
    this.state = {}
  }

  componentDidMount() {
    // 加载图片， 把图片信息传导外边
    this.props.imgPath && this.getImageInfo(this.props.imgPath)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imgPath && (nextProps.imgPath !== this.props.imgPath)) {
      this.getImageInfo(nextProps.imgPath)
    }
  }

  getImageInfo = (imgPath) => {
    loadImage(imgPath)
      .then((data) => {
        // 图片默认宽度和真实宽度的比例
        const currentWidth = parseInt(getCurrentStyle(this.img, 'width'), 10) || 0
        this.props.onChange({
          width: data.width,
          height: data.height,
          imgWidth: currentWidth,
          aspectRatio: currentWidth / data.width,
        })
      })
      .catch((e) => {
        throw new Error(`图片加载失败!\n${e}`)
      })
  }

  render() {
    if (!this.props.imgPath) {
      return null
    }

    return (<div>
      <img
        ref={(x) => { this.img = x }}
        width="100%"
        src={this.props.imgPath}
      />
      {this.props.children ? this.props.children : ''}
    </div>)
  }
}

ImageLoad.defaultProps = {
  children: undefined,
}

ImageLoad.propTypes = {
  imgPath: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.object,
}

export default ImageLoad
