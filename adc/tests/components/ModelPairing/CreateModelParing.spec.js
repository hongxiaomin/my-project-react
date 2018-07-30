import React from 'react'
import { CreateModelParing } from 'routes/Inline/routes/ModelParing/components/CreateModelParing/CreateModelParing'

describe('(Component) CreateModelParing', () => {
  const isOpen = false
  const status = false
  const modelstatus = 'a'
  const checkError = 'a'
  const processList = []
  const productList = []
  const modelOption = []
  const dispatch = jest.fn()
  const toggleDialog = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <CreateModelParing
        isOpen={isOpen}
        status={status}
        modelstatus={modelstatus}
        checkError={checkError}
        dispatch={dispatch}
        processList={processList}
        productList={productList}
        modelOption={modelOption}
        toggleDialog={toggleDialog}
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
})
