import React from 'react'
import { Confidence } from 'routes/Inline/routes/ConfidenceThreshold/components/Confidence/Confidence'

describe('(Component) Confidence', () => {
  const confidenceList = []
  const processList = []
  const productList = []
  const modelList = []
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <Confidence
        confidenceList={confidenceList}
        processList={processList}
        productList={productList}
        modelList={modelList}
        dispatch={dispatch}
      />,
    )
    wrapper.setState({ isDetail: 'aaa' })
    wrapper.find('button').simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})
