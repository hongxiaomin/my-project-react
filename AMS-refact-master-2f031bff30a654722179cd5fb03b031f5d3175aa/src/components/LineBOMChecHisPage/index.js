import React from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import './style.less';
import FormContainer from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import InputContainer from '../../containers/InputContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultRequestFilters, defaultGetParamTemplate2, SERVER_IP_SMM, LineBomDataSourceTemplate } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
// import { dataSourceTemplateLione } from '../../constants/TableConfig';


const LineBOMChecHisPageApi = `${SERVER_IP_SMM}/smm/web/frr/getfirstreviewreport`;
// const indexData = 0;
const columns = [{
  title: '序号',
  key: 'material_no1',
  render: (value, row, index) =>
    // const obj = {
    //   children: index,
    //   props: {},
    // };
    // if (row.idI === 'end') {
    //   obj.props.rowSpan = 0;
    //   obj.props.colSpan = 0;
    // } else {
    //   obj.props.rowSpan = row.idLength;
    //   indexData += 1;
    //   obj.children = indexData;
    // }
    // return obj;
     index + 1,

}, {
  title: '料号',
  dataIndex: 'material_no',
  key: 'material_no',
  // render: (value, row) => {
  //   const obj = {
  //     children: value,
  //     props: {},
  //   };
  //   if (row.idI === 'end') {
  //     obj.props.rowSpan = 0;
  //     obj.props.colSpan = 0;
  //   } else {
  //     obj.props.rowSpan = row.idLength;
  //   }
  //   return obj;
  // },
}, {
  title: '规格',
  dataIndex: 'description',
  key: 'description',
}, {
  title: '厂商规格/本体标志',
  dataIndex: 'vendor_part',
  key: 'vendor_part',
}, {
  title: '首选',
  dataIndex: 'grp',
  key: 'grp',
}, {
  title: '位置',
  dataIndex: 'location',
  key: 'location',

}, {
  title: '厂商',
  dataIndex: 'vendor',
  key: 'vendor',
  render: (text, record) => {
    const { report } = record;
    return report.length > 1 ? report.map((v, i) => <p className={'inlineTable'} key={i}>{v.vendor}</p>) : report[0] ? report[0].vendor : '';
  },
  className: 'abcd',
}, {
  title: '厂商代号',
  dataIndex: 'vendor_code',
  key: 'vendor_code',
  render: (text, record) => {
    const { report } = record;
    return report.length > 1 ? report.map((v, i) => <p className={'inlineTable'} key={i}>{v.vendor_code}</p>) : report[0] ? report[0].vendor_code : '';
  },
  className: 'abcd',
}, {
  title: 'D/C',
  dataIndex: 'dc',
  key: 'dc',
  render: (text, record) => {
    const { report } = record;
    return report.length > 1 ? report.map((v, i) => <p className={'inlineTable'} key={i}>{v.dc}</p>) : report[0] ? report[0].dc : '';
  },
  className: 'abcd',
}, {
  title: 'RoHS/ERS',
  dataIndex: 'rohs_ers',
  key: 'rohs_ers',
  render: (text, record) => {
    const { report } = record;
    return report.length > 1 ? report.map((v, i) => <p className={'inlineTable'} key={i}>{v.rohs_ers}</p>) : report[0] ? report[0].rohs_ers : '';
  },
  className: 'abcd',
}, {
  title: 'CR/SA',
  dataIndex: 'cr_sa',
  key: 'cr_sa',
  render: (text, record) => {
    const { report } = record;
    return report.length > 1 ? report.map((v, i) => <p className={'inlineTable'} key={i}>{v.cr_sa}</p>) : report[0] ? report[0].cr_sa : '';
  },
  className: 'abcd',
}, {
  title: '数量',
  dataIndex: 'qty',
  key: 'qty',
  render: (text, record) => {
    const { report } = record;
    return report.length > 1 ? report.map((v, i) => <p className={'inlineTable'} key={i}>{v.qty}</p>) : report[0] ? report[0].qty : '';
  },
  className: 'abcd',
}, {
  title: '对料时间',
  dataIndex: 'review_time',
  key: 'review_time',
  render: (text, record) => {
    const { report } = record;
    return report.length > 1 ? report.map((v, i) => <p className={'inlineTable'} key={i}>{v.review_time}</p>) : report[0] ? report[0].review_time : '';
  },
  className: 'abcd',
}];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '主线首件报表',
}, {
  path: '',
  name: '对料记录查询',
}];
const data = [{
  id: '0',
  name: 'S25',
}, {
  id: '1',
  name: 'S26',
}, {
  id: '2',
  name: 'S27',
}, {
  id: '3',
  name: 'S28',
}, {
  id: '8',
  name: 'S29',
}, {
  id: '9',
  name: 'S30',
}, {
  id: '10',
  name: 'S31',
}, {
  id: '11',
  name: 'S32',
}, {
  id: '12',
  name: 'S33',
}, {
  id: '13',
  name: 'S34',
}, {
  id: '14',
  name: 'S35',
}];

const checkTemplate = (data) => {
  const datepicker = data.datepicker;
  const datepicker2 = data.datepicker2;
  if (datepicker > datepicker2) {
      message.error('截止时间不能早于开始时间！', 3);
      return false;
    }
  return true;
};

const LineBOMChecHisPage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="对料记录查询" />
    <FormContainer
      name="LineBOMChecHisPage"
      action={LineBOMChecHisPageApi}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={LineBomDataSourceTemplate}
      checkTemplate={checkTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="datepicker" className={'label'}>日期区间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="datepicker" style={{ outline: 'none' }} />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="datepicker" className={'label'}>至</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="datepicker2" style={{ outline: 'none' }} />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>线别:</label>
        <span className={'select'}>
          <SelectContainer
            type="text"
            name="line_name"
            data={data}
            itemKey="name"
            itemValue="name"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>*工单号:</label>
        <InputContainer type="text" name="work_order" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <TableContainer
      name="LineBOMChecHisPageTable"
      formName="LineBOMChecHisPage"
      columns={columns}
    />
  </div>

);
LineBOMChecHisPage.defaultProps = {

};
LineBOMChecHisPage.propTypes = {

};

export default LineBOMChecHisPage;
