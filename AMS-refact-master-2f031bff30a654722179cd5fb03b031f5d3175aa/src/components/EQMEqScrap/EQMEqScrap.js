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

const EqScrapApi = `${SERVER_IP_EQM}/ams/eqm/predicate/equipment`;

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, record, index) => {
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{(index + 1)}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{(index + 1)}</p>);
      } else if (record.countDate > 30) {
        return (<p className={'inlineTable'}>{(index + 1)}</p>);
      }
    },
  }, {
    title: '设备编号',
    dataIndex: 'eqpCode',
    key: 'eqpCode',
    render: (text, record) => {
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.eqpCode}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.eqpCode}</p>);
      } else if (record.countDate > 30) {
        return (<p className={'inlineTable'}>{record.eqpCode}</p>);
      }
    },
  }, {
    title: '设备类型',
    dataIndex: 'typeName',
    index: 'typeName',
    render: (text, record) => {
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.typeName}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.typeName}</p>);
      } else if (record.countDate > 30) {
        return (<p className={'inlineTable'}>{record.typeName}</p>);
      }
    },
  }, {
    title: '设备型号',
    dataIndex: 'modelName',
    index: 'modelName',
    render: (text, record) => {
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.modelName}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.modelName}</p>);
      } else if (record.countDate > 30) {
        return (<p className={'inlineTable'}>{record.modelName}</p>);
      }
    },
  }, {
    title: '所在厂别',
    dataIndex: 'factoryName',
    index: 'factoryName',
    render: (text, record) => {
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.factoryName}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.factoryName}</p>);
      } else if (record.countDate > 30) {
        return (<p className={'inlineTable'}>{record.factoryName}</p>);
      }
    },
  }, {
    title: '所在线别',
    dataIndex: 'lineName',
    index: 'lineName',
    render: (text, record) => {
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.lineName}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.lineName}</p>);
      } else if (record.countDate > 30) {
        return (<p className={'inlineTable'}>{record.lineName}</p>);
      }
    },
  }, {
    title: '所属站点',
    dataIndex: 'assemblyName',
    index: 'assemblyName',
    render: (text, record) => {
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.assemblyName}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.assemblyName}</p>);
      } else if (record.countDate > 30) {
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
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{DateData}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{DateData}</p>);
      } else if (record.countDate > 30) {
        return (<p className={'inlineTable'}>{DateData}</p>);
      }
    },
  }, {
    title: '维修次数',
    dataIndex: 'maintainCount',
    index: 'maintainCount',
    render: (text, record) => {
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.maintainCount}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.maintainCount}</p>);
      } else if (record.countDate > 30) {
        return (<p className={'inlineTable'}>{record.maintainCount}</p>);
      }
    },
  }, {
    title: '故障次数',
    dataIndex: 'breakdownCount',
    index: 'breakdownCount',
    render: (text, record) => {
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.breakdownCount}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.breakdownCount}</p>);
      } else if (record.countDate > 30) {
        return (<p className={'inlineTable'}>{record.breakdownCount}</p>);
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
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{DateData}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{DateData}</p>);
      } else if (record.countDate > 30) {
        return (<p className={'inlineTable'}>{DateData}</p>);
      }
    },
  }, {
    title: '距离报废天数',
    dataIndex: 'countDate',
    index: 'countDate',
    render: (text, record) => {
      if (record.countDate < 15) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.countDate}</p>);
      } else if (record.countDate >= 15 && record.countDate <= 30) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.countDate}</p>);
      } else if (record.countDate > 30) {
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
  name: '设备报废',
}];

const EQMEqScrap = props => (
  <div className="EQMEqScrap">
    <Bread breadMap={breadMap} />
    <Title name="设备报废" />
    <FormContainer
      name="EqScrapForm"
      action={EqScrapApi}
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
        <label htmlFor="modelName" className={'label'}>设备型号</label>
        <InputContainer type="text" name="modelName" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className="EqScrapTab">
      <TableContainer
        name="EqScrapTab"
        formName="EqScrapForm"
        columns={columns}
        noRowSelection
      />
    </div>
  </div>
);

EQMEqScrap.defaultProps = {

};
EQMEqScrap.propTypes = {

};

export default EQMEqScrap;
