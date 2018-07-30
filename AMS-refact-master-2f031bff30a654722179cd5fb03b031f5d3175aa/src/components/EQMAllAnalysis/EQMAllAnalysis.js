import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultGetParamTemplate2, defaultRequestFilters, defaultDataSourceTemplate } from '../../constants/Settings';
import u1944 from '../../assets/u1944.jpg';
import u1948 from '../../assets/u1948.jpg';
import u1952 from '../../assets/u1952.jpg';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '生产统计',
}, {
  path: '',
  name: '综合效率分析',
}];

const setDateFactory = [{
  id: 'All',
  name: '全部',
}, {
  id: 'Main',
  name: '厂别A',
}, {
  id: 'Mantissa',
  name: '厂别B',
}];
const setDateLine = [{
  id: 'All',
  name: '全部',
}, {
  id: 'Main',
  name: '线别A',
}, {
  id: 'Mantissa',
  name: '线别B',
}];
const setDateSBType = [{
  id: 'All',
  name: '全部',
}, {
  id: 'Main',
  name: '绕线机',
}, {
  id: 'Mantissa',
  name: '烤箱',
}, {
  id: 'Mantissa',
  name: '激光焊接机',
}];
const setDateSBVersion = [{
  id: 'All',
  name: '全部',
}, {
  id: 'Main',
  name: '设备型号A',
}, {
  id: 'Mantissa',
  name: '设备型号B',
}];

const EQMAllAnalysis = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="综合效率分析" />
    <FormContainer
      name="SMMDeleteRecordSearchForm"
      action=""
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>厂别</label>
        <span className={'select'}>
          <SelectContainer
            name="area1"
            itemKey="id"
            itemValue="name"
            load="true"
            defaultKey="All"
            defaultValue="全部"
            data={setDateFactory}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>线别</label>
        <span className={'select'}>
          <SelectContainer
            name="area2"
            itemKey="id"
            itemValue="name"
            load="true"
            defaultKey="All"
            defaultValue="全部"
            data={setDateLine}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>设备类型</label>
        <span className={'select'}>
          <SelectContainer
            name="area3"
            itemKey="id"
            itemValue="name"
            load="true"
            defaultKey="All"
            defaultValue="全部"
            data={setDateSBType}
          />
        </span>
      </div>

      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>设备型号</label>
        <span className={'select'}>
          <SelectContainer
            name="area4"
            itemKey="id"
            itemValue="name"
            load="true"
            defaultKey="All"
            defaultValue="全部"
            data={setDateSBVersion}
          />
        </span>
      </div>


      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div>
      <img src={u1944} alt="chart" />
      <img src={u1948} alt="chart" />
    </div>
    <div style={{ marginTop: '30' }}>
      <img src={u1952} alt="chart" />
    </div>
  </div>
);
EQMAllAnalysis.defaultProps = {

};
EQMAllAnalysis.propTypes = {

};

export default EQMAllAnalysis;
