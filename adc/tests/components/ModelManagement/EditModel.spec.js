import React from 'react'
import { shallow } from 'enzyme'
import { EditModel } from 'routes/ModelManagement/routes/ModelManagement/components/EditModel/EditModel'

describe('(Component) EditModel', () => {
  const toggle = jest.fn()
  const title = 'edit'
  const visible = false
  const dataDetail = { original: { id: '1', name: 'model' }}
  const editOpen = false
  const dispatch = jest.fn()
  const allDefectCode = {
    targetCode: { id: 1, name: '1' },
    othersCode: { id: 1, name: '2' },
  }
  const wrapper = shallow(
    <EditModel
      toggle={toggle}
      title={title}
      visible={visible}
      dataDetail={dataDetail}
      editOpen={editOpen}
      dispatch={dispatch}
      allDefectCode={allDefectCode}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
