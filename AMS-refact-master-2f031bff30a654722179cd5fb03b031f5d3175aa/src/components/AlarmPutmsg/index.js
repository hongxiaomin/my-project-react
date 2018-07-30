import React from 'react';
import { message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import FormContainer from '../../containers/FormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import withImportantStyle from '../../../node_modules/react-with-important-style';
import { onFormDataSourceChange, onFormDataChange } from '../../actions/FormAction';
import { formReducerName, formDataName } from '../../constants/Config';
import { onSelectOptionsLoaded } from '../../actions/SelectAction';
import Request from '../../utils/Request';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_ALARM } from '../../constants/Settings';

const Tagspan = withImportantStyle('span');

const sendSubmit = `${SERVER_IP_ALARM}/ams/alarm/publish`;

const SenddataTemplate = (param) => {
  const params = param;
  if (!(params.userno && params.start_time)) {
    return {
      condition: [param],
    };
  }
  delete params.userno;
  delete params.start_time;
  return {
    condition: [param],
  };
};

const actionBtnFunc = props => (
  (dispatch) => {
    dispatch(onFormDataChange({
      formName: 'PutmsgForm',
      name: 'message',
      value: '',
    }));
  }
);

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'Alarm',
}, {
  path: '',
  name: '发布消息',
}];
const usersel = [{
  id: '0',
  status: '操作员',
}, {
  id: '1',
  status: '车间主任',
}, {
  id: '2',
  status: '厂长',
}];
const themesel = [{
  id: '0',
  status: '进行PCB库房发料预警',
}, {
  id: '1',
  status: '进行小仓库发料预警',
}, {
  id: '2',
  status: '进行小仓库超领预警',
}, {
  id: '3',
  status: '进行Feeder缓存区发料预警',
}, {
  id: '4',
  status: '进行上模组预警',
}, {
  id: '5',
  status: '进行工程师故障预警',
}, {
  id: '6',
  status: '进行操作员故障预警',
}, {
  id: '7',
  status: '进行产线接料预警',
}, {
  id: '8',
  status: '进行线外人员预警',
}, {
  id: '9',
  status: '进行下模组预警',
}, {
  id: '10',
  status: '进行尾数仓入库预警',
}, {
  id: '11',
  status: '进行尾数仓退入主仓库预警',
}, {
  id: '12',
  status: '进行Feeder缓存区入库预警',
}, {
  id: '13',
  status: '进行尾数仓备料预警',
}, {
  id: '14',
  status: '生产管理-实时总达成率预警',
}, {
  id: '15',
  status: '生产管理-实时总点数预警',
}, {
  id: '16',
  status: '生产管理-达成率当日趋势图预警',
}, {
  id: '17',
  status: '生产管理-点数当日趋势图预警',
}, {
  id: '18',
  status: '品质管理-实时总达成率预警',
}, {
  id: '19',
  status: '品质管理-实时抛料率预警',
}, {
  id: '20',
  status: '品质管理-AOI误侧率预警',
}, {
  id: '21',
  status: '设备管理预警-稼动率',
}, {
  id: '22',
  status: '设备管理预警-平均换线时间',
}];
const platformsel = [{
  id: 'android',
  status: 'Android',
}, {
  id: 'ios',
  status: 'IOS',
}, {
  id: 'all',
  status: 'All',
}];
const fromsel = [{
  id: '0',
  status: 'PCB库房',
}, {
  id: '1',
  status: '小仓库备料',
}, {
  id: '2',
  status: 'Feeder缓存区发料',
}, {
  id: '3',
  status: '上模组',
}, {
  id: '4',
  status: '下模组',
}, {
  id: '5',
  status: '尾数仓入库',
}, {
  id: '6',
  status: '尾数仓退入主仓库',
}, {
  id: '7',
  status: '尾数仓备料',
}];
const categorysel = [{
  id: '0',
  status: '预警',
}, {
  id: '1',
  status: '故障',
}];
let gradesel = [];

const getgrade = props => (
  (dispatch) => {
    const fromSource = props.formData;
    const paramItem = fromSource.category ? fromSource.category : '';
    if (paramItem === '0') {
      gradesel = [{
        key: '0',
        text: '一般',
      }, {
        key: '1',
        text: '较紧急',
      }, {
        key: '2',
        text: '很紧急',
      }];
    } else if (paramItem === '1') {
      gradesel = [{
        key: '0',
        text: '一般',
      }, {
        key: '1',
        text: '较严重',
      }, {
        key: '2',
        text: '很严重',
      }];
    }
    dispatch(onSelectOptionsLoaded({
      id: 'gradeId',
      options: gradesel,
    }));
  }
);

