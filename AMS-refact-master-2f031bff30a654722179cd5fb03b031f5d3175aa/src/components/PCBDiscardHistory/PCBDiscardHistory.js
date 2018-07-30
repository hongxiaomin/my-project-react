import React from 'react';
import { Row,message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import {
  defaultGetParamTemplate2,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_PCB } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import './style.less';

const PCBDiscardHistoryAPI = `${SERVER_IP_PCB}/ams/pcb/report/scrapped`;
const PCBDiscardReuseAPI = `${SERVER_IP_PCB}/ams/pcb/scrapped/reuse`;
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text, render, index) => (index + 1),
  }, {
    title: 'PCB料号',
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
    title: '报废数量',
    dataIndex: 'count',
    key: 'count',
  }, {
    title: '首次报废时间',
    dataIndex: 'temporaryDate',
    key: 'temporaryDate',
  }, {
    title: '恢复使用时间',
    dataIndex: 'reuseDate',
    key: 'reuseDate',
  }, {
    title: '第二次报废时间',
    dataIndex: 'permanentDate',
    key: 'permanentDate',
  }, {
    title: '报废原因',
    dataIndex: 'reason',
    key: 'reason',
  }, {
    title: '操作员',
    dataIndex: 'operationUser',
    key: 'operationUser',
  }, {
    title: '备注',
    dataIndex: 'description',
    key: 'description',
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
  title: '备注',
  dataIndex: 'description',
  key: 'description',
  render: (text, record, index) => {
    if (record.backgroundColor) {
      return (<p style={{ background: record.backgroundColor }} className={'pTable'}>{record.description}</p>);
    }
    return (<p className={'pTable'}>{record.description}</p>);
  },
}];


const defaultDataTemplate = (params) => {
  const reUseData = params;
  let serialArray = [];
  reUseData.map((item) => {
    const serialObj = { serial: item.serial };
    serialArray.push(serialObj);
    return null;
  });
  serialArray = JSON.stringify(serialArray);
  return { value: serialArray };
};


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
  name: '报表查询',
}, {
  path: '',
  name: '报废历史查询',
}];

const checkTemplate = (data) => {
  const startTime = data.startTime;
  const endTime = data.endTime;
    if(startTime>endTime){
      message.error('结束时间不能早于起始时间！',3);
      return false;
    }
    return true;
 };

const PCBDiscardHistory = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="报废历史查询" />
    <FormContainer
      name="PCBDiscardHistoryForm"
      action={PCBDiscardHistoryAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
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
        <label htmlFor="reason" className={'label'}>原因</label>
        <InputContainer type="text" name="reason" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="startTime" className={'label'}>起始时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="startTime" style={{ outline: 'none' }} />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="endTime" className={'label'}>结束时间</label>
        <span className={'dateInput'}>
          <DatePickerContainer name="endTime" style={{ outline: 'none' }} />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <Modal name="PCBBackUse" btnName="恢复使用" title="恢复使用" reuseTable select removeDate tableName="PCBDiscardHistory" className="modelTableWidth">
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
      </div>
      <div className={'modalStyle'} style={{ border: 'none' }}>
        <Row className={'submitBtn'}>
          <ActionBtn
            btnName="Submit"
            method="PUT"
            mode="submit"
            action={PCBDiscardReuseAPI}
            tableName="PCBBackUseTable"
            formName="PCBBackUse"
            dataTemplate={defaultDataTemplate}
            isCheck
          />
        </Row>
      </div>
    </Modal>
    <TableContainer name="PCBDiscardHistory" formName="PCBDiscardHistoryForm" columns={columns} />
  </div>
);
PCBDiscardHistory.defaultProps = {

};
PCBDiscardHistory.propTypes = {

};

export default PCBDiscardHistory;
