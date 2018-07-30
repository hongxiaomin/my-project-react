import React from 'react'
import { shallow } from 'enzyme'
import { OneStep } from 'routes/ModelManagement/routes/ModelManagement/components/EditModel/OneStep'

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
})
