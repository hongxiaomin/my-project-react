import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
// import './style.less';


const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '原材料管理',
}, {
  path: '',
  name: '物料管理',
},{
  path: '',
  name: '物料管理',
}];
const SMMMES = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="物料管理" />
  </div>
);
SMMMES.defaultProps = {

};
SMMMES.propTypes = {

};

export default SMMMES;