const checkTemplate = (param) => {
  const { jsonData } = param;
  if (jsonData.platform === '-1' || jsonData.tag === '-1') {
    message.error('推送平台与主题不能为空', 3);
    return false;
  }
  return true;
};

const Alarmputmsg = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="发布消息" />
    <FormContainer
      name="PutmsgForm"
      action={sendSubmit}
      method="GET"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      dataTemplate={() => ('')}
      checkTemplate={checkTemplate}
      paramTemplate={SenddataTemplate}
      SendFunc
    >
      <div className={'searchCondition'} style={{ marginRight: '20px' }}>
        <label htmlFor="uuid" className={'label'}>角色:</label>
        <span className="select" >
          <SelectContainer
            type="text"
            name="uuid"
            itemKey="id"
            itemValue="status"
            load="true"
            data={usersel}
            // defaultValue="操作员"
            // defaultKey="0"
          />
        </span>
      </div>
      <div className={'searchCondition'} style={{ width: '320px' }}>
        <label htmlFor="time_to_live" className={'label'}>离线消息保留时长(秒)):</label>
        <InputContainer type="text" name="time_to_live" className={'input'} />
      </div>
      <br />
      <div className={'searchCondition'} style={{ marginRight: '44px' }}>
        <label htmlFor="userno" className={'label'}>工号:</label>
        <InputContainer type="text" name="userno" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="expire_time" className={'label'}>过期时间(秒)):</label>
        <InputContainer type="text" name="expire_time" className={'input'} />
      </div>
      <br />
      <div className={'searchCondition'} style={{ marginTop: '12px' }}>
        <label htmlFor="tag" className={'label'}>主题:</label>
        <Tagspan className="select" style={{ width: '250px !important' }}>
          <SelectContainer
            type="text"
            name="tag"
            itemKey="id"
            itemValue="status"
            load="true"
            data={themesel}
          />
        </Tagspan>
        <i style={{ color: '#ff0000', position: 'absolute', left: '380px', top: '2px' }}>*</i>
      </div>
      <br />
      <div className={'searchCondition'} style={{ width: '320px', marginRight: '14px' }}>
        <label htmlFor="start_time" className={'label'} style={{ marginRight: '5px' }}>定时发送:</label>
        <DatePickerContainer name="start_time" style={{ outline: 'none' }} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="title" className={'label'}>标题:</label>
        <InputContainer type="text" name="title" className={'input'} />
      </div>
      <br />
      {/* <GroupSelectContainer name="Msgtypeandlevypeandlevel"> */}
      <div className={'searchCondition'} style={{ marginRight: '44px', marginTop: '10px' }}>
        <label htmlFor="category" className={'label'}>消息类型</label>
        <span className="select" >
          <SelectContainer
            type="text"
            name="category"
            itemKey="id"
            itemValue="status"
            load="true"
            data={categorysel}
              // next="grade"
            cb={getgrade}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="grade" className={'label'}>消息等级</label>
        <span className="select" >
          <SelectContainer
            type="text"
            name="grade"
            itemKey="id"
            itemValue="status"
            // data={gradesel}
            load="true"
            id="gradeId"
          />
        </span>
      </div>
      {/* </GroupSelectContainer> */}
      <br />
      <div className={'searchCondition'} style={{ marginRight: '44px', marginTop: '6px' }}>
        <label htmlFor="platform" className={'label'}>推送平台:</label>
        <span className="select" >
          <SelectContainer
            type="text"
            name="platform"
            itemKey="id"
            itemValue="status"
            load="true"
            data={platformsel}
          />
        </span>
        <i style={{ color: '#ff0000', position: 'absolute', left: '285px', top: '2px' }}>*</i>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="msg_from" className={'label'}>消息来源:</label>
        <span className="select" >
          <SelectContainer
            type="text"
            name="msg_from"
            itemKey="id"
            itemValue="status"
            load="true"
            data={fromsel}
          />
        </span>
      </div>
      <br />
      <div className={'areaCondition'} style={{ marginTop: '15px' }}>
        <label htmlFor="message" className={'label'}>消息内容:</label>
        <InputContainer type="text" name="message" className={'textarea'} textarea />
      </div>
      <input type="submit" value="发送" className={'button'} style={{ top: '40px', position: 'relative', left: '-150px' }} />
      <div style={{ marginLeft: '60px' }}>
        <ActionBtn
          btnName="清除"
          mode="custom"
          formName="PutmsgForm"
          customFunc={actionBtnFunc}
        />
      </div>
    </FormContainer>
  </div>
);
Alarmputmsg.defaultProps = {

};
Alarmputmsg.propTypes = {

};

export default Alarmputmsg;
