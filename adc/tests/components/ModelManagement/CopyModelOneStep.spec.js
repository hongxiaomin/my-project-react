import React from 'react'
import { shallow } from 'enzyme'
import { OneStep } from 'routes/ModelManagement/routes/ModelManagement/components/CopyModel/OneStep'

describe('(Component) OneStep', () => {
  const that = { state: { interation: 11111, modelName: '1', description: '1' } }
  const wrapper = shallow(
    <OneStep
      that={that}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('render Slider one', () => {
    // wrapper.find('.slider').at(0).simulate('change', { value: 10 })
    // expect(that.state.interation).toEqual(10)
  })
  it('render input one', () => {
    wrapper.find('input').at(0).simulate('click', { e: { target: { value: 10 } } })
    // expect(that.state.interation).toEqual(10)
  })
})
