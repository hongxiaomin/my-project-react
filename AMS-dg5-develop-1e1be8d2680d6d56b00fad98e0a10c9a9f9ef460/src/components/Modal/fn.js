/**
fileName    : index.js
writer      : Chao.Wang
reviewers   : **Input reviewers here**
*/
import { DialogAction, FormAction } from '@delta/common-utils';
import { SHOULDMODALSHOW, SHOULDMODALHIDE, SHOULDMODALSUBMIT, NAME, FORMNAME } from './props';

const { onChange } = DialogAction;
const { onSubmit } = FormAction;

export const onShow = _this => async (tools) => {
  const { trigger, getProps } = tools;
  const ModalName = _this.props[NAME];
  const props4Modal = ModalName ? getProps(ModalName) : null;

  if (_this.props[SHOULDMODALSHOW]) {
    if (await _this.props[SHOULDMODALSHOW]()) {
      trigger(onChange(true, props4Modal));
    }
  } else {
    trigger(onChange(true, props4Modal));
  }
};

export const onHide = _this => async (tools) => {
  const { trigger, getProps } = tools;
  const ModalName = _this.props[NAME];
  const props4Modal = ModalName ? getProps(ModalName) : null;

  if (_this.props[SHOULDMODALHIDE]) {
    if (await _this.props[SHOULDMODALHIDE]()) {
      await trigger(onChange(false, props4Modal));
    }
  } else {
    await trigger(onChange(false, props4Modal));
  }
};

export const onClientClickOK = _this => async (tools) => {
  const { trigger, getProps, getData } = tools;
  const FormName = _this.props[FORMNAME];
  const props4Form = FormName ? getProps(FormName) : null;
  const data4Form = FormName ? getData(FormName).toJS() : null;
  if (_this.props[SHOULDMODALSUBMIT]) {
    if (await _this.props[SHOULDMODALSUBMIT](data4Form, tools)) {
      await trigger(onSubmit(props4Form));
    }
  } else {
    await trigger(onSubmit(props4Form));
  }
};

