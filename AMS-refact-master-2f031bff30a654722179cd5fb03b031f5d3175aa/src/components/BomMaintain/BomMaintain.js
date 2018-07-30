import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import { defaultPutParamTemplate3,
  bomGetParamTemplate,
  defaultDataSourceTemplate,
  bomPostDataTemplate,
  defaultRequestFilters,
  SERVER_IP_BOM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';

const BOMMaintainAPI = `${SERVER_IP_BOM}/bom/manager/bom/getmaintainbom`;
const BOMMaintainUpdateAPI = `${SERVER_IP_BOM}/bom/manager/bom/maintain`;
const BorderNameAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectboardname?condition=[{"board_name":""}]`;
const SmallBorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectsmallboardname`;
const WorkorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectcommon`;
const LineNameAPI = `${SERVER_IP_BOM}/bom/pda/linename`;
const MainFormName = 'BOMServiceForm';
const MainTableName = 'BOMServiceTable';
const paramTemplate = data => ({
  condition: [{ board_name: data }],
});
const paramTemplateLineType = () => ({
  condition: [{ line_type: 'N' }],
});
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
  name: 'BOM维护',
}];
const selData = [
  {
    id: 'Y',
    name: '有效',
  }, {
    id: 'N',
    name: '无效',
  },
];
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
    title: '线体类型',
    dataIndex: 'lineType',
    key: 'lineType',
  }, {
    title: '面别',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: 'BOM版本',
    dataIndex: 'BOMVersion',
    key: 'BOMVersion',
  }, {
    title: '维护时间',
    dataIndex: 'createDate',
    key: 'createDate',
  }];
const bomPutValid = (param) => {
  const { id } = param;
  const dataArray = [];
  id.map((item) => {
    const datas = { id: item, active: 'Y' };
    dataArray.push(datas);
    return null;
  });
  return {
    value: JSON.stringify(dataArray),
  };
};
const bomPutInvalid = (param) => {
  console.log('param', param);
  const { id } = param;
  const dataArray = [];
  id.map((item) => {
    const datas = { id: item, active: 'N' };
    dataArray.push(datas);
    return null;
  });
  return {
    value: JSON.stringify(dataArray),
  };
};
const BOMMaintain = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="BOM维护" />
    <FormContainer
      name="BOMServiceForm"
      action={BOMMaintainAPI}
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
        <label htmlFor="active" className={'label'}>显示项</label>
        <span className="select" >
          <SelectContainer
            name="active"
            data={selData}
            itemKey="id"
            itemValue="name"
            load="true"
            defaultKey="Y"
            defaultValue="有效"
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <ActionBtn
        btnName="无效"
        mode="update"
        InfType="BOM"
        action={BOMMaintainUpdateAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={bomPutInvalid}
        pcbNewConfigDoubleSelect
      />
      <ActionBtn
        btnName="解除无效"
        mode="update"
        InfType="BOM"
        action={BOMMaintainUpdateAPI}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={() => ('')}
        dataTemplate={bomPutValid}
        pcbNewConfigDoubleSelect
      />
    </div>
    <TableContainer name={MainTableName} rowKey="BOMService" formName="BOMServiceForm" columns={columns} />
  </div>
);
BOMMaintain.defaultProps = {

};
BOMMaintain.propTypes = {

};

export default BOMMaintain;
