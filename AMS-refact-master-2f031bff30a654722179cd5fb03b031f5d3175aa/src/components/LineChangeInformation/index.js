/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { message, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import ShowImgList from '../../containers/ShowImgListContainer';
import Form from '../../containers/FormContainer';
import Select from '../../containers/SelectContainer';
import AutoInput from '../../containers/AutoInputContainer';
import InputContainer from '../../containers/InputContainer';
import { onFormDataChange, onFormSubmit } from '../../actions/FormAction';
import Modal from '../../containers/ModalContainer';
// import { formReducerName, formDataName, formDataSourceName } from '../../constants/Config';
import { SERVER_IP_LION, SERVER_IP_DG5, defaultDataSourceTemplate } from '../../constants/Settings';
import ActionBtn from '../../containers/ActionBtnContainer';
import { onModalUpdateProps } from '../../actions/ModalAction';
import { formDataSourceName, formReducerName, formDataName, formPropsName } from '../../constants/Config';
import { onFormDataSourceChange } from '../../actions/InputAction';
import { onSelectOptionsLoaded } from '../../actions/SelectAction';
import { onSaveTime } from '../../actions/UIAction';

import Request from '../../utils/Request';
import './style.less';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '智能换线管理',
}, {
  path: '',
  name: '换线信息监控',
}];

// 开始换线 api
const LineChangeInformationStartApi = `${SERVER_IP_DG5}/api/DataExchange/GetDeviceStatus`;
const LineChangeInformationNextApi = `${SERVER_IP_DG5}/api/DataExchange/SetValues`;
const LineChangeInformationLastApi = `${SERVER_IP_DG5}/api/DataExchange/GetValue`;
const allApi = [LineChangeInformationStartApi, LineChangeInformationNextApi, LineChangeInformationLastApi];

// 获取线别
const LineChangeInformationGetLineApi = `${SERVER_IP_LION}/dg5/scm/config/line/get`;
// 获取组合料号
const LineChangeInformationqueryCriteriaApi = `${SERVER_IP_LION}/scm/monitor/queryCriteria`;
// 查询按钮
const LineChangeInformationApi = `${SERVER_IP_LION}/scm/monitor`;
// 确认提交
const LineConfigurationUpdatePCorPLCApi = `${SERVER_IP_LION}/scm/monitor/configSpi`;

