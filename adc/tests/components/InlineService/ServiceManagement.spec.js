import React from 'react'
import { ServiceManagement } from 'routes/Inline/routes/Service/components/ServiceManagement/ServiceManagement'

describe('(Component) ServiceManagement', () => {
  const getQueueList = jest.fn()
  const getModel = jest.fn()
  const getServiceInfo = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <ServiceManagement
        getQueueList={getQueueList}
        getModel={getModel}
        getServiceInfo={getServiceInfo}
      />,
    )
    // wrapper.find('Button').last().simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})
