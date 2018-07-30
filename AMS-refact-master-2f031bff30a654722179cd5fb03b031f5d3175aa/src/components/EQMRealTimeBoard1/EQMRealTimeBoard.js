import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import { defaultGetParamTemplate2, defaultRequestFilters, defaultDataSourceTemplate } from '../../constants/Settings';
import u1914 from '../../assets/u1914.jpg';
import u1916 from '../../assets/u1916.jpg';

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
  name: '实时看板',
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


const EQMRealTimeBoard = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="实时看板" />
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
            name="area"
            itemKey="id"
            itemValue="name"
            next="bom_status2"
            load="true"
            defaultKey='All'
            defaultValue='全部'
            data={setDateFactory}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>线别</label>
        <span className={'select'}>
          <SelectContainer
            name="area"
            itemKey="id"
            itemValue="name"
            next="bom_status2"
            load="true"
            defaultKey='All'
            defaultValue='全部'
            data={setDateLine}
          />
        </span>
      </div>
     

     


      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div>
      <img  src={u1914} alt="chart" />
    </div>
     <div style={{marginTop:'30'}}>
      <img   src={u1916} alt="chart" />
    </div>
  </div>
);
EQMRealTimeBoard.defaultProps = {

};
EQMRealTimeBoard.propTypes = {

};

export default EQMRealTimeBoard;
