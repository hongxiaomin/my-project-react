import React from 'react'
import { QueueList } from 'routes/Inline/routes/Service/components/QueueList/QueueList'

describe('(Component) QueueList', () => {
  const queueModel = ''
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <QueueList
        dispatch={dispatch}
        queueModel={queueModel}
      />,
    )
    wrapper.find('div').at(2).childAt(1).simulate('change', { date: 'e', dateString: 'a' })
    wrapper.find('RadioGroup').simulate('change', { target: { value: 'a' } })
    expect(wrapper).toMatchSnapshot()
  })
})
