/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
// import { Input } from 'antd';
import Input from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import './style.less';

const EditableCell = ({
  defaultValue,
  editable,
  isSelect,
  name,
  action,
  itemKey,
  itemValue,
  dataSourceTemplate,
  load,
  formName,
  data,
  init,
  disabledInput,
  onInputCallFunc,
  tableName,
  index,
  inputInitFunc,
  paramTemplate,
  initCallBack,
  cb,
  param,
  noClr,
  noDefault,
  showInit,
}) => (
  <div>
    {
        editable ?
          (isSelect ?
            <Select
              defaultValue={defaultValue ? defaultValue.toString() : ''}
              defaultKey={defaultValue ? defaultValue.toString() : ''}
              name={name}
              formName={formName}
              action={action}
              itemKey={itemKey}
              itemValue={itemValue}
              dataSourceTemplate={dataSourceTemplate}
              paramTemplate={paramTemplate}
              load={load}
              param={param}
              data={data}
              index={index}
              tableName={tableName}
              disabledInput={disabledInput}
              initCallBack={initCallBack}
              cb={cb}
              showInit={showInit}
              noClr={noClr}
              noDefault={noDefault}
            />
            :
            <Input
              className="editInputWidth"
              name={name}
              formName={formName}
              onClick={(e) => { e.stopPropagation(); }}
              type="text"
              value={defaultValue ? defaultValue.toString() : ''}
              Init={init}
              onInputCallFunc={onInputCallFunc}
              tableName={tableName}
              index={index}
              inputInitFunc={inputInitFunc}
              editable={editable}
              noValue
            />
          )
          :
            <div>
              {defaultValue}
            </div>
      }
  </div>
  );


EditableCell.defaultProps = {
  isSelect: '',
};
EditableCell.propTypes = {
  // editable: PropTypes.bool,
  // value: PropTypes.string,
  // defaultValue: PropTypes.string,
  // isSelect: PropTypes.string,
  // load: PropTypes.string,
  // name: PropTypes.string,
  // formName: PropTypes.string,
  // action: PropTypes.string,
  // itemKey: PropTypes.string,
  // itemValue: PropTypes.string,
  // dataSourceTemplate: PropTypes.func,
  // data: PropTypes.array,
};

export default EditableCell;
