import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import './style.less';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import { defaultPostDataTemplate, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';

const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const ScrapReasonAPI = `${SERVER_IP_JIG}/ams/jig/base/scrap/query/item`;
const ScrapAPI = `${SERVER_IP_JIG}/ams/jig/life/scrap/add`;

const paramTemplate = data => ({
  condition: { jigTypeId: data },
});
const JigUseManagerScrap = props => (
  <FormContainer
    name="JigUseManagerScrapForm"
    action={ScrapAPI}
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
        <label htmlFor="select" className={'label'}>治具类型</label>
        <span className={'select'}>
          <SelectContainer
            name="jigTypeId"
            action={JigTypeAPI}
            itemKey="id"
            itemValue="name"
            load="true"
            next="causeId"
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="causeId" className={'label'}>报废原因</label>
        <span className={'select'}>
          <SelectContainer
            name="causeId"
            action={ScrapReasonAPI}
            itemKey="scid"
            itemValue="scname"
            paramTemplate={paramTemplate}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
    </GroupSelectContainer>
    <div className={'searchCondition'}>
      <label htmlFor="user" className={'label'}>创建者</label>
      <InputContainer type="text" name="user" className={'input'} value="admin" disabled />
    </div>
    <div className={'searchCondition'}>
      <label htmlFor="remark" className={'label'}>备注</label>
      <InputContainer type="text" name="remark" className={'input'} />
    </div>
    <div className={'btnBox'}>
      <input type="submit" value="确定" className={'button'} />
    </div>
  </FormContainer>
);

export default JigUseManagerScrap;
