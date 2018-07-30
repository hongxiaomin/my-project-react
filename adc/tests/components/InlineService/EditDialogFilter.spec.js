import React from 'react'
import { DialogFilter } from 'routes/Inline/routes/Service/components/EditDialog/DialogFilter'

describe('(Component) DialogFilter', () => {
  const DialogID = '1'
  const handleSubmit = jest.fn()
  const that = {}
  const editOpen = false
  const DialogTitle = 'dialog'
  const toggleDialog = jest.fn()
  it('render normally', () => {
    const modelList = []
    const dataDetail = {}
    const item = { id: 1, path: 'path' }
    const wrapper = shallow(
      <DialogFilter
        that={that}
        item={item}
        DialogID={DialogID}
        editOpen={editOpen}
        toggleDialog={toggleDialog}
        modelList={modelList}
        DialogTitle={DialogTitle}
        dataDetail={dataDetail}
        handleSubmit={handleSubmit}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render dataDetail is not empty', () => {
    const modelList = []
    const dataDetail = { id: '1' }
    const wrapper = shallow(
      <DialogFilter
        that={that}
        DialogID={DialogID}
        editOpen={editOpen}
        toggleDialog={toggleDialog}
        modelList={modelList}
        DialogTitle={DialogTitle}
        dataDetail={dataDetail}
        handleSubmit={handleSubmit}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render DialogID is empty', () => {
    const modelList = []
    const dataDetail = { id: '1' }
    const wrapper = shallow(
      <DialogFilter
        that={that}
        DialogID=''
        editOpen={editOpen}
        toggleDialog={toggleDialog}
        modelList={modelList}
        DialogTitle={DialogTitle}
        dataDetail={dataDetail}
        handleSubmit={handleSubmit}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render modelList is not empty', () => {
    const modelList = [{ id: 1, name: '1' }]
    const dataDetail = { id: '1' }
    const wrapper = shallow(
      <DialogFilter
        that={that}
        DialogID={DialogID}
        editOpen={editOpen}
        toggleDialog={toggleDialog}
        modelList={modelList}
        DialogTitle={DialogTitle}
        dataDetail={dataDetail}
        handleSubmit={handleSubmit}
      />,
    )
    wrapper.find('Select').simulate('change', { value: 'aa' })
    // expect(wrapper.props().that.state.model).toEqual('aa')
    expect(wrapper).toMatchSnapshot()
  })
})
