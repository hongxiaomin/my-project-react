import React from 'react'
import { ServiceManagementEdit } from 'routes/Inline/routes/Service/components/ServiceManagementEdit/ServiceManagementEdit'

describe('(Component) ServiceManagementEdit', () => {
  const data = {}
  const ojsData = {}
  const statusType = {}
  const getModel = jest.fn()
  const getServiceDetail = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <ServiceManagementEdit
        data={data}
        ojsData={ojsData}
        statusType={statusType}
        getModel={getModel}
        getServiceDetail={getServiceDetail}
      />,
    )
    wrapper.find('input').simulate('change', { target: { value: 'a' } })
    expect(wrapper).toMatchSnapshot()
  })
})
