import React from 'react'
import { CreateServiceDialog } from 'routes/Inline/routes/Service/components/CreateServiceDialog/CreateServiceDialog'

describe('(Component) CreateServiceDialog', () => {
  const info = {}
  const isOpen = false
  const toggleDialog = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <CreateServiceDialog
        info={info}
        isOpen={isOpen}
        toggleDialog={toggleDialog}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
