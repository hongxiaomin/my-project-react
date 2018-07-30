import React from 'react'
import { shallow } from 'enzyme'
import Dialog from 'routes/ModelManagement/routes/ModelManagement/components/EditModelName/Dialog'

describe('(Component) Dialog', () => {
  const that = { state: { modelName: 'model' } }
  const wrapper = shallow(
    <Dialog
      that={that}
    />,
  )
  it('render normally', () => {
    expect(wrapper).toMatchSnapshot()
  })
})