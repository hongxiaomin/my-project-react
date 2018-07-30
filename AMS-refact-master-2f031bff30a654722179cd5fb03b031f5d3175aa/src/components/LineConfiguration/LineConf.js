import React from 'react';
import Form from '../../containers/FormContainer';
import Select from '../../containers/SelectContainer';
import { defaultRequestFilters, SERVER_IP_LION } from '../../constants/Settings';
import { formDataSourceName, formReducerName } from '../../constants/Config';
import { onSaveCheckBoxChecked } from '../../actions/FormAction';
import FormTable from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import CheckBoxGroup from '../../containers/CheckBoxGroupContainer';
import './style.less';

// 查询
const LineConfigurationGetLine = `${SERVER_IP_LION}/dg5/scm/config/line/get`;
// 查询回掉函数 http://localhost/dg5/scm/config/line/configmachine/get?condition=[{"id":1,line":"T01"}]
const LineConfigurationCallBack = `${SERVER_IP_LION}/dg5/scm/config/line/configmachine/get`;

// 线体配置提交
const LineConfigurationMachineApi = `${SERVER_IP_LION}/dg5/scm/config/line/config/machine`;

// 线体配置，确认配置template
const LineConfigurationPostTemplate = (param) => {
  const { line, checkboxId } = param;
  const lineId = line;
  let machineIds = checkboxId ? checkboxId.toString() : '';
  machineIds = machineIds.slice();
  const { ...data } = { lineId, machineIds };
  const dataStr1 = JSON.stringify(data);
  const dataStr = `[${dataStr1}]`;
  return {
    value: dataStr || [],
  };
};

// 查询后的下拉框
const LineConfigurationSelectTemplate = param => param && param.rows || [];
const selectCallBack = {
  action: LineConfigurationCallBack,
  formName: 'LineForm',
  dataSourceTemplate: (param) => { param && param.rows || []; },
  paramTemplate: (param) => {
    const { line, SelectData } = param;
    const { options } = SelectData;
    let dat = {};
    options.map((v) => {
      Object.keys(v).forEach((key) => {
        if (line && line == v[key]) {
          dat = {
            id: v[key],
            line: v.text,
          };
          return null;
        }
      });
      return null;
    });
    return {
      condition: [dat],
    };
  },
};

const oneColumns = [{
  title: '排序',
  key: 'sequence',
  dataIndex: 'sequence',
}, {
  title: '机台类型',
  key: 'name',
  dataIndex: 'name',
}, {
  title: '控制方式',
  key: 'type',
  dataIndex: 'type',
  render: (text) => {
    let dataPC;
    switch (text) {
      case 0:
      case 'PLC':
        dataPC = 'PLC';
        break;
      case 1:
      case 'PC':
        dataPC = 'PC';
        break;
      default:
    }
    return dataPC;
  },
}, {
  title: 'IP',
  key: 'vender',
  dataIndex: 'vender',

}, {
  title: '设备编号',
  key: 'venderIP',
  dataIndex: 'venderIP',

}, {
  title: '型号',
  key: 'model',
  dataIndex: 'model',

}, {
  title: '备注',
  key: 'description',
  dataIndex: 'description',

}];

const LineConf = () => (
  <div className="lineConf">
    <Form
      name="LineForm"
    >
      <div className={'searchCondition'}>
        <label htmlFor="line_number" className={'label'}>线别:</label>
        <span className={'select'}>
          <Select
            action={LineConfigurationGetLine}
            itemKey="id"
            itemValue="name"
            name="line"
            id="line"
            dataSourceTemplate={LineConfigurationSelectTemplate}
          />
        </span>
      </div>
    </Form>
    <div className="checkBoxGroup">
      <CheckBoxGroup
        formName="LineForm"
        spanCol={4}
        name="asdads"
        value="name"
        dataSourceTemplate={
          (param) => { console.log('param', param); }
        }
      />
    </div>
    <FormTable
      name="LineConfigurationOneTable"
      columns={oneColumns}
      formName="LineForm"
      dataSourceTemplate={
         dataSource => (dataSource && dataSource.machineDetail ? dataSource.machineDetail : [])}
      isGetDate
    />
    <ActionBtn
      btnName="确认配置"
      mode="post"
      method="POST"
      filters={defaultRequestFilters}
      action={LineConfigurationMachineApi}
      tableName="LineConfigurationOneTable"
      formName="LineForm"
      dataTemplate={LineConfigurationPostTemplate}
      refreshTable
    />
    <ActionBtn
      btnName="取消配置"
      mode="custom"
      formName="LineForm"
      customFunc={props => (
        (dispatch, getState) => {
          const state = getState();
          const { formName } = props;
          const dataSource = state.getIn([formReducerName, formName, formDataSourceName]) ?
          state.getIn([formReducerName, formName, formDataSourceName]) : [];
          if (dataSource && dataSource.machinesOwnsByLine) {
            dataSource.machinesOwnsByLine.map((v) => {
              dispatch(onSaveCheckBoxChecked({ formName, name: v.id, checked: v.checked }));
              return null;
            });
          }
        })}
    />
  </div>
);

export default LineConf;
