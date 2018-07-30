import React from 'react'
import { shallow } from 'enzyme'
import { Train } from 'routes/ModelManagement/routes/ModelManagement/components/Train/Train'

describe('(Component) Train', () => {
  const viewId = '1'
  const modelList = [{
    id: 1,
    name: 'model',
    description: 'aaa',
  }]
  const rowDetail = {
    id: 1,
    name: 'model',
  }
  const dispatch = jest.fn()
  it('render currentState=testing', () => {
    const rowDetail = {
      id: 1,
      name: 'model',
      currentState: 'testing',
    }
    const wrapper = shallow(
      <Train viewId={viewId} modelList={modelList} dispatch={dispatch} rowDetail={rowDetail} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render currentState=none && istrained', () => {
    const rowDetail = {
      id: 1,
      name: 'model',
      currentState: 'none',
      isTrained: true,
    }
    const wrapper = shallow(
      <Train viewId={viewId} modelList={modelList} dispatch={dispatch} rowDetail={rowDetail} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render trainingStatus=inited', () => {
    const rowDetail = {
      id: 1,
      name: 'model',
    }
    const wrapper = shallow(
      <Train viewId={viewId} modelList={modelList} dispatch={dispatch} rowDetail={rowDetail} status='inited' />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render trainingStatus=none percent=1', () => {
    const rowDetail = {
      id: 1,
      name: 'model',
    }
    const wrapper = shallow(
      <Train
        viewId={viewId}
        modelList={modelList}
        dispatch={dispatch}
        rowDetail={rowDetail}
        status='none'
        percent={2}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('Should be have div', () => {
    const wrapper = shallow(
      <Train viewId={viewId} modelList={modelList} dispatch={dispatch} rowDetail={rowDetail} />,
    )
    expect(wrapper.containsAnyMatchingElements([
      <div>Model Training</div>,
    ])).toEqual(true)
  })
})
