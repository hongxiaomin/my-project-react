import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
const breadMap = [
  {
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
    name: '增加SAP物料清單',
  },
];

const SMMAddWorkOrder = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="增加SAP物料清單" />
    <iframe src="http://dg3smt-server:8082/MONISAP/fileUpload.do" style={{ height: "70%", width: "100%", border: "none", margin: "0 -9px" }}></iframe>
  </div>
);
SMMAddWorkOrder.defaultProps = {

};
SMMAddWorkOrder.propTypes = {

};

export default SMMAddWorkOrder;
