import React from 'react'
import _ from 'lodash'
import { ImageList } from 'routes/Offline/routes/Labeling/components/ImageList/ImageList'

describe('(Component) ImageList', () => {
  describe('shallow', () => {
    const labeled = {
      isLabeled: true,
      path: '/images/TCAOH/TC57001AAC00/T5G47/T5G47AR0/T5G47AR043C/Image/18850/18850_T5G47AR043C_TCAOH810_84_-122.811_-878.638_O_M_20171104_145711.jpg',
      defectCode: [],
    }
    const unLabeled = {
      isLabeled: false,
      path: '/images/TCAOH/TC57001AAC00/T5G47/T5G47AR0/T5G47AR043C/Image/18850/18850_T5G47AR043C_TCAOH810_84_-122.811_-878.638_O_M_20171104_145719.jpg',
      defectCode: [],
    }
    const dataList = [
      labeled,
      unLabeled,
    ]

    let type = ''
    let list = []
    const dispatch = ({ data }) => {
      const { labeledType, imageList } = data
      type = labeledType
      list = imageList.concat()
    }
    const imageListFilter = []
    const wrapper = shallow(<ImageList
      selectedImageInfo={{
        path: '',
        defectCodeList: [],
      }}
      imageList={dataList}
      isLabedList={{
        labeledType: 'all',
        imageList: dataList,
      }}
      dispatch={dispatch}
      imageListFilter={imageListFilter}
      loading
    />)
    it('Should be have H3', () => {
      expect(wrapper.find('h3').length).toBe(1)
    })

    it('Three types of switches', () => {
      wrapper.find('Select').simulate('change', 'labeled')
      expect(type).toBe('labeled')
      expect(list).toEqual([labeled])

      wrapper.find('Select').simulate('change', 'unlabeled')
      expect(type).toBe('unlabeled')
      expect(list).toEqual([unLabeled])

      wrapper.find('Select').simulate('change', 'all')
      expect(type).toBe('all')
      expect(list).toEqual(dataList)
    })
  })

  describe('mount', () => {
    const tmp = {
      isLabeled: true,
      path: '/images/TCAOH/TC57001AAC00/T5G47/T5G47AR0/T5G47AR043C/Image/18850/18850_T5G47AR043C_TCAOH810_84_-122.811_-878.638_O_M_20171104_145711.jpg',
      defectCode: ['A', 'B'],
    }
    const dataList = []
    for (let i = 0; i < 10; i++) {
      dataList.push(Object.assign({}, tmp))
    }
    const imageListFilter = []
    const wrapper = mount(<ImageList
      selectedImageInfo={{
        path: '',
        defectCodeList: [],
      }}
      imageList={dataList}
      isLabedList={{
        labeledType: 'all',
        imageList: dataList,
      }}
      dispatch={() => {}}
      imageListFilter={imageListFilter}
      loading
    />)
    const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } }

    it('defect筛选数据', () => {
      wrapper.find('input.ant-checkbox-input').at(0).simulate('change')
      expect(wrapper.state('filterData')).toEqual(['A'])
    })

    it('分页变化', () => {
      wrapper.find('.-btn').at(1).simulate('click')
      expect(wrapper.state('page')).toBe(1)
    })

    it('出现筛选框', () => {
      wrapper.find('.anticon-filter').simulate('click', nativeEvent)
      expect(wrapper.state('filter')).toBe(true)
    })
  })
})
