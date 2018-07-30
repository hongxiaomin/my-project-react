import React from 'react'
import { DeleteDialog } from 'routes/Inline/routes/Service/components/ServiceCard/DeleteDialog'

describe('(Component) DeleteDialog', () => {
  const id = 1
  const isOpen = false
  const toggleDialog = jest.fn()
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <DeleteDialog
        id={id}
        isOpen={isOpen}
        toggleDialog={toggleDialog}
        dispatch={dispatch}
      />,
    )
    wrapper.find('Button').last().simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})
