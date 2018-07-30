import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import {
  bomGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';
import './style.less';

const keyPartApi = `${SERVER_IP_EQM}/ams/eqm/predicate/part`;

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, record, index) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{(index + 1)}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{(index + 1)}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{(index + 1)}</p>);
      }
    },
  }, {
    title: '零部件名称',
    dataIndex: 'partModelName',
    key: 'partModelName',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.partModelName}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.partModelName}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{record.partModelName}</p>);
      }
    },
  }, {
    title: '类型',
    dataIndex: 'partTypeName',
    index: 'partTypeName',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.partTypeName}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.partTypeName}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{record.partTypeName}</p>);
      }
    },
  }, {
    title: '所在位置',
    dataIndex: 'position',
    index: 'position',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.position}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.position}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{record.position}</p>);
      }
    },
  }, {
    title: '设备编号',
    dataIndex: 'eqpCode',
    index: 'eqpCode',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.eqpCode}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.eqpCode}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{record.eqpCode}</p>);
      }
    },
  }, {
    title: '设备类型',
    dataIndex: 'eqpTypeName',
    index: 'eqpTypeName',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.eqpTypeName}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.eqpTypeName}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{record.eqpTypeName}</p>);
      }
    },
  }, {
    title: '设备型号',
    dataIndex: 'eqpModelName',
    index: 'eqpModelName',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.eqpModelName}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.eqpModelName}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{record.eqpModelName}</p>);
      }
    },
  }, {
    title: '所在厂别',
    dataIndex: 'factoryName',
    index: 'factoryName',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.factoryName}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.factoryName}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{record.factoryName}</p>);
      }
    },
  }, {
    title: '所在线别',
    dataIndex: 'lineName',
    index: 'lineName',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.lineName}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.lineName}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{record.lineName}</p>);
      }
    },
  }, {
    title: '所属站点',
    dataIndex: 'assemblyName',
    index: 'assemblyName',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.assemblyName}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.assemblyName}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{record.assemblyName}</p>);
      }
    },
  }, {
    title: '设备注册时间',
    dataIndex: 'createDate',
    index: 'createDate',
    render: (text, record) => {
      const { createDate } = record;
      if (createDate === null) {
        return '';
      }
      const date = new Date(createDate);
      function add0(m) { return m < 10 ? `0${m}` : m; }
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      const DateData = `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{DateData}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{DateData}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{DateData}</p>);
      }
    },
  }, {
    title: '演算法时间',
    dataIndex: 'invokeTime',
    index: 'invokeTime',
    render: (text, record) => {
      const { invokeTime } = record;
      if (invokeTime === null) {
        return '';
      }
      const date = new Date(invokeTime);
      function add0(m) { return m < 10 ? `0${m}` : m; }
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      const DateData = `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{DateData}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{DateData}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{DateData}</p>);
      }
    },
  }, {
    title: '上次更换时间',
    dataIndex: 'lastMaintainTime',
    index: 'lastMaintainTime',
    render: (text, record) => {
      const { lastMaintainTime } = record;
      if (lastMaintainTime === null) {
        return '';
      }
      const date = new Date(lastMaintainTime);
      function add0(m) { return m < 10 ? `0${m}` : m; }
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      const DateData = `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{DateData}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{DateData}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{DateData}</p>);
      }
    },
  }, {
    title: '距离更换天数',
    dataIndex: 'countDate',
    index: 'countDate',
    render: (text, record) => {
      if (record.status === 2) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.countDate}</p>);
      } else if (record.status === 1) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.countDate}</p>);
      } else if (record.status === 0) {
        return (<p className={'inlineTable'}>{record.countDate}</p>);
      }
    },
  }];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '预防维护',
}, {
  path: '',
  name: '关键零件',
}];

const EQMKeyParts = props => (
  <div className="EQMKeyParts">
    <Bread breadMap={breadMap} />
    <Title name="关键零件" />
    <FormContainer
      name="KeyPartsForm"
      action={keyPartApi}
      method="GET"
      paramTemplate={bomGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="eqpCode" className={'label'}>设备编号</label>
        <InputContainer type="text" name="eqpCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="eqpModelName" className={'label'}>设备型号</label>
        <InputContainer type="text" name="eqpModelName" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className="KeyPartsTab">
      <TableContainer
        name="KeyPartsTab"
        formName="KeyPartsForm"
        columns={columns}
        noRowSelection
      />
    </div>
  </div>
);

EQMKeyParts.defaultProps = {

};

EQMKeyParts.propTypes = {

};

export default EQMKeyParts;
