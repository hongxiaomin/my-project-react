import React from 'react'
import { shallow } from 'enzyme'
import { UnDefaultDialog } from 'routes/ModelManagement/routes/ModelManagement/components/ModelList/UnDefaultDialog'

describe('(Component) UnDefaultDialog', () => {
  const dispatch = jest.fn()
  const toggleunDefault = jest.fn()
  const dataDetail = {
    original: {
      id: 2,
    },
  }
  const wrapper = shallow(
    <UnDefaultDialog
      dataDetail={dataDetail}
      dispatch={dispatch}
      toggleunDefault={toggleunDefault}
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
