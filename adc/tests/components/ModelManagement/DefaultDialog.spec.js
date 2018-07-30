import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'antd'
import { DefaultDialog } from 'routes/ModelManagement/routes/ModelManagement/components/ModelList/DefaultDialog'

describe('(Component) DefaultDialog', () => {
  const dispatch = jest.fn()
  const toggleDefault = jest.fn()
  const dataDetail = {
    original: {
      id: 2,
    },
  }
  const wrapper = shallow(
    <DefaultDialog
      dataDetail={dataDetail}
      dispatch={dispatch}
      toggleDefault={toggleDefault}
      isDefaultOpen={false}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('handleSubmit is called', () => {
    wrapper.find('Button').last().simulate('click')
  })
})
