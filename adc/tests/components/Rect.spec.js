import React from 'react'
import { shallow, mount } from 'enzyme'
import { Rect } from 'routes/Offline/routes/Labeling/components/ImageZone/DrawDefect/Rect'

describe('(Component) Rect', () => {
  const borderColor = 'red'
  const info = {}
  const imageInfo = {}
  const selectedImageInfo = {}
  const addLabeling = {}
  const aspectRatio = 0.5
  const scale = 1
  const dispatch = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <Rect
        borderColor={borderColor}
        info={info}
        imageInfo={imageInfo}
        selectedImageInfo={selectedImageInfo}
        addLabeling={addLabeling}
        aspectRatio={aspectRatio}
        scale={scale}
        dispatch={dispatch}
      />,
    )
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    // wrapper.find('Modal').simulate('click', nativeEvent)
    // expect(wrapper.state('loading')).toBe(false)
    expect(wrapper).toMatchSnapshot()
  })
  it('render mount', () => {
    const wrapper = mount(
      <Rect
        borderColor={borderColor}
        info={info}
        imageInfo={imageInfo}
        selectedImageInfo={selectedImageInfo}
        addLabeling={addLabeling}
        aspectRatio={aspectRatio}
        scale={scale}
        dispatch={dispatch}
      />,
    )
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    // wrapper.find('Modal').simulate('click', nativeEvent)
    // expect(wrapper.state('loading')).toBe(false)
    expect(wrapper).toMatchSnapshot()
  })
})

