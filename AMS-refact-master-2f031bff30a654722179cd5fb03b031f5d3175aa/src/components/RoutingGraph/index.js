import React from 'react';
import { Button } from 'antd';
import { PropTypes } from 'prop-types';
import { main, addVertexInit, addVertex, reSize, searchDataFunc } from './RoutingGraph';
import ActionBtn from '../../containers/ActionBtnContainer';
import grid from '../../assets/grid.png';
import './style.less';

const RoutingGraph = (props) => {
  const { stationData, routingData, graphData } = props;
  return (
    <div
      onLoad={main(document.getElementById('graph'), document.getElementById('toolbar'), graphData)}
      style={{ overflow: 'hidden', marginBottom: '10px' }}
    >
      <div
        onLoad={addVertexInit(addVertex, stationData, routingData, document.getElementById('toobarName'), document.getElementById('toolbar'), true)}
        style={{ display: 'inline-block', width: '16%', border: '1px solid #ccc', height: '500px', overflowY: 'scroll' }}
      >
        <div style={{ padding: '8px 4px', borderBottom: '1px solid #eedddd', marginBottom: '10px' }}>
          <input type="text" id="input" style={{ paddingLeft: '2%', width: '68%', height: '24px', border: '1px solid #ddd', borderRadius: '6px 0 0 6px' }} />
          <button onClick={(e) => { searchDataFunc(e); }} style={{ width: '30%', height: '24px', border: '1px solid #ddd', backgroundColor: '#eee', borderRadius: '0 6px 6px 0' }}>Search</button>
        </div>
        <div id="toolBox" onLoad={reSize()}>
          <div
            id="toolbar"
            style={{ position: 'relative', overflow: 'auto', float: 'left', width: '32px' }}
          />
          <div id="toobarName" style={{ float: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
        </div>
      </div>
      <div
        id="graph"
        style={{ display: 'inline-block', border: '1px solid #ccc', height: '500px', overflow: 'auto', marginLeft: '1%', width: '83%', backgroundImage: `url(${grid})` }}
      />
    </div>
  );
};

RoutingGraph.defaultProps = {

};
RoutingGraph.propTypes = {
  stationData: PropTypes.arrayOf(Object),
  routingData: PropTypes.arrayOf(Object),
  // graphData: PropTypes.obj,
};

export default RoutingGraph;
