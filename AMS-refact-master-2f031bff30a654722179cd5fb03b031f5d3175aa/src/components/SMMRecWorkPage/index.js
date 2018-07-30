/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Title from '../Title';
import Bread from '../Bread';
import SMMRecWorkGRForm from '../SMMRecWorkGRForm';
import SMMRecWorkItemsForm from '../SMMRecWorkItemsForm';
import SMMRecWorkLTTable from '../SMMRecWorkLTTable';
import SMMRecWorkRTTable from '../SMMRecWorkRTTable';
import './style.less';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '原材料管理',
}, {
  path: '',
  name: '原材料作业',
}, {
  path: '',
  name: '收料作业',
},
];
const SMMRecWorkPage = (props) => {
  const { isCreate, onRadioClick, onGRUpdate } = props;
  const GRFormProps = {
    isCreate,
    onRadioClick,
    onGRUpdate,
  };
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="收料作业" />
      <SMMRecWorkGRForm {...GRFormProps} />
      <SMMRecWorkItemsForm />
      <Row gutter={20}>
        <Col span={18}><SMMRecWorkLTTable /></Col>
        <Col span={6}><SMMRecWorkRTTable /></Col>
      </Row>
    </div>
  );
};
SMMRecWorkPage.defaultProps = {

};
SMMRecWorkPage.propTypes = {

};

export default SMMRecWorkPage;
