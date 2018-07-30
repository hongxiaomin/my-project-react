import React from 'react';
import { Row,message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import Input from '../../containers/InputContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';
import './style.less';
import {
  defaultDataTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultGetParamTemplate2,
  SERVER_IP_PCB } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const PCBStoreDiscardAPI = `${SERVER_IP_PCB}/ams/pcb/scrapped/expired`;
const PCBDiscardAPI = `${SERVER_IP_PCB}/ams/pcb/scrapped/add `;
const columns = [{
  title: '序号',
  dataIndex: 'index',
  key: 'index',
  render: (text, render, index) => (index + 1),
}, {
  title: 'PCB 料号',
  dataIndex: 'partNum',
  key: 'partNum',
}, {
  title: '架位',
  dataIndex: 'subShelfSerial',
  key: 'subShelfSerial',
}, {
  title: 'PCB Code',
  dataIndex: 'pcbCode',
  key: 'pcbCode',
}, {
  title: 'Date Code',
  dataIndex: 'dateCode',
  key: 'dateCode',
}, {
  title: '库存数量',
  dataIndex: 'count',
  key: 'count',
}, {
  title: '入库时间',
  dataIndex: 'inBoundDate',
  key: 'inBoundDate',
}, {
  title: '超期时间',
  dataIndex: 'effectTime',
  key: 'effectTime',
}];
const columnsBackUseTable = [{
  title: '流水号',
  dataIndex: 'serial',
  key: 'serial',
  render: (text, record, index) => {
    if (record.backgroundColor) {
      return (<p style={{ background: record.backgroundColor }} className={'pTable'}>{record.serial}</p>);
    }
    return (<p className={'pTable'}>{record.serial}</p>);
  },
}, {
  title: 'PCB料号',
  dataIndex: 'partNum',
  key: 'partNum',
  render: (text, record, index) => {
    if (record.backgroundColor) {
      return (<p style={{ background: record.backgroundColor }} className={'pTable'}>{record.partNum}</p>);
    }
    return (<p className={'pTable'}>{record.partNum}</p>);
  },
}, {
  title: '架位',
  dataIndex: 'subShelfSerial',
  key: 'subShelfSerial',
  render: (text, record, index) => {
    if (record.backgroundColor) {
      return (<p style={{ background: record.backgroundColor }} className={'pTable'}>{record.subShelfSerial}</p>);
    }
    return (<p className={'pTable'}>{record.subShelfSerial}</p>);
  },
}, {
  title: 'PCB Code',
  dataIndex: 'pcbCode',
  key: 'pcbCode',
  render: (text, record, index) => {
    if (record.backgroundColor) {
      return (<p style={{ background: record.backgroundColor }} className={'pTable'}>{record.pcbCode}</p>);
    }
    return (<p className={'pTable'}>{record.pcbCode}</p>);
  },
}, {
  title: 'Date Code',
  dataIndex: 'dateCode',
  key: 'dateCode',
  render: (text, record, index) => {
    if (record.backgroundColor) {
      return (<p style={{ background: record.backgroundColor }} className={'pTable'}>{record.dateCode}</p>);
    }
    return (<p className={'pTable'}>{record.dateCode}</p>);
  },
}, {
  title: '报废数量',
  dataIndex: 'count',
  key: 'count',
  render: (text, record, index) => {
    const { editable } = record;
    if (record.backgroundColor) {
      return (<p style={{ background: record.backgroundColor }} className={'pTable'}>
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="PCBBackUse"
          name="count"
        />
      </p>);
    }
    return (<p className={'pTable'}>
      <EditableCell
        defaultValue={text}
        editable={editable}
        formName="PCBBackUse"
        name="count"
      /> </p>
    );
  },
}, {
  title: '报废原因',
  dataIndex: 'description',
  key: 'description',
  render: (text, record, index) => {
    const { editable } = record;
    if (record.backgroundColor) {
      return (<p style={{ background: record.backgroundColor }} className={'pTable'}>
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="PCBBackUse"
          name="description"
        />
      </p>);
    }
    return (<p className={'pTable'}>
      <EditableCell
        defaultValue={text}
        editable={editable}
        formName="PCBBackUse"
        name="description"
      /></p>);
  },
}, {
  title: '操作',
  dataIndex: 'amounts',
  key: 'amounts',
  render: (text, record, index) => {
    const { editable } = record;
    if (record.backgroundColor) {
      return (<p style={{ background: record.backgroundColor }} className={'pTable'}>
        <EditableCellButton
          editable={editable}
          index={index}
          formName="PCBBackUse"
          tableName="PCBBackUseTable"
          needForName="PCBBackUse"
          record={record}
          noRequest
        />
      </p>);
    }
    return (<p className={'pTable'}>
      <EditableCellButton
        editable={editable}
        index={index}
        formName="PCBBackUse"
        tableName="PCBBackUseTable"
        needForName="PCBBackUse"
        record={record}
        noRequest
      />
    </p>);
  },
}];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'PCB',
}, {
  path: '',
  name: '仓库管理',
}, {
  path: '',
  name: '库存报废',
}];
const defaultPostDataTemplatePCBAdd = (param) => {
  const val = document.getElementById('tt').value;
  const data = {
    serial: param.serial,
    amounts: param.amounts,
    reason: val || param.reason,
    operator: 'admin',
  };
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  return {
    value: dataStr || [],
  };
};
const defaultPostDataTemplatePCBAdd2 = (param) => {
  const data = {
    serial: param[0].serial,
    amounts: param[0].count,
    reason: param[0].description,
    operator: 'admin',
  };
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  return {
    value: dataStr || [],
  };
};

