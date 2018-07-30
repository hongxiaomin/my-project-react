import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, Checkbox, Col, Row, Tabs } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import './style.less';
import JigUseManagerStencil from './stenil';
import JigUseManagerScraper from './scraper';
import JigUseManagerPlant from './plant';
import JigUseManagerICT from './ict';
import JigUseManagerKeep from './keep';
import JigUseManagerMainte from './mainte';
import JigUseManagerScrap from './scrap';

// import './style.less';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters
} from '../../constants/Settings';


const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '治工具管理',
}, {
  path: '',
  name: '治具使用管理',
}, {
  path: '',
  name: '治具使用管理',
}];

const TabPane = Tabs.TabPane;

const JigUseManager = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="治具使用管理" />
    <div className={'card-container'}>
      <Tabs type="card">
        <TabPane tab="新增入库" key="1">
          <Row>
            <Tabs defaultActiveKey="1">
              <TabPane tab="钢网" key="1">
                <JigUseManagerStencil />
              </TabPane>
              <TabPane tab="刮刀" key="2">
                <JigUseManagerScraper />
              </TabPane>
              <TabPane tab="套板" key="3">
                <JigUseManagerPlant />
              </TabPane>
              <TabPane tab="ICT" key="4">
                <JigUseManagerICT />
              </TabPane>

            </Tabs>
          </Row>
        </TabPane>
        <TabPane tab="保养" key="2">
          <JigUseManagerKeep />
        </TabPane>
        <TabPane tab="维修" key="3">
          <JigUseManagerMainte />
        </TabPane>
        <TabPane tab="报废" key="4">
          <JigUseManagerScrap />
        </TabPane>
      </Tabs>
    </div>
  </div>
);

JigUseManager.defaultProps = {

};
JigUseManager.propTypes = {

};
export default JigUseManager;
