import React from 'react'
import { shallow } from 'enzyme'
import { CopyModel } from 'routes/ModelManagement/routes/ModelManagement/components/CopyModel/CopyModel'

describe('(Component) CopyModel', () => {
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
    <CopyModel
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
