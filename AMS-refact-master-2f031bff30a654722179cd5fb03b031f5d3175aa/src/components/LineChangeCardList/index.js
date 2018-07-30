/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import './style.less';
import AOIimg from '../../assets/AOI.png';
import BufferMachine from '../../assets/BufferMachine.png';
import ICTimg from '../../assets/ICT.png';
import NXTimg from '../../assets/NXT.png';
import NoGoodReceiver from '../../assets/NoGoodReceiver.png';
import ReflowFurnace from '../../assets/ReflowFurnace.png';
import ReversalMachine from '../../assets/ReversalMachine.png';
import SolderPasteMachine from '../../assets/SolderPasteMachine.png';
import StackingMachine from '../../assets/StackingMachine.png';
import Trackone from '../../assets/Track1.png';
import Tracktwo from '../../assets/Track2.png';
import TransplantMachine from '../../assets/TransplantMachine.png';
import ActionBtn from '../../containers/ActionBtnContainer';
import { SERVER_IP_LION, defaultGetParamTemplate2, defaultRequestFilters, defaultDataSourceTemplate } from '../../constants/Settings';

const LineChangeCardListApi = `${SERVER_IP_LION}/ams/dg3/smt/scm/monitoring/reDownload`;
const LineChangeCardList = ({
  productionPlanQuantity,
  productionQuantity,
  patterName,
  machineName,
  machineNameType,
  downPatternToMachineStatus,
  downPatternToLocalStatus,
  formName,
  index,
}) => {
  let imgName;
  switch (machineNameType) {
    case '叠送一体机':
      imgName = StackingMachine;
      break;
    case '不良品收扳机':
      imgName = NoGoodReceiver;
      break;
    case '翻板机':
      imgName = ReversalMachine;
      break;
    case '轨道1':
      imgName = Trackone;
      break;
    case '轨道2':
      imgName = Tracktwo;
      break;
    case '缓冲机':
      imgName = BufferMachine;
      break;
    case '回焊炉':
      imgName = ReflowFurnace;
      break;
    case '贴片机':
      imgName = NXTimg;
      break;
    case '锡膏机':
      imgName = SolderPasteMachine;
      break;
    case '移载机':
      imgName = TransplantMachine;
      break;
    case 'AOI':
      imgName = AOIimg;
      break;
    case 'NXT':
      imgName = NXTimg;
      break;
    case 'ICT':
      imgName = ICTimg;
      break;
    default:
  }
  let downPatternToMachineStatusData;
  // 换线状态
  switch (downPatternToMachineStatus) {
    case '1 ':
      downPatternToMachineStatusData = <Progress className={'LineChangeCard'} percent={100} />;
      break;
    case '0 ':
      downPatternToMachineStatusData = <Progress className={'LineChangeCard'} percent={100} status="exception" />;
      break;
    case '-1':
      downPatternToMachineStatusData = <Progress className={'LineChangeCard'} percent={0} />;
      break;
    default:
  }
  let downPatternToLocalStatusData;
  // 下载
  switch (downPatternToLocalStatus) {
    case '1 ':
      downPatternToLocalStatusData = <Progress className={'LineChangeCard'} percent={100} />;
      break;
    case '0 ':
      downPatternToLocalStatusData = <Progress className={'LineChangeCard'} percent={100} status="exception" />;
      break;
    case '-1':
      downPatternToLocalStatusData = <Progress className={'LineChangeCard'} percent={0} />;
      break;
    default:
  }
  return (
    <div className="LineCard">
      <div className="LineCardimg">
        <p>{machineName}</p>
        <img src={imgName} />
      </div>
      <div className="LinecardList">
        <div>
          <span>实际生产数量/计划生产数量:</span><span>{productionQuantity}/{productionPlanQuantity}</span>
        </div>
        <div>
          <span>程式名称:{patterName}</span>
        </div>
        <div className="LineProgress">
          <div>
            <p>程式下载状态:</p>{downPatternToLocalStatusData}
          </div>
          <div>
            <p>换线状态:</p>{downPatternToMachineStatusData}
          </div>
        </div>
        {
          downPatternToLocalStatus === '0 ' ? (<div className={'lineDiv'}><ActionBtn
            btnName="重新下载"
            mode="loadRefresh"
            action={LineChangeCardListApi}
            filters={defaultRequestFilters}
            formName={formName}
            method="GET"
            paramTemplate={defaultGetParamTemplate2}
            index={index}
          /></div>) : ''
      }
      </div>
    </div>
  );
};
LineChangeCardList.defaultProps = {

};
LineChangeCardList.propTypes = {

};

export default LineChangeCardList;
