import React from 'react';
import { Modal, Input } from 'antd';
import {
  VALUE,
  COMPARERESULTVISIBLE,
  HANDLENGCLICK,
  HANDLEOKCLICK,
  HANDLECHANGE,
  CLICKLOOKDETAIL,
  ISMOREFLEXA,
  HANDLEANGCLICK,
  HANDLEBNGCLICK,
  MODALASHOW,
  MODALBSHOW,
  HANDLEACHANGE,
  HANDLEBCHANGE,
  HANDLEAOKCLICK,
  HANDLEBOKCLICK,
  INPUTVALUE,
  ISTIP,
  AISTIP,
  BISTIP,
  GROUPING,
} from './props';
import Button from '../../../components/Button';
import CompareResultItem from './CompareResultItem';
import './style.less';

const CompareResult = props => (
  <Modal
    visible={props[COMPARERESULTVISIBLE]}
    title="对比结果"
    footer={null}
    onCancel={props[HANDLENGCLICK]}
  >
    {props[ISMOREFLEXA] ?
      <div>
        <div style={{ display: props[MODALASHOW], paddingBottom: '30px' }}>
          <CompareResultItem
            value={props[VALUE] ? props[VALUE][0] : ''}
            inputValue={props[INPUTVALUE] ? props[INPUTVALUE].A : ''}
            handleNGClick={props[HANDLEANGCLICK]}
            handleOkClick={props[HANDLEAOKCLICK]}
            handleChange={props[HANDLEACHANGE]}
            clickLookDetail={props[CLICKLOOKDETAIL]('A')}
            isTip={props[AISTIP]}
            grouping={props[GROUPING] ? props[GROUPING] : false}
          />
        </div>
        <div style={{ display: props[MODALBSHOW] }}>
          <CompareResultItem
            value={props[VALUE] ? props[VALUE][1] : ''}
            inputValue={props[INPUTVALUE] ? props[INPUTVALUE].B : ''}
            handleNGClick={props[HANDLEBNGCLICK]}
            handleOkClick={props[HANDLEBOKCLICK]}
            handleChange={props[HANDLEBCHANGE]}
            clickLookDetail={props[CLICKLOOKDETAIL]('B')}
            isTip={props[BISTIP]}
            grouping={props[GROUPING] ? props[GROUPING] : false}
          />
        </div>
      </div>
      :
      <CompareResultItem
        value={props[VALUE]}
        inputValue={props[INPUTVALUE] ? props[INPUTVALUE].AB : ''}
        handleNGClick={props[HANDLENGCLICK]}
        handleOkClick={props[HANDLEOKCLICK]}
        handleChange={props[HANDLECHANGE]}
        clickLookDetail={props[CLICKLOOKDETAIL]('AB')}
        isTip={props[ISTIP]}
        grouping={props[GROUPING] ? props[GROUPING] : false}
      />
    }
  </Modal>
);

export default CompareResult;
