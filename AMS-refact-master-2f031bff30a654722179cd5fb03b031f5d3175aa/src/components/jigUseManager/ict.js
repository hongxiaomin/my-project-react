import React from 'react';
import PropTypes from 'prop-types';
import { Select, message } from 'antd';
import './style.less';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import DoubleSelect from '../../containers/DoubleSelectContainer';
import { defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';

const subBoardAPI = `${SERVER_IP_JIG}/ams/jig/setting/subboard/query/item`;
const SupplierAPI = `${SERVER_IP_JIG}/ams/jig/setting/supplier/query/item`;
const ICTAPI = `${SERVER_IP_JIG}/ams/jig/life/store/ict/add`;
const defaultPostDataTemplate = (param) => {
  const { ...data } = param;
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  // const dataStr = [data];
  return {
    mode: 'AddNew',
    jigTypeId: 4,
    value: dataStr || [],
  };
};

const pcbCodeDate = [{
  id: 1,
  name: '1',
}, {
  id: 2,
  name: '2',
}, {
  id: 3,
  name: '3',
}, {
  id: 4,
  name: '4',
}, {
  id: 5,
  name: '5',
}, {
  id: 6,
  name: '6',
}, {
  id: 7,
  name: '7',
}, {
  id: 8,
  name: '8',
}, {
  id: 9,
  name: '9',
}];


const JigUseManagerICT = props => (
  <FormContainer
    name="JigUseManagerICTForm"
    action={ICTAPI}
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
      <label htmlFor="subBoard" className={'label'}>机种</label>
      <span className={'select'}>
        <SelectContainer
          name="subBoard"
          action={subBoardAPI}
          itemKey="subboardname"
          itemValue="subboardname"
          load="true"
          dataSourceTemplate={defaultDataSourceTemplate}
        />
      </span>
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="pcbMaterial" className={'label'}>PCB 料号</label>
      <InputContainer type="text" name="pcbMaterial" className={'input'} />
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="pcbVersion" className={'label'}>PCB 版本</label>
      <InputContainer type="text" name="pcbVersion" className={'input'} />
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="pcbCode" className={'label'}>PCB Code</label>
      <span className={'select'}>
        <DoubleSelect
          itemKey="id"
          itemValue="name"
          name="pcbCode"
          data={pcbCodeDate}
          mode="multiple"
          formName="JigUseManagerICTForm"
        />
      </span>
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="supplId" className={'label'}>制作厂商</label>
      <span className={'select'}>
        <SelectContainer
          action={SupplierAPI}
          itemKey="id"
          itemValue="suppliername"
          load="true"
          dataSourceTemplate={defaultDataSourceTemplate}
          name="supplId"
        />
      </span>
    </div>
    {/* <div className={'searchCondition'}>
      <label htmlFor="useCount" className={'label'}>使用次数</label>
      <InputContainer type="text" name="useCount" className={'input'} />
    </div> */}
    <div className={'searchCondition'}>
      <label htmlFor="createBy" className={'label'}>创建人</label>
      <InputContainer type="text" name="createBy" className={'input'} value="admin" disabled />
    </div>
    <div className={'btnBox'}>
      <input type="submit" value="确定" className={'button'} />
    </div>
  </FormContainer>
);

export default JigUseManagerICT;
