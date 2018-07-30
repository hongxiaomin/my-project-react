import React from 'react'
import { DialogFilter } from 'routes/Inline/routes/Service/components/DialogFilter/DialogFilter'

describe('(Component) DialogFilter', () => {
  const info = {}
  const isOpen = false
  
  const DialogTitle = 'dialog'
  const sendCommand = jest.fn()
  const toggleDialog = jest.fn()
  it('render normally', () => {
    const modelList = []
    const wrapper = shallow(
      <DialogFilter
        info={info}
        isOpen={isOpen}
        toggleDialog={toggleDialog}
        modelList={modelList}
        DialogTitle={DialogTitle}
        sendCommand={sendCommand}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally modellist is not null ', () => {
    const modelList = [{ id: '1', name: '1', isPublished: true }]
    const wrapper = shallow(
      <DialogFilter
        info={info}
        isOpen={isOpen}
        toggleDialog={toggleDialog}
        modelList={modelList}
        DialogTitle={DialogTitle}
        sendCommand={sendCommand}
      />,
    )
    wrapper.setState({ serviceName: '' })
    wrapper.find('Input').simulate('change', { target: { value: 'aa' } })
    expect(wrapper.state('serviceName')).toEqual('aa')
    wrapper.find('Button').at(1).simulate('click')
    // expect(wrapper.state('serviceName')).toEqual('aa')
    expect(wrapper).toMatchSnapshot()
  })
})
