import React from 'react'
import { HotKeysForm, formatHotKeys } from 'routes/Offline/routes/Labeling/components/HotKeys/HotKeysForm'
import { Form, Modal } from 'antd'
import { wrap } from 'module';

describe('(Component) HotKeysForm', () => {
  const hotKeys = {
    add: 76,
    next: 39,
    previous: 37,
    zoomIn: 187,
    save: 13,
    zoomOut: 189,
    delete: 46,
    restore: 79,
  }
  it('formatHotKeys returned value', () => {

    expect(formatHotKeys(hotKeys)).toEqual({
      add: 'L',
      next: '→',
      previous: '←',
      zoomIn: '+',
      save: 'Enter',
      zoomOut: '-',
      delete: 'Delete',
      restore: 'O',
    })
  })

  it('Page rendering', () => {
    const wrapper = shallow(<HotKeysForm
      hotKeys={hotKeys}
      updateKeyCode={() => {}}
      visible={true}
      handleCancel={() => {}}
      form={{
        setFieldsValue: () => {},
        getFieldsValue: () => {},
        getFieldDecorator: () => () => {},
        setFields: () => {},
      }}
    />)
    expect(wrapper.find(Modal)).toHaveLength(1)
  })

  it('Change of state', () => {
    const WrappedForm = Form.create()(HotKeysForm)
    const wrapper = mount(<WrappedForm
      hotKeys={hotKeys}
      updateKeyCode={() => {}}
      visible={true}
      handleCancel={() => {}}
    />)

    // console.log(wrapper.find('input').length)


    //console.log(wrapper.node.getFieldsValue())

    // expect(wrapper.find('HotKeysForm').first().nodes[0].state.loading).toBe(false)
    // wrapper.find('button.ant-btn-primary').at(0).simulate('click')
    // expect(wrapper.find('HotKeysForm').first().nodes[0].state.loading).toBe(false)
  })
})
