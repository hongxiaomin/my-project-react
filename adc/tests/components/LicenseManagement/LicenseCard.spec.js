import React from 'react'
import { shallow, mount } from 'enzyme'
import _ from 'lodash'
import { LicenseCard } from 'routes/LicenseManagement/routes/License/components/LicenseCard/LicenseCard'

describe('(Component) edit is true', () => {
  const dispatch = jest.fn()
  const item = [{ deviceGpu: [{ id: 1 }], name: 'a' }]
  it('render normally', () => {
    const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    const e = { target: { value: 'name' } }
    const save = jest.fn()
    const wrapper = shallow(
      <LicenseCard
        dispatch={dispatch}
        item={item}
      />,
    )
    wrapper.find('Icon').at(0).simulate('click', nativeEvent)
    expect(wrapper.state('isEdit')).toEqual(true)
    wrapper.find('Icon').at(1).simulate('click', e)
    const tmp = {}
    dispatch(save(tmp, () => {}))
    expect(wrapper.state('isEdit')).toEqual(false)
    // wrapper.find('InputNumber').simulate('change', )

    expect(wrapper).toMatchSnapshot()
  })
  it('render name state', () => {
    const e = { nativeEvent: { stopImmediatePropagation: _.noop }, target: { value: 'name' } }
    const wrapper = shallow(
      <LicenseCard
        dispatch={dispatch}
        item={item}
      />,
    )
    wrapper.find('Icon').at(0).simulate('click', e)
    expect(wrapper.state('isEdit')).toEqual(true)
    wrapper.find('Input').at(0).simulate('change', e)
    expect(wrapper.state('name')).toEqual('name')
    expect(wrapper).toMatchSnapshot()
  })
})

describe('(Component) edit is false', () => {
  const dispatch = jest.fn()
  const item = { deviceGpu: [{ id: 1 }], name: 'a' }
  it('render button getLicense', () => {
    const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    const e = { target: { value: 'name' } }
    const save = jest.fn()
    const wrapper = shallow(
      <LicenseCard
        dispatch={dispatch}
        item={item}
      />,
    )
    wrapper.find('button').at(0).simulate('click')
    // expect(wrapper.state('name')).toEqual('name')
    expect(wrapper).toMatchSnapshot()
  })
  it('render input handleChangeOtherString', () => {
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    const e = { target: { value: 'name' } }
    const wrapper = shallow(
      <LicenseCard
        dispatch={dispatch}
        item={item}
      />,
    )
    wrapper.find('Input').at(0).simulate('change', e)
    expect(wrapper.state('inputString')).toEqual('name')
    expect(wrapper).toMatchSnapshot()
  })
  it('render radioGroup', () => {
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    const e = { target: { value: 'name' } }
    const wrapper = shallow(
      <LicenseCard
        dispatch={dispatch}
        item={item}
      />,
    )
    wrapper.find('RadioGroup').at(0).simulate('change', e)
    expect(wrapper.state('isTrainingOrJudging')).toEqual('name')
    expect(wrapper).toMatchSnapshot()
  })
  it('render activate', () => {
    const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    const e = { target: { value: 'name' } }
    const wrapper = shallow(
      <LicenseCard
        dispatch={dispatch}
        item={item}
      />,
    )
    wrapper.find('button').at(1).simulate('click', nativeEvent)
    // expect(wrapper.state('isTrainingOrJudging')).toEqual('name')
    expect(wrapper).toMatchSnapshot()
  })
})
describe('(Component) isactivate is true', () => {
  const dispatch = jest.fn()
  const item = { deviceGpus: [{ id: 1 }], name: 'a', isActivate: true }
  it('render', () => {
    const wrapper = shallow(
      <LicenseCard
        dispatch={dispatch}
        item={item}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render input number', () => {
    const e = 1
    const wrapper = shallow(
      <LicenseCard
        dispatch={dispatch}
        item={item}
      />,
    )
    wrapper.find('InputNumber').at(0).simulate('change', e)
    expect(wrapper.state('count')).toEqual(1)
    expect(wrapper).toMatchSnapshot()
  })
})
