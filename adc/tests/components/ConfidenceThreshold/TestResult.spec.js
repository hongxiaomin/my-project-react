import React from 'react'
import { TestResult } from 'routes/Inline/routes/ConfidenceThreshold/components/TestResult/TestResult'

describe('(Component) TestResult', () => {
  const checkData = []
  const modelResultType = [{ defectCode: '1'}, { defectCode: '2' }]
  const rowDetail = { _original: { processId: 1, productId: 1, modelId: { toString: jest.fn()}} }
  const confidenceList = []
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <TestResult
        confidenceList={confidenceList}
        modelResultType={modelResultType}
        rowDetail={rowDetail}
        dispatch={dispatch}
        checkData={checkData}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render mount', () => {
    const wrapper = mount(
      <TestResult
        confidenceList={confidenceList}
        modelResultType={modelResultType}
        rowDetail={rowDetail}
        dispatch={dispatch}
        checkData={checkData}
      />,
    )
    wrapper.find('button').at(0).simulate('click')
    wrapper.find('button').at(1).simulate('click')
    wrapper.find('Slider').at(0).simulate('change', { value: '10'})
    wrapper.find('InputNumber').at(0).simulate('change', { value: '10'})
    expect(wrapper).toMatchSnapshot()
  })
})
