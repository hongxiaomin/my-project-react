import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import './style.less';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';

const SupplierAPI = `${SERVER_IP_JIG}/ams/jig/setting/supplier/query/item`;
const subBoardAPI = `${SERVER_IP_JIG}/ams/jig/setting/subboard/query/item`;
const ScraperAPI = `${SERVER_IP_JIG}/ams/jig/life/store/scraper/add`;

const defaultPostDataTemplate = (param) => {
  const { ...data } = param;
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  // const dataStr = [data];
  return {
    mode: 'AddNew',
    jigTypeId: 2,
    value: dataStr || [],
  };
};
const JigUseManagerScraper = props => (
  <FormContainer
    name="JigUseManagerScraperForm"
    action={ScraperAPI}
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
      <label htmlFor="select" className={'label'}>机种</label>
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
      <label htmlFor="angle" className={'label'}>角度</label>
      <InputContainer type="text" name="angle" className={'input'} />
    </div>

    <div className={'searchCondition'}>
      <label htmlFor="size" className={'label'}>尺寸</label>
      <InputContainer type="text" name="size" className={'input'} />
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
    </div>
  </FormContainer>
);

export default JigUseManagerScraper;
