import React from 'react'
import { shallow } from 'enzyme'
import { DeleteDialog } from 'routes/ModelManagement/routes/ModelManagement/components/ModelList/DeleteDialog'

describe('(Component) DeleteDialog', () => {
  const dispatch = jest.fn()
  const toggleDel = jest.fn()
  const dataDetail = {
    original: {
      id: 2,
    },
  }
  const wrapper = shallow(
    <DeleteDialog
      dataDetail={dataDetail}
      dispatch={dispatch}
      toggleDel={toggleDel}
      delOpen={false}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('click is called', () => {
    wrapper.find('Button').last().simulate('click')
  })
})
