import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import { DialogFilter } from 'routes/LicenseManagement/routes/License/components/Edit/Dialog'

describe('(Component) DialogFilter', () => {
  const dialogTitle = ''
  const dialogBtnContent = ''
  const isOpen = false
  const defaultValue = {}
  const handleSubmit = jest.fn()
  const toggleDialog = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <DialogFilter
        dialogTitle={dialogTitle}
        dialogBtnContent={dialogBtnContent}
        isOpen={isOpen}
        defaultValue={defaultValue}
        handleSubmit={handleSubmit}
        toggleDialog={toggleDialog}
        form={{
          setFieldsValue: () => {},
          getFieldsValue: () => {},
          getFieldDecorator: () => () => {},
          setFields: () => {},
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render dialogBtnContent = update', () => {
    const wrapper = shallow(
      <DialogFilter
        dialogTitle={dialogTitle}
        dialogBtnContent='Update'
        isOpen={isOpen}
        defaultValue={defaultValue}
        handleSubmit={handleSubmit}
        toggleDialog={toggleDialog}
        form={{
          setFieldsValue: () => {},
          getFieldsValue: () => {},
          getFieldDecorator: () => () => {},
          setFields: () => {},
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render cancel click', () => {
    const e = { nativeEvent: { stopImmediatePropagation: _.noop } }
    const wrapper = shallow(
      <DialogFilter
        dialogTitle={dialogTitle}
        dialogBtnContent='Update'
        isOpen={isOpen}
        defaultValue={defaultValue}
        handleSubmit={handleSubmit}
        toggleDialog={toggleDialog}
        form={{
          setFieldsValue: () => {},
          getFieldsValue: () => {},
          getFieldDecorator: () => () => {},
          setFields: () => {},
        }}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render icon click', () => {
    const e = { nativeEvent: { stopImmediatePropagation: _.noop } }
    const wrapper = shallow(
      <DialogFilter
        dialogTitle={dialogTitle}
        dialogBtnContent='Update'
        isOpen={isOpen}
        defaultValue={defaultValue}
        handleSubmit={handleSubmit}
        toggleDialog={toggleDialog}
        form={{
          setFieldsValue: () => {},
          getFieldsValue: () => {},
          getFieldDecorator: () => () => {},
          setFields: () => {},
        }}
      />,
    )
    // expect(wrapper.state('passwordInputType')).toEqual('password')
    expect(wrapper).toMatchSnapshot()
  })
})
