import React from 'react'
import { ResetDialog } from 'routes/Inline/routes/Service/components/ServiceCard/ResetDialog'

describe('(Component) ResetDialog', () => {
  const info = { serviceId: 1 }
  const isOpen = false
  const toggleDialog = jest.fn()
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <ResetDialog
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
