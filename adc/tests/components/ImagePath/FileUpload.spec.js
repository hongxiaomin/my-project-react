import React from 'react'
import * as Utils from 'Utils'
import { FileUpload } from 'routes/Offline/routes/Labeling/components/ImagePath/FileUpload'
import { LOADING, UPDATE_IMAGE_LIST_REMOVE_DEFECT_INFO, ISLABELED_LIST } from 'routes/Offline/routes/Labeling/modules'

describe('(Component) FileUpload', () => {
  const dispatch = jest.fn()
  const wrapper = shallow(<FileUpload dispatch={dispatch} />)
  const input = wrapper.find('input')

  // 判断是否可以找到 a标签
  it('是否有a标签', () => {
    expect(wrapper.find('a').length).toBe(2)
  })

  it('上传文件类型出错', () => {
    Utils.showMessage = jest.fn()
    const file = new Blob([''], { type: 'text/xml' })

    file.name = 't.csv'
    input.simulate('change', {
      target: {
        files: [
          file,
        ],
      },
    })

    expect(Utils.showMessage).toBeCalled()
    expect(Utils.showMessage).toBeCalledWith({
      text: Utils.stringToFirstUpperCase('file type error'),
      type: 'error',
    })
  })

  it('上传成功', () => {
    dispatch.mockReset()
    Utils.addIndex = jest.fn()

    const file = new Blob([
      'DEFECT,IMG,NAME,PRODUCT\r\n',
      'TNC1P0/ARRAY/model/12850/img/TNC1P0/12850_T5F47BR08GB_TCAOH820_95_-420.643_726.359_O_L_20171128_060530.jpg,12850_T5F47BR08GB_TCAOH820_95_-420.643_726.359_O_L_20171128_060530.jpg,TC59901AAC00',
    ], { type: 'application/vnd.ms-excel' })
    file.name = 'test.csv'

    input.simulate('change', {
      target: {
        files: [
          file,
        ],
      },
    })
    console.log('length', dispatch.mock.calls.length, Utils.addIndex.mock.calls.length)
  })
})
