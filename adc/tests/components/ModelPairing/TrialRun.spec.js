import React from 'react'
import { TrialRun } from 'routes/Inline/routes/ModelParing/components/ModelSettingList/TrialRun'

describe('(Component) TrialRun', () => {
  const trialRunOpen = false
  const dispatch = jest.fn()
  const trialRun = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <TrialRun
        dataDetail={{ original: { isTrialRun: false } }}
        trialRunOpen={trialRunOpen}
        trialRun={trialRun}
        dispatch={dispatch}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render isTrialRun=true', () => {
    const wrapper = shallow(
      <TrialRun
        dataDetail={{ original: { isTrialRun: true } }}
        trialRunOpen={trialRunOpen}
        trialRun={trialRun}
        dispatch={dispatch}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render productid=null', () => {
    const wrapper = shallow(
      <TrialRun
        dataDetail={{ original: 
          { isTrialRun: true, productId: '', 
            modelId: { toString: jest.fn()},
            processId: { toString: jest.fn()},
            configId: { toString: jest.fn()},
            productId: { toString: jest.fn()}
          } }}
        trialRunOpen={trialRunOpen}
        trialRun={trialRun}
        dispatch={dispatch}
      />,
    )
    wrapper.find('Button').at(1).simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
  it('render productid !== null', () => {
    const wrapper = shallow(
      <TrialRun
      dataDetail={{ original: 
        { isTrialRun: true, productId: 1, 
          modelId: { toString: jest.fn()},
          processId: { toString: jest.fn()},
          configId: { toString: jest.fn()},
        } }}
        trialRunOpen={trialRunOpen}
        trialRun={trialRun}
        dispatch={dispatch}
      />,
    )
    wrapper.find('Button').at(1).simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})
