import React from 'react'
import { ConfidenceList } from 'routes/Inline/routes/ConfidenceThreshold/components/ConfidenceList/ConfidenceList'

describe('(Component) ConfidenceList', () => {
  const confidenceList = []
  const isDetail = jest.fn()
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <ConfidenceList
        confidenceList={confidenceList}
        isDetail={isDetail}
        dispatch={dispatch}
      />,
    )
    // console.log(wrapper.find('button'))
    // wrapper.setState({ 'editOpen': true })
    // wrapper.find('button').at(0).simulate('click')
    // wrapper.find('button').at(1).simulate('click')
    // wrapper.find('button').at(2).simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})
