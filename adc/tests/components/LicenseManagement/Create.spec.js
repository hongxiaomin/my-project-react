import React from 'react'
import { shallow, mount } from 'enzyme'
import { CreateUser } from 'routes/LicenseManagement/routes/License/components/Edit/Create'

describe('(Component) CreateUser', () => {
  const type = 'user'
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <CreateUser
        type={type}
        dispatch={dispatch}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render button click', () => {
    const wrapper = shallow(
      <CreateUser
        type={type}
        dispatch={dispatch}
      />,
    )
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.state('isOpen')).toEqual(true)
    wrapper.find('Dialog').at(0).simulate('change')
    // expect(wrapper.state('isOpen')).toEqual(true)
    expect(wrapper).toMatchSnapshot()
  })
})
