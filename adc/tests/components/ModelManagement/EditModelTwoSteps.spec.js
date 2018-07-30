import React from 'react'
import { shallow } from 'enzyme'
import { TwoStep } from 'routes/ModelManagement/routes/ModelManagement/components/EditModel/TwoSteps'

describe('(Component) TwoStep', () => {
  const that = { state: { interation: 11111, modelName: '1', description: '1' } }
  const process = { id: 1, name: '1' }
  const product = { id: 1, name: '1' }
  const defect = { id: 1, name: '1' }
  const data = {}
  const imageSource = {}
  const dispatch = jest.fn()
  const sourceType = 'filter'
  const wrapper = shallow(
    <TwoStep
      that={that}
      process={process}
      product={product}
      defect={defect}
      data={data}
      imageSource={imageSource}
      dispatch={dispatch}
      sourceType={sourceType}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
