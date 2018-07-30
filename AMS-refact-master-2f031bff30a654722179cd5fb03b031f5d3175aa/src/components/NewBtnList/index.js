import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
// import {showDetail} from '../../containers/NewBtnListContainer';
import './style.less';

const NewBtnList = (props) => {
  console.log(props);
  return (
    <div className="btnStyle">
      <Button
        onClick={(e) => { e.stopPropagation(); props.showDetail(); }}
        type="alertModel"
        name={props.name}
      >
        <span>{props.value}</span>
        <div className={'highBg'} style={{ height: '100%', width: props.ratio}}></div>
        <span>{props.ratio}</span>
      </Button>
    </div> 
  );
};

NewBtnList.defaultProps = {

};
NewBtnList.propTypes = {

};

export default NewBtnList;
