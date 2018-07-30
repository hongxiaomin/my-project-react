/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import FormContainer from '../../containers/FormContainer';
import './style.less';

const ModalForm = props => (
  <FormContainer
    name={props.name}
    action={props.action}
    className={props.className}
    method={props.method}
    body={props.body}
    style={props.style}
    onSubmit={props.hideRefreshModal}
    onError={props.hideModal}
    dataTemplate={props.dataTemplate}
    dataSourceTemplate={props.dataSourceTemplate}
    paramTemplate={props.paramTemplate}
    modalName={props.modalName}
    needForName={props.needForName}
    needTableName={props.needTableName}
    checkTemplate={props.checkTemplate}
    keepDataSource={props.keepDataSource}
    filters={props.filters}
    noFormTable={props.noFormTable}
    tableName={props.tableName}
    getLocalData={props.getLocalData}
  >
    {props.children}
  </FormContainer>
);
ModalForm.defaultProps = {

};
ModalForm.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  method: PropTypes.string,
  needForName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  keepDataSource: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.style),
  hideModal: PropTypes.func,
  hideRefreshModal: PropTypes.func,
  modalName: PropTypes.string,
  dataTemplate: PropTypes.func,
  paramTemplate: PropTypes.func,
  dataSourceTemplate: PropTypes.func,
  checkTemplate: PropTypes.func,
  filters: PropTypes.Array,
  noFormTable: PropTypes.bool,
  needTableName: PropTypes.string,
  body: PropTypes.string,
  tableName: PropTypes.string,
  getLocalData: PropTypes.bool,
};

export default ModalForm;
