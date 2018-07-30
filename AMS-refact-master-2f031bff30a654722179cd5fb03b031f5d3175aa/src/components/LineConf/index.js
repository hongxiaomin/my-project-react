import React from 'react';
import { message } from 'antd';
import Immutable from 'immutable';
import Form from '../../containers/FormContainer';
import Bread from '../Bread';
import Title from '../Title';
import { defaultRequestFilters, SERVER_IP_LION } from '../../constants/Settings';
import { formReducerName, formDataName, formDataSourceName, UIReducerName } from '../../constants/Config';
import EditableCell from '../../containers/EditableCellContainer';
import { cleartableInputData } from '../../actions/TableAction';
import { onAutoInputOptionChange } from '../../actions/AutoInputAction';
import { onSaveCheckBoxChecked, onFormDataSourceChange, onSaveCheckBoxData } from '../../actions/FormAction';
import { tableRedecurName, defaultInputDataCheck } from '../../constants/TableConfig';
import FormTable from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import CheckBoxGroup from '../../containers/CheckBoxGroupContainer';
import Request from '../../utils/Request';
import AutoInput from '../../containers/AutoInputContainer';
import './style.less';

// 查询线别的接口
const LineConfigurationGetLine = `${SERVER_IP_LION}/dg5/scm/config/line/get`;
// 获取下面复选框列表的接口
const LineConfigurationCallBack = `${SERVER_IP_LION}/dg5/scm/config/checkbox/get`;
// 获取表格数据
const LineConfigurationTableCallBack = `${SERVER_IP_LION}/dg5/scm/config/configByLine/get`;
// 线体配置提交
const LineConfigurationMachineApi = `${SERVER_IP_LION}/dg5/scm/config/configLine`;
// 线体配置 设备编号
const LineConfigurationSelectApi = `${SERVER_IP_LION}/dg5/scm/config/modelByMachineType/get`;

