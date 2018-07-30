import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import InputContainer from '../../containers/InputContainer';
import FormContainer from '../../containers/FormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import ActionBtnShowSureModel from '../../containers/ActionBtnShowSureModelContainer';
import TableContainer from '../../containers/TableContainer';
import ModalForm from '../../containers/ModalFormContainer';
import Modal from '../../containers/ModalContainer';

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
    name: '用户主题规则管理',
}];

const columns = [{
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
}, {
    title: '用户主题规则管理',
    dataIndex: 'label_name1',
    key: 'label_name1',
}, {
    title: '主题',
    dataIndex: 'label_name3',
    key: 'label_name3',
}]



const AlarmUserThemeRuleMana = props => (
    <div>
        <Bread breadMap={breadMap} />
        <Title name="用户主题规则管理" />

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
        <Modal name="SupplierAdd" btnName="增加" title="增加" >
            <ModalForm
                name="SupplierAdd"
                action=""
                method="POST"
                dataTemplate=""
                filters={defaultRequestFilters}
                modalName="SupplierAdd"
                formName=""
            >
                <div className={'modalStyle'}>
                    <Row>
                        <label htmlFor="supplierName">供应商名称</label>
                        <InputContainer type="text" name="supplierName" />
                    </Row>
                    <Row>
                        <label htmlFor="supplierCode">供应商代码</label>
                        <InputContainer type="text" name="supplierCode" />
                    </Row>
                    <Row>
                        <label htmlFor="linkman">联系人</label>
                        <InputContainer type="text" name="linkman" />
                    </Row>
                    <Row className={'submitBtn'}>
                        <input type="submit" value="Submit" />
                    </Row>
                </div>
            </ModalForm>
        </Modal>
        <Modal
            name=""
            btnName="修改"
            title="修改"
            formName=""
            tableName=""
            load="true"
            tarKey=""
        >
            <ModalForm
                name=""
                action=""
                method="PUT"
                filters={defaultRequestFilters}
                paramTemplate={() => { }}
                dataTemplate=''
                modalName=""
                formName=""
                tableName=""

            >
                <div className={'modalStyle'}>
                    <Row>
                        <label htmlFor="supplierName">供应商名称</label>
                        <InputContainer type="text" name="supplierName" />
                    </Row>
                    <Row>
                        <label htmlFor="supplierCode">供应商代码</label>
                        <InputContainer type="text" name="supplierCode" />
                    </Row>
                    <Row>
                        <label htmlFor="linkman">联系人</label>
                        <InputContainer type="text" name="linkman" />
                    </Row>
                    <Row className={'submitBtn'}>
                        <input type="submit" value="Submit" />
                    </Row>
                </div>
            </ModalForm>
        </Modal>
        <ActionBtnShowSureModel
            btnName="删除"
            mode="delete"
            action=""
            tableName="RuleNodeSettingTable"
            formName="RuleNodeSettingForm"
            newDeleteMethodUrl
        />
        <TableContainer name="" formName="" columns={columns} />


    </div>
);
AlarmUserThemeRuleMana.defaultProps = {

};
AlarmUserThemeRuleMana.propTypes = {

};

export default AlarmUserThemeRuleMana;
