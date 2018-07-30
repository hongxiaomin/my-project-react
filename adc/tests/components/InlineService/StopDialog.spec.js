import React from 'react'
import { StopDialog } from 'routes/Inline/routes/Service/components/ServiceCard/StopDialog'

describe('(Component) StopDialog', () => {
  const info = { serviceId: 1 }
  const isOpen = false
  const toggleDialog = jest.fn()
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <StopDialog
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
