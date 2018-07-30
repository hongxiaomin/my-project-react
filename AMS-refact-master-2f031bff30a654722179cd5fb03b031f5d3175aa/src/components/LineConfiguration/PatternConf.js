/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { message } from 'antd';
import Form from '../../containers/FormContainer';
import Select from '../../containers/SelectContainer';
import { defaultDataSourceTemplate, defaultGetParamTemplate2, defaultRequestFilters, SERVER_IP_LION } from '../../constants/Settings';
import FormTable from '../../containers/TableContainer';
import { onFormDataChange, onFormDataSourceChange } from '../../actions/FormAction';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';
import AutoInput from '../../containers/AutoInputContainer';
import { onAutoInputRequestSuccess } from '../../actions/AutoInputAction';
import Request from '../../utils/Request';
import './style.less';


const LineConfigurationConfigApi = `${SERVER_IP_LION}/dg5/scm/config/patternfile/config/get`;
// 组合料号下拉列表
const LineConfigurationCombNoApi = `${SERVER_IP_LION}/dg5/scm/config/patternfile/combinationnummber/get`;
// 线别下拉列表
const LineConfigurationLineApi = `${SERVER_IP_LION}/dg5/scm/config/line/get`;
// 机种下拉列表
const LineConfigurationModelnameApi = `${SERVER_IP_LION}/dg5/scm/config/patternfile/modelname/get`;

// 修改程式配置
const LineConfigurationUpdateApi = `${SERVER_IP_LION}/dg5/scm/config/patternfile/config`;

// 修改模板
const LineConfigurationUpdateParamTemplate = (param) => {
  const { dataParam } = param;
  const { lineId,
    face,
    combinationNumber,
    modelName,
    description,
    status,
    type,
    width,
    speed,
    pitch,
    acquirePath,
    fileName,
    deviceCode,
    machineId,
    lineConfigId,
    } = dataParam;
  const dat = {
    lineId,
    face,
    combinationNumber,
    modelName,
    description,
    status,
    type,
    width,
    speed,
    pitch,
    acquirePath,
    fileName,
    deviceCode,
    machineId,
    lineConfigId,
  };
  if (!combinationNumber || !modelName) {
    message.error('请填写组合料号和机种!', 3);
    return false;
  }
  Object.keys(dat).forEach((key) => {
    defaultRequestFilters.map((v) => {
      if (dat[key] === v) delete dat[key];
      return null;
    });
  });
  return {
    value: dat ? JSON.stringify([dat]) : '',
  };
};
// 表格编辑的回掉函数
const editableCelBackFunc = params => (
  (dispatch, getState) => {
    const { formData } = { ...params };
    const lineId = formData && formData.lineId ? formData.lineId : '';
    const method = formData.method || 'GET';
    const url = LineConfigurationConfigApi;
    const param = {
      condition: [{ lineId }],
    };
    const filters = defaultRequestFilters;


    const callback = (res) => {
      const dataSource = res && res.rows ? res.rows : [];
      dispatch(onFormDataSourceChange({ formName: 'patternForm', dataSource, response: res }));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
      error: (e) => { console.error(e); },
    });
  }
);
  // 面别下拉默认选项
const selData = [{
  id: '1',
  name: 'A',
}, {
  id: '2',
  name: 'B',
}];

  // 表格配置
const columnsTwo = [{
  title: '机台类型',
  key: 'machineType',
  dataIndex: 'machineType',
}, {
  title: '控制方式',
  key: 'type',
  dataIndex: 'type',
  render: text => !text ? 'PLC' : 'PC', // 0显示为PLC, 程式获取路径/程式名称不可编辑,
                                        // 1显示为PC, 宽度/速度/pitch不可编辑
}, {
  title: '设备编号',
  key: 'deviceCode',
  dataIndex: 'deviceCode',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        index={index}
        name="deviceCode"
        tableName="LineConfigurationTwoTable"
        formName="patternForm"
        init
      />
    );
  },
}, {
  // title: '程式获取路径',
  // key: 'acquirePath',
  // dataIndex: 'acquirePath',
  // render: (text, record, index) => {
  //   // 控制方式type=1时，不可编辑
  //   if (record && record.type === 1) {
  //     const { editable } = record;
  //     return (
  //       <EditableCell
  //         defaultValue={text}
  //         editable={editable}
  //         index={index}
  //         name="acquirePath"
  //         tableName="LineConfigurationTwoTable"
  //         formName="patternForm"
  //         init
  //       />
  //     );
  //   }
  //   return text;
  // },
// }, {
  title: '程式名称',
  key: 'fileName',
  dataIndex: 'fileName',
  render: (text, record, index) => {
    // 控制方式type=1时，不可编辑
    if (record && record.type === 1) {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          index={index}
          name="fileName"
          tableName="LineConfigurationTwoTable"
          formName="patternForm"
          init
        />
      );
    }
    return text;
  },
}, {
  title: '宽度',
  key: 'width',
  dataIndex: 'width',
  render: (text, record, index) => {
    // 控制方式type=0时，不可编辑
    if (record && record.type === 0) {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          index={index}
          name="width"
          tableName="LineConfigurationTwoTable"
          formName="patternForm"
          init
        />
      );
    }
    return text;
  },
}, {
  title: '速度',
  key: 'speed',
  dataIndex: 'speed',
  render: (text, record, index) => {
    // 控制方式type=0时，不可编辑
    if (record && record.type === 0) {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          index={index}
          name="speed"
          tableName="LineConfigurationTwoTable"
          formName="patternForm"
          init
        />
      );
    }
    return text;
  },
}, {
  title: 'Pitch',
  key: 'pitch',
  dataIndex: 'pitch',
  render: (text, record, index) => {
    // 控制方式type=0时，不可编辑
    if (record && record.type === 0) {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          index={index}
          name="pitch"
          tableName="LineConfigurationTwoTable"
          formName="patternForm"
          init
        />
      );
    }
    return text;
  },
}, {
  title: '备注',
  key: 'description',
  dataIndex: 'description',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        index={index}
        name="description"
        tableName="LineConfigurationTwoTable"
        formName="patternForm"
        init
      />
    );
  },
}, {
  title: '编辑',
  key: 'chandle',
  dataIndex: 'chandle',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <div>
        {
          <EditableCellButton
            editable={editable}
            index={index}
            needForName="patternForm"
            tableName="LineConfigurationTwoTable"
            formName="patternForm"
            method="POST"
            record={record}
            cb={editableCelBackFunc}
            filters={defaultRequestFilters}
            dataSourceTemplate={defaultDataSourceTemplate}
            action={LineConfigurationUpdateApi}
            paramTemplate={LineConfigurationUpdateParamTemplate}
          />
        }
      </div>
    );
  },
}];
// select 改变的回掉函数
const selectCallBack = {
  action: LineConfigurationConfigApi,
  formName: 'patternForm',
  paramTemplate: (param) => {
    const { formData } = param;
    const { lineId } = formData;
    return {
      condition: [{ lineId }],
    };
  },
};
    // 线别、面别选中后执行回调函数
