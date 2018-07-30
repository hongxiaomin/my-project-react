import React from 'react'
import { ServiceCard } from 'routes/Inline/routes/Service/components/ServiceCard/ServiceCard'

describe('(Component) ServiceCard', () => {
  const item = { status: 'abc' }
//   const loading = false
//   it('render normally', () => {
//     const wrapper = shallow(
//       <ServiceCard
//         item={item}
//         loading={loading}
//       />,
//     )
//   })
  it('render loading is true', () => {
    const wrapper = shallow(
      <ServiceCard
        item={item}
        loading={true}
      />,
    )
  })
  it('render loading is stop', () => {
    const wrapper = shallow(
      <ServiceCard
        item={item}
        loading={'stop'}
      />,
    )
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.state('addOpen')).toEqual(true)
  })
  it('render stop', () => {
    const wrapper = shallow(
      <ServiceCard
        item={item}
        loading={'stop'}
      />,
    )
    wrapper.find('button').at(1).simulate('click')
    expect(wrapper.state('stopOpen')).toEqual(true)
  })
  it('render editOpen', () => {
    const wrapper = shallow(
      <ServiceCard
        item={item}
        loading={'stop'}
      />,
    )
    wrapper.find('button').at(2).simulate('click')
    expect(wrapper.state('editOpen')).toEqual(true)
  })
  it('render resetOpen', () => {
    const wrapper = shallow(
      <ServiceCard
        item={item}
        loading={'stop'}
      />,
    )
    wrapper.find('button').at(3).simulate('click')
    expect(wrapper.state('resetOpen')).toEqual(true)
  })
})
