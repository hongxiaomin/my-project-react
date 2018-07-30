import React from 'react'
import { shallow } from 'enzyme'
import { TestResult } from 'routes/ModelManagement/routes/ModelManagement/components/TestResultCopy/TestResultCopy'

describe('(Component) TestResult', () => {
  it('render normally', () => {
    const modelResultType = [{
      defectId: '1',
      defectCode: 'TNDAC1',
      defaultConfidence: 0,
    }]
    const dispatch = jest.fn()
    const wrapper = shallow(
      <TestResult modelResultType={modelResultType} id='1' dispatch={dispatch} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
