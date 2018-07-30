import React from 'react'
import { DeleteDialog } from 'routes/Inline/routes/ModelParing/components/ModelSettingList/DeleteDialog'

describe('(Component) DeleteDialog', () => {
  const dataDetail = { original: { configId: 1 }}
  const delOpen = false
  const dispatch = jest.fn()
  const toggleDel = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <DeleteDialog
        dataDetail={dataDetail}
        delOpen={delOpen}
        toggleDel={toggleDel}
        dispatch={dispatch}
      />,
    )
    wrapper.find('Button').at(1).simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})
