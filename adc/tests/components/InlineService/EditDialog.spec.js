import React from 'react'
import { EditDialog } from 'routes/Inline/routes/Service/components/EditDialog/EditDialog'

describe('(Component) EditDialog', () => {
  const info = {}
  const editOpen = false
  const toggleDialog = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <EditDialog
        info={info}
        editOpen={editOpen}
        toggleDialog={toggleDialog}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
