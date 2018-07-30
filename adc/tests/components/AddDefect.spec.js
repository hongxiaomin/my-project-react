import React from 'react'
import { shallow, mount } from 'enzyme'
import _ from 'lodash'
import { AddDefectCode } from 'routes/Offline/routes/Labeling/components/DefectCode/AddDefectCode'

describe('(Component) AddDefectCode', () => {
  const visible = true
  const handleCancel = jest.fn()
  const addDefectCode = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <AddDefectCode
        visible={visible}
        form={{
          setFieldsValue: () => {},
          getFieldsValue: () => {},
          getFieldDecorator: () => () => {},
          setFields: () => {},
        }}
        handleCancel={handleCancel}
        addDefectCode={addDefectCode}
      />,
    )
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    // wrapper.find('Modal').simulate('click', nativeEvent)
    // expect(wrapper.state('loading')).toBe(false)
    expect(wrapper).toMatchSnapshot()
  })
})

