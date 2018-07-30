import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { Button, Card, Icon, Checkbox, Col, Row, Tabs } from 'antd';
import './style.less';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultPostDataTemplate, defaultDataSourceTemplate, defaultRequestFilters, SERVER_IP_JIG } from '../../constants/Settings';

const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const OperatorAPI = `${SERVER_IP_JIG}/ams/jig/setting/qcitem/query/item`;
const MainteAPI = `${SERVER_IP_JIG}/ams/jig/life/repair/add`;
const OperatorDate = [{
  id: 0,
  name: '维修开始',
}, {
  id: 1,
  name: '维修结束',
}];
const JigUseManagerMainte = props => (
  <FormContainer
    name="JigUseManagerMainteForm"
    action={MainteAPI}
    method="POST"
    dataTemplate={defaultPostDataTemplate}
    filters={defaultRequestFilters}
    onSubmit={res => (res.message ? message.success(res.message) : '')}
    onError={e => console.log(e)}
  >
    <div className={'searchCondition'}>
      <label htmlFor="jigCode" className={'label'}>二维码</label>
      <InputContainer type="text" name="jigCode" className={'input'} />
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="jigTypeId" className={'label'}>治具类型</label>
      <span className={'select'}>
        <Select
          name="jigTypeId"
          action={JigTypeAPI}
          itemKey="id"
          itemValue="name"
          next="bom_status2"
          load="true"
          dataSourceTemplate={defaultDataSourceTemplate}
        />
      </span>
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="repairType" className={'label'}>操作类型</label>
      <span className={'select'}>
        <Select
          name="repairType"
          itemKey="id"
          itemValue="name"
          load="true"
          data={OperatorDate}
        />
      </span>
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="user" className={'label'}>创建者</label>
      <InputContainer type="text" name="user" className={'input'} value="admin" disabled />
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="input" className={'label'}>描述</label>
      <InputContainer type="text" name="remark" className={'input'} />
    </div>
    <div className={'btnBox'}>
      <input type="submit" value="确定" className={'button'} />
    </div>
  </FormContainer>
);

export default JigUseManagerMainte;
