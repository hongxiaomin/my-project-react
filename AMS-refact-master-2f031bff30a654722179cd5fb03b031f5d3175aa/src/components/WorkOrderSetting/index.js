import React from 'react';
import { Row, message } from 'antd';
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
  updateTime,
  SERVER_IP_SMT } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import './style.less';


const WorkOrderSettingApi = `${SERVER_IP_SMT}/ams/workorder`;
const productItem = `${SERVER_IP_SMT}/ams/product`;
const stateItem = `${SERVER_IP_SMT}/ams/workorder/status`;
const targetKeyModify = ['id', 'workorder', 'combinationNumber', 'productName',
  'count', 'currentCount', 'productId', 'status', 'onlineTimePlan', 'offlineTimePlan', 'onlineTimeActual', 'offlineTimeActual'];


const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '工单名',
  dataIndex: 'workorder',
  key: 'workorder',
}, {
  title: '组合料号',
  dataIndex: 'combinationNumber',
  key: 'combinationNumber',
}, {
  title: '机种名',
  dataIndex: 'productName',
  key: 'productName',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '生产数量',
  dataIndex: 'count',
  key: 'count',
}, {
  title: '当前生产数量',
  dataIndex: 'currentCount',
  key: 'currentCount',
}, {
  title: '计划上线时间',
  dataIndex: 'onlineTimePlan',
  key: 'onlineTimePlan',
  render: (index, record) => updateTime(record.onlineTimePlan),
}, {
  title: '实际上线时间',
  dataIndex: 'onlineTimeActual',
  key: 'onlineTimeActual',
  render: (index, record) => {
    if (record.onlineTimeActual) {
      return updateTime(record.onlineTimeActual);
    }
    return '--';
  },
}, {
  title: '计划完成时间',
  dataIndex: 'offlineTimePlan',
  key: 'offlineTimePlan',
  render: (index, record) => updateTime(record.offlineTimePlan),
}, {
  title: '实际完成时间',
  dataIndex: 'offlineTimeActual',
  key: 'offlineTimeActual',
  render: (index, record) => {
    if (record.offlineTimeActual) {
      return updateTime(record.offlineTimeActual);
    }
    return '--';
  },
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
  name: '工单管理',
}, {
  path: '',
  name: '工单设定',
}];

const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];

const PostDataTemplate = (params) => {
  const { combinationNumber, count, currentCount, offlineTimeActual, offlineTimePlan,
    onlineTimeActual, onlineTimePlan, productId, productName, status, workorder } = params;
  const offlineTimeActualStr = offlineTimeActual ? offlineTimeActual.toString() : '';
  const offlineTimePlanStr = offlineTimePlan ? offlineTimePlan.toString() : '';
  const onlineTimeActualStr = onlineTimeActual ? onlineTimeActual.toString() : '';
  const onlineTimePlanStr = onlineTimePlan ? onlineTimePlan.toString() : '';
  return ({ combinationNumber,
    count,
    currentCount,
    offlineTimeActual: offlineTimeActualStr,
    offlineTimePlan: offlineTimePlanStr,
    onlineTimeActual: onlineTimeActualStr,
    onlineTimePlan: onlineTimePlanStr,
    productId,
    productName,
    status,
    workorder });
};
const putDataTemplate = (params) => {
  console.log('77777', params);
  const { combinationNumber, count, currentCount, offlineTimeActual, offlineTimePlan,
    onlineTimeActual, onlineTimePlan, status, workorder, id, productId } = params;
  const moment = require('moment');
  const offlineTimeActualStr2 = offlineTimeActual ? moment(offlineTimeActual).format('X') : '';
  const offlineTimePlanStr2 = offlineTimePlan ? moment(offlineTimePlan).format('X') : '';
  const onlineTimeActualStr2 = onlineTimeActual ? moment(onlineTimeActual).format('X') : '';
  const onlineTimePlanStr2 = onlineTimePlan ? moment(onlineTimePlan).format('X') : '';
  const offlineTimeActualStr = offlineTimeActualStr2 ? `${offlineTimeActualStr2}000` : '';
  const offlineTimePlanStr = offlineTimePlanStr2 ? `${offlineTimePlanStr2}000` : '';
  const onlineTimeActualStr = onlineTimeActualStr2 ? `${onlineTimeActualStr2}000` : '';
  const onlineTimePlanStr = onlineTimePlanStr2 ? `${onlineTimePlanStr2}000` : '';
  return ({ combinationNumber,
    id,
    count,
    currentCount,
    offlineTimeActual: offlineTimeActualStr,
    offlineTimePlan: offlineTimePlanStr,
    onlineTimeActual: onlineTimeActualStr,
    onlineTimePlan: onlineTimePlanStr,
    productId,
    // productName,
    status,
    workorder });
};

