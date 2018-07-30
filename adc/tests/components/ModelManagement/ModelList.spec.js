import React from 'react'
import { shallow } from 'enzyme'
import { ModelList } from 'routes/ModelManagement/routes/ModelManagement/components/ModelList/ModelList'

describe('(Component) ModelList', () => {
  it('render normally', () => {
    const data = [{
      isVerified: true,
      createTime: 'Jan 30, 2018 9:14:36 PM',
      status: 'none',
      isPublished: false,
      currentState: 'none',
      id: 1,
      isDefault: false,
      isTrained: true,
      lossRate: 0.00005,
      iteration: 5000,
      name: 'models',
      path: 'sfdfsdfsf',
      version: '1.0',
    }]
    const dispatch = jest.fn()
    const rowDetail = jest.fn()
    const wrapper = shallow(
      <ModelList modelList={data} dispatch={dispatch} rowDetail={rowDetail} />,
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.containsMatchingElement(
      [<span>Model List</span>,
      ])).toEqual(true)
  })
})
