import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import './style.less';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import SelectContainer from '../../containers/SelectContainer';
import { defaultPostDataTemplate, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';

const KeepAPI = `${SERVER_IP_JIG}/ams/jig/life/maint/add`;
const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const MainType = `${SERVER_IP_JIG}/ams/jig/base/mainttype/query/item`;

const paramTemplate = data => ({
  condition: { jigTypeId: data },
});
const JigUseManagerKeep = props => (
  <FormContainer
    name="JigUseManagerKeepForm"
    action={KeepAPI}
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
        <label htmlFor="jigTypeId" className={'label'}>治具类型</label>
        <span className={'select'}>
          <SelectContainer
            name="jigTypeId"
            action={JigTypeAPI}
            itemKey="id"
            itemValue="name"
            next="maintItemId"
            load="true"
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="maintItemId" className={'label'}>保养类型</label>
        <span className={'select'}>
          <SelectContainer
            name="maintItemId"
            action={MainType}
            itemKey="mainttypeid"
            itemValue="maintypename"
            dataSourceTemplate={defaultDataSourceTemplate}
            paramTemplate={paramTemplate}
          />
        </span>
      </div>
    </GroupSelectContainer>
    <div className={'searchCondition'}>
      <label htmlFor="createBy" className={'label'}>创建者</label>
      <InputContainer type="text" name="createBy" className={'input'} value="admin" disabled />
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

export default JigUseManagerKeep;
