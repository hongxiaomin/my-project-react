import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  defaultPostDataTemplate,
  SERVER_IP_PCB } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import PCBButtonList from '../../containers/PCBButtonListContainer';
import PCBRightButtonList from '../../containers/PCBRightButtonListContainer';
import PCBLeftList from '../../containers/PCBLeftContentContainer';
import './style.less';

const GetFloorAPI = `${SERVER_IP_PCB}/ams/pcb/shelf`;
const GetSubShelf = `${SERVER_IP_PCB}/ams/pcb/subshelf`;
const paramTemplate = param => ({
  condition: [{ floor: param.floor }],
});
const paramTemplate1 = param => ({
  condition: [{
    floor: param.floor,
    shelfSerial: param.serial,
  }],
});
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'PCB',
}, {
  path: '',
  name: '监控平台',
}, {
  path: '',
  name: '架位监控',
}];
const PCBShelfMonitor = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="架位监控" />
    <div className="topFloor">
      <PCBButtonList
        action={GetFloorAPI}
      />
    </div>
    <div className="content">
      <div className="setCenter">
        <div className="rightContent">
          <PCBRightButtonList
            action={GetFloorAPI}
            dataSourceTemplate={defaultDataSourceTemplate}
            paramTemplate={paramTemplate}
          />
        </div>
        <div className="leftContent">
          <PCBLeftList
            action={GetSubShelf}
            dataSourceTemplate={defaultDataSourceTemplate}
            paramTemplate={paramTemplate1}
          />
        </div>
      </div>
    </div>
  </div>
);
PCBShelfMonitor.defaultProps = {

};
PCBShelfMonitor.propTypes = {

};

export default PCBShelfMonitor;
