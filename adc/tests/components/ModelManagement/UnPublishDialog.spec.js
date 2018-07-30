import React from 'react'
import { shallow } from 'enzyme'
import { UnPublishDialog } from 'routes/ModelManagement/routes/ModelManagement/components/ModelList/UnPublishDialog'

describe('(Component) UnPublishDialog', () => {
  const dispatch = jest.fn()
  const toggleUnPublish = jest.fn()
  const dataDetail = {
    original: {
      id: 2,
    },
  }
  const wrapper = shallow(
    <UnPublishDialog
      dataDetail={dataDetail}
      dispatch={dispatch}
      toggleUnPublish={toggleUnPublish}
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
