import React from 'react'
import { shallow } from 'enzyme'
import { ModelManagement } from 'routes/ModelManagement/routes/ModelManagement/components/ModelManagement/ModelManagement'

describe('(Component) ModelManagement', () => {
  it('render normally', () => {
    const modelList = [{ id: 1, name: 'a' }]
    const licenseList = [{ id: 1, deviceGpus: { serviceCount: 11 } }]
    const wrapper = shallow(
      <ModelManagement modelList={modelList} licenseList={licenseList} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render modelDetail is null', () => {
    const modelDetail = {}
    const modelList = [{ id: 1, name: 'a' }]
    const licenseList = [{ id: 1, deviceGpus: { serviceCount: 11 } }]
    const wrapper = shallow(
      <ModelManagement modelDetail={modelDetail} modelList={modelList} licenseList={licenseList} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render modelDetail is not null', () => {
    const modelDetail = {
      trainingInfo: { trainingEndTime: '', trainingBeginTime: '', trainingProgress: 0 },
    }
    const modelList = [{ id: 1, name: 'a' }]
    const licenseList = [{ id: 1, deviceGpus: { serviceCount: 11 } }]
    const wrapper = shallow(
      <ModelManagement modelDetail={modelDetail} modelList={modelList} licenseList={licenseList} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('render pageStatus === startTrainPage', () => {
    const pageStatus = 'startTrainPage'
    const modelList = [{ id: 1, name: 'a' }]
    const licenseList = [{ id: 1, deviceGpus: { serviceCount: 11 } }]
    const wrapper = shallow(
      <ModelManagement pageStatus={pageStatus} modelList={modelList} licenseList={licenseList} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  
})
