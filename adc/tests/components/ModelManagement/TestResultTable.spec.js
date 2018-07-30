import React from 'react'
import { shallow } from 'enzyme'
import { ResultTable } from 'routes/ModelManagement/routes/ModelManagement/components/TestResultCopy/ResultTable'

describe('(Component) ResultTable', () => {
  it('data is empty', () => {
    const testResultList = []
    const dispatch = jest.fn()
    const wrapper = shallow(
      <ResultTable testResultList={testResultList} id={2} dispatch={dispatch} />,
    )
    expect(testResultList).toHaveLength(0)
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally', () => {
    const testResultList = [{
      defectCode: 'TNDAC1',
      others: 91,
      TNDAC0: 1030,
      TNDAC1: 600,
      recall: '50%',
    }]
    const dispatch = jest.fn()
    const wrapper = shallow(
      <ResultTable testResultList={testResultList} id={2} dispatch={dispatch} />,
    )
    expect(testResultList).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })
})
