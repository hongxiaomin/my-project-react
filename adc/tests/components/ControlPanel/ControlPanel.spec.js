import React from 'react'
import { ControlPanel } from 'routes/Offline/routes/Labeling/components/ControlPanel/ControlPanel'
import * as Utils from 'Utils'

describe('(Component) ControlPanel', () => {
  Utils.showMessage = jest.fn()
  const dispatch = jest.fn()
  const selectedImageInfo = {
    path: 'a.jpg',
    active: 1,
    defectInfo: [
      { id: 1 },
      { id: 2 },
    ],
  }
  const addLabeling = {}
  const wrapper = shallow(<ControlPanel
    dispatch={dispatch}
    addLabeling={addLabeling}
    hotKeys={{
      add: 76,
      next: 39,
      previous: 37,
      zoomIn: 187,
      save: 13,
      zoomOut: 189,
      delete: 46,
      restore: 79,
    }}
    resetHotKeys={false}
    controlPanel={{
      add: 0,
      zoom: 1,
    }}
    isButtonDisabled={{
      nextDisabled: false,
      prevDisabled: false,
    }}
    selectedImageInfo={selectedImageInfo}
  />)

  beforeEach(() => {
    dispatch.mockReset()
  })

  it('放大', () => {
    wrapper.find('[type="zoomin"]').parent().simulate('click')
    expect(dispatch.mock.calls.length).toBe(1)
  })

  it('缩小', () => {
    wrapper.find('[type="zoomout"]').parent().simulate('click')
    expect(dispatch.mock.calls.length).toBe(1)
  })

  it('上一张', () => {
    wrapper.find('[type="left"]').parent().simulate('click')
    expect(dispatch.mock.calls.length).toBe(2)
  })

  it('下一张', () => {
    wrapper.find('[type="right"]').parent().simulate('click')
    expect(dispatch.mock.calls.length).toBe(2)
  })

  it('保存', () => {
    wrapper.find('Button').simulate('click')
    expect(dispatch.mock.calls.length).toBe(1)
  })

  it('下拉框', () => {
    wrapper.find('Select').simulate('change', 1)
    expect(dispatch.mock.calls.length).toBe(1)
  })

  it('删除', () => {
    wrapper.find('[type="delete"]').parent().simulate('click')
    expect(dispatch.mock.calls.length).toBe(1)
  })

  it('删除 addLabeling', () => {
    selectedImageInfo.active = 'addLabeling'
    wrapper.find('[type="delete"]').parent().simulate('click')
    expect(dispatch.mock.calls.length).toBe(1)
  })

  it('增加失败', () => {
    wrapper.find('[type="plus-square"]').parent().simulate('click')
    expect(dispatch.mock.calls.length).toBe(0)
    expect(Utils.showMessage.mock.calls.length).toBe(0)
  })

  it('增加失败', () => {
    addLabeling.x = 0
    addLabeling.y = 0
    addLabeling.endX = 10
    addLabeling.endY = 10
    wrapper.find('[type="plus-square"]').parent().simulate('click')
    expect(dispatch.mock.calls.length).toBe(0)
    expect(Utils.showMessage.mock.calls.length).toBe(1)
  })

  it('增加成功', () => {
    addLabeling.x = 0
    addLabeling.y = 0
    addLabeling.endX = 10
    addLabeling.endY = 10
    addLabeling.defectCode = 1

    wrapper.find('[type="plus-square"]').parent().simulate('click')
    expect(dispatch.mock.calls.length).toBe(1)
  })
})
