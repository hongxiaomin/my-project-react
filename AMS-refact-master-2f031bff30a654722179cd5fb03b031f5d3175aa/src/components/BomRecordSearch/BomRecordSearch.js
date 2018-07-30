import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import { defaultGetParamTemplateBom2, defaultPutParamTemplate, defaultGetParamTemplate, defaultDataSourceTemplate, bomGetParamTemplate, defaultRequestFilters, SERVER_IP_BOM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Input from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';

const BomRecordSearchAPI = `${SERVER_IP_BOM}/bom/manager/bom/querybomreviewreport`;
const BomRecordDetailAPI = `${SERVER_IP_BOM}/bom/manager/bom/querybomreviewreportdetail`;
const BorderNameAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectboardname?condition=[{"board_name":"DPS"}]`;
const SmallBorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectsmallboardname`;
const WorkorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectcommon`;
const LineNameAPI = `${SERVER_IP_BOM}/bom/pda/linename`;
const paramTemplate = data => ({
  condition: [{ board_name: data }],
});
const paramTemplateWorkrder = data => ({
  condition: [{ workorder: '' }],
});
const paramTemplateLineName = data => ({
  condition: [{ line_name: data }],
});
const paramTemplateBomVersion = data => ({
  condition: [{ bom_version: '0' }],
});
const paramTemplateLineType = data => ({
  condition: [{ line_type: 'N' }],
});
const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, record, index) => index + 1,
  }, {
    title: '工令',
    dataIndex: 'workorder',
    key: 'workorder',
  }, {
    title: '主板',
    dataIndex: 'board_name',
    index: 'board_name',
  }, {
    title: '小板',
    dataIndex: 'small_board_name',
    index: 'small_board_name',
  }, {
    title: '面别',
    dataIndex: 'side',
    index: 'side',
  }, {
    title: '线别',
    dataIndex: 'line_name',
    index: 'line_name',
  }, {
    title: '对料时间',
    dataIndex: 'create_date',
    index: 'create_date',
  }, {
    title: '对料人',
    dataIndex: 'create_by',
    index: 'create_by',
  }];


const columnsDetail = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, record, index) => index + 1,
  }, {
    title: '料站',
    dataIndex: 'station',
    key: 'station',
  }, {
    title: '料号',
    dataIndex: 'part_no',
    index: 'part_no',
  }, {
    title: '零件位置',
    dataIndex: 'part_location',
    index: 'part_location',
  }, {
    title: '备注',
    dataIndex: 'comments',
    index: 'comments',
  }];
const selData = [
  {
    id: 'A',
    name: 'A面',
  }, {
    id: 'B',
    name: 'B面',
  },
];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '电子BOM管理',
}, {
  path: '',
  name: 'BOM管理',
}, {
  path: '',
  name: '对料记录查询',
}];
const BOMRecordSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="对料记录查询" />
    <FormContainer
      name="BOMServiceForm"
      action={BomRecordSearchAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplateBom2}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      needName="BomRecordSearch"
    >
      <div className={'searchCondition'}>
        <label htmlFor="workorder" className={'label'}>工令</label>
        <span className="select">
          <Select
            name="workorder"
            action={WorkorderAPI}
            itemKey="workorder"
            itemValue="workorder"
            load="true"
            paramTemplate={paramTemplateWorkrder}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <GroupSelectContainer name="BorderAndSmallBorder">
        <div className={'searchCondition'}>
          <label htmlFor="board_name" className={'label'}>主板</label>
          <span className="select" >
            <Select
              name="board_name"
              action={BorderNameAPI}
              itemKey="boardName"
              itemValue="boardName"
              next="small_board_name"
              load="true"
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="small_board_name" className={'label'}>小板</label>
          <span className="select" >
            <Select
              name="small_board_name"
              action={SmallBorderAPI}
              itemKey="smallBoardName"
              itemValue="smallBoardName"
              paramTemplate={paramTemplate}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
      </GroupSelectContainer>
      <div className={'searchCondition'}>
        <label htmlFor="side" className={'label'}>面别</label>
        <span className="select" >
          <Select
            name="side"
            itemKey="id"
            itemValue="name"
            data={selData}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="line_name" className={'label'}>线别</label>
        <span className="select">
          <Select
            name="line_name"
            action={LineNameAPI}
            itemKey="line_type"
            itemValue="line_type"
            load="true"
            paramTemplate={paramTemplateLineType}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="create_date" className={'label'}>时间</label>
        <DatePickerContainer name="create_date" style={{ outline: 'none' }} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="create_by" className={'label'}>对料人</label>
        <Input type="text" name="create_by" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>

    <TableContainer
      action={BomRecordDetailAPI}
      name="BomRecordSearch"
      formName="BOMServiceForm"
      columns={columns}
      nextTableName="BomRecordSearch2"
      paramTemplate={defaultPutParamTemplate}
      needData="id"
      isGetDate="ok"
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      onRowClick
    />
    <QueryTableContainer
      name="BomRecordSearch2"
      tableName="BomRecordSearch"
      columns={columnsDetail}
    />
  </div>
);
BOMRecordSearch.defaultProps = {

};
BOMRecordSearch.propTypes = {

};

export default BOMRecordSearch;
