import React from 'react'
import { DirTree } from 'routes/Offline/routes/Labeling/components/ImagePath/DirTree'

describe('(Component) DirTree', () => {
  const wrapper = shallow(<DirTree
    data={[]}
    dispatch={() => {}}
  />)
  it('element Modal', () => {
    expect(wrapper.find('Modal').length).toBe(1)
  })

  it('state', () => {
    expect(wrapper.state('isOpen')).toBe(false)
    wrapper.find('a').at(0).simulate('click')
    expect(wrapper.state('isOpen')).toBe(true)
  })
})
