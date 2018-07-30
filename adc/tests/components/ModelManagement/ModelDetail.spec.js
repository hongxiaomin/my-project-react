import React from 'react'
import { shallow, mount } from 'enzyme'

import { ModelDetail } from 'routes/ModelManagement/routes/ModelManagement/components/ModelDetail/ModelDetail'

describe('(Component) ModelDetail', () => {
  it('render normally', () => {
    const rowDetail = {
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
    }
    const dispatch = jest.fn()
    const modelDetail = {
      modelAttributes: { product: [], process: [], createTime: '2017-10-20 15:14:16.0', defect: [] },
      testingInfo: { testingProgress: 0, testingEndTime: ', testingBeginTime: ' },
      trainingInfo: { trainingEndTime: ', trainingBeginTime: ', trainingProgress: 0 },
    }
    const wrapper = shallow(
      <ModelDetail rowDetail={rowDetail} dispatch={dispatch} modelDetail={modelDetail} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('trainingProgress === 1', () => {
    const rowDetail = {
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
    }
    const dispatch = jest.fn()
    const modelDetail = {
      modelAttributes: { product: [], process: [], createTime: '2017-10-20 15:14:16.0', defect: [] },
      testingInfo: { testingProgress: 0, testingEndTime: ', testingBeginTime: ' },
      trainingInfo: { trainingEndTime: ', trainingBeginTime: ', trainingProgress: 1 },
    }
    const wrapper = shallow(
      <ModelDetail rowDetail={rowDetail} dispatch={dispatch} modelDetail={modelDetail} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('testingProgress === 1', () => {
    const rowDetail = {
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
    }
    const dispatch = jest.fn()
    const modelDetail = {
      modelAttributes: { product: [], process: [], createTime: '2017-10-20 15:14:16.0', defect: [] },
      testingInfo: { testingProgress: 1, testingEndTime: ', testingBeginTime: ' },
      trainingInfo: { trainingEndTime: ', trainingBeginTime: ', trainingProgress: 1 },
    }
    const wrapper = shallow(
      <ModelDetail rowDetail={rowDetail} dispatch={dispatch} modelDetail={modelDetail} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('click', () => {
    const rowDetail = {
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
    }
    const dispatch = jest.fn()
    const modelDetail = {
      modelAttributes: { product: [], process: [], createTime: '2017-10-20 15:14:16.0', defect: [] },
      testingInfo: { testingProgress: 0, testingEndTime: ', testingBeginTime: ' },
      trainingInfo: { trainingEndTime: ', trainingBeginTime: ', trainingProgress: 0 },
    }
    const wrapper = shallow(
      <ModelDetail rowDetail={rowDetail} dispatch={dispatch} modelDetail={modelDetail} />,
    )
    wrapper.find('button').at(0).simulate('click')
    wrapper.find('button').at(1).simulate('click')
  })
})
