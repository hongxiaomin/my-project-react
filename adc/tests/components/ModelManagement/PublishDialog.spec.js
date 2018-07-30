import React from 'react'
import { shallow } from 'enzyme'
import { PublishDialog } from 'routes/ModelManagement/routes/ModelManagement/components/ModelList/PublishDialog'

describe('(Component) PublishDialog', () => {
  const dispatch = jest.fn()
  const togglePublish = jest.fn()
  const dataDetail = {
    original: {
      id: 2,
    },
  }
  const wrapper = shallow(
    <PublishDialog
      dataDetail={dataDetail}
      dispatch={dispatch}
      togglePublish={togglePublish}
      delOpen={false}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('click is called', () => {
    wrapper.find('Button').last().simulate('click')
  })
})
