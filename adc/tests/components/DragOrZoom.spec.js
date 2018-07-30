import React from 'react'
import { shallow, mount } from 'enzyme'
import { DragOrZoom } from 'routes/Offline/routes/Labeling/components/ImageZone/DragOrZoom'

describe('(Component) DragOrZoom', () => {
  const onChange = jest.fn()
  const children = {}
  const scale = 0.5
  it('render normally', () => {
    const wrapper = shallow(
      <DragOrZoom
        scale={scale}
        onChange={onChange}
        a={children}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
describe('(Component) mount', () => {
  const onChange = jest.fn()
  const children = {}
  const scale = 0.5
  it('render normally', () => {
    const wrapper = mount(
      <DragOrZoom
        scale={scale}
        onChange={onChange}
        a={children}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
