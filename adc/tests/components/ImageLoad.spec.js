import React from 'react'
import { shallow, mount } from 'enzyme'
import { ImageLoad } from 'routes/Offline/routes/Labeling/components/ImageZone/ImageLoad'

describe('(Component) ImageLoad', () => {
  const onChange = jest.fn()
  const children = {}
  it('render normally', () => {
    const imagePath = 'aefef'
    const wrapper = shallow(
      <ImageLoad
        imgPath={imagePath}
        onChange={onChange}
        a={children}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render imagePath is empty', () => {
    const imagePath = ''
    const wrapper = shallow(
      <ImageLoad
        imgPath={imagePath}
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
  it('render normally', () => {
    const imagePath = 'aefef'
    const wrapper = mount(
      <ImageLoad
        imgPath={imagePath}
        onChange={onChange}
        a={children}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
