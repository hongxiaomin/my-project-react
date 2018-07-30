import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import {
  EQMParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMMachineAbnorForm = 'EQMMachineAbnorForm';
const EQMMachineAbnorTable = 'EQMMachineAbnorTable';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/error`;
const factoryApi = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory/item`;
const lineApi = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/line/item`;
const modelApi = `${SERVER_IP_EQM}/ams/eqm/eqp/model/list`;
const eqpCodeApi = `${SERVER_IP_EQM}/ams/eqm/eqp/info/list`;

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '生产统计',
}, {
  path: '',
  name: '设备异常',
}];
const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, record, index) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{(index + 1)}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{(index + 1)}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{(index + 1)}</p>);
    },
  }, {
    title: '设备编号',
    dataIndex: 'eqpCode',
    key: 'eqpCode',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.eqpCode}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.eqpCode}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.eqpCode}</p>);
    },
  }, {
    title: '错误码',
    dataIndex: 'errorCode',
    index: 'errorCode',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.errorCode}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.errorCode}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.errorCode}</p>);
    },
  }, {
    title: '错误码描述',
    dataIndex: 'errorDetail',
    index: 'errorDetail',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.errorDetail}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.errorDetail}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.errorDetail}</p>);
    },
  }, {
    title: '触发时间',
    dataIndex: 'triggerTime',
    index: 'triggerTime',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.triggerTime}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.triggerTime}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.triggerTime}</p>);
    },
  }, {
    title: '触发方式',
    dataIndex: 'triggerType',
    index: 'triggerType',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.triggerType}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.triggerType}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.triggerType}</p>);
    },
  }, {
    title: '设备类型',
    dataIndex: 'typeName',
    index: 'typeName',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.typeName}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.typeName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.typeName}</p>);
    },
  }, {
    title: '设备型号',
    dataIndex: 'modelName',
    index: 'modelName',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.modelName}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.modelName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.modelName}</p>);
    },
  }, {
    title: '所属站点',
    dataIndex: 'stationName',
    index: 'stationName',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.stationName}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.stationName}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.stationName}</p>);
    },
  }, {
    title: '异常时长(秒)',
    dataIndex: 'durationTime',
    index: 'durationTime',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.durationTime}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.durationTime}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.durationTime}</p>);
    },
  }, {
    title: '是否解决',
    dataIndex: 'isResolve',
    index: 'isResolve',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.isResolve}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.isResolve}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.isResolve}</p>);
    },
  }, {
    title: '最后修改时间',
    dataIndex: 'lastUpdateDate',
    index: 'lastUpdateDate',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.lastUpdateDate}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: 'yellow' }} className={'inlineTable'}>{record.lastUpdateDate}</p>);
      }
      return (<p style={{ background: '#fff' }} className={'inlineTable'}>{record.lastUpdateDate}</p>);
    },
  }];

const EQMMachineAbnor = () => (
  <div className={'EQMMachineAbnor'}>
    <Bread breadMap={breadMap} />
    <Title name="设备异常" />
    <FormContainer
      name={EQMMachineAbnorForm}
      action={EQMSettingApi}
      method="GET"
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <GroupSelectContainer name="BorderAndSmallBorder">
        <div className={'searchCondition'}>
          <label htmlFor="factoryName" className={'label'}>厂别</label>
          <span className={'select'}>
            <SelectContainer
              name="factoryId"
              action={factoryApi}
              itemKey="id"
              itemValue="name"
              load="true"
              paramTemplate={() => ('')}
              next="lineId"
              dataSourceTemplate={defaultDataSourceTemplate}
            />

          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="lineId" className={'label'}>线别</label>
          <span className={'select'}>
            <SelectContainer
              name="lineId"
              action={lineApi}
              itemKey="id"
              itemValue="name"
              paramTemplate={(data) => {
                const condition = { factoryId: data };
                return { condition };
              }}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
      </GroupSelectContainer>
      <div className={'searchCondition'}>
        <label htmlFor="modelId" className={'label'}>设备型号</label>
        <span className={'select'}>
          <SelectContainer
            name="modelId"
            action={modelApi}
            itemKey="id"
            itemValue="name"
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="eqpId" className={'label'}>设备编号</label>
        <span className={'select'}>
          <SelectContainer
            name="eqpId"
            action={eqpCodeApi}
            itemKey="id"
            itemValue="code"
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <input type="submit" value="查詢" className={'button'} />
    </FormContainer>
    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '1800px' }}>
        <TableContainer
          name={EQMMachineAbnorTable}
          formName={EQMMachineAbnorForm}
          columns={columns}
          noRowSelection="true"
        />
      </div>
    </div>
  </div>
);
EQMMachineAbnor.defaultProps = {

};
EQMMachineAbnor.propTypes = {

};

export default EQMMachineAbnor;
