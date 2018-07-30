import React from 'react';
import PCBSmallBox from '../PCBLeftSmallBox';
import PCBAPIButton from '../../containers/PCBAPIButtonContainer';
import { SERVER_IP_PCB, defaultDataSourceTemplate } from '../../constants/Settings';

const closeLightAPI = `${SERVER_IP_PCB}/ams/pcb/monitor/light/shutdown`;
const paramTemplate = (param) => {
  const { ...data } = param;
  return {
    value: data ? [data] : [],
  };
};
const freshparamTemplate = (param) => {
  const { ...data } = param;
  return {
    condition: data ? [data] : [],
  };
};
const PCBLeftList = (param) => {
  const { leftArr, mode } = param;
  const shelfTitle = leftArr ? leftArr[0].shelfSerial : '';
  const heightObj = {};
  const leftBoxs = [];
  const closeLightParam = leftArr ? { floor: leftArr[0].floor, shelfSerial: leftArr[0].shelfSerial } : '';
  if (leftArr) {
    leftArr.map((v, i) => {
      if (!heightObj[v.height]) {
        heightObj[v.height] = v.height;
      }
      return null;
    });
    Object.keys(heightObj).forEach((key) => {
      leftArr.map((v, i) => {
        const arr = (
          <PCBSmallBox
            key={i}
            value={v.subshelfSerial || ''}
            lightSerial={v.lightSerial || ''}
            lightStatus={v.lightStatus || ''}
          />);
        if (v.height === heightObj[key]) {
          leftBoxs.push(arr);
        }
        return null;
      });
      const br = (<span className="br" />);
      leftBoxs.push(br);
      return null;
    });
  }
  return (
    <div>
      {
        mode === 'none' ? '' : (
          <div>
            <div className="shelfTitle">
              <span>
                {shelfTitle}
              </span>
              <button className="closeShelf" onClick={() => { param.close(); }}>关闭</button>
            </div>
            <div className="shelf">
              <div className="shelfDetail">
                {leftBoxs}
              </div>
              <div style={{ marginTop: '20px' }}>
                <PCBAPIButton
                  value="关灯"
                  action={closeLightAPI}
                  method="PUT"
                  paramTemplate={paramTemplate}
                  param={closeLightParam}
                  freshparamTemplate={freshparamTemplate}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </div>
            </div>
          </div>)
      }
    </div>
  );
};

export default PCBLeftList;
