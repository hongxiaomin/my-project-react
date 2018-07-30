import React from 'react';
import PropTypes from 'prop-types';
import { Select, message } from 'antd';
import './style.less';
// import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import DoubleSelect from '../../containers/DoubleSelectContainer';
import { defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';
import { dataHandler } from '../../utils/Request';

const mainBoardAPI = `${SERVER_IP_JIG}/ams/jig/setting/mainboard/query/item`;
const subBoardAPI = `${SERVER_IP_JIG}/ams/jig/setting/subboard/query/item`;
const SupplierAPI = `${SERVER_IP_JIG}/ams/jig/setting/supplier/query/item`;
const StenilAPI = `${SERVER_IP_JIG}/ams/jig/life/store/stencil/add`;
const defaultPostDataTemplate = (param) => {
  const { ...data } = param;
  const data1 = dataHandler(data, defaultRequestFilters);
  const dataStr1 = JSON.stringify(data1);
  const dataStr = `[${dataStr1}]`;
  return {
    jigTypeId: 1,
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
const paramTemplate = data => ({
  condition: [{ column: 'mainBoardId', value: data, opt: '=', relation: 'AND' }],
});
const JigUseManagerStencil = props => (
  <FormContainer
    name="JigUseManagerStencilForm"
    action={StenilAPI}
    method="POST"
    dataTemplate={defaultPostDataTemplate}
    filters={defaultRequestFilters}
    onSubmit={res => (res.message ? res.code === 0 ? message.success(res.message) : message.error(res.message) : '')}
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
          <SelectContainer
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
          <SelectContainer
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
      <label className={'stencilType'}>钢网类型</label>
      <span className={'radioBox'}>
        <label htmlFor="radio1" >钢网</label>
        <InputContainer type="radio" name="stencilType" id="radio1" value="0" NoOnChange />
      </span>
      <span className={'radioBox'}>
        <label htmlFor="radio2" >胶网</label>
        <InputContainer type="radio" name="stencilType" id="radio2" value="1" NoOnChange />
      </span>
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="compositeMaterial" className={'label'}>组合料号</label>
      <InputContainer type="text" name="compositeMaterial" className={'input'} />
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="side" className={'label'}>面别</label>
      <span className={'select'}>
        <SelectContainer
          itemKey="id"
          itemValue="name"
          name="side"
          data={setDate}
        />
      </span>
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="thickness" className={'label'}>钢网厚度</label>
      <InputContainer type="text" name="thickness" className={'input'} />
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="stencilVersion" className={'label'}>钢网版本</label>
      <InputContainer type="text" name="stencilVersion" className={'input'} />
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
          formName="JigUseManagerStencilForm"
        />
      </span>
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="scraperSize" className={'label'}>刮刀尺寸</label>
      <InputContainer type="text" name="scraperSize" className={'input'} />
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="scraperAngle" className={'label'}>刮刀角度</label>
      <InputContainer type="text" name="scraperAngle" className={'input'} />
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="lifeLong" className={'label'}>使用寿命</label>
      <InputContainer type="text" name="lifeLong" className={'input'} />
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="manufactureDate" className={'label'}>制作日期</label>
      <span className={'dateInput'}>
        <DatePickerContainer name="manufactureDate" style={{ outline: 'none' }} />
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
    <div className={'searchCondition'}>
      <label htmlFor="createBy" className={'label'}>创建人</label>
      <InputContainer type="text" name="createBy" className={'input'} value="admin" disabled />
    </div>
    <div className={'btnBox'}>
      <input type="submit" value="确定" className={'button'} />
      {/* <ActionBtn
        btnName="确定"
        method="POST"
        action={StenilAPI}
        paramTemplate={defaultPutParamTemplate}
      /> */}
    </div>

  </FormContainer>
);

export default JigUseManagerStencil;
