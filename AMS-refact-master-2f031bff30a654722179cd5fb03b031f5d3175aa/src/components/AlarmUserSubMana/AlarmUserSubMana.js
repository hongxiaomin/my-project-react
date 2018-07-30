import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import InputContainer from '../../containers/InputContainer';
import FormContainer from '../../containers/FormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
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
    name: '用户订阅管理',
}];

const columns = [{
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '用户名',
    dataIndex: 'label_name1',
    key: 'label_name1',
  },  {
    title: 'uuid',
    dataIndex: 'label_name2',
    key: 'label_name2',
  }, {
    title: '主题',
    dataIndex: 'label_name3',
    key: 'label_name3',
  }, {
    title: '用户角色',
    dataIndex: 'label_name4',
    key: 'label_name4',
  }, {
    title: '订阅状态',
    dataIndex: 'label_name5',
    key: 'label_name5',
  }]



const AlarmUserSubMana = props => (
    <div>
        <Bread breadMap={breadMap} />
        <Title name="用户订阅管理" />

        <FormContainer
            name="PutmsgForm"
            paramTemplate={defaultGetParamTemplate}
            dataSourceTemplate={defaultDataSourceTemplate}
            filters={defaultRequestFilters}
        >
            <div className={'searchCondition'}>
                <label htmlFor="" className={'label'}>用户名</label>
                <InputContainer type="text" name="" className={'input'} />
            </div>
            <div className={'searchCondition'}>
                <label htmlFor="" className={'label'}>主题</label>
                <InputContainer type="text" name="" className={'input'} />
            </div>
            <input type="submit" value="查询" className={'button'} />
        </FormContainer>
        <ActionBtn
            btnName="订阅"
            mode="turnLight"
            action=""
            tableName=""
            formName=""

        />
        <ActionBtn
            btnName="取消订阅"
            mode="turnLight"
            action=""
            tableName=""
            formName=""

        />
        <TableContainer name="" formName="" columns={columns} />


    </div>
);
AlarmUserSubMana.defaultProps = {

};
AlarmUserSubMana.propTypes = {

};

export default AlarmUserSubMana;
