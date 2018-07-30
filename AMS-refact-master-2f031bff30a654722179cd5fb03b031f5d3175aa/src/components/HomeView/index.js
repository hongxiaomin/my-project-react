/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Row, Col } from 'antd';
import SiderContainer from '../../containers/SiderContainer';
import HeaderContainer from '../../containers/HeaderContainer';


const HomeView = (props) => {
  const { siderWidth, childrenProp } = props;
  return (
    <Row style={{ margin: '0 auto' }}>
      <Row>
        <Col span={24}>
          <HeaderContainer />
        </Col>
      </Row>

      <Row>
        <Col span={siderWidth}><SiderContainer /></Col>
        <Col span={24 - siderWidth}>
          <Row>
            <Col span={24} style={{ padding: '0 10px' }}>{childrenProp}</Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};
export default HomeView;
