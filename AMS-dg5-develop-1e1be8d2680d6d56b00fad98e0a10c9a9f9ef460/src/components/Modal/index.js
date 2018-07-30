/**
fileName    : index.js
writer      : Chao.Wang
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Dialog } from '@delta/common-utils';
import Button from '../../components/Button';
import {
  defaultProps,
  propTypes,
  NAME,
  BTNNAME,
  NOBUTTON,
  // CLASSNAME,
} from './props';
import { onShow, onHide, onClientClickOK } from './fn';
import './style.less';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.onHide = onHide(this);
    this.onShow = onShow(this);
    this.onClientClickOK = onClientClickOK(this);
  }
  render() {
    if (this.props[NOBUTTON]) {
      return (
        <Dialog
          {...this.props}
          onClientChange={() => setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
           }, 0)}
        >
          {this.props.children}
        </Dialog>
      );
    }
    return (
      <div name={this.props[NAME]} >
        <Button label={this.props[BTNNAME]} onClientClick={this.onShow} />
        <Dialog
          {...this.props}
          onClientChange={() => setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
           }, 0)}
          onClientClickOK={this.onClientClickOK}
        >
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}
Modal.defaultProps = defaultProps;
Modal.propTypes = propTypes;
export default Modal;
