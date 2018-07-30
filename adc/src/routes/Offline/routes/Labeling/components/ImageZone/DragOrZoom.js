/* eslint no-unused-expressions: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { getScroll } from 'Utils'

export class DragOrZoom extends React.Component {
  constructor() {
    super()

    this.element = null
    this.initVal = { x: 0, y: 0 }
    this.down = false
    this.state = {
      offset: { x: 0, y: 0 },
    }
  }

  componentDidMount() {
    this.element.addEventListener('mousedown', (e) => {
      if (!e.ctrlKey) return
      e.preventDefault()
      /**
       * 1. 如果没有按ctrl不做响应
       * 2. 记录当前鼠标相对于浏览器左上角的位置, 因为使用client会受滚动条影响， 所以要加上滚动条的位置
       */
      const { scrollTop, scrollLeft } = getScroll()
      const clientX = e.clientX + scrollLeft
      const clientY = e.clientY + scrollTop
      this.initVal = {
        x: clientX / this.props.scale,
        y: clientY / this.props.scale,
        startX: this.state.offset.x,
        startY: this.state.offset.y,
      }
      this.down = true
    })
    this.element.addEventListener('mousemove', this.move)
    window.addEventListener('mouseup', (e) => {
      if (!e.ctrlKey && !this.down) return
      e.preventDefault()
      e.stopPropagation()
      this.down = false

      /**
       * 把 offset 的值传给外边
       * 更新state
       */
      this.props.onChange && this.props.onChange(this.state.offset)
    })
  }

  componentWillReceiveProps(nextProps) {
    // 这里有bug， 需要改变外边的值
    if (nextProps.scale === 1) {
      this.setState({
        offset: {
          x: 0,
          y: 0,
        },
      })
    }
  }

  move = (e) => {
    e.preventDefault()
    if (!e.ctrlKey || !this.down) return
    /**
     * 1. 用js更新样式， 不通过更新state
     */
    const { scrollTop, scrollLeft } = getScroll()
    const clientX = (e.clientX + scrollLeft) / this.props.scale
    const clientY = (e.clientY + scrollTop) / this.props.scale
    const { x, y, startX, startY } = this.initVal

    this.setState({
      offset: {
        x: startX + (clientX - x),
        y: startY + (clientY - y),
      },
    })
  }

  render() {
    const styles = {
      width: '100%',
      height: '100%',
      // position: 'relative',
      transform: `scale(${this.props.scale}) translate(${this.state.offset.x}px, ${this.state.offset.y}px)`,
      transformOrigin: '0 0',
    }
    return (<div ref={(e) => { this.element = e }} style={styles}>
      {this.props.children}
    </div>)
  }
}

DragOrZoom.propTypes = {
  scale: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default DragOrZoom