const CallBack = params => (
    (dispatch, getState) => {
      const { face, lineId } = params.formData;
      const method = params.method || 'GET';
      const url = [LineConfigurationCombNoApi, LineConfigurationModelnameApi];
      let param = {};
      if (!lineId || lineId == -1) {
        // message.error('线别不能为空');
        return;
      } else if (!face || face == -1) {
        // message.error('面别不能为空');
        return;
      }
        // 组合料号及机种置空
      ['combinationNumber', 'modelName'].map((v) => {
        dispatch(onFormDataChange({
          formName: 'patternForm',
          name: v,
          value: '',
        }));
        return null;
      });

      param = defaultGetParamTemplate2({ face, lineId });

      // param = defaultGetParamTemplate2({ face, lineId });
      const filters = defaultRequestFilters;
      const dataSourceTemplate = (res) => {
        const options = res && res.rows ? res.rows.map(item => item.combinationNumber) : [];
        return options;
      };
      const dataSourceTemplate2 = (res) => {
        const options = res && res.rows ? res.rows.map(item => item.modelName) : [];
        return options;
      };

      // 组合料号参数
      const props = {
        dataSourceTemplate,
        formName: 'patternForm',
        name: 'combinationNumber',
      };
      const id = 'combinationNumber';
      const callback = (response) => {
        dispatch(onAutoInputRequestSuccess(id, props, response));
      };
      Request({
        url: url[0],
        method,
        param,
        filters,
        callback,
        error: (e) => { console.error(e); },
      });

      // 机种查询参数
      const props2 = {
        dataSourceTemplate: dataSourceTemplate2,
        formName: 'patternForm',
        name: 'modelName',
      };
      const id2 = 'modelName';
      const callback2 = (response) => {
        dispatch(onAutoInputRequestSuccess(id2, props2, response));
      };
      Request({
        url: url[1],
        method,
        param,
        filters,
        callback: callback2,
        error: (e) => { console.error(e); },
      });
    }
  );

const LineConfPatternConf = () => (
  <div className="lineConfPatternConf">
    <Form
      name="patternForm"
    >
      <div className={'searchCondition'}>
        <label htmlFor="lineId" className={'label'}>线别:</label>
        <span className={'select'}>
          <Select
            name="lineId"
            action={LineConfigurationLineApi}
            load="true"
            itemKey="id"
            itemValue="name"
            addObject={selectCallBack}
            default
            dataSourceTemplate={res => (res.rows || [])}
            cb={CallBack}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="face" className={'label'}>面别</label>
        <span className="select" >
          <Select
            name="face"
            className={'select'}
            itemKey="id"
            itemValue="name"
            data={selData}
            load="true"
            cb={CallBack}
            defaultKey="1"
          />
        </span>
      </div>
      <div className={'searchCondition autoContent autoContent1'}>
        <label htmlFor="combinationNumber" className={'autoInput_Label'}>组合料号:</label>
        <AutoInput
          className={'autoInput'}
          name="combinationNumber"
          formName="patternForm"
          id="combinationNumber"
        />
      </div>
      {/* <div className={'searchCondition autoContent autoContent2'}>
        <label htmlFor="modelName" className={'autoInput_Label'}>机种:</label>
        <AutoInput
          className={'autoInput'}
          name="modelName"
          formName="patternForm"
          id="modelName"
        />
      </div> */}

      {/* <input type="submit" value="查询" className={'button'} /> */}
    </Form>
    <FormTable
      name="LineConfigurationTwoTable"
      columns={columnsTwo}
      formName="patternForm"
      dataSourceTemplate={res => res}
      noRowSelection
      nopagination
    />
  </div>
);

export default LineConfPatternConf;
