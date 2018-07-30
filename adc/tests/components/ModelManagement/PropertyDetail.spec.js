import React from 'react'
import { shallow, mount } from 'enzyme'
import { PropertyDetail } from 'routes/ModelManagement/routes/ModelManagement/components/ModelDetail/PropertyDetail'

describe('(Component) PropertyDetail', () => {
  const data = {
    createTime: '2018-10-10',
    process: [1, 2, 3],
    product: [1, 2, 3],
    defect: ['1', '2', '3'],
  }
  const isDetail = {
    id: 1,
    name: 'model',
    status: 'idle',
  }
  it('render normally', () => {
    const wrapper = shallow(
      <PropertyDetail data={data} isDetail={isDetail} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('open model', () => {
    const wrapper = mount(
      <PropertyDetail data={data} isDetail={isDetail} />,
    )
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.state('visible')).toBe(true)
  })
})
