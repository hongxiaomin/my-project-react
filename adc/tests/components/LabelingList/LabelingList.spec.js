import React from 'react'
import { LabelingList } from 'routes/Offline/routes/Labeling/components/LabelingList/LabelingList'

describe('(Component) LabelingList', () => {
  const dispatch = jest.fn()
  const imageInfo = {
    path: '',
    index: 0,
    pageIndex: 0,
    isLabeled: false,
    defectInfo: [
      {
        coordinate: '1197_1149_1299_1271',
        defectCode: 'D1',
        defectId: 1,
        x: 1197,
        y: 1149,
        endX: 1299,
        endY: 1271,
        id: 'defectinfo_0',
        num: 1,
      },
    ],
    defectCode: [],
  }

  const wrapper = mount(<LabelingList
    dispatch={dispatch}
    imageInfo={imageInfo}
  />)

  beforeEach(() => {
    dispatch.mockReset()
  })

  it('判断特定元素的数量', () => {
    expect(wrapper.find('h3').length).toBe(1)
    expect(wrapper.find('.anticon-close-circle').length).toBe(1)
  })

  it('执行删除', () => {
    wrapper.find('ReactTable').find('.anticon-close-circle').simulate('click')
    expect(dispatch.mock.calls.length).toBe(2)
  })

  it('执行删除 id为labeling', () => {
    imageInfo.defectInfo[0].id = 'addLabeling'
    wrapper.find('ReactTable').find('.anticon-close-circle').simulate('click')
    expect(dispatch.mock.calls.length).toBe(1)
  })

})
