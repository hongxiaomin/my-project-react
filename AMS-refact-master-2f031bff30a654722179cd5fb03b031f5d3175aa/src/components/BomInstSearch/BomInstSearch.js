import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import { defaultDataSourceTemplate, bomGetParamTemplate, defaultRequestFilters, SERVER_IP_BOM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import Select from '../../containers/SelectContainer';

const BOMInstSearchAPI = `${SERVER_IP_BOM}/bom/instruction/summary`;
const BorderNameAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectboardname?condition=[{"board_name":"DPS"}]`;
const SmallBorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectsmallboardname`;
const paramTemplate = data => ({
  condition: [{ board_name: data }],
});
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
    title: 'IDCode',
    dataIndex: 'IDCode',
    key: 'IDCode',
  }, {
    title: 'REV',
    dataIndex: 'REV',
    key: 'REV',
  }, {
    title: '制作人',
    dataIndex: 'producer',
    key: 'producer',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
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
  name: '作业指导书管理',
}, {
  path: '',
  name: '查询',
}];
const BOMInstSearch = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="查询" />
    <FormContainer
      name="BOMSearchForm"
      action={BOMInstSearchAPI}
      method="GET"
      paramTemplate={bomGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <GroupSelectContainer name="BorderAndSmallBorder">
        <div className={'searchCondition'}>
          <label htmlFor="board_name" className={'label'}>主板</label>
          <span className="select" >
            <SelectContainer
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
            <SelectContainer
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
        <span className={'select'}>
          <Select
            name="side"
            itemKey="id"
            itemValue="name"
            data={selData}
          />
        </span>
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <TableContainer name="BOMSearch" formName="BOMSearchForm" columns={columns} />
  </div>
);
BOMInstSearch.defaultProps = {
};
BOMInstSearch.propTypes = {

};

export default BOMInstSearch;
