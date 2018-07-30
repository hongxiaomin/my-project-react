import React from 'react'
import { StartDialog } from 'routes/Inline/routes/Service/components/ServiceCard/StartDialog'

describe('(Component) StartDialog', () => {
  const info = { serviceId: 1 }
  const isOpen = false
  const toggleDialog = jest.fn()
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <StartDialog
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
