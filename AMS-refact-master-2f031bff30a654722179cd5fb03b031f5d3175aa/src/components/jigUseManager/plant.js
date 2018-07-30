import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import './style.less';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import Select from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';

const mainBoardAPI = `${SERVER_IP_JIG}/ams/jig/setting/mainboard/query/item`;
const subBoardAPI = `${SERVER_IP_JIG}/ams/jig/setting/subboard/query/item`;
const SupplierAPI = `${SERVER_IP_JIG}/ams/jig/setting/supplier/query/item`;
const PlantAPI = `${SERVER_IP_JIG}/ams/jig/life/store/plate/add`;
const defaultPostDataTemplate = (param) => {
  const { ...data } = param;
  // const addData = {
  //   // mainBoard: 'DPS-1050FB B',
  //   // subBoard: 'DC-4056',
  // };
  // const addDataN = { ...data, ...addData };
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  return {
    jigTypeId: 3,
    value: dataStr || [],
  };
};
const setDate = [{
  id: 'A',
  name: 'A',
}, {
  id: 'B',
  name: 'B',
}];
const paramTemplate = data => ({
  condition: [{ column: 'mainBoardId', value: data, opt: '=', relation: 'AND' }],
});
const JigUseManagerPlant = props => (
  <FormContainer
    name="JigUseManagerPlantForm"
    action={PlantAPI}
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
    <GroupSelectContainer name="GroupSelectName">
      <div className={'searchCondition'}>
        <label htmlFor="mainBoard" className={'label'}>主板</label>
        <span className={'select'}>
          <Select
            name="mainBoard"
            action={mainBoardAPI}
            itemKey="id"
            itemValue="mainboardname"
            next="subBoard"
            load="true"
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="subBoard" className={'label'}>小板</label>
        <span className={'select'}>
          <Select
            name="subBoard"
            action={subBoardAPI}
            itemKey="subboardid"
            itemValue="subboardname"
            paramTemplate={paramTemplate}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
    </GroupSelectContainer>
    <div className={'searchCondition'}>
      <label htmlFor="side" className={'label'}>面别</label>
      <span className={'select'}>
        <Select
          itemKey="id"
          itemValue="name"
          name="side"
          data={setDate}
        />
      </span>
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="supplId" className={'label'}>制作厂商</label>
      <span className={'select'}>
        <Select
          action={SupplierAPI}
          itemKey="id"
          itemValue="suppliername"
          load="true"
          dataSourceTemplate={defaultDataSourceTemplate}
          name="supplId"
        />
      </span>
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="createBy" className={'label'}>创建者</label>
      <InputContainer type="text" name="createBy" className={'input'} value="admin" disabled />
    </div>
    <div className={'btnBox'}>
      <input type="submit" value="确定" className={'button'} />
    </div>
  </FormContainer>
);

export default JigUseManagerPlant;
