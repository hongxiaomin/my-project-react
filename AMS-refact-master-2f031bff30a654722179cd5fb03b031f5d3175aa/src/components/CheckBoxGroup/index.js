/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import CheckBox from '../../containers/CheckBoxContainer';
import './style.less';

const CheckBoxGroup = (props) => {
  const { data, spanCol, uid, value, formName } = props;
  // debugger;
  // console.log('data', props);
  const showDate = data ? data.map((v, i) => (
    <Col span={spanCol || 8} key={i} className="checkBox">
      <CheckBox
        name={value ? v[value] : v.value}
        key={i}
        formName={formName}
        value={value ? v[value] : v.value}
        id={uid ? v[uid] : v.id}
      />
    </Col>
  )) : '';
  return (
    <div>
      <Row>
        {showDate}
      </Row>
    </div>
  );
};
CheckBoxGroup.defaultProps = {

};
CheckBoxGroup.propTypes = {

};

export default CheckBoxGroup;
