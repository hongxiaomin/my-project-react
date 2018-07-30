import React from 'react'
import { DialogFilter } from 'routes/Inline/routes/ModelParing/components/EditDialog/DialogFilter'

describe('(Component) DialogFilter', () => {
  const editOpen = false
  const DialogID = '1'
  const dataDetail = { original: { modelName: 'a' } }
  const that = { state: { isTrialRun: true } }
  const DialogTitle = 'TITLE'
  const modelstatus = 'a'
  const checkError = 'a'
  const processId = []
  const productId = []
  const modelList = [{ id: 2 }]
  const modelDefect = []
  const dispatch = jest.fn()
  const toggleEdit = jest.fn()
  const handleSubmit = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <DialogFilter
        editOpen={editOpen}
        dataDetail={dataDetail}
        DialogID={DialogID}
        that={that}
        DialogTitle={DialogTitle}
        status={true}
        dispatch={dispatch}
        modelDefect={modelDefect}
        modelList={modelList}
        toggleEdit={toggleEdit}
        handleSubmit={handleSubmit}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render status = false', () => {
    const wrapper = shallow(
      <DialogFilter
        editOpen={editOpen}
        dataDetail={dataDetail}
        DialogID={DialogID}
        that={that}
        DialogTitle={DialogTitle}
        status={true}
        dispatch={dispatch}
        modelDefect={modelDefect}
        modelList={modelList}
        toggleEdit={toggleEdit}
        handleSubmit={handleSubmit}
      />,
    )
    wrapper.find('Select').at(0).simulate('change', { value: 'a'})
    expect(wrapper).toMatchSnapshot()
  })
  it('render DialogID = "" ', () => {
    const wrapper = shallow(
      <DialogFilter
        editOpen={editOpen}
        dataDetail={dataDetail}
        DialogID=''
        that={that}
        DialogTitle={DialogTitle}
        status={true}
        dispatch={dispatch}
        modelDefect={modelDefect}
        modelList={modelList}
        toggleEdit={toggleEdit}
        handleSubmit={handleSubmit}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
