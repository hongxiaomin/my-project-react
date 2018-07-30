import React, { PropTypes } from 'react';
import { message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import TableContainer from '../../containers/TableContainer';
import UploadContainer from '../../containers/UploadContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import { SERVER_IP_BOM,
  defaultGetParamTemplate,
  defaultPostDataTemplate,
  defaultDataSourceTemplate,
  bomPostDataTemplate,
  dataSourceTemplateDetail,
  dataSourceTemplateSummary } from '../../constants/Settings';

const UploadAPI = `${SERVER_IP_BOM}/webapi/bom/manager/upload/package`;
const SubmitAPI = `${SERVER_IP_BOM}/bom/manager/upload/submit`;
const columns = [{
  title: '序号',
  dataIndex: 'name1',
  key: 'name1',
  render: (text, record, index) => index + 1,
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
}];
const columns1 = [
  {
    title: '序号',
    dataIndex: 'name2',
    key: 'name2',
    render: (text, record, index) => index + 1,
  }, {
    title: '主板',
    dataIndex: 'boardName',
    key: 'boardName',
  }, {
    title: '点数',
    dataIndex: 'point',
    key: 'point',
  }, {
    title: 'PCB料号',
    dataIndex: 'pcbPartNo',
    key: 'pcbPartNo',
  }, {
    title: '线体类型',
    dataIndex: 'lineType',
    key: 'lineType',
  }, {
    title: 'A面识别码',
    dataIndex: 'ASideIdentificationCode',
    key: 'ASideIdentificationCode',
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
  name: 'BOM制作',
}];

const paramTemplate = file => ({
  param: [`$FILE:${file.name}`],
});

const BOMProduct = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="BOM制作" />
    <UploadContainer
      name="UploadName"
      action={UploadAPI}
      paramTemplate={paramTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      onSuccess={response => message.success(response.message ? response.message : 'upload success!')}
      onError={e => message.error(e)}
      preload
    />
    <TableContainer
      columns={columns1}
      formName="UploadName"
      dataSourceTemplate={dataSourceTemplateSummary}
      isPaginLocal="true"
      name="BOMProducttableName"
    />
    <TableContainer
      columns={columns}
      name="BOMProducttableName2"
      isPaginLocal="true"
      formName="UploadName"
      uid="NONO"
      dataSourceTemplate={dataSourceTemplateDetail}
    />
    <ActionBtn
      btnName="提交"
      mode="submit"
      action={SubmitAPI}
      formName="UploadName"
      paramTemplate={defaultGetParamTemplate}
      dataTemplate={bomPostDataTemplate}
    />
  </div>
);
BOMProduct.defaultProps = {

};
BOMProduct.PropTypes = {

};

export default BOMProduct;
