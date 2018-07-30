import React from 'react';
import { PropTypes } from 'prop-types';
import '../style.less';

const RoutingGraphStationList = props => (
  <div className="routingList">
    <ul>
      {props.data ? props.data.map((v, i) => (
        <li key={i}>{v.name}</li>
      )) : ''}
    </ul>
  </div>

);

RoutingGraphStationList.defaultProps = {

};
RoutingGraphStationList.propTypes = {
  data: PropTypes.arrayOf(Object),
};

export default RoutingGraphStationList;
