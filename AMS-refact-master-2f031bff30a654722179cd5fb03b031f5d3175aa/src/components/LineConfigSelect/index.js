/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../containers/SelectContainer';
import './style.less';

const LineConfigSelect = ({ data, formName, name }) => (
  <div>
    <Select
      itemKey="text"
      itemValue="text"
      data={data}
      name={name}
      formName={formName}
    />
  </div>
);
LineConfigSelect.defaultProps = {

};
LineConfigSelect.propTypes = {
};

export default LineConfigSelect;
