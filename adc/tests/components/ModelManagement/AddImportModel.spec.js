import React from 'react'
import { shallow } from 'enzyme'
import { AddImportModel } from 'routes/ModelManagement/routes/ModelManagement/components/AddImportModel/AddImportModel'

describe('(Component) AddImportModel', () => {
  const dispatch = jest.fn()
  const wrapper = shallow(
    <AddImportModel
      dispatch={dispatch}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('change as visible', () => {
    const visible = wrapper.state('visible')
    expect(wrapper.find('button').simulate('click'))
    expect(wrapper.state('visible')).not.toBe(visible)
  })
})
