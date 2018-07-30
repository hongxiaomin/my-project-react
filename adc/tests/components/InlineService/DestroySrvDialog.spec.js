import React from 'react'
import { DestroySrvDialog } from 'routes/Inline/routes/Service/components/ServiceCard/DestroySrvDialog'

describe('(Component) DestroySrvDialog', () => {
  const info = {}
  const isOpen = false
  const toggleDialog = jest.fn()
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <DestroySrvDialog
        info={info}
        isOpen={isOpen}
        toggleDialog={toggleDialog}
        dispatch={dispatch}
      />,
    )
    wrapper.find('Button').last().simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})
