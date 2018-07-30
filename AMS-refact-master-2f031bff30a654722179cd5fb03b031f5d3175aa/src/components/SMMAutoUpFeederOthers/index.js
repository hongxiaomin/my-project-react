import React from 'react';
import { Row } from 'antd';
import { Link } from 'react-router';
import Bread from '../Bread';
import Title from '../Title';
import './style.less';
import Table from '../../containers/QueryTableContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';

import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultGetParamTemplate2,
} from '../../constants/Settings';
import BOMShowDateContainer from '../../containers/BOMShowDateContainer';

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
  name: '自动上Feeder',
}];

const columns = [
  {
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
    render: (text, record, index) => {
      const { hightColor } = record;
      return (hightColor ? <p className={'inlineTab'}>{text}</p> : text);
    },
    className: 'abc',
  }, {
    title: '流水号',
    dataIndex: 'serial_no',
    key: 'serial_no',
    render:(text, record, index) => {
      const { hightColor } = record;
      return (hightColor ? <p className={'inlineTab'}>{text}</p> : text);
    },
    className: 'abc',
  }, {
    title: 'Feeder号',
    dataIndex: 'feeder_id',
    key: 'feeder_id',
    render:(text, record, index) => {
      const { hightColor } = record;
      return (hightColor ? <p className={'inlineTab'}>{text}</p> : text);
    },
    className: 'abc',
  }, {
    title: '模组料站',
    dataIndex: 'slot',
    key: 'slot',
    render:(text, record, index) => {
      const { hightColor } = record;
      return (hightColor ? <p className={'inlineTab'}>{text}</p> : text);
    },
    className: 'abc',
  }, {
    title: '上模组时间',
    dataIndex: 'bind_time',
    key: 'bind_time',
    render:(text, record, index) => {
      const { hightColor } = record;
      return (hightColor ? <p className={'inlineTab'}>{text}</p> : text);
    },
    className: 'abc',
  }];

const SMMAutoUpFeederOthers = (props) => {
  console.log('props', props);
  return (
    <div>
      <Bread breadMap={breadMap} />

      <Title name="自动上Feeder" />

      <Row>
        <Link to="/SMMAutoUpFeeder">返回上一级</Link>
        <div style={{ textAlign: 'right', margin: '-20px 0 10px' }}>
          <button className="ant-btn ant-btn-primary" >
            <Link to="/SMMAutoUpFeederMES">上传到MES</Link>
          </button>
        </div>
      </Row>

      <FormContainer
        name="SMMDeleteRecordSearchForm"
        tableName="SMMDeleteRecordSearchForm"
        dataSourceTemplate={defaultDataSourceTemplate}
      >
        <Row style={{ marginBottom: '10' }}>
          <label htmlFor="shelves_no" className={'label'}>请扫描条形码</label>
          <InputContainer type="text" name="labelName" className={'mainliao Rowinput'} autoFeederOthers="feeder" autoFocus={true} formName="SMMDeleteRecordSearchForm" tableName='SMMAutoUpFeederOthersTable' noValue="noValue" />
        </Row>
        <span className={'titlespan magnifySpan'}>
          <BOMShowDateContainer
            formName="SMMDeleteRecordSearchForm"
            name="SMMDeleteRecordSearchForm"
            title="Message"
            keyName="message"
          />
        </span>
      </FormContainer>
      <hr />
      <Table
        name="SMMAutoUpFeederOthersTable"
        columns={columns}
        nopagination
        isRowSelection
      />
    </div>
  );
};
SMMAutoUpFeederOthers.defaultProps = {

};
SMMAutoUpFeederOthers.propTypes = {

};

export default SMMAutoUpFeederOthers;