// 查询检测
const LineChangeInformationCheckTemplate = (params) => {
  const { combinationNumber, side, line } = params.jsonData;
  // console.log('params', params);
  let flag = '';
  if (combinationNumber && side && line) {
    flag = true;
  } else {
    message.destroy();
    message.error('三个条件都必须输入!', 3);
    flag = false;
  }
  return flag;
};
// 查询的paramTempalte
const LineChangeInformationTemplate = (params) => {
  const { combinationNumber, side, line } = params;
  return {
    condition: [{
      combinationNumber,
      side,
      line,
    }],
  };
};
// 组合料号获取option函数
const combDatasourceTemplate = (res) => {
  const rows = res.rows || [];
  const datasource = rows.map(item => item.combinationNumber);
  console.log('datasource', datasource);

  return datasource;
};
// 组合料号change时，修改面别和线别
const combChangeCallback = props => (
  (dispatch) => {
    const formData = props.formData;
    const oriProps = props.props;
    const combinationNumber = formData.combinationNumber;
    const url = LineChangeInformationqueryCriteriaApi;
    const method = 'GET';
    const param = {
      condition: [{
        combinationNumber,
      }],
    };
    const callback = (res) => {
      const data = res.rows[0];
      dispatch(onFormDataChange({
        formName: oriProps.formName,
        name: 'side',
        value: data.side,
      }));
      dispatch(onFormDataChange({
        formName: oriProps.formName,
        name: 'line',
        value: data.line,
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
// 查询返回数据的函数
const LineChangeInformationDataSourceTemplate = param => param && param.rows && param.rows.length > 1 ? param.rows : [];
// 开始换线的回调函数
let timer;
let timer2 = '';
const startCallBack = () => (
  (dispatch, getState) => {
    for (let index = 0; index <= timer; index++) {
      clearInterval(index);
    }
    const formData = getState().getIn([formReducerName, 'LineChangeInformationForm', formDataName]) ?
    getState().getIn([formReducerName, 'LineChangeInformationForm', formDataName]).toJS() : [];
    const param = LineChangeInformationTemplate(formData);
    const url = `${SERVER_IP_LION}/scm/monitor`;
    const method = 'GET';
    const callback = (response) => {
      const { code, rows } = response;
      if (code === -1) {
        message.destroy();
        message.error(response.message, 3);
        for (let index = 0; index <= timer; index++) {
          clearInterval(index);
        }
      } else if (rows && rows.length > 1) {
        dispatch(onFormDataSourceChange({ formName: 'LineChangeInformationForm', dataSource: rows, response }));
        rows.map((v) => {
          // 变红了
          if (v.lineStatus === 2 || v.lineStatus === 3) {
            clearInterval(timer);
          }
          return null;
        });
      }
    };
    timer = setInterval(() => {
      Request({
        url,
        method,
        param,
        callback,
      });
    }, 1000);
  }
);
// 显示时间 showTimeFunc
const showTimeFunc = props => (
  (dispatch, getState) => {
    const formData = getState().getIn([formReducerName, props.name, formDataSourceName]) ?
    getState().getIn([formReducerName, props.name, formDataSourceName]) : [];
    const newArray = JSON.parse(JSON.stringify(formData));
    const pqmLineConfigId = newArray[0].pqmLineConfigId;
    for (let index = 0; index <= timer2; index++) {
      clearInterval(timer2);
    }
    const param = {
      condition: [{
        pqmLineConfigId,
      }],
    };
    const url = `${SERVER_IP_LION}/dg5/scm/monitor/time`;
    const method = 'GET';
    const callback = (response) => {
      const { code, rows } = response;
      if (code === -1) {
        message.destroy();
        message.error(response.message, 3);
      } else {
        const { interval, status } = rows;
        const dat = interval < 86400 ? interval : 0;
        dispatch(onSaveTime({
          name: 'aaaaa',
          time: dat,
        }));
        if (status && status === 1) {
          // for (let index = 0; index <= timer2; index++) {
          clearInterval(timer2);
        //  }
        }
      }
    };
    timer2 = setInterval(() => {
      Request({
        url,
        method,
        param,
        callback,
      });
    }, 700);
  }
);
// 开始换线
const callBackFunc = () => (
  (dispatch, getState) => {
    const formData = getState().getIn([formReducerName, 'LineChangeInformationForm', formDataSourceName]) ?
    getState().getIn([formReducerName, 'LineChangeInformationForm', formDataSourceName]) : [];
    const newArray = JSON.parse(JSON.stringify(formData));
    const pqmLineConfigId = newArray[0].pqmLineConfigId;
    const url = `${SERVER_IP_LION}/scm/monitor/auto`;
    const method = 'GET';
    const param = {
      condition: [{
        pqmLineConfigId,
      }],
    };
    const callback = (respone) => {
      const { code } = respone;
      if (code === -1) {
        message.destroy();
        message.error(respone.message, 3);
      }
    };
    Request({
      url,
      method,
      param,
      callback,
    });
  }
);

// form的callBack
const formCallBack = props => (
  (dispatch) => {
    dispatch(startCallBack());
    dispatch(showTimeFunc(props));
  }
);
// 图片双击
const onImgDClick = params => (
  (dispatch, getState) => {
    // console.log('params', params)denu
   // debugger;
    const { props, name } = params;
    const dat = ['model', 'machineType', 'machineNumber'];
    const state = getState();
    let flag = true;
    if (name === 'SPI') {
      const formData = state.getIn([formReducerName, props.formName, formDataSourceName]) || [];
      formData.map((v) => {
      //  console.log('asdadaasdasassda');
        if (v.machineType === name) {
          dat.map((aky) => {
            dispatch(onFormDataChange({
              formName: props.formName,
              name: aky,
              value: v[aky],
            }));
            return null;
          });
          const parameter = v.parameter && JSON.parse(v.parameter.value);
          const paramNameData = parameter && parameter.paramName;
          // const parameterData = v.parameter && JSON.parse(v.parameter.value);
          // paramNameData = parameterData.paramName;
          if (paramNameData) {
            const paramNamedat = [];
            const paramNameArray = paramNameData.split(',');
            const newArray = new Set(paramNameArray);
            const lastArray = [...newArray];
            lastArray.map((v, i) => {
              paramNamedat.push({
                key: v,
                text: v,
              });
              return null;
            });
           // console.log('paramNamedat', paramNamedat);
            dispatch(onSelectOptionsLoaded({
              id: 'paramName2',
              options: paramNamedat }));
          } else {
            message.destroy();
            message.error('请先到机台参数页面配置SPI程式 !', 5);
            flag = false;
            return null;
          }
        }
        return null;
      });
      flag && dispatch(onModalUpdateProps({ modalName: 'nxt', visibleNew: true }));
    }
  }
);
// 确认提交
const submitAddCallBack = params => (
  (dispatch, getState) => {
    // debugger;
    const state = getState();
    const formData = state.getIn([formReducerName, params.formName, formDataSourceName]) || [];
    const formNameProps = state.getIn([formReducerName, params.formName, formPropsName]) || {};
    const dat = state.getIn([formReducerName, params.formName, formDataName]) ? state.getIn([formReducerName, params.formName, formDataName]).toJS() : '';
    const { parameter } = dat;
    // debugger;
    if (!parameter) {
      message.destroy();
      message.error('请选择程式名!', 3);
      return null;
    }
    let id;
    let paramNameData;
    formData.map((v) => {
      if (v.machineType === 'SPI') {
        id = v.id;
        const parameterData = v.parameter && JSON.parse(v.parameter.value);
        paramNameData = parameterData.paramName;
       // const { paramName } = parameter;
      //  const parameter = JSON.parse(v.parameter.value);
      //  const { paramName } = parameter;
      }
      return null;
    });
    const url = params.action;
    const method = params.method || 'POST';
    const data = {
      value: JSON.stringify([{
        id,
        paramName: paramNameData,
        paramConfiged: parameter,
      }]),
    };
    const callback = (respone) => {
      const { code } = respone;
      if (code !== -1) {
        message.destroy();
        message.success(respone.message, 5);
        dispatch(onModalUpdateProps({ modalName: 'nxt', visibleNew: false }));
        setTimeout(() => {
          dispatch(onFormSubmit(formNameProps));
        }, 1000);
      } else {
        message.destroy();
        message.error(respone.message, 3);
      //  debugger;
      }
    };
    Request({
      url,
      method,
      data,
      callback,
    });
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
const LineChangeInformation = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="换线信息监控" add />
    <Form
      name="LineChangeInformationForm"
      action={LineChangeInformationApi}
      paramTemplate={LineChangeInformationTemplate}
      dataSourceTemplate={LineChangeInformationDataSourceTemplate}
      checkTemplate={LineChangeInformationCheckTemplate}
      cb={formCallBack}
    >
      <div className={'searchCondition'}>
        <label htmlFor="line" className={'label'}>线别:</label>
        <span className="select" >
          <Select
            name="line"
            action={LineChangeInformationqueryCriteriaApi}
            itemKey="line"
            itemValue="line"
            paramTemplate={() => ''}
            dataSourceTemplate={defaultDataSourceTemplate}
            load
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="combinationNumber" className={'label'}>组合料号:</label>
        {/* <InputContainer type="text" name="combinationNumber" className={'input'} /> */}
        <div className="outInputdiv">
          <AutoInput
            name="combinationNumber"
            className={'input'}
            formName="LineChangeInformationForm"
            id="combinationNumber"
            action={LineChangeInformationqueryCriteriaApi}
            paramTemplate={() => ''}
            dataSourceTemplate={combDatasourceTemplate}
            cb={combChangeCallback}
            style={{ width: '180px' }}
            load
          />
        </div>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="side" className={'label'}>面别:</label>
        <span className="select" >
          <Select
            name="side"
            className={'select'}
            itemKey="id"
            itemValue="name"
            data={selData}
            load="true"
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </Form>
    <div className="LineChangeInformationStartButn">
      <ActionBtn
        btnName="开始换线"
        mode="custom"
        customFunc={callBackFunc}
        formName="LineChangeInformationForm"
      />
    </div>
    <ShowImgList name="showImgList" formName="LineChangeInformationForm" onDClick={onImgDClick} />
    <Modal name="nxt" btnName="SPI程式配置" title="SPI程式配置" isButton>
      <div className="modalStyle">
        <Row>
          <label htmlFor="machineType">设备类型:</label>
          <InputContainer type="text" name="machineType" formName="LineChangeInformationForm" disabled />
        </Row>
        <Row>
          <label htmlFor="model">設備型號:</label>
          <InputContainer type="text" name="model" formName="LineChangeInformationForm" disabled />
        </Row>
        <Row>
          <label htmlFor="machineNumber">设备编号:</label>
          <InputContainer type="text" name="machineNumber" formName="LineChangeInformationForm" disabled />
        </Row>
        <Row className={'selectLabel'}>
          <label htmlFor="parameter">程式名:</label>
          <span className={'select'}>
            <Select
              name="parameter"
              id="paramName2"
              formName="LineChangeInformationForm"
              className={'select'}
              itemKey="value"
              itemValue="value"
              onClear
            />
          </span>
        </Row>
      </div>
      <div className="rmPatternsubmitBtn">
        <ActionBtn
          btnName="提交"
          method="POST"
          mode="custom"
          action={LineConfigurationUpdatePCorPLCApi}
          formName="LineChangeInformationForm"
          customFunc={submitAddCallBack}
        />
      </div>
    </Modal>
  </div>
  );
LineChangeInformation.defaultProps = {

};
LineChangeInformation.propTypes = {

};

export default LineChangeInformation;
