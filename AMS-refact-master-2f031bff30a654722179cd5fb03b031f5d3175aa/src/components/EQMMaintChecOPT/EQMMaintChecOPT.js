import React from 'react';
import { message, Row} from 'antd';
import Modal from '../../containers/ModalContainer';
// import { createAction } from 'redux-actions';
import Bread from '../Bread';
import Title from '../Title';
import Request from '../../utils/Request';
import { showHideModal } from '../../actions/ModalAction';
import { formReducerName, formDataName, formDataSourceName } from '../../constants/Config';
import { onFormSubmit, onFormDataChange, onFormDataSourceChange } from '../../actions/FormAction';
import { clearRowsKeys, updateDataSource } from '../../actions/TableAction';
import { onSelectDisable } from '../../actions/SelectAction';
import { tableRedecurName } from '../../constants/TableConfig';
import FormContainer from '../../containers/FormContainer';
import CheckboxContainer from '../../containers/CheckBoxContainer';
import Input from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import Select from '../../containers/SelectContainer';
import {
  defaultRequestFilters,
  SERVER_IP_EQM,
  dataHandler,
 } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const EQMSettingCheckApi = `${SERVER_IP_EQM}/ams/eqm/ckbm/bom/check`;
const EQMSettingMaintainApi = `${SERVER_IP_EQM}/ams/eqm/ckbm/bom/maintain`;

const EQMSettingAddApi = `${SERVER_IP_EQM}/ams/eqm/ckbm`;
const EQMSettingAddMaintainApi = `${SERVER_IP_EQM}/ams/eqm/maintain`;

const EQMSettingListApi = `${SERVER_IP_EQM}/ams/eqm/ckbm/fqc/list`;
// 上次点解完成情况
const EQMSettingLastSearchApi = `${SERVER_IP_EQM}/ams/eqm/ckbm/prior`;

