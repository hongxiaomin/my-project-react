/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { message, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Immutable from 'immutable';
import Form from '../../containers/FormContainer';
import Select from '../../containers/SelectContainer';
import Modal from '../../containers/ModalContainer';
// import ModalForm from '../../containers/ModalFormContainer';
import { defaultRequestFilters, SERVER_IP_LION } from '../../constants/Settings';
import FormTable from '../../containers/TableContainer';
import { onFormDataSourceChange, onUpdateFormData, onFormDataChange } from '../../actions/FormAction';
import { tableRedecurName } from '../../constants/TableConfig';
import { formReducerName, formDataName, formDataSourceName } from '../../constants/Config';
import EditableCell from '../../containers/EditableCellContainer';
// import EditableCellButton from '../../containers/EditableCellButtonContainer';
import { saveTableProps, addArrayOneLine } from '../../actions/TableAction';
import InputContainer from '../../containers/InputContainer';
// import { onAutoInputRequestSuccess } from '../../actions/AutoInputAction';
import DisplayContainer from '../../containers/DisplayContainer';
import ActionBtnContainer from '../../containers/ActionBtnContainer';
import { onModalUpdateProps } from '../../actions/ModalAction';
import ShowInputList from '../../containers/ShowInputListContainer';
import Request from '../../utils/Request';
import './style.less';


// 线别下拉列表
const LineConfigurationLineApi = `${SERVER_IP_LION}/dg5/scm/config/pattern/getLine`;

// PC和PLC的修改
const LineConfigurationUpdatePCorPLCApi = `${SERVER_IP_LION}/dg5/scm/config/pattern/configPattern`;
// 表格中修改的回掉函数
const addCallBack = params => (
  (dispatch) => {
    // console.log('params', params);
    const { record } = params;
    const { paramName, machineType } = record;
   // machineType;
    if (machineType === 'SPI') {
      let paramNameArray;
      const newArray = [];
      if (paramName) {
        paramNameArray = paramName.split(',');
        paramNameArray.map((v) => {
          newArray.push(v);
          return null;
        });
      }
      dispatch(onModalUpdateProps({ modalName: 'spi', visibleNew: true }));
      dispatch(addArrayOneLine({
        tableName: 'LineConfigurationTwoTable',
        newArray,
      }));
    } else if (machineType === 'NXT' || machineType === '贴片机') {
      dispatch(onModalUpdateProps({ modalName: 'nxt', visibleNew: true }));
    } else {
      dispatch(onModalUpdateProps({ modalName: 'others', visibleNew: true }));
    }
  }
);
// PC修改时 SPI
const LineConfigurationUpdatePCSPI = (params) => {
  const dat = [];
  Object.keys(params).forEach((key) => {
    const datName = key.split(',')[0];
    if (datName === 'paramName' && params[key]) {
      dat.push(params[key]);
    }
  });
  // debugger;
  const newStr = dat.join(',');
  return newStr;
};
  // PC修改时 nxt
const LineConfigurationUpdatePCNXT = (params) => {
  const dat = [];
  Object.keys(params).forEach((key) => {
    const datName = key.split(',')[0];
    if (datName === 'nxt' && params[key]) {
      const datNameValue = key.split(',')[1];
      dat.push(`${datNameValue}:${params[key]}`);
    }
  });
  const newStr = dat.join(',');
  const returnNewStr = newStr.replace(/,/g, ';');
  // console.log('returnNewStr', returnNewStr);
  return returnNewStr;
};
  // PC修改是 others
const LineConfigurationUpdatePCOthers = (params) => {
  let newStr;
  Object.keys(params).forEach((key) => {
    if (key === 'others') {
      newStr = params[key];
    }
  });
  return newStr;
};
// PC修改时候 SPI dataTemplete
const LineConfigurationUpdatePCTemplate = (params) => {
  const { formData, tableData } = params;
  const { controlMode, id, machineId, machineNumber, machineType, model, pqmInfoId } = tableData[0];
  const { side, line, combinationNumber } = formData;
 // const machineTypeBigCode = machineType.toUpperCase();
  let newStr;
  if (machineType === 'SPI') {
    newStr = LineConfigurationUpdatePCSPI(formData);
  } else if (machineType === 'NXT' || machineType === '贴片机') {
    newStr = LineConfigurationUpdatePCNXT(formData);
  } else {
    newStr = LineConfigurationUpdatePCOthers(formData);
  }
  if (!newStr) {
    message.destroy();
    message.error('参数设置不能为空!', 3);
    return false;
  }
  return {
    value: JSON.stringify([{
      controlMode,
      id,
      machineId,
      machineNumber,
      machineType,
      model,
      paramName: newStr,
      side,
      line,
      pqmInfoId: pqmInfoId || null,
      combinationNumber: `39413${combinationNumber}`,
    }]),
  };
};
// 下拉框回调 清楚table数据
const selectCallBack = () => (
  (dispatch) => {
    const dat2 = Immutable.fromJS({});
    // const dat = Immutable.fromJS([]);
    // debugger;
    dispatch(onFormDataSourceChange({
      formName: 'patternForm',
      dataSource: [],
      response: dat2,
    }));
  }
);
// 下拉框变化的回掉函数
const LineConfigurationTwoTableTemplate = params => (
  (dispatch, getState) => {
    const { formData, formName } = params;
    const state = getState();
    const dat = state.getIn([formReducerName, formName, formDataName]) ? state.getIn([formReducerName, formName, formDataName]).toJS() : '';
    const formDat = formData || dat;
    const tableProps2 = state.getIn([tableRedecurName, 'LineConfigurationTwoTable2', 'props']) ?
    state.getIn([tableRedecurName, 'LineConfigurationTwoTable2', 'props']) : '';
    const tableProps = state.getIn([tableRedecurName, 'LineConfigurationTwoTable', 'props']) ?
    state.getIn([tableRedecurName, 'LineConfigurationTwoTable2', 'props']) : '';
    const { controlMode, line, combinationNumber, side } = formDat;
    if (!(line !== '-1' && combinationNumber && side !== '-1')) {
      message.error('组合料号,面别,线别都必须要填写!', 5);
      return;
    }
    const url = `${SERVER_IP_LION}/dg5/scm/config/pattern/getConfigByLineAndControlMode`;
    const param = {
      condition: [{
        line,
        controlMode: controlMode === '1' ? 0 : 1,
        combinationNumber: `39413${combinationNumber}`,
        side,
      }] };
    const method = 'GET';
    const callback = (response) => {
      const { rows } = response;
      const newDisplay = controlMode === '1';
      const newProps2 = {
        ...tableProps2,
        noDisplay: newDisplay,
      };
      const newProps = {
        ...tableProps,
        noDisplay: !newDisplay,
      };
      if (rows) {
        rows.map((v) => {
          Object.assign(v, { editable: false });
          return null;
        });
      }
      dispatch(onFormDataSourceChange({
        formName: 'patternForm',
        dataSource: rows || [],
        response,
      }));

      dispatch(saveTableProps({
        tableName: 'LineConfigurationTwoTable2',
        props: newProps2,
      }));
      dispatch(saveTableProps({
        tableName: 'LineConfigurationTwoTable',
        props: newProps,
      }));
    };
    Request({
      url,
      method,
      param,
      callback,
    });
  }
);
// PL弹出框提交的回掉函数
const submitAddCallBack = params => (
  (dispatch, getState) => {
    const state = getState();
    const { tableName, formName } = params;
    const url = params.action;
    const method = params.method || 'POST';
    const tableData = state.getIn([tableRedecurName, tableName, 'selectedRows']) || [];
    const formData = state.getIn([formReducerName, formName, formDataName]) ? state.getIn([formReducerName, formName, formDataName]).toJS() : '';
    const data = params.dataTemplate ? params.dataTemplate({ tableData, formData }) : '';
    if (!data) {
      return;
    }
    const filters = params.filters;
    const callback = (response) => {
      const { code, rows } = response;
      if (code === -1) {
        message.destroy();
        message.error(response.message, 5);
      } else {
        if (rows.length > 0) {
          const arrayDat = [];
          rows.map((v) => {
            arrayDat.push(v.machineType);
            return null;
          });
          const datString = arrayDat.join(',');
          message.destroy();
          message.success(`${datString}正在换线中,暂不能修改!`, 5);
        }
        dispatch(onModalUpdateProps({ modalName: 'spi', visibleNew: false }));
        dispatch(onModalUpdateProps({ modalName: 'nxt', visibleNew: false }));
        dispatch(onModalUpdateProps({ modalName: 'others', visibleNew: false }));
        const newFormData = JSON.parse(JSON.stringify(formData));
        Object.keys(newFormData).forEach((key) => {
          const dat = key.split(',')[0];
          if (dat === 'paramName' || dat === 'nxt' || dat === 'others') {
            delete newFormData[key];
          }
        });
        const newFormData2 = Immutable.fromJS({ ...newFormData });
        dispatch(onUpdateFormData({
          formName,
          newState: newFormData2,
        }));
        dispatch(LineConfigurationTwoTableTemplate({ formData }));
      }
    };
    Request({
      url,
      method,
      data,
      filters,
      callback,
    });
  }
);
// PLC 的 data 处理函数
const LineConfigurationUpdatePLCTemplate = (params) => {
  const { tableInputData, formDataSource, formData } = params;
  const newFormData = JSON.parse(JSON.stringify(formData));
  const newFormDataSource = JSON.parse(JSON.stringify(formDataSource));
  const datArray = [];
  newFormDataSource.map((v, i) => {
    // debugger;
    // 这个是以前的数据
    const { pitch, speed, width, pqmInfoId } = v;
    if (!pqmInfoId) {
      const newObj = Object.assign(newFormData, v, { combinationNumber: `39413${formData.combinationNumber}` },
                                                    { pitch: tableInputData[i] && tableInputData[i].pitch || 0 },
                                                    { speed: tableInputData[i] && tableInputData[i].speed || 0 },
                                                    { width: tableInputData[i] && tableInputData[i].width || 0 });
      const newDat = JSON.parse(JSON.stringify(newObj));
      delete newDat.editable;
      datArray.push(newDat);
    } else if (tableInputData[i]) {
      if ((pitch != tableInputData[i].pitch) || (speed != tableInputData[i].speed) || (width != tableInputData[i].width)) {
        const newObj = Object.assign(newFormData, v, { combinationNumber: `39413${formData.combinationNumber}` },
                                                      { pitch: tableInputData[i] && tableInputData[i].pitch || 0 },
                                                      { speed: tableInputData[i] && tableInputData[i].speed || 0 },
                                                      { width: tableInputData[i] && tableInputData[i].width || 0 });
        const newDat = JSON.parse(JSON.stringify(newObj));
        delete newDat.editable;
        datArray.push(newDat);
      }
    }
    return null;
  });
  if (datArray.length > 0) {
    return {
      value: JSON.stringify(datArray),
    };
  }
  return false;
};
// PLC 时 提交的回调函数
const submitAddPLCCallBack = params => (
  (dispatch, getState) => {
    const state = getState();
    const { tableName, formName } = params;
    const tableInputData = state.getIn([tableRedecurName, tableName, 'tableInputData']) ? state.getIn([tableRedecurName, tableName, 'tableInputData']).toJS() : '';
    const formDataSource = state.getIn([formReducerName, formName, formDataSourceName]) || '';
    const formData = state.getIn([formReducerName, formName, formDataName]) ? state.getIn([formReducerName, formName, formDataName]).toJS() : '';
    const data = params.dataTemplate ? params.dataTemplate({ tableInputData, formDataSource, formData }) : { ...tableInputData, ...formDataSource };
    if (!data) {
      message.error('没有进行任何的修改!', 5);
      return null;
    }
    const url = params.action;
    const method = params.method || 'POST';
    const filters = params.filters;
    const callback = (response) => {
      const { code } = response;
      if (code === -1) {
        message.error(response.message, 5);
      } else {
        dispatch(LineConfigurationTwoTableTemplate({ formData }));
      }
    };
    Request({
      url,
      method,
      data,
      filters,
      callback,
    });
  }
);
// 表格里面的input 变化时候的回调函数
const onchangeCallFunc = params => (
  () => {
    // debugger;
    const reg = new RegExp(/^[0-9]\d*(\.\d+)?$/);
    const { e } = params;
    const value = e.target.value;
    if (value === '') {
      return true;
    }
    if (!reg.test(value)) {
      message.destroy();
      message.error('只能输入整数!', 5);
      return false;
    }
    return true;
  }
);
// 组合料号 的校验
const onCombinationNumberCallFunc = params => (
  (dispatch) => {
    const { props, e } = params;
    const { formName, name } = props;
    const value = e.target.value;
    if (value.length > 5) {
      message.destroy();
      message.error('字符长度只能是5!', 3);
      return null;
    }
    dispatch(onFormDataSourceChange({
      formName: 'patternForm',
      dataSource: [],
    }));
    dispatch(onFormDataChange({
      formName,
      name,
      value,
    }));
  }
);
// 取消按钮
const submitAddPLCCancelCallBack = params => (
  (dispatch, getState) => {
    const state = getState();
    const { formName } = params;
    const formDataSource = state.getIn([formReducerName, formName, formDataSourceName]) || [];
    const newFormDataSource = JSON.parse(JSON.stringify(formDataSource));
    newFormDataSource.map((v) => {
      Object.assign(v, { editable: false });
      return null;
    });
    dispatch(onFormDataSourceChange({ formName, dataSource: newFormDataSource }));
  }
);
  // 面别下拉默认选项
const selData = [{
  id: 'A',
  name: 'A',
}, {
  id: 'B',
  name: 'B',
}];
// 控制方式下拉默认选项
const selData2 = [{
  id: '1',
  name: 'PLC',
}, {
  id: '2',
  name: 'PC',
}];
  // 表格配置 PC
const columnsTwo = [{
  title: '设备类型',
  key: 'machineType',
  dataIndex: 'machineType',
}, {
  title: '设备型号',
  key: 'model',
  dataIndex: 'model',

}, {
  title: '设备编号',
  key: 'machineNumber',
  dataIndex: 'machineNumber',

}, {
  title: '程式名',
  key: 'paramName',
  dataIndex: 'paramName',
  render: (text, record, index) => {
    const datArray = text ? text.split(',') : [];
    const datNxtArray = text ? text.split(';') : [];
    const dat = [];
    let flag = false;
    if (datArray.length > 1) {
      flag = true;
      datArray.map((v, i) => dat.push({
        id: i,
        value: v,
      }));
    }
    if (datNxtArray.length > 1) {
      flag = true;
      datNxtArray.map((v, i) => {
        // const nxtdatId = v.split(',')[0];
        const nxtdatValue = v.split(':')[1];
        dat.push({
          id: i,
          value: nxtdatValue,
        });
        return null;
      });
    }
    if (flag) {
      return (
        <div className="tableDiv">
          <Select
            name={`paramName${index}`}
            className={'select select2'}
            itemKey="id"
            itemValue="value"
            defaultKey="0"
            data={dat}
          />
        </div>
      );
    }
    return text;
  },
}, {
  title: '编辑',
  key: 'chandle',
  dataIndex: 'chandle',
  render: (text, record) => (
    <ActionBtnContainer
      btnName="修改"
      mode="custom"
      method="POST"
      tableName="SMMCellLibraryManageTable"
      customFunc={addCallBack}
      record={record}
    />
    ),
}];
  // 表格配置 PLC
const columnsThere = [{
  title: '设备类型',
  key: 'machineType',
  dataIndex: 'machineType',
}, {
  title: '设备编号',
  key: 'machineNumber',
  dataIndex: 'machineNumber',
}, {
  title: '宽度',
  key: 'width',
  dataIndex: 'width',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        index={index}
        name="width"
        tableName="LineConfigurationTwoTable2"
        onInputCallFunc={onchangeCallFunc}
        inputInitFunc
      />
    );
  },
}, {
  title: '速度',
  key: 'speed',
  dataIndex: 'speed',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        index={index}
        name="speed"
        tableName="LineConfigurationTwoTable2"
        onInputCallFunc={onchangeCallFunc}
        inputInitFunc
      />
    );
  },
}, {
  title: 'Pitch',
  key: 'pitch',
  dataIndex: 'pitch',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        index={index}
        name="pitch"
        tableName="LineConfigurationTwoTable2"
        onInputCallFunc={onchangeCallFunc}
        inputInitFunc
      />
    );
  },
}];
// 获取线别的datasource
const getLineDataSourceTemplate = (params) => {
  const { rows } = params;
  const dat = [];
  if (rows && rows.length) {
    rows.map((v) => {
      dat.push({
        id: v.line,
        name: v.line,
      });
      return null;
    });
  }
  return dat;
};
// 弹出框消失前的调用
const beforeHideFunc = () => (
  (dispatch, getState) => {
    const state = getState();
    const formData = state.getIn([formReducerName, 'patternForm', formDataName]) ? state.getIn([formReducerName, 'patternForm', formDataName]).toJS() : '';
    Object.keys(formData).forEach((key) => {
      const dat = key.split(',')[0];
      if (dat === 'paramName' || dat === 'nxt' || dat === 'others') {
        delete formData[key];
      }
    });
    const newFormData = Immutable.fromJS({ ...formData });
    dispatch(onUpdateFormData({
      formName: 'patternForm',
      newState: newFormData,
    }));
  }
);
// 轨道 值
const guiSelectData = [{
  key: 0,
  name: 0,
}, {
  key: 1,
  name: 1,
}, {
  key: 2,
  name: 2,
}, {
  key: 3,
  name: 3,
}];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '配方管理',
}, {
  path: '',
  name: '机台参数配置',
}];
const RMPatternConf = () => (
  <div className={'lineConfPatternConf'}>
    <Bread breadMap={breadMap} />
    <Title name="机台参数配置" />
    <Form
      name="patternForm"
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'RMPlabel'}>组合料号:</label>
        <span>39413</span>
        <InputContainer
          type="text"
          name="combinationNumber"
          className={'input'}
          onInputCallFunc={onCombinationNumberCallFunc}
        //  cb={selectCallBack}
        />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="side" className={'label'}>面别</label>
        <span className="select" >
          <Select
            name="side"
            className={'select'}
            itemKey="id"
            itemValue="name"
            data={selData}
            defaultKey="A"
            cb={selectCallBack}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="line" className={'label'}>线别:</label>
        <span className={'select'}>
          <Select
            name="line"
            itemKey="id"
            itemValue="name"
            load="true"
            action={LineConfigurationLineApi}
            method="GET"
            paramTemplate={() => {}}
            dataSourceTemplate={getLineDataSourceTemplate}
            cb={selectCallBack}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="controlMode" className={'label'}>控制方式:</label>
        <span className={'select'}>
          <Select
            name="controlMode"
            itemKey="id"
            itemValue="name"
            data={selData2}
            cb={selectCallBack}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <ActionBtnContainer
          btnName="查询"
          mode="custom"
          method="POST"
          formName="patternForm"
          customFunc={LineConfigurationTwoTableTemplate}
        />
      </div>
    </Form>
    <DisplayContainer
      name="LineConfigurationTwoTable"
    >
      <FormTable
        name="LineConfigurationTwoTable"
        formName="patternForm"
        isRadio
        nopagination
        isGetDate
        columns={columnsTwo}
      />
    </DisplayContainer>
    <DisplayContainer
      name="LineConfigurationTwoTable2"
    >
      <FormTable
        name="LineConfigurationTwoTable2"
        formName="patternForm"
        nopagination
        columns={columnsThere}
        noRowSelection
        onRowDoubleClick
        isGetDate
      />
      <div>
        <ActionBtnContainer
          btnName="提交"
          method="POST"
          mode="custom"
          action={LineConfigurationUpdatePCorPLCApi}
          tableName="LineConfigurationTwoTable2"
          formName="patternForm"
          dataTemplate={LineConfigurationUpdatePLCTemplate}
          customFunc={submitAddPLCCallBack}
          filters={defaultRequestFilters}
        />
        <ActionBtnContainer
          btnName="取消"
          formName="patternForm"
          mode="custom"
          customFunc={submitAddPLCCancelCallBack}
        />
      </div>
    </DisplayContainer>
    <Modal name="spi" btnName="修改" title="修改" isButton beforeHide={beforeHideFunc} >
      <ShowInputList
        name="程式名称"
        tableName="LineConfigurationTwoTable"
        formName="patternForm"
        inputName="paramName"
      />
      <div className="rmPatternsubmitBtn">
        <ActionBtnContainer
          btnName="提交"
          method="POST"
          mode="custom"
          action={LineConfigurationUpdatePCorPLCApi}
          tableName="LineConfigurationTwoTable"
          formName="patternForm"
          dataTemplate={LineConfigurationUpdatePCTemplate}
          customFunc={submitAddCallBack}
          filters={defaultRequestFilters}
        />
      </div>
    </Modal>
    <Modal name="nxt" btnName="修改" title="修改" isButton beforeHide={beforeHideFunc}>
      <div className="modalStyle nxtModalStyle">
        <Row>
          <label htmlFor="nxt,szJobName" className="nxtLabel">程式文件名</label>
          <InputContainer type="text" name="nxt,szJobName" textarea formName="patternForm" className="nexTextarea" />
        </Row>
        <Row>
          <label htmlFor="nxt,szRevision">程式版本</label>
          <InputContainer type="text" name="nxt,szRevision" formName="patternForm" />
        </Row>
        <Row className={'selectLabel'}>
          <label htmlFor="nxt,nLane">轨道</label>
          <span className={'select'}>
            <Select
              name="nxt,nLane"
              itemKey="key"
              itemValue="name"
              defaultKey="0"
              data={guiSelectData}
              formName="patternForm"
              className={'select'}
            />
          </span>
        </Row>
      </div>
      <div className="rmPatternsubmitBtn">
        <ActionBtnContainer
          btnName="提交"
          method="POST"
          mode="custom"
          action={LineConfigurationUpdatePCorPLCApi}
          tableName="LineConfigurationTwoTable"
          formName="patternForm"
          dataTemplate={LineConfigurationUpdatePCTemplate}
          customFunc={submitAddCallBack}
          filters={defaultRequestFilters}
        />
      </div>
    </Modal>
    <Modal name="others" btnName="修改" title="修改" isButton beforeHide={beforeHideFunc}>
      <div className="othersDiv modalStyle">
        <Row>
          <label htmlFor="others" className="nxtLabel">程式名称</label>
          <InputContainer type="text" name="others" textarea formName="patternForm" className="nexTextarea" />
        </Row>
      </div>
      <div className="rmPatternsubmitBtn">
        <ActionBtnContainer
          btnName="提交"
          method="POST"
          mode="custom"
          action={LineConfigurationUpdatePCorPLCApi}
          tableName="LineConfigurationTwoTable"
          formName="patternForm"
          dataTemplate={LineConfigurationUpdatePCTemplate}
          customFunc={submitAddCallBack}
          filters={defaultRequestFilters}
        />
      </div>
    </Modal>
  </div>
  );

export default RMPatternConf;
