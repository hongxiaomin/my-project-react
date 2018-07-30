/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/
import React,{Component} from 'react';
import Bread from '../Bread';
import Iframe from "../Iframe"
import { Row, Col } from 'antd';  

// import React from 'react';
// import PropTypes from 'prop-types';
// import './style.less';
// const PDTPanel = props => (
//   <div></div>
// );
// PDTPanel.defaultProps = {
// };
// PDTPanel.propTypes = {
// };
// export default PDTPanel;

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '生产监控',
}, {
  path: '',
  name: '产线看板',
}];

export default class PDTPanel extends Component{
	state={
		url:"related/smm/html/StorageManagement/product.html"
	}
      render(){
          return ( 
	 <div>
          <Bread breadMap={breadMap} />
		   <Iframe  url={this.state.url} />
	</div>
      )}
};