import React from 'react'
import { FeedImgDialog } from 'routes/Inline/routes/Service/components/ServiceCard/FeedImgDialog'
// import { simpleFetch } from 'helpers/fetchWrapper'

describe('(Component) FeedImgDialog', () => {
  const id = 1
  const isOpen = false
  const toggleDialog = jest.fn()
  const kernelId = 1
  it('render normally', () => {
    const wrapper = shallow(
      <FeedImgDialog
        id={id}
        toggleDialog={toggleDialog}
        isOpen={isOpen}
        kernelId={kernelId}
      />,
    )
    wrapper.find('Checkbox').simulate('change')
    expect(wrapper.state('isContinuous')).toEqual(true)
    wrapper.find('select').simulate('change', { target: { value: 'ABX' } })
    expect(wrapper.state('pic')).toEqual('ABX')
    expect(wrapper).toMatchSnapshot()
  })
})
