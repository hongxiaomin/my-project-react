import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
// import InputContainer from '../../containers/InputContainer';
// import FormContainer from '../../containers/FormContainer';
// import ActionBtn from '../../containers/ActionBtnContainer';
import TableContainer from '../../containers/TableContainer';

import {
    defaultGetParamTemplate,
    defaultRequestFilters,
    defaultDataSourceTemplate,
} from '../../constants/Settings';


const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'Alarm',
}, {
  path: '',
  name: '消息记录',
}];

const columns = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, record, index) => (index + 1),
}, {
  title: '用户',
  dataIndex: 'label_name1',
  key: 'label_name1',
}, {
  title: '消息内容',
  dataIndex: 'label_name2',
  key: 'label_name2',
}, {
  title: '消息处理状态',
  dataIndex: 'label_name3',
  key: 'label_name3',
}, {
  title: '发布时间',
  dataIndex: 'label_name4',
  key: 'label_name4',
}, {
  title: '消息接收时间',
  dataIndex: 'label_name5',
  key: 'label_name5',
}];


const AlarmMsgList = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="消息记录" />
    <TableContainer name="" formName="" columns={columns} />


  </div>
);
AlarmMsgList.defaultProps = {

};
AlarmMsgList.propTypes = {

};

export default AlarmMsgList;
