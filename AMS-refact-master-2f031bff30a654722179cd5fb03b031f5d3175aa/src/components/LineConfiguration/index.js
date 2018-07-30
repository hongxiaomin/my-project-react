/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Tabs } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import LineConfPatternConf from './PatternConf';
import LineConf from './LineConf';
import ConfSearch from './ConfSearch';
import './style.less';

const TabPane = Tabs.TabPane;

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '智能换线管理',
}, {
  path: '',
  name: '线体配置',
}];


const LineConfiguration = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="线体配置" />
    <Tabs defaultActiveKey="1" type="card">
      <TabPane tab="线体配置" key="1">
        <LineConf />
      </TabPane>
      <TabPane tab="程式配置" key="2">
        <LineConfPatternConf />
      </TabPane>
      <TabPane tab="机台配置" key="3">
        <ConfSearch />
      </TabPane>
    </Tabs>

  </div>
);
LineConfiguration.defaultProps = {

};
LineConfiguration.propTypes = {

};

export default LineConfiguration;
