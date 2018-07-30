/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import logo from '../../assets/logo.png';
import search from '../../assets/search.png';
import collect from '../../assets/collect.png';
import spot from '../../assets/spot.png';

import './style.less';


const Header = props => (
  <div>

    <div className="headerWrapper">
      <Row>
        <Col span={2}>
          <div className="switchSider">
            <span onClick={props.onHideClick}>
              <i />
              <i />
              <i />
            </span>
          </div>
        </Col>
        <Col span={4}>
          <div className="logoWrap">
            <img src={logo} alt="logo" />
          </div>
        </Col>
        <Col span={4} offset={14} className="imageWrap">
          {/*<Col span={6}> <img src={search} alt="search" /></Col>*/}
          <Col span={20}> <span>Powered By CornerStone</span></Col>
          <Col span={4}> <img src={spot} alt="spot" /></Col>
        </Col>

      </Row>
    </div>
  </div>
);
Header.defaultProps = {

};
Header.propTypes = {
  onHideClick: PropTypes.func,
};

export default Header;
