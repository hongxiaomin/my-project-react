import React from 'react'
import { ModelSettingList } from 'routes/Inline/routes/ModelParing/components/ModelSettingList/ModelSettingList'

describe('(Component) ModelSettingList', () => {
  const modelList = []
  const modelSettingList = []
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <ModelSettingList
        modelSettingList={modelSettingList}
        modelList={modelList}
        dispatch={dispatch}
      />,
    )
    console.log(wrapper.find('button'))
    wrapper.setState({ 'editOpen': true })
    wrapper.find('button').at(0).simulate('click')
    wrapper.find('button').at(1).simulate('click')
    wrapper.find('button').at(2).simulate('click')
    expect(wrapper).toMatchSnapshot()
  })
})
