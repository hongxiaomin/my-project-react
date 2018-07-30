import React from 'react';
import PCBButtonContainer from '../../containers/PCBButtonContainer';
import PCBAPIButton from '../../containers/PCBAPIButtonContainer';
import { SERVER_IP_PCB, defaultDataSourceTemplate } from '../../constants/Settings';

const PCBShelfAPI = `${SERVER_IP_PCB}/ams/pcb/shelf`;
const CloseAllAPI = `${SERVER_IP_PCB}/ams/pcb/monitor/light/shutdown`;
const paramTemplate = (param) => {
  if (param.shelfSerial) {
    return { condition: [{ floor: param.floor, shelfSerial: param.shelfSerial }] };
  } else if (!param.shelfSerial) {
    return { condition: [{ floor: param.floor }] };
  }
  return null;
};
const PCBButtonList = (param) => {
  const { arr } = param;
  const button = arr ? arr.map((v, i) => (<PCBButtonContainer
    key={i}
    value={v.floor || ''}
    action={PCBShelfAPI}
    paramTemplate={paramTemplate}
    dataSourceTemplate={defaultDataSourceTemplate}
    nextAction=""
  />)) : '';
  return (
    <div>
      <PCBAPIButton
        key="q"
        value="全关"
        action={CloseAllAPI}
        method="PUT"
        onClick={() => (param.closeAllClick())}
        closeAll
      />
      { button }
    </div>
  );
};

export default PCBButtonList;
