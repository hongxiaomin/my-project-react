import React from 'react';
import { Row, message } from 'antd';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import './style.less';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import { defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPostDataTemplate,
  addMorePostDataTemplate,
  SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';

const JigShelfConfigAPI = `${SERVER_IP_JIG}/ams/jig/base/shelf/query`;
const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const JigShelfConfigPOST = `${SERVER_IP_JIG}/ams/jig/base/shelf/add`;
const JigShelfConfigUpdateApi = `${SERVER_IP_JIG}/ams/jig/base/shelf/update`;
// const JigShelfConfigTableApi = `${SERVER_IP_JIG}/ams/jig/life/store/ict/query`;
const MainFormName = 'JigShelfConfigPage';
const MainTableName = 'JigShelfConfigPageTable';

const jigShelfPramTemplate = (params) => {
  const { dataParam } = params;
  return {
    mode: 'Modify',
    condition: JSON.stringify([{ id: dataParam.id }]),
    value: JSON.stringify([{ ledCode: dataParam.ledCode, shelfNo: dataParam.shelfNo }]),
  };
};

const setDate = [
  {
    id: 1,
    name: 'A',
  }, {
    id: 2,
    name: 'B',
  },
];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '治工具管理',
}, {
  path: '',
  name: '系统配置',
}, {
  path: '',
  name: '架位配置',
}];
const columns = [{
  title: '序号',
  key: 'index',
  render: (text, record, index) => (index + 1),
}, {
  title: '架位二维码',
  dataIndex: 'shelfCode',
  key: 'shelfCode',
  render: (text, record) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        formName="JigShelfConfigPage2"
        name="shelfCode"
      />
    );
  },
}, {
  title: '治具类型',
  dataIndex: 'jigTypeName',
  key: 'jigTypeName',
}, {
  title: '治具二维码',
  dataIndex: 'jigCode',
  key: 'jigCode',
}, {
  title: '货架编号',
  dataIndex: 'shelfNo',
  key: 'shelfNo',
  render: (text, record) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        formName="JigShelfConfigPage2"
        name="shelfNo"
      />
    );
  },
}, {
  title: 'LED编号',
  dataIndex: 'ledCode',
  key: 'ledCode',
  render: (text, record) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        formName="JigShelfConfigPage2"
        name="ledCode"
      />
    );
  },
}, {
  title: 'LED状态',
  dataIndex: 'ledStatusName',
  key: 'ledStatusName',
}, {
  title: '更新时间',
  dataIndex: 'lastUpdateDate',
  key: 'lastUpdateDate',
}, {
  title: '更新',
  key: 'updata',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <div>
        {
          <EditableCellButton
            editable={editable}
            index={index}
            formName="JigShelfConfigPage"
            tableName="JigShelfConfigPageTable"
            needForName="JigShelfConfigPage2"
            needData="id"
            action={JigShelfConfigUpdateApi}
            method="PUT"
            record={record}
            paramTemplate={jigShelfPramTemplate}
            filters={defaultRequestFilters}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        }
      </div>
    );
  },
}];
const checkTemplate = (data) => {
  const jigTypeId = Number(data.jigTypeId);
  const shelfSide = Number(data.shelfSide);
  const areaCode = data.areaCode;
  const shelfLayer = Number(data.shelfLayer);
  const shelfNo = Number(data.shelfNo);
  const letterVerify = /^[A-Z]+$/;
  const shelfLayerVerify = /^[1-9]d*$/;
  const shelfNoVerify = /^(?!0)\d{1,3}$/;
  if (jigTypeId === -1) {
    message.error('添加治具类型', 3);
    return false;
  }
  if (!(new RegExp(letterVerify).test(areaCode))) {
    message.error('当前架位不为A-Z任意字母', 3);
    return false;
  }
  if (shelfSide === -1) {
    message.error('添加治具类型', 3);
    return false;
  }
  if (!(new RegExp(shelfLayerVerify).test(shelfLayer))) {
    message.error('当前层数不为1-9任意数字,请更正!', 3);
    return false;
  }
  if (!(new RegExp(shelfNoVerify).test(shelfNo))) {
    message.error('当前架位数不为1-999任意数字,请更正!', 3);
    return false;
  }
  return true;
};
const JigShelfConfigPage = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="架位配置" />
    <div className={'divBtn'} style={{ marginBottom: '10px' }}>
      <Modal name="JigShelfConfigAddMore" btnName="批量增加" title="批量增加" >
        <ModalForm
          name="JigShelfConfigAddMore"
          action={JigShelfConfigPOST}
          method="POST"
          dataTemplate={addMorePostDataTemplate}
          filters={defaultRequestFilters}
          checkTemplate={checkTemplate}
          modalName="JigShelfConfigAddMore"
          formName={MainFormName}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="datepicker">治具类型:</label>
              <span className={'select'} style={{ left: '115px' }}>
                <SelectContainer
                  name="jigTypeId"
                  action={JigTypeAPI}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span><i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="areaCode">架位:</label>
              <InputContainer type="text" name="areaCode" placeholder=" 请输入A-Z任意字母" /><i style={{ color: '#ff0000', marginRight: '10px' }}>*</i>
            </Row>
            <Row>
              <label htmlFor="shelfSide">面别:</label>
              <span className={'select'} style={{ left: '115px' }}>
                <SelectContainer
                  name="shelfSide"
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  data={setDate}
                />
              </span><i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="shelfLayer">层数:</label>
              <InputContainer type="text" name="shelfLayer" placeholder=" 请输入1-9任意数字" /><i style={{ color: '#ff0000', marginRight: '10px' }}>*</i>
            </Row><Row className={'selectLabel'}>
              <label htmlFor="shelfNo">单层架位数量:</label>
              <InputContainer type="text" name="shelfNo" placeholder=" 请输入1-999任意数字" /><i style={{ color: '#ff0000', marginRight: '10px' }}>*</i>
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal name="JigShelfConfigAdd" btnName="单个增加" title="单个增加" >
        <ModalForm
          name="JigShelfConfigAdd"
          action={JigShelfConfigPOST}
          method="POST"
          dataTemplate={defaultPostDataTemplate}
          filters={defaultRequestFilters}
          checkTemplate={checkTemplate}
          modalName="JigShelfConfigAdd"
          formName={MainFormName}
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="datepicker">治具类型:</label>
              <span className={'select'} style={{ left: '115px' }}>
                <SelectContainer
                  name="jigTypeId"
                  action={JigTypeAPI}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span><i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="areaCode">架位:</label>
              <InputContainer type="text" name="areaCode" placeholder=" 请输入A-Z任意字母" /><i style={{ color: '#ff0000', marginRight: '10px' }}>*</i>
            </Row>
            <Row>
              <label htmlFor="shelfSide">面别:</label>
              <span className={'select'} style={{ left: '115px' }}>
                <SelectContainer
                  name="shelfSide"
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  data={setDate}
                />
              </span><i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="shelfLayer">层数:</label>
              <InputContainer type="text" name="shelfLayer" placeholder=" 请输入1-9任意数字" /><i style={{ color: '#ff0000', marginRight: '10px' }}>*</i>
            </Row><Row className={'selectLabel'}>
              <label htmlFor="shelfNo">架位编号:</label>
              <InputContainer type="text" name="shelfNo" placeholder=" 请输入1-999任意数字" /><i style={{ color: '#ff0000', marginRight: '10px' }}>*</i>
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
    </div>
    <FormContainer
      name="JigShelfConfigPage"
      action={JigShelfConfigAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="jigTypeId" className={'label'}>治具类型</label>
        <span className={'select'}>
          <SelectContainer
            name="jigTypeId"
            action={JigTypeAPI}
            itemKey="id"
            itemValue="name"
            load="true"
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="jigCode" className={'label'}>治具二维码</label>
        <InputContainer type="text" name="jigCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="shelfCode" className={'label'}>架位二维码</label>
        <InputContainer type="text" name="shelfCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="ledCode" className={'label'}>LED编号</label>
        <InputContainer type="text" name="ledCode" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <TableContainer
      name="JigShelfConfigPageTable"
      columns={columns}
      formName="JigShelfConfigPage"
    />
  </div>
  );
JigShelfConfigPage.defaultProps = {

};
JigShelfConfigPage.propTypes = {

};

export default JigShelfConfigPage;
