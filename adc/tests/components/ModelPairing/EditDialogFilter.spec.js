import React from 'react'
import { EditDialog } from 'routes/Inline/routes/ModelParing/components/EditDialog/EditDialog'

describe('(Component) EditDialog', () => {
  const editOpen = false
  const dataDetail = { original: { modelName: 'a' } }
  const status = 'a'
  const modelList = []
  const dispatch = jest.fn()
  const toggleEdit = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <EditDialog
        editOpen={editOpen}
        dataDetail={dataDetail}
        modelList={modelList}
        dispatch={dispatch}
        status={status}
        toggleEdit={toggleEdit}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
