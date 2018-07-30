import React from 'react';
import { createAction } from 'redux-actions';
import { ONGROUPSELECTUPDATECONNECT } from '../../constants/ActionTypes';
import { onUpdateChildren } from '../PrivateAction';
import {
  groupSelectMemberType,
  UIReducerName,
  UIPropsName,
  UIConnectName } from '../../constants/Config';
import {
  onSelectOptionChange,
  onSelectClear } from '../../actions/SelectAction';
import { GUID } from '../../utils/Common';

const onGroupSelectUpdateConnect = createAction(ONGROUPSELECTUPDATECONNECT);
const isGroupSelectMember = elem => (
  groupSelectMemberType.some((type) => {
    const elemType = elem.type;
    if (typeof elemType === 'function' && elemType.displayName === type) {
      return true;
    } else if (type === elemType) {
      return true;
    }
    return false;
  })
);
const onNextsClear = id => (
  (dispatch, getState) => {
    const state = getState();
    const selectProps = state.getIn([UIReducerName, id, UIPropsName]);
    const groupid = selectProps.groupid;
    const next = selectProps.next;
    if (next) {
      const connect = state.getIn([UIReducerName, groupid, UIConnectName]);
      const nextId = connect[next];
      const nextProps = state.getIn([UIReducerName, nextId, UIPropsName]);
      dispatch(onSelectClear(nextId, nextProps));
      dispatch(onNextsClear(nextId));
    }
  }
);
const onSelectChange = (id, e) => (
  (dispatch, getState) => {
    const state = getState();
    const selectProps = state.getIn([UIReducerName, id, UIPropsName]);
    const groupid = selectProps.groupid;
    const next = selectProps.next;
    if (next) {
      const connect = state.getIn([UIReducerName, groupid, UIConnectName]);
      const nextId = connect[next];
      const nextProps = state.getIn([UIReducerName, nextId, UIPropsName]);
      const nextPropsWithParams = Object.assign({}, nextProps, { param: e });
      dispatch(onNextsClear(nextId, nextProps));
      dispatch(onSelectOptionChange(nextId, nextPropsWithParams));
    }
  }
);
const onGroupSelectChildrenSubscribe = (groupid, props, connect) => (
  dispatch => (
    React.Children.map(props.children,
      (child) => {
        if (isGroupSelectMember(child)) {
          const id = GUID();
          const dummy = connect;
          dummy[child.props.name] = id;
          return React.cloneElement(child, { id, groupid, onChange: onSelectChange });
        } else if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            children: dispatch(onGroupSelectChildrenSubscribe(groupid, child.props, connect)) });
        }
        return child;
      })
  )
);

export const onGroupSelectInitial = (id, props) => (
  (dispatch) => {
    const connect = { data: [] };
    const children = dispatch(onGroupSelectChildrenSubscribe(id, props, connect));
    dispatch(onUpdateChildren({ id, children }));
    dispatch(onGroupSelectUpdateConnect({ id, connect }));
  }
);
