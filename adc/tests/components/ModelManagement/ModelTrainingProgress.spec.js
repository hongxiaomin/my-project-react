import React from 'react'
import { shallow } from 'enzyme'
import { ModelTrainingProgress } from 'routes/ModelManagement/routes/ModelManagement/components/ModelTrainingProgress/ModelTrainingProgress'

describe('(Component) ModelTrainingProgress', () => {
  it('render normally', () => {
    const lossRate = [0.1, 0.2, 0.3]
    const accuracy = [0.5, 0.1, 0.8]
    const wrapper = shallow(
      <ModelTrainingProgress
        lossRate={lossRate}
        accuracy={accuracy}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
