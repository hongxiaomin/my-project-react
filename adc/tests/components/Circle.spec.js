import React from 'react'
import { shallow, mount } from 'enzyme'
import { Circle } from 'routes/Offline/routes/Labeling/components/ImageZone/DrawDefect/Circle'

describe('(Component) Circle', () => {
  const cx = 0.5
  const cy = 1
  const height = 10
  const width = 20
  const onChange = jest.fn()
  const end = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <Circle
        cx={cx}
        cy={cy}
        height={height}
        width={width}
        onChange={onChange}
        end={end}
      />,
    )
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    // wrapper.find('Modal').simulate('click', nativeEvent)
    // expect(wrapper.state('loading')).toBe(false)
    expect(wrapper).toMatchSnapshot()
  })
  it('render mount', () => {
    const wrapper = mount(
      <Circle
        cx={cx}
        cy={cy}
        height={height}
        width={width}
        onChange={onChange}
        end={end}
      />,
    )
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    // wrapper.find('Modal').simulate('click', nativeEvent)
    // expect(wrapper.state('loading')).toBe(false)
    expect(wrapper).toMatchSnapshot()
  })
})

