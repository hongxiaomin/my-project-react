import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import Input from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import { defaultGetParamTemplateBom,
  defaultRequestFilters,
  bomGetParamTemplate,
  defaultDataSourceTemplate,
  dataSourceTemplateDetail,
  dataSourceTemplateSummary,
  SERVER_IP_BOM } from '../../constants/Settings';
import QueryTableContainer from '../../containers/QueryTableContainer';
import TableContainer from '../../containers/TableContainer';


const BomSearchFormApi = `${SERVER_IP_BOM}/bom/manager/bom`;
const BomSearchFormApiDetail = `${SERVER_IP_BOM}/bom/manager/bom/detail`;
const LineNameAPI = `${SERVER_IP_BOM}/bom/pda/linename`;
const BorderNameAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectboardname`;
const SmallBorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectsmallboardname`;
const WorkorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectcommon`;
const paramTemplate = data => ({
  condition: [{ line_name: data }],
});
const paramTemplate2 = data => ({
  condition: [{ board_name: data }],
});
const paramTemplateBomVersion = data => ({
  condition: [{ bom_version: '' }],
});
const selData = [{
  id: 'A',
  name: 'A',
}, {
  id: 'B',
  name: 'B',
}];
const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num1',
    render: (text, record, index) => index + 1,
  }, {
    title: '主板',
    dataIndex: 'boardName',
    key: 'boardName',
  }, {
    title: '小板',
    dataIndex: 'smallBoardName',
    key: 'smallBoardName',
  }, {
    title: '面别',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '点数',
    dataIndex: 'point',
    key: 'point',
  }, {
    title: 'PCB料号',
    dataIndex: 'pcbPartNo',
    key: 'pcbPartNo',
  }, {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '线体类型',
    dataIndex: 'lineType',
    key: 'lineType',
  }, {
    title: 'NC程式',
    dataIndex: 'NCProgram',
    key: 'NCProgram',
    render: text => `${text}`,
  }, {
    title: 'BOM版本',
    dataIndex: 'BOMVersion',
    key: 'BOMVersion',
  }, {
    title: '连片数量',
    dataIndex: 'ConductorsNumber',
    key: 'ConductorsNumber',
  }, {
    title: 'A面识别码',
    dataIndex: 'ASideIdentificationCode',
    key: 'ASideIdentificationCode',
  }, {
    title: '修订日期',
    dataIndex: 'revisionDate',
    key: 'revisionDate',
  }, {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
    render: (text, record) => <p style={{ width: '65px' }}>{record.remarks}</p>,
  }];


const columnsDetail = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '零件用量',
  dataIndex: 'partUsage',
  key: 'partUsage',
}, {
  title: '站别',
  dataIndex: 'station',
  key: 'station',
}, {
  title: '料号',
  dataIndex: 'partNo',
  key: 'partNo',
}, {
  title: 'MK',
  dataIndex: 'MK',
  key: 'MK',
}, {
  title: '规格',
  dataIndex: 'specification',
  key: 'specification',
}, {
  title: '零件位置',
  // dataIndex: 'partLocation',
  key: 'partLocation',
  render: (text, record) => {
    let datas = record.partLocation;
    if (datas && datas.indexOf('\\n') > -1) {
      datas = datas.replace(/\\n/g, '    ');
    }
    return datas;
  },
}, {
  title: '零件类型',
  dataIndex: 'partType',
  key: 'partType',
}, {
  title: '料架类型',
  dataIndex: 'rackType',
  key: 'rackType',
}, {
  title: 'MLS',
  dataIndex: 'MLS',
  key: 'MLS',
}];


const breadMap = [
  {
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
    name: 'BOM查询',
  }];
const BOMSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="BOM查询" />
    <FormContainer
      name="BOMSearchForm"
      action={BomSearchFormApi}
      method="GET"
      paramTemplate={bomGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      needName="queryTable"
    >
      <GroupSelectContainer name="BorderAndSmallBorder">
        <div className={'searchCondition'}>
          <label htmlFor="line_name" className={'label'}>线别</label>
          <span className="select" >
            <SelectContainer
              name="line_name"
              action={LineNameAPI}
              itemKey="line_type"
              itemValue="line_type"
              next="board_name"
              load="true"
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="board_name" className={'label'}>主板</label>
          <span className="select" >
            <SelectContainer
              name="board_name"
              action={BorderNameAPI}
              itemKey="boardName"
              itemValue="boardName"
              next="small_board_name"
              paramTemplate={paramTemplate}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="small_board_name" className={'label'}>小板</label>
          <span className="select" >
            <SelectContainer
              name="small_board_name"
              action={SmallBorderAPI}
              itemKey="smallBoardName"
              itemValue="smallBoardName"
              paramTemplate={paramTemplate2}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
      </GroupSelectContainer>
      <div className={'searchCondition'}>
        <label htmlFor="bom_version" className={'label'}>面别</label>
        <span className="select" >
          <SelectContainer
            name="side"
            className={'select'}
            itemKey="id"
            itemValue="name"
            data={selData}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="bom_version" className={'label'}>BOM版本</label>
        <span className="select" >
          <SelectContainer
            name="bom_version"
            action={WorkorderAPI}
            itemKey="bom_version"
            itemValue="bom_version"
            load="true"
            paramTemplate={paramTemplateBomVersion}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <TableContainer
      name="queryTable"
      action={BomSearchFormApiDetail}
      formName="BOMSearchForm"
      columns={columns}
      paramTemplate={defaultGetParamTemplateBom}
      needData="id"
      isGetDate="ok"
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      nextTableName="queryTable1"
      noRowSelection
      onRowClick
    />
    <Title name="BOM记录详情" />
    <QueryTableContainer
      name="queryTable1"
      tableName="queryTable"
      isRowSelection
      columns={columnsDetail}
    />
  </div>
);
BOMSearch.defaultProps = {

};
BOMSearch.propTypes = {

};

export default BOMSearch;
