/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

const ActionBtnShowSureModel = props => (
  <div className="modalBtn">
    <Button type="primary" style={props.style} onClick={props.onClick} >{props.btnName}</Button>
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      {props.message}
    </Modal>
  </div>
  );
ActionBtnShowSureModel.defaultProps = {

};
ActionBtnShowSureModel.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  // visible: PropTypes.boolean,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  onClick: PropTypes.func,
  btnName: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.style),
};

export default ActionBtnShowSureModel;
