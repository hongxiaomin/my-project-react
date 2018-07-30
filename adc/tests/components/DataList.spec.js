import React from 'react'
import { shallow, mount } from 'enzyme'
import _ from 'lodash'
import { DataList } from 'routes/Offline/routes/Labeling/components/DefectCode/DataList/DataList'

describe('(Component) DataList', () => {
  const data = []
  const onChange = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <DataList
        data={data}
        onChange={onChange}
      />,
    )
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    expect(wrapper).toMatchSnapshot()
  })
  it('span click', () => {
    const wrapper = shallow(
      <DataList
        data={data}
        onChange={onChange}
      />,
    )
    wrapper.find('span').at(0).simulate('click')
    expect(wrapper.state('select')).toEqual(true)
    wrapper.find('span').at(1).simulate('click')
    expect(wrapper.state('text')).toEqual('')
  })
})

