import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
// import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import { defaultDataSourceTemplate, defaultGetParamTemplate2, bomGetParamTemplate, defaultRequestFilters, SERVER_IP_BOM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import { dataModifyDataSource } from '../../constants/TableConfig';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';
// import './style.less';

const RateMaintainAPI = `${SERVER_IP_BOM}/bom/manager/bom`;
const BorderNameAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectboardname?condition=[{"board_name":"DPS"}]`;
const SmallBorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectsmallboardname`;
const WorkorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectcommon`;

const paramTemplate = data => ({
  condition: [{ board_name: data }],
});
const paramTemplateLineType = data => ({
  condition: [{ line_type: 'N' }],
});
const rateMaintainPramTemplate = (params) => {
  const { dataParam } = params;
  return {
    value: JSON.stringify([{ id: dataParam.id, rate: dataParam.rate }]),
  };
};
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
  name: 'rate维护',
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
    title: '线体类型',
    dataIndex: 'lineType',
    key: 'lineType',
  }, {
    title: 'rate',
    dataIndex: 'rate',
    key: 'rate',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="RateMaintainForm2"
          name="rate"
        />
      );
    },
  }, {
    title: '编辑',
    key: 'index',
    render: (text, record, index) => {
      const { editable } = record;
      return (
        <div>
          {
            <EditableCellButton
              editable={editable}
              index={index}
              formName="RateMaintainForm"
              tableName="RateMaintaintable"
              needForName="RateMaintainForm2"
              needData="id"
              action={RateMaintainAPI}
              method="PUT"
              record={record}
              paramTemplate={rateMaintainPramTemplate}
              filters={defaultRequestFilters}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          }
        </div>
      );
    },
  }];
const RateMaintain = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="rate维护" />
    <FormContainer
      name="RateMaintainForm"
      action={RateMaintainAPI}
      method="GET"
      filters={defaultRequestFilters}
      paramTemplate={bomGetParamTemplate}
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
          <SelectContainer
            name="side"
            data={selData}
            itemKey="id"
            itemValue="name"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="line_type" className={'label'}>线体类型</label>
        <span className="select" >
          <SelectContainer
            name="line_type"
            action={WorkorderAPI}
            itemKey="line_type"
            itemValue="line_type"
            load="true"
            paramTemplate={paramTemplateLineType}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <TableContainer
      name="RateMaintaintable"
      formName="RateMaintainForm"
      columns={columns}
      dataSourceTemplate={dataModifyDataSource}
    />
  </div>
  );
RateMaintain.defaultProps = {

};
RateMaintain.propTypes = {

};

export default RateMaintain;
