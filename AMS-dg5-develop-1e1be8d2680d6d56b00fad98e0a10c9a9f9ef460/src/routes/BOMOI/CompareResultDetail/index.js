import React from 'react';
import { Modal, Input, Table } from 'antd';
import {
  VALUE,
  COMPARERESULTDETAILVISIBLE,
  HANDLENGCLICK,
  HANDLEOKCLICK,
  HANDLECHANGE,
  ISMOREFLEXA,
  CLICKDETAILSIDENAME,
  HANDLEAOKCLICK,
  HANDLEBOKCLICK,
  HANDLEACHANGE,
  HANDLEBCHANGE,
  ISTIP,
  AISTIP,
  BISTIP,
  GROUPING,
  INPUTVALUE,
} from './props';
import Button from '../../../components/Button';
import columns from './config';
import CompareResultDetailItem from './CompareResultDetailItem';
import './style.less';

const CompareResultDetail = props => (
  <Modal
    visible={props[COMPARERESULTDETAILVISIBLE]}
    title="对比结果"
    footer={null}
    onCancel={props[HANDLENGCLICK]}
    className="setModalWidth"
  >
    <CompareResultDetailItem
      value={props[CLICKDETAILSIDENAME] === 'A' ?
      (props[VALUE] ? props[VALUE][0] : '') :
      props[CLICKDETAILSIDENAME] === 'B' ?
      (props[VALUE] ? props[VALUE][1] : '') : (props[VALUE] ? props[VALUE] : '')
      }
      handleNGClick={props[HANDLENGCLICK]}
      handleOkClick={
        props[CLICKDETAILSIDENAME] === 'A' ?
      props[HANDLEAOKCLICK] :
      props[CLICKDETAILSIDENAME] === 'B'
      ? props[HANDLEBOKCLICK] : props[HANDLEOKCLICK]
      }
      handleChange={props[CLICKDETAILSIDENAME] === 'A' ?
      props[HANDLEACHANGE] :
      props[CLICKDETAILSIDENAME] === 'B'
      ? props[HANDLEBCHANGE] : props[HANDLECHANGE]}
      isTip={
        props[CLICKDETAILSIDENAME] === 'A' ?
          props[AISTIP] :
          props[CLICKDETAILSIDENAME] === 'B'
            ? props[BISTIP] : props[ISTIP]
      }
      inputValue={
        props[CLICKDETAILSIDENAME] === 'A' ?
          props[INPUTVALUE].A :
          props[CLICKDETAILSIDENAME] === 'B'
            ? props[INPUTVALUE].B : props[INPUTVALUE].AB
        }
      grouping={props[GROUPING]}
    />
  </Modal>
);

export default CompareResultDetail;
