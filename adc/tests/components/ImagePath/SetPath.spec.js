import React from 'react'
import { SetPath } from 'routes/Offline/routes/Labeling/components/ImagePath/SetPath'
import { Form } from 'antd'

describe('Component SetPath', () => {
  const WrappedForm = Form.create()(SetPath)
  const getImageListByPath = jest.fn()
  const updateResetKeyCodeStatus = jest.fn()
  const wrapper = mount(<WrappedForm
    getImageListByPath={getImageListByPath}
    updateResetKeyCodeStatus={updateResetKeyCodeStatus}
  />)

  it('test', () => {
    wrapper.node.setFieldsValue({
      path: '/test/test',
    })
    wrapper.find('Button').simulate('click')
    expect(wrapper.node.getFieldsValue()).toEqual({ path: '/test/test' })
    expect(getImageListByPath).toBeCalled()
  })

})
