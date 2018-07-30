import React from 'react';
import { Modal, Input, Table } from 'antd';
import {
  VALUE,
  COMPARERESULTDETAILVISIBLE,
  HANDLENGCLICK,
  HANDLEOKCLICK,
  HANDLECHANGE,
  ISTIP,
  GROUPING,
  INPUTVALUE,
} from './props';
import Button from '../../../components/Button';
import columns from './config';
import './style.less';

const CompareResultDetailItem = props => (
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
    <div style={{ marginBottom: '20px' }}>
      <Table
        columns={columns}
        bordered
        pagination={() => false}
        dataSource={props[VALUE] ? props[VALUE].bomCompareList : []}
      />
    </div>
    <div className="marginButtom" style={{ display: props[ISTIP] }}>
      <span style={{ color: '#ff0000' }}>该料号名字已存在，是否继续保存</span>
    </div>
    <div className="row">
      <div className="col-4" />
      <div className="col-4">
        <Button label="NG" onClientClick={props[HANDLENGCLICK]} />
      </div>
      <div className="col-8" />
      <div className="col-4">
        <Button label="OK" onClientClick={props[HANDLEOKCLICK]} />
      </div>
      <div className="col-4" />
    </div>
  </div>
);

export default CompareResultDetailItem;
