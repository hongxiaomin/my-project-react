import React from 'react'
import { simpleFetch } from '../../../src/helpers/fetchWrapper'
import { LoginForm } from '../../../src/containers/LoginForm/LoginForm'

describe('(Component) LoginForm', () => {
  const goIndex = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <LoginForm
        goIndex={goIndex}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally', () => {
    const wrapper = mount(
      <LoginForm
        goIndex={goIndex}
      />,
    )
    wrapper.find('input').at(0).simulate('change', { target: { value: 'user' } })
    wrapper.find('input').at(1).simulate('change', { target: { value: 'password' } })
    expect(wrapper.state('username')).toEqual('user')
    expect(wrapper.state('password')).toEqual('password')
    wrapper.find('input').at(0).simulate('click')
    wrapper.find('input').at(1).simulate('click')
    // wrapper.setState({ username: '' })
    wrapper.find('Button').simulate('click')
    // expect(wrapper.state('authFailureMessage')).toEqual('Please enter user name and password.')
    expect(wrapper).toMatchSnapshot()
  })
  it('render password=empty', () => {
    const wrapper = mount(
      <LoginForm
        goIndex={goIndex}
      />,
    )
    wrapper.setState({ password: '', username: '' })
    wrapper.find('Button').simulate('click')
    expect(wrapper.state('authFailureMessage')).toEqual('Please enter user name and password.')
    expect(wrapper).toMatchSnapshot()
  })
})
