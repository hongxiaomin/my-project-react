/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router';
import './style.less';

const Bread = (props) => {
  const { breadMap } = props;
// breadMap.map((v,i)=>{
//   console.log(i);
//   console.log(v);
// })
  return (
    <Breadcrumb style={{ height: '40px', lineHeight: '40px', paddingLeft: '20px', marginBottom: '15px', backgroundColor: '#f9f6f6' }}>
      {
          breadMap.map((v, i) => (
            <Breadcrumb.Item key={i}>
              {
                 v ? (v.path ? (<Link to={v.path}>{v.name}</Link>) : v.name) : ''
              }
            </Breadcrumb.Item>
          ))
      }
    </Breadcrumb>
  );
};
Bread.defaultProps = {

};
Bread.propTypes = {

};

export default Bread;
