import React from 'react'
import { PageLayout } from 'layouts/PageLayout/PageLayout'
import { shallow, mount } from 'enzyme'

describe('(Layout) PageLayout', () => {
  it('renders its children inside of the viewport', () => {
    const Child = () => <h2>child</h2>
    const dispatch = jest.fn()
    const token = ''
    const lockScreen = false
    const pageLayoutWrapper = mount(
      <PageLayout dispatch={dispatch} token={token} lockScreen={lockScreen}>
        <Child />
      </PageLayout>,
    )
    // expect(pageLayoutWrapper.type()).toEqual('div')
    expect(pageLayoutWrapper).toMatchSnapshot()
  })
  it('renders LockScreen = true', () => {
    const Child = () => <h2>child</h2>
    const dispatch = jest.fn()
    const token = ''
    const lockScreen = true
    const pageLayoutWrapper = shallow(
      <PageLayout dispatch={dispatch} token={token} lockScreen={lockScreen}>
        <Child />
      </PageLayout>,
    )
    // expect(pageLayoutWrapper.type()).toEqual('div')
    expect(pageLayoutWrapper).toMatchSnapshot()
  })
})
