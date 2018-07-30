/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../containers/SelectContainer';
import './style.less';

const TowSelect = ({
  name,
  action,
  itemKey,
  itemValue,
  load,
  formName,
  paramTemplate,
  dataSourceTemplate,
  data,
  disabled,
}) => (
  <div>
    <Select
      name={name}
      formName={formName}
      className={'select'}
      itemKey={itemKey}
      itemValue={itemValue}
      load={load}
      dataSourceTemplate={dataSourceTemplate}
      paramTemplate={paramTemplate || ''}
      action={action}
      param={data}
      disabled={disabled}
    />
  </div>
  );
TowSelect.defaultProps = {

};
TowSelect.propTypes = {

};

export default TowSelect;
