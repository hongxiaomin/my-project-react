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
import CNDG5SMTH1201 from '../../assets/CNDG5SMTH1201.png';
import CNDG5SMTH1202 from '../../assets/CNDG5SMTH1202.png';
import CNDG5SMTH1204 from '../../assets/CNDG5SMTH1204.jpg';
import CNDG5SMTH1206 from '../../assets/CNDG5SMTH1206.jpg';
import CNDG5SMTH1207 from '../../assets/CNDG5SMTH1207.jpg';
import CNDG5SMTH1209 from '../../assets/CNDG5SMTH1209.jpg';
import CNDG5SMTH1211 from '../../assets/CNDG5SMTH1211.jpg';
import CNDG5SMTH1213 from '../../assets/CNDG5SMTH1213.jpg';
import CNDG5SMTH1215 from '../../assets/CNDG5SMTH1215.jpg';
import MPM from '../../assets/MPM.jpg';
import NXT from '../../assets/NXT.jpg';
import SPI from '../../assets/SPI.jpg';
import PostAOI from '../../assets/炉后AOI.jpg';
import PreAOI from '../../assets/炉前AOI.jpg';
import REFLOW from '../../assets/回焊炉.jpg';
// CNDG5SMTH1215
const ShowImg = (props) => {
  let imgName;
  let stateImgName;
  const { name, state, onImgDoubleClick } = props;
  switch (name) {
    case '叠送一体机':
      imgName = CNDG5SMTH1201;
      break;
    case '翻板机':
      imgName = CNDG5SMTH1202;
      break;
    case '印刷机':
      imgName = MPM;
      break;
    case '轨道一':
      imgName = CNDG5SMTH1204;
      break;
    case 'SPI':
      imgName = SPI;
      break;
    case 'SPI分流机':
      imgName = CNDG5SMTH1206;
      break;
    case '前移栽机':
      imgName = CNDG5SMTH1207;
      break;
    case '贴片机':
      imgName = NXT;
      break;
    case '后移栽机':
      imgName = CNDG5SMTH1209;
      break;
    case '炉前AOI':
      imgName = PreAOI;
      break;
    case '炉前暂存机':
      imgName = CNDG5SMTH1211;
      break;
    case '回焊炉':
      imgName = REFLOW;
      break;
    case '炉后暂存机':
      imgName = CNDG5SMTH1213;
      break;
    case '炉后AOI':
      imgName = PostAOI;
      break;
    case '收板机':
      imgName = CNDG5SMTH1215;
      break;
    default:
  }
  switch (state) {
    case 0:
      stateImgName = start;
      break;
    case 1:
      stateImgName = blank;
      break;
    case 2:
      stateImgName = Warning;
      break;
    case 3:
      stateImgName = success;
      break;
    case 4:
      stateImgName = error;
      break;
    default:
      break;
  }
  return (
    <div className="ShowImgListDiv2">
      <p className="ShowImgListTittle">{name}</p>
      <p className="showImg">
        <img src={imgName} onDoubleClick={() => { onImgDoubleClick(name); }} alt="这是图片" />
      </p>
      <p className="showFooter">
        <img className="showFooterOne" src={stateImgName} alt="这是图片" /><img src={stateImgName} alt="这是图片" />
      </p>
      <ActionBtn
        btnName="单个换线"
        mode="LineOneStratChange"
        formName="LineChangeInformationForm"
        arrayOne={props.id}
      />
    </div>
  );
};
ShowImg.defaultProps = {

};
ShowImg.propTypes = {

};

export default ShowImg;
