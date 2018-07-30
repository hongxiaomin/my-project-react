import React from 'react'
import { shallow } from 'enzyme'
import AddDefectCode from 'routes/ModelManagement/routes/ModelManagement/components/AddImportModel/AddDefectCode'

describe('(Component) AddDefectCode', () => {
  const that = {}
  const form = {
    setFieldsValue: () => {},
    getFieldsValue: () => {},
    getFieldValue: () => {},
    getFieldDecorator: () => () => {},
    setFields: () => {},
  }
  const wrapper = shallow(
    <AddDefectCode
      that={that}
      form={form}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