// 检查IP格式的正则表达式
const checkIP = '^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$';
// 检查端口格式的正则表达式。
const checkIPPort = /^([0-9]|[1-9]\d{1}|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
// 复选框的form
const CHECKBOXFORMNAME = 'linform2';
// 查询后的下拉框
const LineConfigurationSelectTemplate = (params) => {
  const { rows } = params;
  const dat = [];
  if (rows && Object.prototype.toString.call(rows) === '[object Array]') {
    rows.map((v) => {
      dat.push(v.line);
      return null;
    });
    return dat;
  }
};
// 获取param
const getParam = line => ({
  condition: [{
    line,
  }],
});
// 获取现有配置 table中的数据
const getTableData = params => (
  (dispatch) => {
    const { line } = params;
    const url = LineConfigurationTableCallBack;
    const method = 'GET';
    const param = getParam(line);
    const filters = defaultRequestFilters;
    const callback = (response) => {
      const dataSource = response && response.rows || [];
      dispatch(onFormDataSourceChange({ formName: 'LineForm', dataSource, response }));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
    });
  }
);
// 处理复选框 返回值的函数
const handleRow = params => (
  (dispatch) => {
    const datArry = [];
    if (params && Object.prototype.toString.call(params) === '[object Array]') {
      params.map((v) => {
        dispatch(onSaveCheckBoxChecked({ formName: CHECKBOXFORMNAME, name: v.machineType, checked: v.checked }));
        if (v.checked) {
          datArry.push(v.machineType);
        }
        return null;
      });
      dispatch(onSaveCheckBoxData({ formName: CHECKBOXFORMNAME, newCheckBoxArry: datArry }));
    }
  }
);
// 获取复选框
const getCheckBox = params => (
  (dispatch) => {
    const { line } = params;
    const url = LineConfigurationCallBack;
    const method = 'GET';
    const param = getParam(line);
    const filters = defaultRequestFilters;
    const callback = (response) => {
      const { code, rows } = response;
      if (code === -1) {
        message.destroy();
        message.error(response.message, 5);
      } else {
        dispatch(handleRow(rows));
        dispatch(onFormDataSourceChange({ formName: CHECKBOXFORMNAME, dataSource: rows, response }));
      }
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
    });
  }
);
// input 输入 校验 正确返回true 错误返回 false
const onchangeCallFunc = params => (
  () => {
    const { e } = params;
    const reg = new RegExp('^[1-9]*$');
    const value = e.target.value;
    if (!reg.test(value)) {
      message.destroy();
      message.error('只能输入正整数!', 3);
      return false;
    }
    return true;
  }
);
// select 初始化的函数
const selectInitFunc = () => (
  (dispatch, getState) => {
    const state = getState();
    const selectProps = state.getIn([UIReducerName, 'line']) ? state.getIn([UIReducerName, 'line']).toJS() : {};
    const { props } = selectProps;
    dispatch(onAutoInputOptionChange('line', props));
  }
);
// select 初始化的回调函数 和 取消配置的回调函数
const selectinitCallBack = () => (
  (dispatch, getState) => {
    const state = getState();
    const formData = state.getIn([formReducerName, 'LineForm', formDataName]) ? state.getIn([formReducerName, 'LineForm', formDataName]).toJS() : '';
    // 获取复选框
    dispatch(getCheckBox(formData));
    // 获取表格的数据
    dispatch(getTableData(formData));
    const dat = Immutable.fromJS({});
    dispatch(cleartableInputData({
      firstName: 'LineConfigurationOneTable',
      secondName: 'tableInputData',
      value: dat,
    }));
  }
);
// 检查排序 是否符合
const checkData = (params) => {
  const { InputNewData, InputList } = params;
  // 表格的数据
  const copyData = JSON.parse(JSON.stringify(InputNewData));
  // form的数据
  const newDat = JSON.parse(JSON.stringify(InputList));
  const newFormArray = [];
  const newTableArray = [];
  const maxFormNum = newDat.length ? newDat[newDat.length - 1].sequence : 0;
  Object.keys(copyData).forEach((key) => {
    if (copyData[key].sequence && copyData[key].sequence !== '') {
      newTableArray.push(Number(copyData[key].sequence));
    }
  });
  newDat.map((v, i) => {
    if (copyData[i] && copyData[i].sequence && copyData[i].sequence !== '') {
      Object.assign(v, { sequence: Number(copyData[i].sequence) });
    }
    newFormArray.push(v.sequence);
    return null;
  });
  const newSet = new Set(newFormArray);
  const lastArray = [...newSet];
  const maxTableNum = newTableArray.length > 0 ? Math.max(...newTableArray) : 0;
  if (maxTableNum > maxFormNum) {
    message.destroy();
    message.error('输入值不能大于总个数!', 3);
    return false;
  }
  if (newDat.length > lastArray.length) {
    message.destroy();
    message.error('排序不能重复!', 3);
    return false;
  }
  return true;
};
// 确认按钮 的 dataTemplete
const configDataCheck = (params) => {
  const { InputNewData, InputList, formData } = params;
  const { line } = formData;
   // 表格的数据
  const tableDataSource = JSON.parse(JSON.stringify(InputNewData));
    // form的数据
  const formDataSource = JSON.parse(JSON.stringify(InputList));
  let flag = false;
  formDataSource.map((v, i) => {
    if (tableDataSource[i]) {
      Object.assign(v, tableDataSource[i], { line });
    }
    Object.keys(v).forEach((key) => {
      if (tableDataSource[i]) {
        Object.assign(v, { machineId: tableDataSource[i].model });
      }
      if (key !== 'id' && key !== 'machineNumber' && key !== 'sequence' && key !== 'ipPort' && key !== 'machineId' && key !== 'line' && key !== 'machineType') {
        delete v[key];
      }
      Object.assign(v, { sequence: Number(v.sequence) });
      if ((!v.ipPort) || (!v.machineNumber) || v.machineId === '-1') {
        message.destroy();
        message.error('IP和端口,设备编号,型号都必须填写!', 3);
        flag = true;
      }
    });
  });
  if (flag) {
    return false;
  }
  if (formDataSource.length > 0) {
    return {
      value: JSON.stringify(formDataSource),
    };
  }
  return {
    value: JSON.stringify([{ line }]),
  };
};
// 检查IP端口是否符合
const checkIPData = (params) => {
  const { InputNewData, InputList } = params;
  const newTableData = JSON.parse(JSON.stringify(InputNewData));
  const newFormDat = JSON.parse(JSON.stringify(InputList));
  const ArrayIPData = [];
  newFormDat.map((v, i) => {
    if (newTableData[i] && newTableData[i].ipPort && newTableData[i].ipPort !== '') {
      ArrayIPData.push(newTableData[i].ipPort);
    }
    return null;
  });
  let IPOrPort = true;
  ArrayIPData.map((v) => {
    const PortisTrue = v.split(':')[1];
    const IPisTrue = v.split(':')[0];
    const checkIPZhe = new RegExp(checkIP);
    const checkIPPortZhe = new RegExp(checkIPPort);
    // 检查是否存在
    if (!PortisTrue || !IPisTrue) {
      IPOrPort = false;
      message.destroy();
      message.error('IP和端口都必须填写!', 3);
      return null;
      // 检查是否正确
    }
    // console.log('checkIPPortZhe.test(PortisTrue)', checkIPPortZhe.test(Number(PortisTrue)));
    if (!checkIPZhe.test(IPisTrue) || !checkIPPortZhe.test(PortisTrue)) {
      IPOrPort = false;
      message.destroy();
      message.error('请正确填写IP和端口!', 3);
    }
    return null;
  });
  return IPOrPort;
};
// 确认配置按钮
const configOkFunc = params => (
  (dispatch, getState) => {
    const { tableName, formName, action, dataTemplete, filters } = params;
    const state = getState();
    const InputNewData = state.getIn([tableRedecurName, tableName, 'tableInputData']) ? state.getIn([tableRedecurName, tableName, 'tableInputData']).toJS() : {};
    const InputList = state.getIn([formReducerName, formName, formDataSourceName]) || [];
    const formData = state.getIn([formReducerName, formName, formDataName]) ? state.getIn([formReducerName, formName, formDataName]).toJS() : {};
    // 检查排序是否符合要求
    const codeisGo = checkData({ InputNewData, InputList });
    // 检查IP端口是否符合要求
    const IPisTrue = checkIPData({ InputNewData, InputList });
    if (codeisGo && IPisTrue) {
      const url = action || '';
      const method = params.method || 'POST';
      const data = dataTemplete ? dataTemplete({ InputNewData, InputList, formData }) : '';
      if (data === false) {
        return null;
      }
      const callback = (response) => {
       // console.log('response', response);
        const { code } = response;
        if (code === -1) {
          message.destroy();
          message.error(response.message, 3);
        } else {
          // 清除数据
          const dat = Immutable.fromJS({});
          dispatch(cleartableInputData({
            firstName: tableName,
            secondName: 'tableInputData',
            value: dat,
          }));
          // 回掉select初始化的函数
          dispatch(selectInitFunc());
          // 回掉函数
          dispatch(selectinitCallBack());
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
  }
);
// 修改中的sele的param
const LineConfigurationSelectparamTemplate = (paramData) => {
  const { machineType } = paramData;
  return {
    condition: [{ machineType }],
  };
};
const oneColumns = [{
  title: '排序',
  key: 'sequence',
  dataIndex: 'sequence',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        index={index}
        name="sequence"
        tableName="LineConfigurationOneTable"
        inputInitFunc
        formName="LineForm"
        onInputCallFunc={onchangeCallFunc}
      />
    );
  },
}, {
  title: '机台类型',
  key: 'machineType',
  dataIndex: 'machineType',
}, {
  title: '控制方式',
  key: 'controlMode',
  dataIndex: 'controlMode',
  render: (text) => {
    let PCOrPLC;
    switch (text) {
      case 1:
      case '1':
        PCOrPLC = 'PC';
        break;
      case 0:
      case '0':
        PCOrPLC = 'PLC';
        break;
      default:
        break;
    }
    return PCOrPLC;
  },
}, {
  title: 'IP:端口',
  key: 'ipPort',
  dataIndex: 'ipPort',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        index={index}
        name="ipPort"
        tableName="LineConfigurationOneTable"
        onInputCallFunc={defaultInputDataCheck}
        formName="LineForm"
        inputInitFunc
      />
    );
  },

}, {
  title: '设备编号',
  key: 'machineNumber',
  dataIndex: 'machineNumber',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        index={index}
        name="machineNumber"
        tableName="LineConfigurationOneTable"
        formName="LineForm"
        onInputCallFunc={defaultInputDataCheck}
        inputInitFunc
      />
    );
  },

}, {
  title: '型号',
  key: 'model',
  dataIndex: 'model',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        index={index}
        name="model"
        tableName="LineConfigurationOneTable"
        formName="LineForm"
        load="true"
        itemKey="machineId"
        itemValue="model"
        param={record}
        action={LineConfigurationSelectApi}
        dataSourceTemplate={params => params && params.rows || []}
        isSelect
        paramTemplate={LineConfigurationSelectparamTemplate}
      //  noDefault
      />
    );
  },

}];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '产线管理',
}, {
  path: '',
  name: '线体管理',
}];


