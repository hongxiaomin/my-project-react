import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import TableContainer from '../../containers/QueryTableContainer';
import {
  SERVER_IP_SMM,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultDataSourceTemplateSUSC,
  unbindStockPutDataTemplate,
  defaultGetParamTemplate2,
} from '../../constants/Settings';
import NewBtnList from '../../containers/NewBtnListContainer';
import ActionBtn from '../../containers/ActionBtnContainer';



const smmUnbindStockCarApi = `${SERVER_IP_SMM}/smm/issuemana/car/list`;
const smmUnbindStockCarApiDetail = `${SERVER_IP_SMM}/smm/issuemana/car`;
const smmUnbindStockCarApiUnbind = `${SERVER_IP_SMM}/smm/issuemana/car`;

const breadMap = [
  {
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '原材料管理',
  }, {
    path: '',
    name: '仓库管理',
  }, {
    path: '',
    name: '解绑备料车',
  },
];

const detail = (param) => {
  const data = {
    work_order: param.work_order,
    side: param.side,
    parts: [{ part: param.part }],
  };
  return data;
};

const columns = [
  {
    title: '序号',
    dataIndex: 'serialNO',
    key: 'serialNO',
    render: (text, record, index) => (index + 1),
  }, {
    title: '工单 ',
    dataIndex: 'work_order',
    key: 'work_order',
  }, {
    title: '面别 ',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '仓库',
    dataIndex: 'parts',
    key: 'parts',
    render: (text, record) => {
      const { parts } = record;
      const Buttonlist = parts ? parts.map((v, i) => {
        // const ratio = v.id ? v.id : '';
        return (<NewBtnList
          part={v.part}
          key={i}
          record={record}
          value={v.part}
          id={v.id}
          // ratio={ratio}
          btnName="SMMUnbindStockCarBtn"
          action={smmUnbindStockCarApiDetail}
          paramTemplate={defaultGetParamTemplate2}
          dataSourceTemplate={defaultDataSourceTemplate}
          filters={defaultRequestFilters}
          tableName="SMMUnbindStockCarDetail"
          needDataTemplate={detail}
        />
        );
      }) : '';
      return Buttonlist;
    },
  }];


const columnsDetail = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '料车',
    dataIndex: 'car_name',
    key: 'car_name',
  },
]

const SMMUnbindStockCar = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="解绑备料车" />


    <TableContainer
      name="SMMUnbindStockCar"
      columns={columns}
      action={smmUnbindStockCarApi}
      method="GET"
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
      isRowSelection
    />

    <div className="modalBtnBottom">
    <ActionBtn
      btnName="解绑"
      mode="returnDebit"
      method="PUT"
      action={smmUnbindStockCarApiUnbind}
      tableName="SMMUnbindStockCarDetail"
      defaultTableName="SMMUnbindStockCar"
      paramTemplate={unbindStockPutDataTemplate}
      // selectedTemplate={rows => ({ label_name: rows.label_name })}
      dataTemplate={unbindStockPutDataTemplate}
      onRowClick
    />
    </div>
    <TableContainer
      name="SMMUnbindStockCarDetail"
      tableName="SMMUnbindStockCarDetail"
      queryTableName="SMMUnbindStockCar"
      btnName="SMMUnbindStockCarBtn"
      columns={columnsDetail}
      needDataTemplate={detail}
    />
  </div>
);
SMMUnbindStockCar.defaultProps = {

};
SMMUnbindStockCar.propTypes = {

};

export default SMMUnbindStockCar;
