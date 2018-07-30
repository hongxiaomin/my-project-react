import React from 'react'
import { shallow } from 'enzyme'
import { EditModelName } from 'routes/ModelManagement/routes/ModelManagement/components/EditModelName/EditModelName'

describe('(Component) EditModelName', () => {
  const toggleEdit = jest.fn()
  const dataDetail = { original: { id: '1', name: 'model' }}
  const editOpen = false
  const dispatch = jest.fn()
  const wrapper = shallow(
    <EditModelName
      toggleEdit={toggleEdit}
      dataDetail={dataDetail}
      editOpen={editOpen}
      dispatch={dispatch}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
})