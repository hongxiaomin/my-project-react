import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import {
  defaultRequestFilters,
  SERVER_IP_EQM } from '../../constants/Settings';
import InputContainer from '../../containers/InputContainer';
import FormContainer from '../../containers/FormContainer';
import Select from '../../containers/SelectContainer';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/scrapcause/item`;

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '设备报废',
}, {
  path: '',
  name: '设备报废',
}];
const selData = [
  {
    id: '1',
    name: '使用次数超限',
  }, {
    id: '2',
    name: '故障',
  }, {
    id: '3',
    name: '其他',
  },
];
const EQMDataTemplate = (param) => {
  const { ...data } = param;
  switch(data.scItemName){
    case '1':
    data.scItemName='使用次数超限';
    break;
    case'2':
    data.scItemName='故障';
    break;
    case'3':
    data.scItemName='其他';
    break;
    default:
    break;
  }
  data.createBy = 'admin';
  const dataStr1 = JSON.stringify(data);
  const dataStr = `${dataStr1}`;
  return {
    value: dataStr || {},
  };
};
const EQMScrapMng = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="设备报废" />
    <FormContainer
      name="relationSetForm"
      action={EQMSettingApi}
      method="POST"
      paramTemplate={() => ({})}
      dataTemplate={EQMDataTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="scItemCode" className={'label'}>二维码</label>
        <InputContainer type="text" name="scItemCode" className={'input'} />
      </div>
      <br />
      <div className={'searchCondition'}>
        <label htmlFor="scItemName" className={'label'}>报废原因</label>
        <span className={'select'}>
          <Select
            type="text"
            name="scItemName"
            itemKey="id"
            itemValue="name"
            load="true"
            data={selData}
          />
        </span>
      </div>
      <br />
      <div className={'areaCondition'}>
        <label htmlFor="scItemDesc" className={'label'}>备注</label>
        <InputContainer type="text" name="scItemDesc" className={'textarea'} textarea />
      </div>
      <br />
      <input type="submit" value="提交" className={'button'} style={{ marginLeft: '235px' }} />
    </FormContainer>
  </div>
);
EQMScrapMng.defaultProps = {

};
EQMScrapMng.propTypes = {

};

export default EQMScrapMng;
