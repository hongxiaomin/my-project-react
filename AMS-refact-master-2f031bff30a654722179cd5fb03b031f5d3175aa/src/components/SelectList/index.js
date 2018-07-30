/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../containers/SelectContainer';
import { SERVER_IP_JIG, defaultDataSourceTemplate, defaultRequestFilters, defaultGetParamTemplate } from '../../constants/Settings';
import './style.less';


const JigShelfManagePageApi = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const SelectList = props => (
  <div>
    <div className={'searchCondition'}>
      <label htmlFor="jigTypeCode" className={'label'}>治具类型:</label>
      <span className={'select'}>
        <Select
          name="jigTypeId"
          className={'select'}
          action={JigShelfManagePageApi}
          itemKey="id"
          itemValue="name"
          load="true"
          filters={defaultRequestFilters}
          dataSourceTemplate={defaultDataSourceTemplate}
          onSelectChange={props.onChange}
        />
      </span>
    </div>

  </div>
);
SelectList.defaultProps = {

};
SelectList.propTypes = {

};

export default SelectList;
