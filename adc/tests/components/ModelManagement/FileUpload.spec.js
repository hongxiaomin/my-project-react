import React from 'react'
import { shallow } from 'enzyme'
import { FileUpload } from 'routes/ModelManagement/routes/ModelManagement/components/Test/FileUpload'

describe('(Component) FileUpload', () => {
  const wrapper = shallow(
    <FileUpload />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
