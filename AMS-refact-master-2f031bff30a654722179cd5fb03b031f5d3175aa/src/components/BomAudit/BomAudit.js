import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import QueryTableContainer from '../../containers/QueryTableContainer';
import { bomGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultGetParamTemplateBom,
  bomPostDataTemplate,
  SERVER_IP_BOM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
// import './style.less';
const BOMAuditAPI = `${SERVER_IP_BOM}/bom/manager/bom`;
const BOMAuditFormApiDetail = `${SERVER_IP_BOM}/bom/manager/bom/detail`;
const SubmitAPI = `${SERVER_IP_BOM}/bom/manager/bom/verify`;
// const BorderNameAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectboardname?condition=[{"board_name":""}]`;
const BorderNameAPI = `${SERVER_IP_BOM}/bom/manager/bom/verify/selectboardname?condition=[{"board_name":""}]`;
const SmallBorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectsmallboardname`;
const WorkorderAPI = `${SERVER_IP_BOM}/bom/manager/bom/selectcommon`;
const LineNameAPI = `${SERVER_IP_BOM}/bom/pda/linename`;
const paramTemplate = data => ({
  condition: [{ board_name: data }],
});
const paramTemplateBomVersion = data => ({
  condition: [{ bom_version: '' }],
});
const paramTemplateLineType = data => ({
  condition: [{ line_type: 'N' }],
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
    title: '面别',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '点数',
    dataIndex: 'groupCode',
    key: 'groupCode5',
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
    title: 'BOM版本',
    dataIndex: 'BOMVersion',
    key: 'BOMVersion',
  }, {
    title: '连片数量',
    dataIndex: 'ConductorsNumber',
    key: 'ConductorsNumber',
  }, {
    title: 'A面识别码',
    dataIndex: 'AsideIdentificationCode',
    key: 'AsideIdentificationCode',
  }, {
    title: '修订日期',
    dataIndex: 'revisionDate',
    key: 'revisionDate',
  }, {
    title: '备注',
    dataIndex: 'remarks',
    key: 'remarks',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      let status = '';
      if (record.status === 0) {
        status = '未审核';
        // return '未审核';
      } else if (record.status === 1) {
        status = '审核通过';
        // return '审核通过';
      } else if (record.status === 2) {
        status = '审核未通过';
        // return '审核未通过';
      }
      return status;
    },
  }];
const columnsDetail = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: 'BOM ID',
  dataIndex: 'bomId',
  key: 'bomId',
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
  dataIndex: 'partLocation',
  key: 'partLocation',
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
}, {
  title: '备注',
  dataIndex: 'comments',
  key: 'comments',
}];
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
  name: 'BOM审核',
}];

const setDate = [
  {
    id: 0,
    name: '未审核',
  }, {
    id: 1,
    name: '审核通过',
  }, {
    id: 2,
    name: '审核未通过',
  },
];
const PostSelData = [
  {
    id: 1,
    name: '审核通过',
  }, {
    id: 2,
    name: '审核未通过',
  },
];
const bomParamTemplate = () => ('');
const BOMAuditPage = props => (
  <div>
    <div>
      <Bread breadMap={breadMap} />
      <Title name="BOM审核" />
      <FormContainer
        name="BOMAuditForm"
        action={BOMAuditAPI}
        method="GET"
        paramTemplate={bomGetParamTemplate}
        dataSourceTemplate={defaultDataSourceTemplate}
        filters={defaultRequestFilters}
        needName="BOMAudit"
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
          <label htmlFor="BOMVersion" className={'label'}>BOM版本</label>
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
          <label htmlFor="status" className={'label'}>状态</label>
          <span className={'select'}>
            <SelectContainer
              itemKey="id"
              itemValue="name"
              name="status"
              data={setDate}
              defaultKey="0"
              defaultValue="未审核"
            />
          </span>
        </div>
        <input type="submit" value="查询" className={'button'} />
      </FormContainer>
      <TableContainer
        name="BOMAudit"
        formName="BOMAuditForm"
        nextTableName="BOMAudit2"
        action={BOMAuditFormApiDetail}
        columns={columns}
        paramTemplate={defaultGetParamTemplateBom}
        needData="id"
        isGetDate="ok"
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
        isRadio
        onRowClick
      />
      <Title name="BOM详情" />
      <QueryTableContainer
        name="BOMAudit2"
        tableName="BOMAudit"
        isRowSelection
        columns={columnsDetail}
      />
    </div>
    <FormContainer
      name="BOMAuditSubmitForm"
      action=""
      method="POST"
      paramTemplate={bomGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="status" className={'label'}>状态</label>
        <span className="select">
          <SelectContainer
            name="status"
            itemKey="id"
            itemValue="name"
            data={PostSelData}
          />
        </span>
      </div>
      <ActionBtn
        btnName="提交"
        mode="update"
        InfType="BOM"
        action={SubmitAPI}
        tableName="BOMAudit"
        formName="BOMAuditSubmitForm"
        formNameMain="BOMAuditForm"
        paramTemplate={bomParamTemplate}
        dataTemplate={bomPostDataTemplate}
      />
    </FormContainer>


  </div>
);
BOMAuditPage.defaultProps = {

};
BOMAuditPage.propTypes = {

};

export default BOMAuditPage;
