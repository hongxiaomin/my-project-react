import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '机种管理',
}, {
  path: '',
  name: '工程参数设定',
}];


const ProjectParamSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="工程参数设定" />
  </div>
);
ProjectParamSetting.defaultProps = {

};
ProjectParamSetting.propTypes = {

};

export default ProjectParamSetting;
