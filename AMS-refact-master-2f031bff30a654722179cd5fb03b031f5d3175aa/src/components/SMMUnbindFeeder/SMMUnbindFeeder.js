import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import ActionBtn from '../../containers/ActionBtnContainer';
import BOMShowDateContainer from '../../containers/BOMShowDateContainer';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
// import SelectContainer from '../../containers/SelectContainer';
import { defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_SMM } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
// import Table from '../../containers/QueryTableContainer';

const SMMSearchListApi = `${SERVER_IP_SMM}/smm/feedercontroller/getbindfeederlist`;
const SMMUnbindFeederNextApi = `${SERVER_IP_SMM}/smm/feedercontroller/getbindfeedersbyworkorderside`;
const SMMUnbindFeederAcWorkApi = `${SERVER_IP_SMM}/smm/feedercontroller/unbindfeederbyworkorderside`;
const SMMResetFeederAcWorkApi = `${SERVER_IP_SMM}/smm/feedercontroller/cancelunbindfeederbyworkorderside`;
const SMMUnbindAcFeederApi = `${SERVER_IP_SMM}/smm/feedercontroller/unbindafeeder`;
const SMMResetAcFeederApi = `${SERVER_IP_SMM}/smm/feedercontroller/cancelunbindafeeder`;

const columns = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '工单',
    dataIndex: 'work_order',
    key: 'work_order',
  }, {
    title: '面别',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '流水号',
    dataIndex: 'serial_no',
    key: 'serial_no',
  }, {
    title: 'Feeder',
    dataIndex: 'feeder_id',
    key: 'feeder_id',
  }];
const resetAcWorkPostDataTemplate = (param) => {
  console.log(param);
};

const unbindAcFeederPOSTDataTemplate = (param) => {
  console.log(param);
  const list = [];
  const [...data] = list;
  return {
    value: data,
  };
};

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '原材料管理',
}, {
  path: '',
  name: '备料区管理',
}, {
  path: '',
  name: '解绑Feeder',
}];

const defaultGetParamTemplate2 = (param) => {
  console.log('param', param)
  if(param.work_order) {
    const {
    // sort = undefined,
      size = 10,
      current = 1,
      ...data
    } = param;
    return {
      condition: param ? [param] : '',
      // sort: sort ? [sort] : '',
      page: { size, current },
    };
  } else {
    const {
      size = 10,
      current = 1,
    } = param;
    return {
      page: { size, current },
    };
  }
};

const SMMUnbindFeeder = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="解绑Feeder" />
    <FormContainer
      name="SMMUnbindFeederForm"
      action={SMMSearchListApi}
      nextAction={SMMUnbindFeederNextApi}
      method="GET"
      filters={defaultRequestFilters}
      paramTemplate={defaultGetParamTemplate2}
      tableName="SMMUnbindFeederTable"
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="work_order" className={'label'}>工单号</label>
        <InputContainer type="text" name="work_order" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="side" className={'label'}>面别</label>
        <InputContainer type="text" name="side" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="feeder" className={'label'}>Feeder号</label>
        <InputContainer type="text" name="feeder" className={'input'} disabled />
      </div>
      <input type="submit" value="查询" className={'ant-btn button'} />
    </FormContainer>
    <span className={'titlespan magnifySpan'}>
      <BOMShowDateContainer
        formName="SMMUnbindFeeder"
        name="SMMUnbindFeeder"
        title="Message"
        keyName="message"
      />
    </span>
    <hr />
    <Row style={{ marginTop: 10 }}>
      <ActionBtn
        btnName="按工单解绑"
        mode="unbindOrResetAcWork"
        method="POST"
        action={SMMUnbindFeederAcWorkApi}
        formName="SMMUnbindFeederForm"
        tableName="SMMUnbind"
        defaultTableName="SMMUnbindStockCar"
      />
      <ActionBtn
        btnName="按工单恢复"
        mode="unbindOrResetAcWork"
        method="POST"
        action={SMMResetFeederAcWorkApi}
        formName="SMMUnbindFeederForm"
      />
      <ActionBtn
        btnName="按Feeder解绑"
        mode="unbindOrResetAcFeeder"
        method="POST"
        action={SMMUnbindAcFeederApi}
        tableName="SMMUnbindFeederTable"
        defaultTableName="SMMUnbindFeeder"
        paramTemplate={unbindAcFeederPOSTDataTemplate}
        noNeedWorkOrder
      />
      <ActionBtn
        btnName="按Feeder恢复"
        mode="unbindOrResetAcFeeder"
        method="POST"
        action={SMMResetAcFeederApi}
        tableName="SMMUnbindFeederTable"
        defaultTableName="SMMUnbindFeeder"
        paramTemplate={resetAcWorkPostDataTemplate}
      />
    </Row>
    <TableContainer
      name="SMMUnbindFeederTable"
      formName="SMMUnbindFeederForm"
      columns={columns}

    />
  </div>
);
SMMUnbindFeeder.defaultProps = {

};
SMMUnbindFeeder.PropTypes = {

};

export default SMMUnbindFeeder;

