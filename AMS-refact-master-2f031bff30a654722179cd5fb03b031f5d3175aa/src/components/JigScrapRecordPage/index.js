import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, message } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import PieChartContainer from '../../containers/PieChartContainer';
import LineChartContainer from '../../containers/LineChartContainer2';
import BarChartContainer from '../../containers/BarChartContainer2';
import Modal from '../../containers/ModalContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import { defaultcolumnsTemplate } from '../../constants/TableConfig';
import { defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
// import './style.less';
const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;
const JigScrapRecordAPi = `${SERVER_IP_JIG}/ams/jig/life/scrap/query`;
const TabPane = Tabs.TabPane;
const data = [
  { percent: 25, name: 'ceshi' }, {
    percent: 75, name: 'ceshi1',
  },
];


const emitRequest = {
  name: 'JigScrapRecordForm',
  action: JigScrapRecordAPi,
  method: 'GET',
  paramTemplate: defaultGetParamTemplate,
  tableName: 'JigScrapRecord',
  filters: defaultRequestFilters,
  dataSourceTemplate: defaultDataSourceTemplate,
};

const checkTemplate = (data) => {
  const startTime = data.startTime;
  const endTime = data.endTime;
  if (startTime > endTime) {
    message.error('截止时间不能早于开始时间！', 3);
    return false;
  }
  return true;
};

const dataSourceTemplate = (response) => {
  if (response) {
    const data = response.rows;
    if (Array.isArray(data)) {
      return data.map(item =>
        ({ scItemName: item.scItemName, percent: Number(item.percent) }));
    }
  }
  return undefined;
};
const dataSourceTemplate2 = (response) => {
  if (response) {
    const data = response.rows;
    if (Array.isArray(data)) {
      return data.map(item =>
        ({ scItemName: item.scItemName, percent: Number(item.percent) }));
    }
  }
  return undefined;
};
const dataSourceTemplate3 = (response) => {
  if (response) {
    const data = response.rows;
    if (Array.isArray(data)) {
      return data.map(item =>
        ({ scItemName: item.scItemName, percent: Number(item.percent) }));
    }
  }
  return undefined;
};

const refDataTemplate = (response) => {
  let data = null;
  if (response) {
    const tagartValue = response.rows;
    data = { tagartValue };
  }
  return data;
};

const JigScrapRecordPage = (props) => {
  const breadMap = [{
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '治工具管理',
  }, {
    path: '',
    name: '综合查询',
  }, {
    path: '',
    name: '报废记录',
  }];
  return (
    <div>
      <Bread breadMap={breadMap} />
      <Title name="报废记录" />
      <FormContainer
        name="JigScrapRecordForm"
        action={JigScrapRecordAPi}
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
        dataSourceTemplate={defaultDataSourceTemplate}
        checkTemplate={checkTemplate}
      >
        <div className={'searchCondition'}>
          <label htmlFor="select" className={'label'}>治具类型</label>
          <span className={'select'}>
            <SelectContainer
              name="jigTypeId"
              action={JigTypeAPI}
              itemKey="id"
              itemValue="name"
              load="true"
              dataSourceTemplate={defaultDataSourceTemplate}
              emitRequest={emitRequest}
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="jigCode" className={'label'}>二维码</label>
          <InputContainer type="text" name="jigCode" className={'input'} />
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="startTime" className={'label'}>起始时间</label>
          <span className={'dateInput'}>
            <DatePickerContainer name="startTime" style={{ outline: 'none' }} />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="endTime" className={'label'}>截止时间</label>
          <span className={'dateInput'}>
            <DatePickerContainer name="endTime" style={{ outline: 'none' }} />
          </span>
        </div>
        <input type="submit" value="查询" className={'button'} />
      </FormContainer>
      <Modal name="JigScrapRecordModal" btnName="报废统计" title="报废统计" className="modelAntd" >
        <Tabs defaultActiveKey="1">
          <TabPane tab="报废汇总" key="1">
            <LineChartContainer
              name="linechart2"
              containerWidth="90%"
              aspect={1.2}
              action={`${SERVER_IP_JIG}/asm/jig/stat/scrap/stencil/query`}
              preload
              dataSourceTemplate={dataSourceTemplate}
              refDataTemplate={refDataTemplate}
              xAxis={{
                dataKey: 'scItemName',
                label: '名称',
              }}
              yAxis={{
                dataKey: 'percent',
                label: '百分点',
                domain: [0, 100],
              }}
              lines={[
                {
                  name: '百分点',
                  type: 'linear',
                  dataKey: 'percent',
                  stroke: '#8884d8',
                },
              ]}
              refs={[
                {
                  direction: 'y',
                  dataKey: 'tagartValue',
                  label: '平均值',
                  stroke: 'red',
                },
              ]}
              grid
              legend
              tooltip
            />
          </TabPane>
          <TabPane tab="使用次数" key="2">
            <BarChartContainer
              name="barchart"
              containerWidth="90%"
              aspect={1.2}
              action={`${SERVER_IP_JIG}/asm/jig/stat/scrap/stencil/query?condition={"type":"number"}`}
              preload
              dataSourceTemplate={dataSourceTemplate2}
              xAxis={{
                dataKey: 'scItemName',
                label: '次数',
              }}
              yAxis={{
                dataKey: 'percent',
                label: '百分比',
                domain: [0, 100],
              }}
              bars={[
                {
                  name: '百分比',
                  dataKey: 'percent',
                  fill: '#82ca9d',
                },
              ]}
              grid
              legend
              tooltip
            />
          </TabPane>
          <TabPane tab="张力检测" key="3">
            <BarChartContainer
              name="barchart1"
              containerWidth="90%"
              aspect={1.2}
              action={`${SERVER_IP_JIG}/asm/jig/stat/scrap/stencil/query?condition={"type":"tension"}`}
              preload
              dataSourceTemplate={dataSourceTemplate3}
              xAxis={{
                dataKey: 'scItemName',
                label: '张力',
              }}
              yAxis={{
                dataKey: 'percent',
                label: '百分比',
                domain: [0, 100],
              }}
              bars={[
                {
                  name: '百分比',
                  dataKey: 'percent',
                  fill: '#8884d8',
                },
              ]}
              grid
              legend
              tooltip
            />
          </TabPane>
        </Tabs>
      </Modal>
      <TableContainer
        name="JigScrapRecord"
        formName="JigScrapRecordForm"
        columnsTemplate={defaultcolumnsTemplate}
        noRowSelection="true"
      />
    </div>
  );
};
JigScrapRecordPage.defaultProps = {

};
JigScrapRecordPage.propTypes = {

};

export default JigScrapRecordPage;
