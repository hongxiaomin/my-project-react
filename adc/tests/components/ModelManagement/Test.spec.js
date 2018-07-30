import React from 'react'
import { shallow } from 'enzyme'
import { Test } from 'routes/ModelManagement/routes/ModelManagement/components/Test/Test'

describe('(Component) Test', () => {
  const viewId = '1'
  const modelList = [{
    id: 1,
    name: 'model',
    description: 'aaa',
  }]
  const dispatch = jest.fn()
  it('render testingStatus=inited', () => {
    const rowDetail = {
      id: 1,
      name: 'model',
    }
    const wrapper = shallow(
      <Test viewId={viewId} modelList={modelList} dispatch={dispatch} rowDetail={rowDetail} testingStatus='inited' />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render render status=feeded && percent =1', () => {
    const rowDetail = {
      id: 1,
      name: 'model',
    }
    const wrapper = shallow(
      <Test
        viewId={viewId}
        modelList={modelList}
        dispatch={dispatch}
        rowDetail={rowDetail}
        status='feeded'
        percent={1}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('Should be have div', () => {
    const rowDetail = {
      id: 1,
      name: 'model',
    }
    const wrapper = shallow(
      <Test viewId={viewId} modelList={modelList} dispatch={dispatch} rowDetail={rowDetail} />,
    )
    expect(wrapper.containsAnyMatchingElements([
      <div>Model Testing</div>,
    ])).toEqual(true)
    expect(wrapper.containsAnyMatchingElements([
      <span>Image Path</span>,
    ])).toEqual(true)
    wrapper.find('input').at(0).simulate('change', { target: { value: 'value' } })
    wrapper.find('Button').at(0).simulate('click')
  })
  it('this.props.testingImageCount !== 0', () => {
    const rowDetail = {
      id: 1,
      name: 'model',
    }
    const testingImageCount = 1
    const wrapper = shallow(
      <Test
        viewId={viewId}
        modelList={modelList}
        dispatch={dispatch}
        rowDetail={rowDetail}
        testingImageCount={testingImageCount}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('this.props.testingImageCount == 0', () => {
    const rowDetail = {
      id: 1,
      name: 'model',
    }
    const testingImageCount = 0
    const wrapper = shallow(
      <Test
        viewId={viewId}
        modelList={modelList}
        dispatch={dispatch}
        rowDetail={rowDetail}
        testingImageCount={testingImageCount}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
