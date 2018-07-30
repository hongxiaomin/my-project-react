import React from 'react'
import { shallow, mount } from 'enzyme'
import { DrawDefect } from 'routes/Offline/routes/Labeling/components/ImageZone/DrawDefect/DrawDefect'

describe('(Component) DrawDefect', () => {
  const scale = 0.5
  const offset = {}
  const div = {}
  const imageInfo = {}
  const selectedImageInfo = {}
  const addLabeling = {}
  const dispatch = jest.fn()
  const selectedDefectCode = {}
  it('render normally', () => {
    const wrapper = shallow(
      <DrawDefect
        scale={scale}
        offset={offset}
        div={div}
        imageInfo={imageInfo}
        selectedImageInfo={selectedImageInfo}
        addLabeling={addLabeling}
        dispatch={dispatch}
        selectedDefectCode={selectedDefectCode}
      />,
    )
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    // wrapper.find('Modal').simulate('click', nativeEvent)
    // expect(wrapper.state('loading')).toBe(false)
    expect(wrapper).toMatchSnapshot()
  })
  it('render mount', () => {
    const wrapper = mount(
      <DrawDefect
        scale={scale}
        offset={offset}
        div={div}
        imageInfo={imageInfo}
        selectedImageInfo={selectedImageInfo}
        addLabeling={addLabeling}
        dispatch={dispatch}
        selectedDefectCode={selectedDefectCode}
      />,
    )
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    // wrapper.find('Modal').simulate('click', nativeEvent)
    // expect(wrapper.state('loading')).toBe(false)
    expect(wrapper).toMatchSnapshot()
  })
})

