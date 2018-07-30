import React from 'react';
import { Tabs } from 'antd';
import { PropTypes } from 'prop-types';
import RoutingGraphStationList from './RoutingGraphStationList';
import RoutingGraphRoutingList from './RoutingGraphRoutingList';

const TabPane = Tabs.TabPane;
const RoutingGraphList = props => (
  <div>
    <Tabs type="card">
      <TabPane tab="站别清单" key="1">
        <RoutingGraphStationList data={props.stationListData} />
      </TabPane>
      <TabPane tab="途程清单" key="2">
        <RoutingGraphRoutingList data={props.routingListData} />
      </TabPane>
    </Tabs>
  </div>

);

RoutingGraphList.defaultProps = {

};
RoutingGraphList.propTypes = {
  stationListData: PropTypes.arrayOf(Object),
  routingListData: PropTypes.arrayOf(Object),
};

export default RoutingGraphList;
