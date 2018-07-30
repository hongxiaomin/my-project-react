import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import Table from '../../containers/TableContainer';
import FormContainer from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import InputContainer from '../../containers/InputContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import { defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultGetParamTemplateArr,
  defaultGetParamTemplate2,
  SERVER_IP_SMM } from '../../constants/Settings';
import {
  defaultDataSourceTemplatePre,
} from '../../constants/TableConfig.js';
import './style.less';


const SMMPreProcessScheduleApi = `${SERVER_IP_SMM}/smm/preprocessmanagement/querypreprocessworkorderlist`;
const SMMPreProcessScheduleApiDetail = `${SERVER_IP_SMM}/smm/preprocessmanagement/querypreprocessmachinedetail`;


const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '原材料管理',
}, {
  path: '',
  name: '预加工管理',
}, {
  path: '',
  name: '预加工排程',
}];

const columns = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '工单号',
    dataIndex: 'line_name',
    key: 'line_name',
  }, {
    title: '主板',
    dataIndex: 'work_order',
    key: 'work_order',
  }, {
    title: '小板',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    title: '计划完成时间',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '镭雕时间',
    dataIndex: 'product_name_main',
    key: 'product_name_main',
  }, {
    title: '贴胶布时间',
    dataIndex: 'product_name',
    key: 'product_name',
  }, {
    title: '卧式时间',
    dataIndex: 'remain_time',
    key: 'remain_time',
  }, {
    title: '立式时间',
    dataIndex: 'online_plan_time',
    key: 'online_plan_time',
  }, {
    title: '压铆时间',
    dataIndex: 'state',
    key: 'state',
  }];

const columnsDetail1 = [
  {
    title: '机台名称',
    dataIndex: 'process_machinel_name',
    key: 'process_machinel_name',
  }, {
    title: '当前工单',
    dataIndex: 'now_work_order',
    key: 'now_work_order',
  }, {
    title: '主板',
    dataIndex: 'now_product_name_main',
    key: 'now_product_name_main',
  }, {
    title: '小板',
    dataIndex: 'now_product_name',
    key: 'now_product_name',
  }, {
    title: 'PCB料号',
    dataIndex: 'now_pn_pwb',
    key: 'now_pn_pwb',
  }, {
    title: '需求数量',
    dataIndex: 'now_amount',
    key: 'now_amount',
  }, {
    title: '处理数量',
    dataIndex: 'now_current_amount',
    key: 'now_current_amount',
  }, {
    title: 'Rate(秒)',
    dataIndex: 'now_rate',
    key: 'now_rate',
  }];

const columnsDetail2 = [
  {
    title: '机台名称',
    dataIndex: 'process_machinel_name',
    key: 'process_machinel_name',
  }, {
    title: '下一套工单',
    dataIndex: 'next_work_order',
    key: 'next_work_order',
  }, {
    title: '主板',
    dataIndex: 'next_product_name_main',
    key: 'next_product_name_main',
  }, {
    title: '小板',
    dataIndex: 'next_product_name',
    key: 'next_product_name',
  }, {
    title: 'PCB料号',
    dataIndex: 'next_pn_pwb',
    key: 'next_pn_pwb',
  }, {
    title: '需求数量',
    dataIndex: 'next_amount',
    key: 'next_amount',
  }, {
    title: '处理数量',
    dataIndex: 'next_current_amount',
    key: 'next_current_amount',
  }, {
    title: 'Rate(秒)',
    dataIndex: 'next_rate',
    key: 'next_rate',
  }];

const selData = [{
  id: 0,
  name: '未完成',
}, {
  id: 1,
  name: '已完成',
}];

const SMMPreProcessSchedule = props => (
  <div>
    <Bread breadMap={breadMap} />

    <Title name="发料状态查询" />
    <FormContainer
      name="SMMPreProcessScheduleForm"
      action={SMMPreProcessScheduleApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateArr}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >

      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>是否完成</label>
        <span className={'select'}>
          <SelectContainer
            name="status"
            itemKey="id"
            itemValue="name"
            load="true"
            defaultKey="0"
            defaultValue="未完成"
            data={selData}
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>

    <Table
      name="SMMPreProcessScheduleTable"
      formName="SMMPreProcessScheduleForm"
      columns={columns}
    />

    <div className={'newTable'}>
      <QueryTableContainer
        action={SMMPreProcessScheduleApiDetail}
        method="GET"
        name="name1"
        nopagination
        showTitle="镭雕机"
        columns={columnsDetail1}
        paramTemplate={defaultGetParamTemplate2}
        filters={defaultRequestFilters}
      />
    </div>
    <QueryTableContainer
      name="name1"
      nopagination
      showTitle="贴胶布机"
      columns={columnsDetail2}
      dataSourceTemplate={defaultDataSourceTemplatePre}
    />

    <div className={'newTable'}>
      <QueryTableContainer
        name="name2"
        nopagination
        showTitle="压铆钉机"
        columns={columnsDetail1}
        dataSourceTemplate={defaultDataSourceTemplatePre}
      />
    </div>

    <QueryTableContainer
      nopagination
      name="name2"
      showTitle="贴胶布机"
      columns={columnsDetail2}
      dataSourceTemplate={defaultDataSourceTemplatePre}
    />
    <div className={'newTable'}>

      <QueryTableContainer
        name="name3"
        nopagination
        showTitle="贴胶布机"
        columns={columnsDetail1}
        dataSourceTemplate={defaultDataSourceTemplatePre}
      />
    </div>

    <QueryTableContainer
      name="name3"
      nopagination
      showTitle="贴胶布机"
      columns={columnsDetail2}
      dataSourceTemplate={defaultDataSourceTemplatePre}
    />
    <div className={'newTable'}>
      <QueryTableContainer
        name="name4"
        nopagination
        showTitle="贴胶布机"
        columns={columnsDetail1}
        dataSourceTemplate={defaultDataSourceTemplatePre}
      />
    </div>

    <QueryTableContainer
      name="name4"
      nopagination
      showTitle="贴胶布机"
      columns={columnsDetail2}
      dataSourceTemplate={defaultDataSourceTemplatePre}
    />
    <div className={'newTable'}>
      <QueryTableContainer
        name="name5"
        nopagination
        showTitle="贴胶布机"
        columns={columnsDetail1}
        dataSourceTemplate={defaultDataSourceTemplatePre}
      />
    </div>

    <QueryTableContainer
      name="name5"
      nopagination
      showTitle="贴胶布机"
      columns={columnsDetail2}
      dataSourceTemplate={defaultDataSourceTemplatePre}
    />


  </div>
);
SMMPreProcessSchedule.defaultProps = {

};
SMMPreProcessSchedule.propTypes = {

};

export default SMMPreProcessSchedule;
