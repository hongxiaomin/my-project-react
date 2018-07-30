import React from 'react';
import PropTypes from 'prop-types';
import Bread from '../Bread';
import Title from '../Title';
import NewBtnList from '../../containers/NewBtnListContainer';
import Table from '../../containers/QueryTableContainer';
import { defaultRequestFilters,
  defaultGetParamTemplate2,
  defaultGetParamTemplateBtn,
  defaultDataSourceTemplate,
  defaultDataSourceTemplateSMMPP,
  SERVER_IP_SMM } from '../../constants/Settings';
import BOMShowDateContainer from '../../containers/BOMShowDateContainer';


const SMMPrepareMaterialConditionApi = `${SERVER_IP_SMM}/smm/issuemana/queryreserve`;
const SMMPrepareMaterialConditionApiDetail = `${SERVER_IP_SMM}/smm/issuemana/findprepdetails`;
const breadMap = [{
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
  name: '发料状态查询',
}];


const needData = (param) => {
  const { name, side, work_order } = param;
  const data = {
    condition: [{
      work_order,
      side,
      part: name,
    }],
    sort: [],
    page: { size: 10, current: 1 },

  };
  return data;
};

const detail = (param) => {
  const data = {
    work_order: param.work_order,
    side: param.side,
    part: param.part,
  };
  return data;
};

const columns = [
  {
    title: '序号',
    dataIndex: 'name1',
    key: 'name1',
    render: (text, render, index) => (index + 1),
  }, {
    title: '线别',
    dataIndex: 'line_name',
    key: 'line_name',
  }, {
    title: '工单号',
    dataIndex: 'work_order',
    key: 'work_order',
  }, {
    title: '工单数量',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    title: '面别',
    dataIndex: 'side',
    key: 'side',
  }, {
    title: '主板',
    dataIndex: 'product_name_main',
    key: 'product_name_main',
  }, {
    title: '小板',
    dataIndex: 'product_name',
    key: 'product_name',
  }, {
    title: '距离换线剩余时间',
    dataIndex: 'remain_time',
    key: 'remain_time',
    render: (text) => {
      const theTime = parseInt(text);// 秒
      //  const theTime = -4000;// 秒
      let theTime1 = 0;// 分
      let theTime2 = 0;// 小时
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);

          theTime1 = parseInt(theTime1 % 60);
        }
      }
      let result = 0;
      if (theTime2 < 10) {
        result = `0${theTime2}`;
        if (theTime1 < 10) {
          result = `0${theTime2}:0${theTime1}`;
        } else {
          result = `0${theTime2}:${theTime1}`;
        }
      } else {
        result = theTime2;
        if (theTime1 < 10) {
          result = `${theTime2}:0${theTime1}`;
        } else {
          result = `${theTime2}:${theTime1}`;
        }
      }
      return result;
    },
  }, {
    title: '计划上线时间',
    dataIndex: 'online_plan_time',
    key: 'online_plan_time',
  }, {
    title: '状态',
    dataIndex: 'list',
    key: 'list',
    render: (text, record) => {
      const { list } = record;
      const Buttonlist = list ? list.map((v, i) => {
        const ratio = v.ratio ? `${Math.round(v.ratio * 100)}%` : '';
        return (<NewBtnList
          part={v.name}
          key={i}
          record={record}
          value={v.name}
          ratio={ratio}
          btnName="SMMPMCTableBtn"
          action={SMMPrepareMaterialConditionApiDetail}
          paramTemplate={defaultGetParamTemplate2}
          dataSourceTemplate={defaultDataSourceTemplateSMMPP}
          filters={defaultRequestFilters}
          tableName="SMMPMCTableDetail"
          // needData={needData}
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
    title: '料号',
    dataIndex: 'material_no',
    key: 'material_no',
  }, {
    title: '料站',
    dataIndex: 'slot',
    key: 'slot',
  }, {
    title: '需求量',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    title: '已发数量',
    dataIndex: 'issue_amount',
    key: 'issue_amount',
  }, {
    title: '操作者',
    dataIndex: 'operator_id',
    key: 'operator_id',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      switch (text) {
        case 0:
          return '正在';
        case 1:
          return '未开始';
        case 2:
          return '已完成';
        default:
          return '未定义';
      }
    },
  }, {
    title: '对应的料车架位',
    dataIndex: 'car_shelf',
    key: 'car_shelf',
  }];


const SMMPrepareMaterialCondition = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="发料状态查询" />

    <Table
      name="SMMPMCTable"
      columns={columns}
      action={SMMPrepareMaterialConditionApi}
      paramTemplate={defaultGetParamTemplate2}
      method="GET"
      timeAlert="ok"
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
      needClear
      isRowSelection
    />


    <div className={'conditionPadding'}>
      <span className={'titlespan'}>
        <BOMShowDateContainer
          tableName="SMMPMCTableDetail"
          name="SMMPMCTableDetail"
          title="工单"
          keyName="work_order"
        />
      </span>
      <span className={'titlespan'}>
        <BOMShowDateContainer
          tableName="SMMPMCTableDetail"
          name="SMMPMCTableDetail"
          title="料车"
          keyName="car_name"
        />
      </span>
      <span className={'titlespan'}>
        <BOMShowDateContainer
          tableName="SMMPMCTableDetail"
          name="SMMPMCTableDetail"
          title="状态"
          keyName="status"
        />
      </span>
    </div>

    <Table
      name="SMMPMCTableDetail"
      tableName="SMMPMCTableDetail"
      btnName="SMMPMCTableBtn"
      columns={columnsDetail}
      needDataTemplate={detail}
      isRowSelection
    />

  </div>
);
SMMPrepareMaterialCondition.defaultProps = {

};
SMMPrepareMaterialCondition.propTypes = {

};

export default SMMPrepareMaterialCondition;
