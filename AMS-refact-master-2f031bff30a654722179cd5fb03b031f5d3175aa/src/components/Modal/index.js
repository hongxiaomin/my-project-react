/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal as ModalAntd, Button } from 'antd';
import './style.less';

const Modal = props => (
  <div className={'modalBtn'} name={props.name} >
    {props.isButton === true ? '' : <Button type="primary" onClick={props.onShow} >{props.btnName}</Button>}
    <ModalAntd
      title={props.title}
      visible={props.visible}
      onOk={props.onOkClick}
      onCancel={props.onHide}
      footer={null}
      className={props.className}
      key={new Date().getTime()}
    >
      {props.children}
    </ModalAntd>
  </div>
  );
Modal.defaultProps = {

};
Modal.propTypes = {
  name: PropTypes.string.isRequired,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  btnName: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool,
  children: PropTypes.node,
  onOkClick: PropTypes.func,
  className: PropTypes.string,
  isButton: PropTypes.bool,
  key: PropTypes.string,
  // style: PropTypes.objectOf(PropTypes.style),
};

export default Modal;
