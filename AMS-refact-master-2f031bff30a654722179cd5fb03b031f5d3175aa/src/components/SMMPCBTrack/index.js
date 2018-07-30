// export { default } from './SMMPCBTrack';
import React,{Component} from 'react';
import Bread from '../Bread';
import Iframe from "../Iframe";

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '原材料管理',
}, {
  path: '',
  name: '仓库管理',
}, {
  path: '',
  name: '报表',
}, {
  path: '',
  name: 'PCB追踪',
}];

export default class SMMPCBTrack extends Component{
	state={
		url:"related/smm/html/StorageManagement/PCB.html"
	}
      render(){
          return ( 
	 <div>  
		 <Bread breadMap={breadMap} />
		 <Iframe  url={this.state.url}/>
	</div>
      )}
};
  