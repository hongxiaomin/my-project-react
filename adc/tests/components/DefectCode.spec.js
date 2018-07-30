import React from 'react'
import { shallow, mount } from 'enzyme'
import _ from 'lodash'
import { DefectCode } from 'routes/Offline/routes/Labeling/components/DefectCode/DefectCode'

describe('(Component) DefectCode', () => {
  const selectedImageInfo = {}
  const addLabeling = {}
  const defectCodeList = []
  const defaultDefectCode = []
  const getSelectInfo = jest.fn()
  const setDefaultDefectCode = jest.fn()
  const addDefectCode = jest.fn()
  const updateAddLabeling = jest.fn()
  const setSelectedImage = jest.fn()
  const setSelectedDefectCode = jest.fn()
  const selectedDefectCode = {}
  const updateResetKeyCodeStatus = jest.fn()
  it('render normally', () => {
    const wrapper = shallow(
      <DefectCode
        selectedImageInfo={selectedImageInfo}
        addLabeling={addLabeling}
        defectCodeList={defectCodeList}
        defaultDefectCode={defaultDefectCode}
        getSelectInfo={getSelectInfo}
        setDefaultDefectCode={setDefaultDefectCode}
        addDefectCode={addDefectCode}
        updateAddLabeling={updateAddLabeling}
        setSelectedDefectCode={setSelectedDefectCode}
        setSelectedImage={setSelectedImage}
        selectedDefectCode={selectedDefectCode}
        updateResetKeyCodeStatus={updateResetKeyCodeStatus}
      />,
    )
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    expect(wrapper).toMatchSnapshot()
  })
  it('render normally', () => {
    const wrapper = mount(
      <DefectCode
        selectedImageInfo={selectedImageInfo}
        addLabeling={addLabeling}
        defectCodeList={defectCodeList}
        defaultDefectCode={defaultDefectCode}
        getSelectInfo={getSelectInfo}
        setDefaultDefectCode={setDefaultDefectCode}
        addDefectCode={addDefectCode}
        updateAddLabeling={updateAddLabeling}
        setSelectedDefectCode={setSelectedDefectCode}
        setSelectedImage={setSelectedImage}
        selectedDefectCode={selectedDefectCode}
        updateResetKeyCodeStatus={updateResetKeyCodeStatus}
      />,
    )
    // const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }
    expect(wrapper).toMatchSnapshot()
  })
})

