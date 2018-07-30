/* eslint react/jsx-first-prop-new-line:0,
 jsx-a11y/no-static-element-interactions: 0,
 react/jsx-max-props-per-line: 0,
 no-param-reassign: 0,
 no-return-assign: 0,
 guard-for-in: 0,
 no-restricted-syntax: 0,
*/

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WrapperFormattedMessage from 'components/WrapperFormattedMessage'
import XLSX from 'xlsx'
import { imageListFilter, formatImageList, getSuffix, showMessage, stringToFirstUpperCase } from 'Utils'
import { Icon } from 'antd'
import { UPDATE_SOMETHING } from '../../modules'

export class FileUpload extends React.Component {
  constructor() {
    super()
    this.file = null
    this.state = {}
  }

  getData = (obj) => {
    const keyValues = {}
    const sKey = {}
    const allObj = {}
    const filter = ['!margins', '!ref']
    const end = +obj['!ref'].split(':')[1].replace(/[a-zA-Z]/, '') - 1

    for (let key in obj) {
      if (filter.includes(key)) continue
      const k = key.replace(/\d/g, '')
      const n = key.replace(/[a-zA-Z]/g, '')
      if (!keyValues[k]) {
        keyValues[k] = []
      }

      if (n === '1') {
        sKey[k] = obj[key].v
        continue
      }

      keyValues[k][n] = obj[key]
    }

    for (let key in sKey) {
      let n = 2
      const tmp = []
      keyValues[key].forEach((value, i) => {
        while (n < i) {
          tmp.push(undefined)
          n += 1
        }
        tmp.push(value)
        n += 1
      })

      while (tmp.length < end) {
        tmp.push(undefined)
      }
      allObj[sKey[key].replace(/\r\n/, '')] = tmp
    }

    const dataList = allObj.defect.map((item, i) => ({
      defectCode: item.v.toString().split('|'),
      path: allObj.path[i].v.toString(),
      isLabeled: false,
    }))

    return dataList
  }

  handleChange = (e) => {
    const { selectedType, dispatch, upload } = this.props
    const { files: [file] } = e.target
    // if (!file) return

    // 上传cvs, 根据name和type做类型校验
    let f = 'readAsText'
    const mastName = ['csv', 'xls', 'xla', 'xlc', 'xlm', 'xlt', 'xlw', 'xlsx']
    const mastType = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel',
    ]
    if (!mastName.includes(getSuffix(file.name)) || !mastType.includes(file.type)) {
      showMessage({
        text: stringToFirstUpperCase('file type error'),
        type: 'error',
      })
      return
    }

    if (file.type === mastType[0]) {
      f = 'readAsBinaryString'
    }

    dispatch({
      type: UPDATE_SOMETHING,
      data: {
        imageListLoading: true,
        uploading: true,
      },
    })

    // 文件加载完成， 解析文件, 按照换行符来分割多个path
    const oFReader = new FileReader()
    oFReader.onload = (oFREvent) => {
      const result = oFREvent.target.result
      let dataList = []

      if (file.type === mastType[1]) {
        const tmp = result.split(/\r\n/)
        tmp.forEach((item) => {
          const info = item.split(',')
          if (info[1] && info[0].toLowerCase() !== 'defect') {
            dataList.push({
              defectCode: info[0] ? info[0].split('|') : [],
              path: `/images${info[1]}`,
              isLabeled: false,
            })
          }
        })
      } else {
        // 解析excel
        const workbook = XLSX.read(result, { type: 'binary' })
        const Sheets = workbook.Sheets

        // 获得数据
        for (const page in Sheets) {
          const lists = Sheets[page]
          const data = this.getData(lists)
          if (data) {
            dataList = data
          }
          break
        }
      }

      let selectedImageList = []
      const { imageList, defectCodeFilterList } = formatImageList(dataList)
      selectedImageList = imageListFilter(imageList, selectedType, defectCodeFilterList)

      dispatch({
        type: UPDATE_SOMETHING,
        data: {
          imageList,
          uploading: false,
          selectedImageList,
          defectCodeFilterList,
          selectedDefectCode: [...defectCodeFilterList],
          imageListLoading: false,
        },
      })
      upload()
      this.file.value = null
    }

    oFReader[f](file)
  }

  handleClick = () => this.file.click()

  render() {
    return (<span>
      <a
        href="/default.csv"
        title="Example"
        style={{
          marginLeft: 5,
        }}
      >
        <Icon
          type="download"
        />
      </a>
      <a onClick={this.handleClick}><WrapperFormattedMessage id="labelingTool.dirTree.loadPathFile" /></a>
      <input
        ref={(file) => { this.file = file }}
        type="file"
        style={{ display: 'none' }}
        onChange={this.handleChange}
      />
    </span>)
  }
}

FileUpload.defaultProps = {
  upload: () => {},
}

FileUpload.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedType: PropTypes.string.isRequired,
  upload: PropTypes.func,
}

export default connect(({ labelingTool, intl }) => ({
  intl,
  selectedType: labelingTool.selectedType,
}))(FileUpload)
