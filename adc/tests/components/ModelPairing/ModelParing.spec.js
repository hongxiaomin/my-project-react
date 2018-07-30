import React from 'react'
import { ModelParing } from 'routes/Inline/routes/ModelParing/components/ModelParing/ModelParing'

describe('(Component) ModelParing', () => {
  const processList = []
  const productList = []
  const modelList = [{ id: 1, isPublished: true, isDefault: true }, { id: 1, isPublished: true, isDefault: false }]
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <ModelParing
        processList={processList}
        productList={productList}
        modelList={modelList}
        dispatch={dispatch}
      />,
    )
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.state('isDialogOpen')).toEqual(true)
    wrapper.find('button').at(1).simulate('click')
    wrapper.find('Select').at(0).simulate('change', 'aa')
    expect(wrapper.state('processId')).toEqual('aa')
    wrapper.find('Select').at(1).simulate('change', 'bb')
    expect(wrapper.state('productId')).toEqual('bb')
    wrapper.find('Select').at(2).simulate('change', 'cc')
    expect(wrapper.state('model')).toEqual('cc')
    expect(wrapper).toMatchSnapshot()
  })
})