const LineConf = () => (
  <div className="">
    <Bread breadMap={breadMap} />
    <Title name="线体管理" />
    <Form
      name="LineForm"
    >
      <div className={'searchCondition'}>
        <label htmlFor="line" className={'label'}>线别:</label>
        {/* <span className={'select'}>
          <Select
            action={LineConfigurationGetLine}
            itemKey="id"
            itemValue="name"
            load="true"
            name="line"
            showInit
            mode="true"
            cb={selectinitCallBack}
            dataSourceTemplate={LineConfigurationSelectTemplate}
            initCallBack={selectinitCallBack}
          />
        </span> */}
        <div className="outInputdiv">
          <AutoInput
            name="line"
            className={'input'}
            formName="LineForm"
            id="line"
            action={LineConfigurationGetLine}
            dataSourceTemplate={LineConfigurationSelectTemplate}
            cb={selectinitCallBack}
            style={{ width: '180px' }}
            initCallBack={selectinitCallBack}
            showInit
            load
          />
        </div>
      </div>
    </Form>
    <div className="checkBoxGroup">
      <CheckBoxGroup
        formName={CHECKBOXFORMNAME}
        spanCol={4}
        name="asdads"
        value="machineType"
        uid="machineType"
      />
    </div>
    <FormTable
      name="LineConfigurationOneTable"
      columns={oneColumns}
      formName="LineForm"
      nopagination
      noRowSelection
      onRowDoubleClick
    />
    <ActionBtn
      btnName="确认配置"
      mode="custom"
      method="POST"
      action={LineConfigurationMachineApi}
      tableName="LineConfigurationOneTable"
      formName="LineForm"
      customFunc={configOkFunc}
      dataTemplete={configDataCheck}
    />
    <ActionBtn
      btnName="取消配置"
      mode="custom"
      formName="LineForm"
      customFunc={selectinitCallBack}
    />
  </div>
);

export default LineConf;
