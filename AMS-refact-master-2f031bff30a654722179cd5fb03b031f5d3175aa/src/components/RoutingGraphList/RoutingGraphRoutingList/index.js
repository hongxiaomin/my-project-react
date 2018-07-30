import React from 'react';
import { PropTypes } from 'prop-types';
import '../style.less';

const RoutingGraphRoutingList = props => (
  <div className="routingList">
    <ul>
      {props.data ? props.data.map((v, i) => (
        <li key={i}>{v.name}</li>
      )) : ''}
    </ul>
  </div>

);

RoutingGraphRoutingList.defaultProps = {

};
RoutingGraphRoutingList.propTypes = {
  data: PropTypes.arrayOf(Object),
};

export default RoutingGraphRoutingList;
