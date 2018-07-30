import React from 'react';
import { Modal } from 'antd';
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
  INPUTVALUE,
  ISTIP,
  GROUPING,
} from './props';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import './style.less';

const CompareResultItem = props => (
  <div>
    <div className="marginButtom">
      <span className="marginRight">料表名称</span>
      <span className="inputWidth">
        <input
          name="sheetName"
          value={props[INPUTVALUE] ? props[INPUTVALUE] : props[VALUE] ? props[VALUE].bomCommon.bomReportName : 'name'}
          onChange={props[HANDLECHANGE]}
        />
      </span>
    </div>
    <div className="marginButtom">
      <span className="marginRight">对比结果</span><span>{props[VALUE] ? props[VALUE].bomCompareList.length === 0 ? '料号位置对比无误' : '料号位置对比有误' : ''}</span>
    </div>
    <div className="marginButtom" style={{ display: props[ISTIP] }}>
      <span style={{ color: '#ff0000' }}>该料号名字已存在，是否继续保存</span>
    </div>
    <div>
      {props[VALUE] ?
          props[VALUE].bomCompareList.length === 0 ?
              (<div className="row">
                <div className="col-4" />
                <div className="col-4">
                  <Button label="NG" onClientClick={props[HANDLENGCLICK]} />
                </div>
                <div className="col-8" />
                <div className="col-4">
                  <Button label="OK" onClientClick={props[HANDLEOKCLICK]} />
                </div>
                <div className="col-4" />
               </div>)
           : (<div className="row">
             <div className="col-9" />
             <div className="col-6"><Button label="查看详情" onClientClick={props[CLICKLOOKDETAIL]} /></div>
             <div className="col-9" />
           </div>)
           : ''}
    </div>
  </div>
);

export default CompareResultItem;
