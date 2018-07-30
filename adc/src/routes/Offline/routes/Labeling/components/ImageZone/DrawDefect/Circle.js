import React from 'react'
import PropTypes from 'prop-types'

export class Circle extends React.Component {
  constructor() {
    super()

    this.circle = null
    this.down = false
    this.startInfo = {
      x: 0,
      y: 0,
    }
    this.state = {

    }
  }

  componentDidMount() {
    this.circle.addEventListener('mousedown', (e) => {
      this.down = true

      this.startInfo = {
        x: e.offsetX,
        y: e.offsetY,
      }

      e.stopPropagation()
      e.preventDefault()
    })
    window.addEventListener('mouseup', () => {
      if (!this.down) return
      this.down = false
      this.props.end()
    })
    window.addEventListener('mousemove', (e) => {
      const nodeName = e.target.nodeName
      if (!this.down) return
      if (nodeName !== 'rect' && nodeName !== 'svg') return

      const moveX = e.offsetX - this.startInfo.x
      const moveY = e.offsetY - this.startInfo.y
      this.props.onChange((this.props.width + moveX) / this.props.width, (this.props.height + moveY) / this.props.height)
    })
  }

  render() {
    return (<circle
      ref={x => (this.circle = x)}
      cx={this.props.cx}
      cy={this.props.cy}
      r='4'
      fill='rgba(0, 0, 0, 0)'
      style={{ cursor: 'se-resize' }}
    />)
  }
}

Circle.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  end: PropTypes.func.isRequired,
}

export default Circle
