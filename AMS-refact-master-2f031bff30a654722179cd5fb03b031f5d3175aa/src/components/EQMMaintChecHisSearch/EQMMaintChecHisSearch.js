import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import Input from '../../containers/InputContainer';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM,
 } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import Select from '../../containers/SelectContainer';

const EQMSettingCheckApi = `${SERVER_IP_EQM}/ams/eqm/ckbm`;
const EQMSettingMaintainApi = `${SERVER_IP_EQM}/ams/eqm/maintain`;

const EQMMaintChecHisSearchTable = 'EQMMaintChecHisSearchTable';
const EQMMaintChecHisSearchForm = 'EQMMaintChecHisSearchForm';
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '点检及保养',
}, {
  path: '',
  name: '点检保养记录查询',
}];
const columns = [{
  title: '序号',
  dataIndex: 'name1',
  key: 'name1',
  render: (text, record, index) => index + 1,
}, {
  title: '设备型号',
  dataIndex: 'eqmModelName',
  key: 'eqmModelName',
}, {
  title: '项目代码',
  dataIndex: 'ckbmItemCode',
  key: 'ckbmItemCode',
}, {
  title: '项目描述',
  dataIndex: 'ckbmItemDesc',
  key: 'ckbmItemDesc',
}, {
  title: '类型',
  dataIndex: 'ckbmType',
  key: 'ckbmType',
  render: (text) => {
    if (text === 1) {
      return '点检';
    } else if (text === 2) {
      return '保养';
    }
    return '';
  },
}, {
  title: '周期',
  dataIndex: 'ckbmFqcName',
  key: 'ckbmFqcName',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: (text) => {
    if (text === 'Y') {
      return '已完成';
    } else if (text === 'N') {
      return '未完成';
    }
    return '';
  },
}, {
  title: '操作时间',
  dataIndex: 'createDate',
  key: 'createDate',
  render: (text, record) => {
    const { createDate } = record;
    if (createDate === null) {
      return '';
    }
    const date = new Date(createDate);
    function add0(m) { return m < 10 ? `0${m}` : m; }
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
  },
}, {
  title: '操作者',
  dataIndex: 'createBy',
  key: 'createBy',
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
}];
const showData = [{
  id: '1',
  ckbmType: '点检',
}, {
  id: '2',
  ckbmType: '保养',
}];
const urlTemplate = (param) => {

  if (param && param.ckbmType) {
    return param.ckbmType === '2' ? EQMSettingMaintainApi : EQMSettingCheckApi;
  }
};
const EQMParamTemplate = (params) => {
  const {
    size = 10,
    current = 1,
    ...param } = params;
  const data = { eqpCode: (param.eqpCode ? param.eqpCode : '') };
  const condition = { ...data };
  return { condition, size, current };
};
const checkTemplate = (params) => {
  const { jsonData } = params;
  if (!(jsonData.eqpCode && jsonData.ckbmType)) {
    message.error('设备编号与操作类型不能为空', 3);
    return false;
  } else {
    return true;
  }
};
const EQMMaintChecHisSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="点检保养记录查询" />
    <FormContainer
      name={EQMMaintChecHisSearchForm}
      action={EQMSettingCheckApi}
      method="GET"
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      urlTemplate={urlTemplate}
      checkTemplate={checkTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="eqpCode" className={'label'}>设备编号</label>
        <Input type="text" name="eqpCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="ckbmType" className={'label'}>操作类型</label>
        <span className={'select'}>
          <Select
            name="ckbmType"
            className={'select'}
            itemKey="id"
            itemValue="ckbmType"
            data={showData}
            load="true"
            defaultKey="1"
            defaultValue="点检"
          />
        </span>
      </div>
      <input type="submit" value="查詢" className={'button'} />
    </FormContainer>
    <TableContainer
      columns={columns}
      formName={EQMMaintChecHisSearchForm}
      dataSourceTemplate={''}
      name={EQMMaintChecHisSearchTable}
      noRowSelection
    />
  </div>
);
EQMMaintChecHisSearch.defaultProps = {

};
EQMMaintChecHisSearch.propTypes = {

};

export default EQMMaintChecHisSearch;
