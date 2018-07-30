/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm } from 'antd';
import './style.less';

const EditableCellButton = ({
  editable,
  index,
  onTableButtonClick,
  canCelBut,
  record,
}) => (
  <div>
    {
      editable ?
        <span>
          <a onClick={(e) => { e.stopPropagation(); onTableButtonClick(index, record, 'Save'); }}>Save</a>
          <Popconfirm title="Sure to cancel" onConfirm={() => { canCelBut(index, 'Cancel'); }}>
            <a onClick={(e) => { e.stopPropagation(); }}>Cancel</a>
          </Popconfirm>
        </span>
      :
        <a onClick={(e) => { e.stopPropagation(); onTableButtonClick(index); }} >Edit</a>
  }
  </div>
  );
EditableCellButton.defaultProps = {

};
EditableCellButton.propTypes = {
  editable: PropTypes.bool,
  index: PropTypes.number,
  onTableButtonClick: PropTypes.func,
  canCelBut: PropTypes.func,
};

export default EditableCellButton;