const EQMMaintChecOPTTable = 'EQMMaintChecOPTTable';
const EQMMaintChecOPTForm = 'EQMMaintChecOPTForm';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '点检及保养',
}, {
  path: '',
  name: '点检保养操作',
}];
const columns = [{
  title: '',
  dataIndex: 'check',
  key: 'check',
  render: (text, record, index) => {
    const { status, id } = record;
    return (
      <CheckboxContainer
        key={index}
        record={record}
        name={`check${index}|${id}`}
        tableName={EQMMaintChecOPTTable}
        formName={EQMMaintChecOPTForm}
        disabled={status === 'Y'}
        initCheckBox
      />);
  },
  width: 50,
}, {
  title: '序号',
  dataIndex: 'name1',
  key: 'name1',
  render: (text, record, index) => index + 1,
  width: 50,
}, {
  title: '设备型号',
  dataIndex: 'eqmModelName',
  key: 'eqmModelName',
  width: 100,
}, {
  title: '项目代码',
  dataIndex: 'ckbmItemCode',
  key: 'ckbmItemCode',
  width: 100,
}, {
  title: '项目描述',
  dataIndex: 'ckbmItemDesc',
  key: 'ckbmItemDesc',
  width: 100,
}, {
  title: '类型',
  dataIndex: 'ckbmType',
  key: 'ckbmType',
  render: (text) => {
    if (text === 1) {
      return '点检';
    } else if (text === 2) {
      return '保养';
    }
    return '';
  },
  width: 100,
}, {
  title: '周期',
  dataIndex: 'ckbmFqcName',
  key: 'ckbmFqcName',
  width: 100,
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: (text) => {
    if (text === 'Y') {
      return '已完成';
    } else if (text === 'N') {
      return '未完成';
    }
    return '';
  },
  width: 100,
}, {
  title: '备注',
  dataIndex: 'remark',
  key: 'remark',
  width: 100,
}];
const showData = [{
  id: '1',
  ckbmType: '点检',
}, {
  id: '2',
  ckbmType: '保养',
}];
const onActionFail = e => (
  () => console.log(e)
);
// 提交DataTemplate
const EQMBomPostDataTemplate = (param) => {
  // const { formdata, defaultDataSource, tableData, arry } = param;
  const { formdata, defaultDataSource, arry, value } = param;
  defaultDataSource.map((v) => {
    arry.map((item) => {
      if (v.id === item) {
        Object.assign(v, { status: 'Y' });
      }
      return null;
    });
    return null;
  });
  const valueData = [];
  defaultDataSource.map((i) => {
    if (!(i.status === 'N' || i.status === 'Y')) {
      Object.assign(i, { status: 'N' });
    }
    valueData.push({ ckbmBomId: i.id, status: i.status });
    return null;
  });
  let data;
  if (formdata && formdata.ckbmType === '1') {
    data = {
      eqpId: defaultDataSource[0].eqpId,
      createBy: defaultDataSource[0].createBy,
      ckbmDtlList: valueData,
    };
  } else {
    data = {
      eqpId: defaultDataSource[0].eqpId,
      frequencyId: defaultDataSource[0].ckbmFqcId,
      createBy: defaultDataSource[0].createBy,
      maintainDtlList: valueData,
    };
  }
  const obj = { ...value, ...data };
  const dataStr1 = JSON.stringify(obj);
  const dataStr = `${dataStr1}`;
  return {
    value: dataStr || [],
  };
};
// 查询数据ParamTemplate
const EQMParamTemplate = (params) => {
  let data;
  const {
    ...param } = params;
  if (param && param.ckbmType) {
    let data2;
    if (param.ckbmType === '2') {
      data2 = { ckbmFqcId: (param.ckbmFqcId ? param.ckbmFqcId : ''), eqpCode: (param.eqpCode ? param.eqpCode : '')};
      data = dataHandler(data2);
    } else {
      data2 = { eqpCode: (param.eqpCode ? param.eqpCode : '') };
      data = dataHandler(data2);
      if (param && (param.flag === 0 || param.flag === 1)) {
        const value = { flag: param.flag };
        Object.assign(data, value);
      }
    }
  } else {
    data = dataHandler(param);
  }
  const condition = { ...data };
  return { condition };
};
// 点击提交后，刷新表格是的Template
const EQMParamTemplateNew = (params) => {
  let data;
  const {
    ...param } = params;
  if (param && param.ckbmType) {
    let data2;
    if (param.ckbmType === '2') {
      data2 = { ckbmFqcId: (param.ckbmFqcId ? param.ckbmFqcId : ''), eqpCode: (param.eqpCode ? param.eqpCode : '')};
      data = dataHandler(data2);
    } else {
      data2 = { eqpCode: (param.eqpCode ? param.eqpCode : '') };
      data = dataHandler(data2);
      if (param && (param.flag === 0 || param.flag === 1)) {
        const value = { flag: 0 };
        Object.assign(data, value);
      }
    }
  } else {
    data = dataHandler(param);
  }
  const condition = { ...data };
  return { condition };
};
// 弹框的ParamTemplate
const EQMParamTemplate1 = (params) => {
  const {
    ...param } = params;
  const data1 = { eqpCode: param.eqpCode, flag: param.flag };
  const data = dataHandler(data1);
  const condition = { ...data };
  return { condition };
};
// 周期的dataSourceTemplate
const dataSourceTemplate = (param) => {
  const datArry = [];
  const rows = param.rows ? param.rows : param;
  rows.map((v) => {
    datArry.push({ name: v.name, id: v.id });
    return null;
  });
  const codeList = datArry.map(v => ({ key: v.id, keyValue: v.name }));
  return codeList;
};
// 查询的url
const urlTemplate = (param) => {
  let url;
  if (param && param.ckbmType) {
    if (param.ckbmType === '2') {
      url = EQMSettingMaintainApi;
    } else {
      url = EQMSettingLastSearchApi;
      if (param && (param.flag === 0 || param.flag === 1)) {
        url = EQMSettingCheckApi;
      }
    }
    return url;
  }
};
// 提交的url
const urlTemplateSub = (param) => {
  if (param && param.ckbmType) {
    return param.ckbmType === '2' ? EQMSettingAddMaintainApi : EQMSettingAddApi;
  }
};
// 点击提交
const EQMcustomFunc = params => (
  (dispatch, getState) => {
    let url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters ? params.filters : '';
    const formdata = getState().getIn([formReducerName, params.formName, formDataName]) ?
     getState().getIn([formReducerName, params.formName, formDataName]).toJS() : '';
    const tableData = getState().getIn([tableRedecurName, params.tableName, 'selectedRows']) ?
    getState().getIn([tableRedecurName, params.tableName, 'selectedRows']) : '';
    const tableObj = getState().getIn([formReducerName, params.formName, 'CheckedData']) ?
    getState().getIn([formReducerName, params.formName, 'CheckedData']).toJS() : {};
    if (tableData.length === 0) {
      message.error('请至少选择一条数据!', 3);
      return;
    }
    const aida = [];
    Object.keys(tableObj).forEach((key) => {
      if (key !== 'allCheck' && Object.keys(tableObj[key]).length >= 1) {
        aida.push(tableObj[key].id);
      }
    });
    const arry = Array.from(new Set(aida));
    const defaultDataSource =
    getState().getIn([formReducerName, params.formName, formDataSourceName]) ?
    getState().getIn([formReducerName, params.formName, formDataSourceName])
    : '';
    url = params.urlTemplate ? params.urlTemplate(formdata) : url;
    // 增加flag
    const formdataNew = getState().getIn([tableRedecurName, '123', 'dataSource']) ?
    getState().getIn([tableRedecurName, '123', 'dataSource']) : '';
    const flag = formdataNew ? formdataNew[0].isComplete : '';
    const value = { flag };

    const data = params.dataTemplate({ defaultDataSource, formdata, tableData, arry, value });

    const callback = (response) => {
      if (response.code === 1) {
        message.error(response.message, 6);
      } else {
        message.success(response.message, 3);
      }
      dispatch(clearRowsKeys(params.tableName));
      const propsValue = getState().getIn([formReducerName, params.formName, 'props']);
      // 传入flag(判断刷新时用那个url)
      const defaultParam = { defaultParam: { flag } };
      // 去掉onDatasource
      const onDatasource = { onDatasource: false };
      // 刷新表格永远传flag=0;
      const paramTemplate = { paramTemplate: EQMParamTemplateNew };
      const props = { ...propsValue, ...defaultParam, ...onDatasource, ...paramTemplate };
      dispatch(onFormSubmit(props));
    };
    const error = (e) => {
      dispatch(onActionFail(e));
    };
    Request({
      url,
      method,
      data,
      filters,
      callback,
      error,
    });
  }
);
// --------------------------------------------------------------------
// 点击弹框的按钮
const EQMcustomFuncBtn = params => (
  (dispatch, getState) => {
    const url = params.action ? params.action : '';
    const method = params.method ? params.method : 'GET';
    const filters = params.filters;
    const formdata = getState().getIn([formReducerName, params.formName, formDataName]) ?
     getState().getIn([formReducerName, params.formName, formDataName]).toJS() : '';
    const data = params.btnName === '继续' ? { flag: 0 } : { flag: 1 };
    // 存储用户选择的flag
    dispatch(updateDataSource({ dataSource: [{ isComplete: data.flag }], tableName: '123' }));
    Object.assign(formdata, data);
    const param = params.paramTemplate ? params.paramTemplate(formdata) : '';
    const callback = (response) => {
      const props = {
        btnName: 'text',
        name: 'EQMMaintChecOPTModal',
      };
      const dataSource = params.dataSourceTemplate ? params.dataSourceTemplate(response) : response;
      dispatch(onFormDataSourceChange({ formName: params.formName, dataSource, response }));
      dispatch(showHideModal({ ...props, visible: false }));
    };
    const error = (e) => {
      dispatch(onActionFail(e));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
      error,
    });
  }
);
const checkTemplate = (params) => {
  const { jsonData } = params;
  if (!(jsonData.eqpCode && jsonData.ckbmType)) {
    message.error('设备编号与操作类型不能为空', 3);
    return false;
  } else {
    return true;
  }
};
const cbFun = (params) => (
  (dispatch) => {
    const { formData } = params;
    const data = formData ? formData.ckbmType : '';
    if (data === '2') {
      dispatch(onSelectDisable({ id: 'ckbmFqcId', disable: false }));
    } else {
      dispatch(onSelectDisable({ id: 'ckbmFqcId', disable: true }));
      dispatch(onFormDataChange({
        formName: EQMMaintChecOPTForm,
        name: 'ckbmFqcId',
        value: '',
      }));
    }
  }
);
// form 提交后的回调
const formCbFun = params => (
  (dispatch, getState) => {
    // debugger 提交后刷新表格，123中已经存入表格数据，未找到flag，所有停止
    // 取出存储的flag
    const formdata = getState().getIn([tableRedecurName, params.needTableName, 'dataSource']) ?
    getState().getIn([tableRedecurName, params.needTableName, 'dataSource']) : '';
    const flag = formdata ? formdata[0].isComplete : '';
    // 取出要查询的内容
    const imuteData = getState().getIn([formReducerName, params.name, formDataName]);
    const jsonData = imuteData ? imuteData.toJS() : {};
    if (flag === 1) {
      const url = EQMSettingCheckApi;
      const method = params.method;
      const dataValue = { flag };
      Object.assign(jsonData, dataValue);
      const param = params.paramTemplate(jsonData);
      const filters = params.filters;
      const error = (e) => {
        dispatch(onActionFail(e));
      };
      const callback = (response) => {
        const dataSource = params.dataSourceTemplate ? params.dataSourceTemplate(response) : response;
        dispatch(onFormDataSourceChange({ formName: params.name, dataSource, response }));
      };
      Request({
        url,
        method,
        param,
        filters,
        callback,
        error,
      });
    } else if (flag === 0) {
      const props = {
        btnName: 'text',
        name: 'EQMMaintChecOPTModal',
      };
      dispatch(showHideModal({ ...props, visible: true }));
    }
  }
);
const EQMdefaultDataSourceTemplate = (param) => {
  let dataSource;
  if (Object.prototype.toString.call(param) === '[object Object]') {
    dataSource = param.rows ? param.rows : param;
    dataSource.map((v) => {
      if (v.status === 'Y') {
        Object.assign(v, { checked: true });
      }
      return null;
    });
  } else if (Object.prototype.toString.call(param) === '[object Array]') {
    dataSource = param || [];
    const a = {
      editable: false,
    };
    const dataArry = [];
    (dataSource !== []) ? dataSource.map((v) => {
      if (!v.editable) {
        Object.assign(v, a);
      }
      dataArry.push(v);
      return null;
    }) : [];
    dataSource = [...dataArry];
  }
  return dataSource;
};
const EQMMaintChecOPT = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="点检保养操作" />
    <FormContainer
      name={EQMMaintChecOPTForm}
      action={EQMSettingCheckApi}
      method="GET"
      tableName={EQMMaintChecOPTTable}
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={EQMdefaultDataSourceTemplate}
      filters={defaultRequestFilters}
      urlTemplate={urlTemplate}
      checkTemplate={checkTemplate}
      cb={formCbFun}
      needTableName="123"
      noFormTable
      onDatasource
    >
      <div className={'searchCondition'}>
        <label htmlFor="eqpCode" className={'label'}>设备编号</label>
        <Input type="text" name="eqpCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="ckbmType" className={'label'}>操作类型</label>
        <span className={'select'}>
          <Select
            name="ckbmType"
            className={'select'}
            itemKey="id"
            itemValue="ckbmType"
            data={showData}
            load="true"
            defaultKey="1"
            defaultValue="点检"
            cb={cbFun}
            initCallBack={cbFun}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="ckbmFqcId">周期</label>
        <span className={'select'}>
          <Select
            name="ckbmFqcId"
            action={EQMSettingListApi}
            itemKey="key"
            itemValue="keyValue"
            className={'select'}
            noDefault
            id="ckbmFqcId"
            dataSourceTemplate={dataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <input type="submit" value="确定" className={'button'} />
    </FormContainer>
    <TableContainer
      columns={columns}
      formName={EQMMaintChecOPTForm}
      name={EQMMaintChecOPTTable}
      noRowSelection
      nopagination
      isCroll
      crollYnum="730px"
    />
    <Modal
      name="EQMMaintChecOPTModal"
      isButton
      title="提示"
    >
      <div style={{ textAlign: 'right' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>上次点检未完成，是否继续上次未完的点检操作?</h3>
        <ActionBtn
          btnName="继续"
          mode="custom"
          customFunc={EQMcustomFuncBtn}
          tableName={EQMMaintChecOPTTable}
          action={EQMSettingCheckApi}
          filters={defaultRequestFilters}
          formName={EQMMaintChecOPTForm}
          paramTemplate={EQMParamTemplate1}
          dataSourceTemplate={EQMdefaultDataSourceTemplate}
        />
        <ActionBtn
          btnName="取消"
          mode="custom"
          customFunc={EQMcustomFuncBtn}
          tableName={EQMMaintChecOPTTable}
          action={EQMSettingCheckApi}
          filters={defaultRequestFilters}
          formName={EQMMaintChecOPTForm}
          paramTemplate={EQMParamTemplate1}
          dataSourceTemplate={EQMdefaultDataSourceTemplate}
          style={{ color: '#000000', backgroundColor: '#eeeeee', borderColor: '#eeeeee' }}
        />
      </div>
    </Modal>
    <ActionBtn
      btnName="提交"
      method="POST"
      mode="custom"
      customFunc={EQMcustomFunc}
      urlTemplate={urlTemplateSub}
      tableName={EQMMaintChecOPTTable}
      action={EQMSettingAddApi}
      filters={defaultRequestFilters}
      formName={EQMMaintChecOPTForm}
      paramTemplate={() => ({})}
      dataTemplate={EQMBomPostDataTemplate}
    />
  </div>
);
EQMMaintChecOPT.defaultProps = {

};
EQMMaintChecOPT.propTypes = {

};

export default EQMMaintChecOPT;