const checkTemplate = (data) => {
  if (!data.onlineTimePlan) {
    message.error('计划上线时间不能为空!', 3);
    return false;
  }
  // if (!data.onlineTimeActual) {
  //   message.error('实际上线时间不能为空!', 3);
  //   return false;
  // }
  if (!data.offlineTimePlan) {
    message.error('计划完成时间不能为空!', 3);
    return false;
  }
  // if (!data.offlineTimeActual) {
  //   message.error('实际完成时间不能为空!', 3);
  //   return false;
  // }
  return true;
};


const WorkOrderSetting = props => (
  <div className="workOrderSetting">
    <Bread breadMap={breadMap} />
    <Title name="工单设定" />
    <FormContainer
      name="WorkOrderSettingForm"
      action={WorkOrderSettingApi}
      method="GET"
      paramTemplate={defaultGetParamTemplateSMT}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      load
      defaultParam={{ active: 'Y', size: 10, current: 1 }}
    >
      <div className={'searchCondition'}>
        <label htmlFor="workorder" className={'label'}>工单名</label>
        <InputContainer type="text" name="workorder" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="combinationNumber" className={'label'}>组合料号</label>
        <InputContainer type="text" name="combinationNumber" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="productId" className={'label'}>机种名</label>
        {/* <InputContainer type="text" name="productName" className={'input'} /> */}
        <span className={'select'}>
          <Select
            name="productId"
            itemKey="id"
            itemValue="name"
            action={productItem}
            load="true"
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="status" className={'label'}>状态</label>
        {/* <InputContainer type="text" name="status" className={'input'} /> */}
        <span className={'select'}>
          <Select
            name="status"
            itemKey="name"
            itemValue="name"
            action={stateItem}
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'} style={{ display: 'none' }}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <InputContainer type="text" name="active" className={'input'} value="Y" />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="WorkOrderSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="WorkOrderSettingAdd"
        action={WorkOrderSettingApi}
        method="POST"
        dataTemplate={PostDataTemplate}
        filters={defaultRequestFilters}
        modalName="WorkOrderSettingAdd"
        formName="WorkOrderSettingForm"
        body="raw"
        // checkTemplate={checkTemplate}
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="workorder">工单名</label>
            <InputContainer type="text" name="workorder" />
          </Row>
          <Row>
            <label htmlFor="combinationNumber">组合料号</label>
            <InputContainer type="text" name="combinationNumber" />
          </Row>
          {/* <Row style={{ display: 'none' }}>
            <label htmlFor="productName">机种名</label>
            <InputContainer type="text" name="productName" value="productName" />
          </Row> */}
          <Row>
            <label htmlFor="productId">机种名</label>
            <span className={'select'}>
              <Select
                name="productId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={productItem}
                load="true"
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
          {/* <Row>
            <label htmlFor="status">状态</label>
            <InputContainer type="text" name="status" />
          </Row> */}
          <Row>
            <label htmlFor="count">生产数量</label>
            <InputContainer type="text" name="count" />
          </Row>
          {/* <Row>
            <label htmlFor="currentCount">当前生产数量</label>
            <InputContainer type="text" name="currentCount" />
          </Row> */}
          <Row>
            <label htmlFor="onlineTimePlan">计划上线时间</label>
            <span className={'dateInput'}>
              <DatePickerContainer name="onlineTimePlan" type="text" style={{ outline: 'none' }} />
            </span>
          </Row>
          {/* <Row>
            <label htmlFor="onlineTimeActual">实际上线时间</label>
            <span className={'dateInput'}>
              <DatePickerContainer name="onlineTimeActual" style={{ outline: 'none' }} />
            </span>
          </Row> */}
          <Row>
            <label htmlFor="offlineTimePlan">计划完成时间</label>
            <span className={'dateInput'}>
              <DatePickerContainer name="offlineTimePlan" style={{ outline: 'none' }} />
            </span>
          </Row>
          {/* <Row>
            <label htmlFor="offlineTimeActual">实际完成时间</label>
            <span className={'dateInput'}>
              <DatePickerContainer name="offlineTimeActual" style={{ outline: 'none' }} />
            </span>
          </Row> */}
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <Modal
      name="WorkOrderSettingUpdate"
      btnName="修改"
      title="修改"
      formName="WorkOrderSettingForm"
      tableName="WorkOrderSetting"
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="WorkOrderSettingUpdate"
        action={WorkOrderSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => {}}
        dataTemplate={putDataTemplate}
        modalName="WorkOrderSettingUpdate"
        formName="WorkOrderSettingForm"
        tableName="WorkOrderSetting"
        body="raw"
      >
        <div className={'modalStyle'}>
          <Row>
            <label htmlFor="workorder">工单名</label>
            <InputContainer type="text" name="workorder" />
          </Row>
          <Row>
            <label htmlFor="combinationNumber">组合料号</label>
            <InputContainer type="text" name="combinationNumber" />
          </Row>
          {/* <Row style={{ display: 'none' }}>
            <label htmlFor="productName">机种名</label>
            <InputContainer type="text" name="productName" value="productName" />
          </Row> */}
          <Row>
            <label htmlFor="productId">机种名</label>
            {/* <InputContainer type="text" name="productName" value="productName" /> */}
            <span className={'select'}>
              <Select
                name="productId"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={productItem}
                load="true"
                noClr
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
            <label htmlFor="status">状态</label>
            {/* <InputContainer type="text" name="status" /> */}
            <span className={'select'}>
              <Select
                name="status"
                itemKey="name"
                itemValue="name"
                action={stateItem}
                dataSourceTemplate={defaultDataSourceTemplate}
                load="true"
                noClr
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="count">生产数量</label>
            <InputContainer type="text" name="count" />
          </Row>
          <Row>
            <label htmlFor="currentCount">当前生产数量</label>
            <InputContainer type="text" name="currentCount" />
          </Row>
          <Row>
            <label htmlFor="onlineTimePlan">计划上线时间</label>
            <span className={'dateInput'}>
              <DatePickerContainer name="onlineTimePlan" style={{ outline: 'none' }} oldDate />
            </span>
          </Row>
          <Row>
            <label htmlFor="onlineTimeActual">实际上线时间</label>
            <span className={'dateInput'}>
              <DatePickerContainer name="onlineTimeActual" style={{ outline: 'none' }} oldDate />

            </span>
          </Row>
          <Row>
            <label htmlFor="offlineTimePlan">计划完成时间</label>
            <span className={'dateInput'}>
              <DatePickerContainer name="offlineTimePlan" style={{ outline: 'none' }} oldDate />
            </span>
          </Row>
          <Row>
            <label htmlFor="offlineTimeActual">实际完成时间</label>
            <span className={'dateInput'}>
              <DatePickerContainer name="offlineTimeActual" style={{ outline: 'none' }} oldDate />
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
      action={WorkOrderSettingApi}
      formName="WorkOrderSettingForm"
      tableName="WorkOrderSetting"
      paramTemplate={defaultPutParamTemplateSMT}
    />
    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={WorkOrderSettingApi}
      formName="WorkOrderSettingForm"
      tableName="WorkOrderSetting"
      paramTemplate={() => ('')}
    />
    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '2300px' }}>
        <TableContainer name="WorkOrderSetting" formName="WorkOrderSettingForm" columns={columns} isRadio />
      </div>
    </div>
  </div>
);
WorkOrderSetting.defaultProps = {

};
WorkOrderSetting.propTypes = {

};

export default WorkOrderSetting;
