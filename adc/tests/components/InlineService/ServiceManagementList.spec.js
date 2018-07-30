import React from 'react'
import { ServiceManagementList } from 'routes/Inline/routes/Service/components/ServiceManagementList/ServiceManagementList'

describe('(Component) ServiceManagementList', () => {
  const updateServiceList = jest.fn()
  const updateQueueStatus = jest.fn()
  const addJobToQueueList = jest.fn()
  const serviceList = [{ id: 1 }, { id: 2 }]
  const loading = []
  it('render normally', () => {
    const wrapper = shallow(
      <ServiceManagementList
        updateServiceList={updateServiceList}
        updateQueueStatus={updateQueueStatus}
        addJobToQueueList={addJobToQueueList}
        serviceList={serviceList}
        loading={loading}
      />,
    )
    // wrapper.find('Button').last().simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})