import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import QueryTable from '../../containers/QueryTableContainer';
import InputContainer from '../../containers/InputContainer';
import {
  EQMUpdatePutDataTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const PeriodSetApi = `${SERVER_IP_EQM}/ams/eqm/ckbm/fqc`;

const targetKeyUpdate = ['maintDefine', 'id'];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '点检及保养',
}, {
  path: '',
  name: '保养周期设置',
}];

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, render, index) => (index + 1),
  }, {
    title: '周期编号',
    dataIndex: 'ckbmFqcCode',
    key: 'ckbmFqcCode',
  }, {
    title: '周期名称',
    dataIndex: 'ckbmFqcName',
    key: 'ckbmFqcName',
  }, {
    title: '时间(天)',
    dataIndex: 'maintDefine',
    key: 'maintDefine',
  }, {
    title: '最后更新人员',
    dataIndex: 'lastUpdateBy',
    key: 'lastUpdateBy',
  }, {
    title: '最后更新时间',
    dataIndex: 'lastUpdateDate',
    key: 'lastUpdateDate',
    render: (text, record) => {
      const { lastUpdateDate } = record;
      if (lastUpdateDate === null) {
        return '';
      }
      const date = new Date(lastUpdateDate);
      function add0(m) { return m < 10 ? `0${m}` : m; }
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      return `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
    },
  }];
const EQMPeriodSet = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="保养周期设置" />
    <div className={'divBtn'} style={{ marginBottom: '10px' }}>
      <Modal
        name="PeriodSetUpdate"
        formName="PeriodSetForm"
        tableName="PeriodSetTab"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="PeriodSetUpdate"
          modalName="PeriodSetUpdate"
          action={PeriodSetApi}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName="PeriodSetForm"
          tableName="PeriodSetTab"
          onRefresh
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="maintDefine">周期时间</label>
              <InputContainer type="text" name="maintDefine" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
    </div>
    <QueryTable
      name="PeriodSetTab"
      method="GET"
      columns={columns}
      action={PeriodSetApi}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    />
  </div>
);
EQMPeriodSet.defaultProps = {

};
EQMPeriodSet.propTypes = {

};

export default EQMPeriodSet;
