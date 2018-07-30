import React from 'react'
import { shallow } from 'enzyme'
import { Modal, Button } from 'antd'
import AlertModelMqttError from 'components/AlertModelMqttError'

describe('(Component) AlertModelMqttError', () => {
  const isOpen = true
  const errorMsg = ''
  const handleCancel = jest.fn()
  const wrapper = shallow(
    <AlertModelMqttError
      isOpen={isOpen}
      errorMsg={errorMsg}
      handleCancel={handleCancel}
    />,
  )
  it('render normally', () => {
      console.log(wrapper.state('isOpen'))
      console.log(wrapper.find(Modal).shallow('.ant-modal-mask').simulate)
      wrapper.find(Modal).shallow('.ant-modal-mask').simulate('click')
      console.log(wrapper.state('isOpen'))
    // expect(wrapper.state('isOpen')).toEqual(false)
    // expect(wrapper).toMatchSnapshot()
  })
})
