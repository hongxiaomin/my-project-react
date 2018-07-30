import React from 'react'
import { shallow, mount } from 'enzyme'
import { License } from 'routes/LicenseManagement/routes/License/components/License/License'

describe('(Component) License', () => {
  const dispatch = jest.fn()
  const licenseList = []
  const userList = []
  const userInfo = {}
  it('render normally', () => {
    const wrapper = shallow(
      <License
        dispatch={dispatch}
        licenseList={licenseList}
        userList={userList}
        userInfo={userInfo}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})