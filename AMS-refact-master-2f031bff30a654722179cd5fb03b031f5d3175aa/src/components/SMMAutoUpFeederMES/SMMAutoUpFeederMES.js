import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Table from '../../containers/QueryTableContainer';
import { Link } from 'react-router';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import BOMShowDateContainer from '../../containers/BOMShowDateContainer';


import { defaultRequestFilters, defaultDataSourceTemplate, defaultGetParamTemplate2, SERVER_IP_SMM } from '../../constants/Settings';

//http://localhost:8081/ams/smm/plugmodcontroller/uploadtomes?
//value=[{"work_order":"2311701657","side":"A","mes_mode":"2311701657","is_feeder_buffer":"A" ,
//"feeding_list":[{"material_no":"1552458032","serial_no":"D201702241521454001","feeder_id":"KT8BD30662","slot":"02T07"}],
//"material_list":[{"material_no":"1552458032","serial_no":"D201702241521454003","slot":"03T08"}]}]

const SMMAutoUpFeederMESApi = `${SERVER_IP_SMM}/smm/plugmodcontroller/uploadtomes`;

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
  name: '自动上传到MES',
}];

const columns = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '流水号',
    dataIndex: 'serial_no',
    key: 'serial_no',
  }, {
    title: 'feederId',
    dataIndex: 'feeder_id',
    key: 'feeder_id',
  }, {
    title: '模组料站',
    dataIndex: 'slot',
    key: 'slot',
  },
];

const columnsTwo = [
  {
    title: '序号',
    dataIndex: 'material_no2',
    key: 'material_no2',
    render: (text, record, index) => (index + 1),
  }, {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '流水号',
    dataIndex: 'serial_no',
    key: 'serial_no',
  }, {
    title: '模组料站',
    dataIndex: 'slot',
    key: 'slot',
  },
];

const SMMAutoUpFeederMES = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="自动上传到MES" />
    <Row>
      <Link to="/SMMAutoUpFeeder">返回上一级</Link>
      <div style={{ textAlign: 'right', margin:'-20px 0 10px' }}>
        <ActionBtn
          btnName="上传MES"
          mode="uploadMES"
        />
      </div>
    </Row>
    <Title name="上料列表" />
    <Table
      name="SMMAutoUpFeederMESFeeding"
      formName="SMMAutoUpFeederMESForm"
      columns={columns}
      uid="serial_no"
    />
    <Title name="发料列表" />
    <span className={'titlespan magnifySpan'}>
      <BOMShowDateContainer
        formName="SMMDeleteRecordSearchForm1"
        name="SMMDeleteRecordSearchForm1"
        title="Message"
        keyName="message"
      />
    </span>
    <Table
      name="SMMAutoUpFeederMESMaterial"
      formName="SMMAutoUpFeederMESForm"
      columns={columnsTwo}
    />
  </div>
);
SMMAutoUpFeederMES.defaultProps = {

};
SMMAutoUpFeederMES.propTypes = {

};

export default SMMAutoUpFeederMES;
