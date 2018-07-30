import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Select from '../../containers/SelectContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtnShowSureModel from '../../containers/ActionBtnShowSureModelContainer';
import {
  defaultGetParamTemplateSMT,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplateSMT,
  defaultPostDataTemplateSMT,
  modifyPostDataTemplateSMT,
  updateTime,
  SERVER_IP_SMT } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import { defaultOption } from '../../constants/Config';

const ProductBasicSettingApi = `${SERVER_IP_SMT}/ams/product/base`;
const seriesGroupItem = `${SERVER_IP_SMT}/ams/product/group/series`;
const machineGroupItem = `${SERVER_IP_SMT}/ams/product/code`;
const pcbCodeGroupApi = `${SERVER_IP_SMT}/ams/pcb/code`;
const productItem = `${SERVER_IP_SMT}/ams/product`;
const targetKeyModify = ['id', 'pcSn', 'lead', 'productionType', 'panelCount', 'lotCount', 'maxTestCount', 'laserEngrave', 'panelLaserEngrave', 'laserEngraveType', 'adhesive', 'groupSeriesId',
  'codeId', 'pcbId', 'productId', 'lead', 'productionType', 'laserEngrave', 'panelLaserEngrave', 'laserEngraveType', 'adhesive'];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: 'PC序号',
  dataIndex: 'pcSn',
  key: 'pcSn',
}, {
  title: '系列别',
  dataIndex: 'groupSeriesName',
  key: 'groupSeriesName',
}, {
  title: '产品名称',
  dataIndex: 'productName',
  key: 'productName',
}, {
  title: '机种简码',
  dataIndex: 'productCodeName',
  key: 'productCodeName',
}, {
  title: 'PCB简码',
  dataIndex: 'pcbCode',
  key: 'pcbCode',
}, {
  title: '制程类型',
  dataIndex: 'productionType',
  key: 'productionType',
}, {
  title: '含铅',
  dataIndex: 'lead',
  key: 'lead',
}, {
  title: '连片数',
  dataIndex: 'panelCount',
  key: 'panelCount',
}, {
  title: '批量数',
  dataIndex: 'lotCount',
  key: 'lotCount',
}, {
  title: '测试次数限制',
  dataIndex: 'maxTestCount',
  key: 'maxTestCount',
}, {
  title: '单体镭雕',
  dataIndex: 'laserEngrave',
  key: 'laserEngrave',
}, {
  title: '连片镭雕',
  dataIndex: 'panelLaserEngrave',
  key: 'panelLaserEngrave',
}, {
  title: '单体镭雕类型',
  dataIndex: 'laserEngraveType',
  key: 'laserEngraveType',
}, {
  title: '红胶',
  dataIndex: 'adhesive',
  key: 'adhesive',
}, {
  title: '最后修改人员',
  dataIndex: 'lastUpdateBy',
  key: 'lastUpdateBy',
}, {
  title: '最后修改时间',
  dataIndex: 'lastUpdateDate',
  key: 'lastUpdateDate',
  render: (index, record) => updateTime(record.lastUpdateDate),
}];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '机种管理',
}, {
  path: '',
  name: '产品基本设定',
}];

const data = [{
  id: 'Yes',
  name: 'Yes',
}, {
  id: 'No',
  name: 'No',
}];
const data1 = [{
  id: 'Yes',
  name: 'Yes',
}, {
  id: 'No',
  name: 'No',
}, {
  id: 'Undefined',
  name: 'Undefined',
}];
const data2 = [{
  id: 'Single',
  name: 'Single',
}, {
  id: 'Lot',
  name: 'Lot',
}];
const data3 = [{
  id: 'Single',
  name: 'Single',
}, {
  id: 'Customer',
  name: 'Customer',
}, {
  id: 'Both',
  name: 'Both',
}];
const data4 = [{
  id: -1,
  name: '请选择',
}];

const tableNames = 'ProductBasicSetting';
const tableFormName = 'ProductBasicSettingForm';

const ProductBasicSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="产品基本设定" />
    <FormContainer
      name={tableFormName}
      action={ProductBasicSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="pcSn" className={'label'}>PC序号</label>
        <InputContainer type="text" name="pcSn" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="productionType" className={'label'}>制程类型</label>
        <InputContainer type="text" name="productionType" className={'input'} />
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="ProductSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="ProductSettingAdd"
        action={ProductBasicSettingApi}
        method="POST"
        dataTemplate={defaultPostDataTemplateSMT}
        filters={defaultRequestFilters}
        modalName="ProductSettingAdd"
        formName={tableFormName}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="groupSeriesId">系列别名</label>
            <span className={'select'}>
              <Select
                name="groupSeriesId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                action={seriesGroupItem}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="codeId">机种简码名</label>
            <span className={'select'}>
              <Select
                name="codeId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                action={machineGroupItem}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="pcbId">PCB简码名</label>
            <span className={'select'}>
              <Select
                name="pcbId"
                className={'select'}
                itemKey="id"
                itemValue="shortCode"
                load="true"
                action={pcbCodeGroupApi}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, shortCode: `${v.shortCode}--${v.type}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="productId">产品名</label>
            <span className={'select'}>
              <Select
                name="productId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                action={productItem}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="groupSeriesId1">预加工作业站群组</label>
            <span className={'select'}>
              <Select
                name="groupSeriesId1"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                data={data4}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="pcSn">PC序号</label>
            <InputContainer type="text" name="pcSn" />
          </Row>
          <Row>
            <label htmlFor="lead">是否含铅</label>
            <span className={'select'}>
              <Select
                name="lead"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data1}
                load="true"
                defaultKey="No"
                defaultValue="No"
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="productionType">制程类型</label>
            <span className={'select'}>
              <Select
                name="productionType"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data2}
                load="true"
                defaultKey="Single"
                defaultValue="Single"
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="panelCount">连片数</label>
            <InputContainer type="text" name="panelCount" />
          </Row>
          <Row>
            <label htmlFor="lotCount">批量数</label>
            <InputContainer type="text" name="lotCount" />
          </Row>
          <Row>
            <label htmlFor="maxTestCount">测试次数限制</label>
            <InputContainer type="text" name="maxTestCount" />
          </Row>
          <Row>
            <label htmlFor="laserEngrave">是否镭雕</label>
            <span className={'select'}>
              <Select
                name="laserEngrave"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data}
                load="true"
                defaultKey="Yes"
                defaultValue="Yes"
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="panelLaserEngrave">是否连片镭雕</label>
            <span className={'select'}>
              <Select
                name="panelLaserEngrave"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data}
                load="true"
                defaultKey="No"
                defaultValue="No"
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="laserEngraveType">单体镭雕类型</label>
            <span className={'select'}>
              <Select
                name="laserEngraveType"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data3}
                load="true"
                defaultKey="Single"
                defaultValue="Single"
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="adhesive">红胶</label>
            <span className={'select'}>
              <Select
                name="adhesive"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data}
                load="true"
                defaultKey="Yes"
                defaultValue="Yes"
              />
            </span>
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <Modal
      name="ProductSettingUpdate"
      btnName="修改"
      title="修改"
      formName={tableFormName}
      tableName={tableNames}
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="ProductSettingUpdate"
        action={ProductBasicSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={modifyPostDataTemplateSMT}
        modalName="ProductSettingUpdate"
        formName={tableFormName}
        tableName={tableNames}
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="groupSeriesId">系列别名</label>
            <span className={'select'}>
              <Select
                name="groupSeriesId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                noClr
                action={seriesGroupItem}
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="codeId">机种简码名</label>
            <span className={'select'}>
              <Select
                name="codeId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                noClr
                action={machineGroupItem}
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="pcbId">PCB简码名</label>
            <span className={'select'}>
              <Select
                name="pcbId"
                className={'select'}
                itemKey="id"
                itemValue="shortCode"
                load="true"
                noClr
                action={pcbCodeGroupApi}
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="productId">产品名</label>
            <span className={'select'}>
              <Select
                name="productId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                action={productItem}
                noClr
                dataSourceTemplate={defaultDataSourceTemplate}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="groupSeriesId1">预加工作业站群组</label>
            <span className={'select'}>
              <Select
                name="groupSeriesId1"
                className={'select'}
                itemKey="id"
                itemValue="name"
                load="true"
                data={data4}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="pcSn">PC序号</label>
            <InputContainer type="text" name="pcSn" />
          </Row>
          <Row>
            <label htmlFor="lead">是否含铅</label>
            <span className={'select'}>
              <Select
                name="lead"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data1}
                load="true"
                noClr
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="productionType">制程类型</label>
            <span className={'select'}>
              <Select
                name="productionType"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data2}
                load="true"
                noClr
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="panelCount">连片数</label>
            <InputContainer type="text" name="panelCount" />
          </Row>
          <Row>
            <label htmlFor="lotCount">多片数</label>
            <InputContainer type="text" name="lotCount" />
          </Row>
          <Row>
            <label htmlFor="maxTestCount">测试次数限制</label>
            <InputContainer type="text" name="maxTestCount" />
          </Row>
          <Row>
            <label htmlFor="laserEngrave">是否镭雕</label>
            <span className={'select'}>
              <Select
                name="laserEngrave"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data}
                load="true"
                noClr
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="panelLaserEngrave">是否连片镭雕</label>
            <span className={'select'}>
              <Select
                name="panelLaserEngrave"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data}
                load="true"
                noClr
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="laserEngraveType">单体镭雕类型</label>
            <span className={'select'}>
              <Select
                name="laserEngraveType"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data3}
                load="true"
                noClr
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="adhesive">红胶</label>
            <span className={'select'}>
              <Select
                name="adhesive"
                className={'select'}
                itemKey="id"
                itemValue="name"
                data={data}
                load="true"
                noClr
              />
            </span>
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <ActionBtn
      btnName="刷新"
      mode="refresh"
      action={ProductBasicSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={ProductBasicSettingApi}
      formName={tableFormName}
      tableName={tableNames}
      paramTemplate={() => ('')}
    />
    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '1800px' }}>
        <TableContainer name={tableNames} formName={tableFormName} columns={columns} isRadio />
      </div>
    </div>
  </div>
);
ProductBasicSetting.defaultProps = {

};
ProductBasicSetting.propTypes = {

};

export default ProductBasicSetting;
