import React from 'react'
import _ from 'lodash'
import { Table } from 'routes/Inline/routes/Service/components/QueueList/Table'

describe('(Component) Table', () => {
  const queueList = []
  const queueListLength = 1
  const showAction = false
  const condition = []
  const loading = []
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <Table
        queueList={queueList}
        dispatch={dispatch}
        queueListLength={queueListLength}
        showAction={showAction}
        condition={condition}
        loading={loading}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render showAction is not null', () => {
    const wrapper = shallow(
      <Table
        queueList={queueList}
        dispatch={dispatch}
        queueListLength={queueListLength}
        showAction={showAction}
        condition={[{ id: 2 }]}
        loading={loading}
      />,
    )
    wrapper.setState({ filter: 'block' })
    wrapper.setState({ pageSize: 11 })
    // wrapper.find('Icon').simulate('change', { nativeEvent: { stopImmediatePropagation: _.noop } })
    // expect(wrapper.state('filter').toEqual('none'))
    expect(wrapper).toMatchSnapshot()
  })
})