const checkTemplate = (data) => {
  const startTime = data.startTime;
  const endTime = data.endTime;
    if(startTime>endTime){
      message.error('入库结束时间不能早于入库起始时间！',3);
      return false;
    }
    return true;
 };

const PCBStoreDiscard = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="库存报废" />
    <FormContainer
      name="PCBDiscardHistoryForm"
      action={PCBStoreDiscardAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      dataTemplate={defaultDataTemplate}
      checkTemplate={checkTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="partNum" className={'label'}>PCB料号</label>
        <InputContainer type="text" name="partNum" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="subShelfSerial" className={'label'}>架位</label>
        <InputContainer type="text" name="subShelfSerial" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="startTime" className={'label'}>入库起始时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer
            name="startTime"
            style={{ outline: 'none' }}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="endTime" className={'label'}>入库结束时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="endTime" style={{ outline: 'none' }} />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="JigCheckGroupSettingAdd" btnName="单项报废" title="单项报废" >
        <ModalForm
          name="JigCheckGroupSettingAdd"
          action={PCBDiscardAPI}
          method="POST"
          filters={defaultRequestFilters}
          dataTemplate={defaultPostDataTemplatePCBAdd}
          modalName="JigCheckGroupSettingAdd"
          formName="PCBDiscardHistoryForm"
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="qcGroupCode">二维码</label>
              <Input type="text" name="labelName" RequestShowData />
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row>
              <label htmlFor="qcGroupName">流水号</label>
              <Input type="text" name="serial" disabled />
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row>
              <label htmlFor="createBy">PCB料号</label>
              <Input type="text" name="partNum" disabled />
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row>
              <label htmlFor="qcGroupName">架位</label>
              <Input type="text" name="subShelfSerial" />
            </Row>
            <Row>
              <label htmlFor="createBy">PCB Code</label>
              <Input type="text" name="pcbCode" disabled />
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row>
              <label htmlFor="qcGroupName">Date Code</label>
              <Input type="text" name="dateCode" disabled />
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row>
              <label htmlFor="createBy">报废数量</label>
              <Input type="text" name="amounts" />
              <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row>
              <label htmlFor="createBy">备注</label>
              <Input type="radio" name='check' className='radioInput' value='overDue'/>超期
              <Input type="radio" name='check' className='radioInput' value='dullMaterial'/>呆料
              <Input type="radio" name='check' className='radioInput' value='others'/>其他
            <i style={{ color: '#ff0000', position: 'absolute', left: '350px' }}>*</i>
            </Row>
            <Row>
              <label></label>
              <textarea id='tt' name= 'reason' className='displaynone'></textarea>
            </Row>


            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal name="PCBBackUse" btnName="批量报废" title="批量报废" reuseTable select tableName="PCBDiscardHistory" className="modelTableWidth">
        <ModalForm
          action=""
          name="PCBBackUse"
          method="POST"
          filters={defaultRequestFilters}
          modalName="PCBBackUse"
          formName="PCBBackUseTableForm"
          tableName="PCBDiscardHistory"
          keepDataSource
        >
          <div className={'searchCondition'}>
            <label htmlFor="labelName" className={'label'}>二维码</label>
            <InputContainer type="text" name="labelName" className={'input'} noRequest />
          </div>
        </ModalForm>
        <div className="PCBMonitor">
          <TableContainer name="PCBBackUseTable" formName="PCBBackUse" columns={columnsBackUseTable} nopagination noRowSelection />
          <p style={{ color: 'red', width: '100%', textAlign: 'center' }}>报废原因为必填项</p>
        </div>
        <div className={'modalStyle'} style={{ border: 'none' }}>
          <Row className={'submitBtn'}>
            <ActionBtn
              btnName="submit"
              method="POST"
              mode="submit"
              action={PCBDiscardAPI}
              tableName="PCBBackUseTable"
              formName="PCBBackUse"
              dataTemplate={defaultPostDataTemplatePCBAdd2}
              isCheck
            />
          </Row>
        </div>
      </Modal>
    </div>

    <TableContainer name="PCBDiscardHistory" formName="PCBDiscardHistoryForm" columns={columns} />
  </div>
);
PCBStoreDiscard.defaultProps = {

};
PCBStoreDiscard.propTypes = {

};

export default PCBStoreDiscard;
