/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import './style.less';
import ActionBtn from '../../containers/ActionBtnContainer';
import logo from '../../assets/refresh.png';
import start from '../../assets/start.png';
import success from '../../assets/success.png';
import error from '../../assets/error.png';
import blank from '../../assets/blank.png';
import Warning from '../../assets/Warning.png';
import { Icon } from 'antd';
// CNDG5SMTH1215
const ShowImgAuto = (props) => {
  let stateImgName;
  const { src, status } = props;
  console.log('src', src, 'status', status, 'props', props);

  switch (status) {
    case 1001:
      stateImgName = 'normal';  // 正常
      break;
    case 1002:
      stateImgName = 'abnormal';  // 异常
      break;
    case 1003:
      stateImgName = 'lining';  // 换线中
      break;
    case 1004:
      stateImgName = 'warning'; // 待机
      break;
    case 1005:
      stateImgName = 'offline'; // 暂停
      break;
    case 1006:
      stateImgName = 'disconnect'; // 未连机
      break;
    case 1007:
      stateImgName = 'toBeRepair'; // 维修
      break;
    // case 1008:
    //   stateImgName = 'scrap'; // 报废
    //   break;
    case 1009:
      stateImgName = 'repairing'; // 待料
      break;
    case 1010:
      stateImgName = 'toBeCheck'; // 产出满料
      break;
    case 1011:
      stateImgName = 'scrap'; // 材料低位预警
      break;
    default:stateImgName = 'default';
      break;
  }
  return (
    <div className="ShowImgListDiv">
      <div className="showHeader" />
      <div className="showImgWrap">
        <span className="showIndex">{props.index}</span>
        <span className="showArrows">
          <Icon type="right-circle" />
        </span>
        <span className="showImg">
          <img src={src} onClick="" alt="这是图片" />
        </span>
      </div>


      <div className="ShowImgListTitle">
        <div className="titleDot">
          <span className={stateImgName} />
        </div>

        <div className="title">{props.name}</div>
      </div>

    </div>
  );
};
ShowImgAuto.defaultProps = {

};
ShowImgAuto.propTypes = {

};

export default ShowImgAuto;
