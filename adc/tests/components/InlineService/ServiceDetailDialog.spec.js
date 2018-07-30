import React from 'react'
import { ServiceDetailDialog } from 'routes/Inline/routes/Service/components/ServiceDetailDialog/ServiceDetailDialog'

describe('(Component) ServiceDetailDialog', () => {
  const that = {}
  const DialogID = 1
  const modelId = 1
  const kernelId = 1
  const DialogName = 'a'
  const modelList = []
  const isOpen = false
  const toggleDialog = jest.fn()
  const getModel = jest.fn()
  const getServiceDetail = jest.fn()
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <ServiceDetailDialog
        that={that}
        DialogID={DialogID}
        modelId={modelId}
        kernelId={kernelId}
        DialogName={DialogName}
        modelList={modelList}
        getModel={getModel}
        getServiceDetail={getServiceDetail}
        isOpen={isOpen}
        toggleDialog={toggleDialog}
        dispatch={dispatch}
      />,
    )
    wrapper.find('Button').last().simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})
