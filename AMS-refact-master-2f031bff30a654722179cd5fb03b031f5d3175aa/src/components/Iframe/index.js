import React,{Component} from 'react';
import PropTypes from 'prop-types';
const Iframe = props => (
	 <div>
		   <iframe  src={"http://10.120.137.42:8089/dg3old/"+props.url} style={{height:"90%",width:"100%",border:"none" ,margin:"0 -9px"}}></iframe>
	</div>
)
export default Iframe;
