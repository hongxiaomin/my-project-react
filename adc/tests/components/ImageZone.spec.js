import React from 'react'
import { shallow, mount } from 'enzyme'
import { ImageZone } from 'routes/Offline/routes/Labeling/components/ImageZone/ImageZone'

describe('(Component) ImageZone', () => {
  const scale = 0.5
  const path = ''
  const isUpdate = true
  const wrapper = shallow(
    <ImageZone
      scale={scale}
      path={path}
      isUpdate={isUpdate}
    />,
  )
  it('element DragOrZoom', () => {
    expect(wrapper.find('DragOrZoom').length).toBe(1)
  })
  it('element ImageLoad', () => {
    expect(wrapper.find('ImageLoad').length).toBe(1)
  })
  wrapper.find('DragOrZoom').simulate('change', { x: 1, y: 1 })
  expect(wrapper.state('offset')).toEqual({ x: 1, y: 1 })
  wrapper.find('ImageLoad').simulate('change', { width: 30, height: 50, imageWidth: 20, aspectRatio: 0.2 })
  expect(wrapper.state('offset')).toEqual({ x: 1, y: 1 })
  wrapper.find('ImageLoad').simulate('change', { width: 60, height: 50, imageWidth: 20, aspectRatio: 0.2 })
  expect(wrapper.state('offset')).toEqual({ x: 1, y: 1 })
  wrapper.find('ImageLoad').simulate('change', { width: 50, height: 50, imageWidth: 20, aspectRatio: 0.2 })
  expect(wrapper.state('offset')).toEqual({ x: 1, y: 1 })
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe('(Component) mount', () => {
  const scale = 0.5
  const path = ''
  const isUpdate = true
  const wrapper = mount(
    <ImageZone
      scale={scale}
      path={path}
      isUpdate={isUpdate}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('element DragOrZoom', () => {
    expect(wrapper.find('DragOrZoom').length).toBe(1)
  })
  it('element ImageLoad', () => {
    expect(wrapper.find('ImageLoad').length).toBe(1)
  })
})
describe('(Component) mount', () => {
  const scale = 0.5
  const path = ''
  const isUpdate = false
  const wrapper = mount(
    <ImageZone
      scale={scale}
      path={path}
      isUpdate={isUpdate}
    />,
  )
  it('render isUpdate = false', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('element DragOrZoom', () => {
    expect(wrapper.find('DragOrZoom').length).toBe(1)
  })
  it('element ImageLoad', () => {
    expect(wrapper.find('ImageLoad').length).toBe(1)
  })
})