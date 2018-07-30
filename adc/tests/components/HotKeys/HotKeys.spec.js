import React from 'react'
import { HotKeys } from 'routes/Offline/routes/Labeling/components/HotKeys/HotKeys'

describe('(Component) HotKeys', () => {
  // 判断是否有H3
  const updateResetKeyCodeStatus = () => {}
  const dispatch = jest.fn()
  const wrapper = shallow(
    <HotKeys
      updateResetKeyCodeStatus={updateResetKeyCodeStatus}
      dispatch={dispatch}
    />)
  it('Should be have span', () => {
    expect(wrapper.containsAnyMatchingElements([
      <sapn>Image Labeling</sapn>,
    ])).toEqual(true)
  })

  // 执行点击事件， 查看状态
  it('Change of state', () => {
    const visible = wrapper.state('visible')
    expect(wrapper.find('a').at(0).simulate('click'))
    expect(wrapper.state('visible')).not.toBe(visible)
  })
})
