import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import Input from '../../containers/InputContainer';
import TableContainer from '../../containers/TableContainer';
import {
  EQMParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';
import './style.less';

const EQMSettingApi = `${SERVER_IP_EQM}/ams/eqm/predicate/maintain`;
const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, record, index) => {
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{(index + 1)}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{(index + 1)}</p>);
        } else if (record.level === 2) {
          return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{(index + 1)}</p>);
        }
      }
    },
  }, {
    title: '设备编号',
    dataIndex: 'eqpCode',
    key: 'eqpCode',
    render: (text, record, index) => {
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{record.eqpCode}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.eqpCode}</p>);
        } else if (record.level === 2) {
          return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.eqpCode}</p>);
        }
      }
    },
  }, {
    title: '设备类型',
    dataIndex: 'eqpTypeName',
    index: 'eqpTypeName',
    render: (text, record) => {
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{record.eqpTypeName}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.eqpTypeName}</p>);
        } else if (record.level === 2) {
          return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.eqpTypeName}</p>);
        }
      }
    },
  }, {
    title: '设备型号',
    dataIndex: 'eqpModelName',
    index: 'eqpModelName',
    render: (text, record) => {
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{record.eqpModelName}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.eqpModelName}</p>);
        } else if (record.level === 2) {
          return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.eqpModelName}</p>);
        }
      }
    },
  }, {
    title: '所在厂别',
    dataIndex: 'factoryName',
    index: 'factoryName',
    render: (text, record) => {
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{record.factoryName}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.factoryName}</p>);
        } else if (record.level === 2) {
          return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.factoryName}</p>);
        }
      }
    },
  }, {
    title: '所在线别',
    dataIndex: 'lineName',
    index: 'lineName',
    render: (text, record) => {
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{record.lineName}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.lineName}</p>);
        } else if (record.level === 2) {
          return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.lineName}</p>);
        }
      }
    },
  }, {
    title: '所属站点',
    dataIndex: 'assemblyName',
    index: 'assemblyName',
    render: (text, record) => {
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{record.assemblyName}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.assemblyName}</p>);
        } else if (record.level === 2) {
          return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.assemblyName}</p>);
        }
      }
    },
  }, {
    title: '维修项',
    dataIndex: 'maintainDetail',
    index: 'maintainDetail',
    render: (text, record) => {
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{record.maintainDetail}</p>);
      } else if (record.level === 1) {
        return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.maintainDetail}</p>);
      } else if (record.level === 2) {
        return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.maintainDetail}</p>);

      }
    },
  }, {
    title: '零部件名称',
    dataIndex: 'partModelName',
    index: 'partModelName',
    render: (text, record) => {
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{record.partModelName}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.partModelName}</p>);
        } else if (record.level === 2) {
          return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.partModelName}</p>);
        }
      }
    },
  }, {
    title: '等级',
    dataIndex: 'levelDesc',
    index: 'levelDesc',
    render: (text, record) => {
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{record.levelDesc}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.levelDesc}</p>);
        } else if (record.level === 2) {
          return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.levelDesc}</p>);
        }
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
      if (record.status === 1 || record.level === 0) {
        return (<p className={'inlineTable'}>{`${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{`${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`}</p>);
        } else if (record.level === 2) {
          return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{`${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`}</p>);
        }
      }
    },
  }, {
    title: '上次维修时间',
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
      if (record.status === 1 || record.level === 0) {
        return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{`${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{`${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`}</p>);
        } else if (record.level === 2) {
          return (<p className={'inlineTable'}>{`${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`}</p>);
        }
      }
    },
  }, {
    title: '是否完成',
    dataIndex: 'statusDesc',
    index: 'statusDesc',
    render: (text, record) => {
      if (record.status === 1 || record.level === 0) {
        return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.statusDesc}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.statusDesc}</p>);
        } else if (record.level === 2) {
          return (<p className={'inlineTable'}>{record.statusDesc}</p>);
        }
      }
    },
  }, {
    title: '备注',
    dataIndex: 'remark',
    index: 'remark',
    render: (text, record) => {
      if (record.status === 1 || record.level === 0) {
        return (<p style={{ background: '#FF0000' }} className={'inlineTable'}>{record.remark}</p>);
      } else {
        if (record.level === 1) {
          return (<p style={{ background: '#FFFF00' }} className={'inlineTable'}>{record.remark}</p>);
        } else if (record.level === 2) {
          return (<p className={'inlineTable'}>{record.remark}</p>);
        }
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
  name: '设备维修',
}];

const EQMEqMaint = props => (
  <div className="jigMaintainRecord">
    <Bread breadMap={breadMap} />
    <Title name="设备维修" />
    <FormContainer
      name="EQMEqMaintForm"
      action={EQMSettingApi}
      method="GET"
      paramTemplate={EQMParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="eqpCode" className={'label'}>设备编号</label>
        <Input type="text" name="eqpCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="eqpModelName" className={'label'}>设备型号</label>
        <Input type="text" name="eqpModelName" className={'input'} />
      </div>
      <input type="submit" value="查詢" className={'button'} />
    </FormContainer>
    <div className="EqMaintTab">
      <TableContainer
        name="EQMEqMaintTable"
        formName="EQMEqMaintForm"
        columns={columns}
        noRowSelection
      />
    </div>
  </div>
);

EQMEqMaint.defaultProps = {

};

EQMEqMaint.propTypes = {

};

export default EQMEqMaint;
