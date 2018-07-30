import React from 'react'
import DialogFilter from 'routes/Inline/routes/ModelParing/components/CreateModelParing/Dialog'

describe('(Component) DialogFilter', () => {
  const isOpen = false
  const DialogID = 1
  const that = { state: { isTrialRun: true } }
  const DialogTitle = 'TITLE'
  const modelstatus = 'a'
  const checkError = 'a'
  const processId = []
  const productId = []
  const modelOption = [{ id: 1, modelList: [{ id: 2 }]}]
  const dispatch = jest.fn()
  const toggleDialog = jest.fn()
  const handleSubmit = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <DialogFilter
        isOpen={isOpen}
        DialogID={DialogID}
        that={that}
        DialogTitle={DialogTitle}
        status={true}
        modelstatus={modelstatus}
        checkError={checkError}
        dispatch={dispatch}
        processId={processId}
        productId={productId}
        modelOption={modelOption}
        toggleDialog={toggleDialog}
        handleSubmit={handleSubmit}
      />,
    )

    //  Dialog节点找不到
    // wrapper.find('Dialog').simulate('click')
    // expect(wrapper.state('processId')).toEqual('')
    // expect(wrapper.state('productId')).toEqual('')
    // expect(wrapper.state('model')).toEqual('')
    // expect(wrapper.state('isTrialRun')).toEqual(true)
    expect(wrapper).toMatchSnapshot()
  })
  it('render status = false', () => {
    const wrapper = shallow(
      <DialogFilter
        isOpen={isOpen}
        DialogID={DialogID}
        that={that}
        DialogTitle={DialogTitle}
        status={false}
        modelstatus={modelstatus}
        checkError={checkError}
        dispatch={dispatch}
        processId={processId}
        productId={productId}
        modelOption={modelOption}
        toggleDialog={toggleDialog}
        handleSubmit={handleSubmit}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render dialogid = " " ', () => {
    const wrapper = shallow(
      <DialogFilter
        isOpen={isOpen}
        DialogID=''
        that={that}
        DialogTitle={DialogTitle}
        status={false}
        modelstatus={modelstatus}
        checkError={checkError}
        dispatch={dispatch}
        processId={processId}
        productId={productId}
        modelOption={modelOption}
        toggleDialog={toggleDialog}
        handleSubmit={handleSubmit}
      />,
    )
    wrapper.find('Select').at(0).simulate('change', { value: 'a'})
    wrapper.find('Select').at(1).simulate('change', { value: 'b'})
    wrapper.find('Select').at(2).simulate('change', { value: 'c'})
    //Checkbox节点找不到
    // wrapper.find('Checkbox').simulate('change', { target: { checked: true } })
    expect(wrapper).toMatchSnapshot()
  })
})
