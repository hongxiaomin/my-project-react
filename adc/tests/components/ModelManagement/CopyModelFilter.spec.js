import React from 'react'
import { shallow } from 'enzyme'
import { Filter } from 'routes/ModelManagement/routes/ModelManagement/components/CopyModel/Filter'

describe('(Component) Filter', () => {
  const that = { state: { data: {} } }
  const activeKey = 'filter'
  const dispatch = jest.fn()
  it('render normally', () => {
    const defect = { id: 1, defectName: '1', map: jest.fn() }
    const process = { id: 1, processName: '1', map: jest.fn() }
    const product = { id: 1, productName: '1', map: jest.fn() }
    const wrapper = shallow(
      <Filter
        that={that}
        defect={defect}
        process={process}
        product={product}
        activeKey={activeKey}
        dispatch={dispatch}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('products is empty', () => {
    const defect = { id: 1, defectName: '1', map: jest.fn() }
    const process = { id: 1, processName: '1', map: jest.fn() }
    const product = { map: jest.fn() }
    const wrapper = shallow(
      <Filter
        that={that}
        defect={defect}
        process={process}
        product={product}
        activeKey={activeKey}
        dispatch={dispatch}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
