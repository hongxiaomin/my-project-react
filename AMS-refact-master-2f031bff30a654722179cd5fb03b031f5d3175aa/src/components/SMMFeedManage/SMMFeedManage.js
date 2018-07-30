import React from 'react';
import { Tabs, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import DatePickerContainer from '../../containers/DatePickerContainer';
import SelectContainer from '../../containers/SelectContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import {
  defaultGetParamTemplate2,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplate,
  smmWithPageDataTemplate,
  SERVER_IP_SMM,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

const smmFeedManageTab1API = `${SERVER_IP_SMM}/smm/resources/queryfeeder`;
const smmFeedManageTab2API = `${SERVER_IP_SMM}/smm/resources/queryfeedermaintain`;
const smmFeedManageTab1APIAdd = `${SERVER_IP_SMM}/smm/resources/addfeeder`;
const smmFeedManageTab1APIDelete = `${SERVER_IP_SMM}/smm/resources/delfeeder`;
const smmFeedManageoperate = `${SERVER_IP_SMM}/smm/resources/operatefeeder`;

const breadMap = [
  {
    path: '',
    name: '首页',
  }, {
    path: '',
    name: '原材料管理',
  }, {
    path: '',
    name: 'Feeder管理',
  }, {
    path: '',
    name: 'Feeder管理',
  },
];
const smmWithPageDataTemplateDel = (param) => {
  const list = [];
  param.map((v) => {
    const ledAddress = {
      feeder_id: v.feeder_id,
    };
    list.push(ledAddress);
    return null;
  });
  const [...data] = list;
  const page = { size: 10, current: 1 };
  return {
    value: data,
    page,
  };
};
const columns1 = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: 'Feeder ID',
    dataIndex: 'feeder_id',
    key: 'feeder_id',
  }, {
    title: '使用时间(分钟)',
    dataIndex: 'use_time',
    key: 'use_time',
  }, {
    title: '使用次数',
    dataIndex: 'use_count',
    index: 'use_count',
  }, {
    title: '当前状态',
    dataIndex: 'status',
    index: 'status',
    render: (text) => {
      switch (text) {
        case 0:
          return '正常使用';
        case 1:
          return '待维修';
        case 2:
          return '待保养';
        case 3:
          return '报废';
        default:
          return '未定义';
      }
    },
  }, {
    title: '上次保养时间',
    dataIndex: 'last_maintenance_time',
    index: 'last_maintenance_time',
  },
  //  {
  //   title: '编辑',
  //   dataIndex: 'name6',
  //   index: 'name6',
  // },
];

const columns2 = [
  {
    title: '序号',
    dataIndex: 'material_no1',
    key: 'material_no1',
    render: (text, record, index) => (index + 1),
  }, {
    title: 'Feeder ID',
    dataIndex: 'feeder_id',
    key: 'feeder_id',
  }, {
    title: '使用时间(分钟)',
    dataIndex: 'use_time',
    key: 'use_time',
  }, {
    title: '使用次数',
    dataIndex: 'use_count',
    index: 'use_count',
  }, {
    title: '状态',
    dataIndex: 'status',
    index: 'status',
    render: (text) => {
      switch (text) {
        case 0:
          return '等待送到保养';
        case 1:
          return '正在进行保养';
        case 2:
          return '保养完成';
        case 3:
          return '等待送到维修';
        case 4:
          return '正在进行维修';
        case 5:
          return '维修完成';
        case 6:
          return '报废';
        default:
          return '未定义';
      }
    },
  }, {
    title: '操作時間',
    dataIndex: 'last_maint_time',
    index: 'last_maint_time',
  }];
const selData = [
  {
    id: '0',
    status: '正常使用',
  }, {
    id: '1',
    status: '待维修',
  }, {
    id: '2',
    status: '待保养',
  }, {
    id: '3',
    status: '报废',
  }];

const selData2 = [
  {
    id: '0',
    status: '等待送到保养',
  }, {
    id: '1',
    status: '正在进行保养',
  }, {
    id: '2',
    status: '保养完成',
  }, {
    id: '3',
    status: '等待送到维修',
  }, {
    id: '4',
    status: '正在进行维修',
  }, {
    id: '5',
    status: '维修完成',
  }, {
    id: '6',
    status: '报废',
  }];


const TabPane = Tabs.TabPane;

const SMMFeedManage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <div>
      <Tabs type="card">
        <TabPane tab="Feeder管理" key="1">
          <Title name="Feeder管理" />
          <FormContainer
            name="SMMFeedManageForm1"
            action={smmFeedManageTab1API}
            method="GET"
            paramTemplate={defaultGetParamTemplate2}
            filters={defaultRequestFilters}
            dataSourceTemplate={defaultDataSourceTemplate}
          >
            <div className={'searchCondition'}>
              <label htmlFor="datepicker" className={'label'}>Feeder ID</label>
              <InputContainer type="text" name="feeder_id" className={'input'} />
            </div>
            <div className={'searchCondition'}>
              <label htmlFor="select" className={'label'}>当前状态</label>
              <span className={'select'}>
                <SelectContainer
                  type="text"
                  name="status"
                  itemKey="id"
                  itemValue="status"
                  defaultValue="正常使用"
                  defaultKey="0"
                  load="true"
                  data={selData}
                />
              </span>
            </div>
            <input type="submit" value="查询" className={'button'} />
          </FormContainer>
          <Row>
            <Modal name="SMMFeedManageAdd" btnName="单个新增" title="单个新增" >
              <ModalForm
                name="SMMFeedManageAdd"
                action={smmFeedManageTab1APIAdd}
                method="POST"
                dataTemplate={smmWithPageDataTemplate}
                filters={defaultRequestFilters}
                modalName="SMMFeedManageAdd"
                formName="SMMFeedManageForm1"
              >
                <div className={'modalStyle'}>
                  <Row>
                    <label htmlFor="feeder_id">FeederID:</label>
                    <InputContainer type="text" name="feeder_id" />
                  </Row>
                  <Row className={'submitBtn'}>
                    <input type="submit" value="Submit" />
                  </Row>
                </div>
              </ModalForm>
            </Modal>
            <ActionBtn
              btnName="删除"
              mode="checkDataDel"
              action={smmFeedManageTab1APIDelete}
              method="PUT"
              tableName="SMMFeedManage1"
              formName="SMMFeedManageForm1"
              paramTemplate={() => ('')}
              selectedTemplate={rows => ({ feeder_id: rows.feeder_id })}
              dataTemplate={smmWithPageDataTemplateDel}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
            <ActionBtn
              btnName="维修"
              method="POST"
              mode="update"
              action={smmFeedManageoperate}
              tableName="SMMFeedManage1"
              formName="SMMFeedManageForm1"
              paramTemplate={() => ('')}
              selectedTemplate={rows => ({ feeder_id: rows.feeder_id, status: 5 })}
              dataTemplate={smmWithPageDataTemplate}
            />
            <ActionBtn
              btnName="保养"
              method="POST"
              mode="update"
              action={smmFeedManageoperate}
              tableName="SMMFeedManage1"
              formName="SMMFeedManageForm1"
              paramTemplate={() => ('')}
              selectedTemplate={rows => ({ feeder_id: rows.feeder_id, status: 2 })}
              dataTemplate={smmWithPageDataTemplate}
            />

            <ActionBtn
              btnName="报废"
              method="POST"
              mode="update"
              action={smmFeedManageoperate}
              tableName="SMMFeedManage1"
              formName="SMMFeedManageForm1"
              paramTemplate={() => ('')}
              selectedTemplate={rows => ({ feeder_id: rows.feeder_id, status: 6 })}
              dataTemplate={smmWithPageDataTemplate}
            />
          </Row>
          <TableContainer name="SMMFeedManage1" formName="SMMFeedManageForm1" columns={columns1} />
        </TabPane>
        <TabPane tab="Feeder保养/维修记录" key="2">
          <Title name="Feeder保养/维修记录" />
          <FormContainer
            name="SMMFeedManageForm2"
            action={smmFeedManageTab2API}
            method="GET"
            paramTemplate={defaultGetParamTemplate2}
            filters={defaultRequestFilters}
            dataSourceTemplate={defaultDataSourceTemplate}
          >
            <div className={'searchCondition'}>
              <label htmlFor="start_time" className={'label'}>时间范围</label>
              <span className={'dateInput'}>
                <DatePickerContainer name="start_time" style={{ outline: 'none' }} />
              </span>
            </div>
            <div className={'searchCondition'}>
              <label htmlFor="end_time" className={'label'}>至</label>
              <span className={'dateInput'}>
                <DatePickerContainer name="end_time" style={{ outline: 'none' }} />
              </span>
            </div>
            <div className={'searchCondition'}>
              <label htmlFor="status" className={'label'}>当前状态</label>
              <span className={'select'}>
                <SelectContainer
                  name="status"
                  itemKey="id"
                  itemValue="status"
                  defaultValue="等待送到保养"
                  defaultKey="0"
                  load="true"
                  data={selData2}
                />
              </span>
            </div>
            <div className={'searchCondition'}>
              <label htmlFor="feeder_id" className={'label'}>Feeder ID</label>
              <InputContainer type="text" name="feeder_id" className={'input'} />
            </div>
            <div className={'searchCondition'}>
              <label htmlFor="operator_id " className={'label'}>操作员</label>
              <InputContainer type="text" name="operator_id " className={'input'} />
            </div>
            <input type="submit" value="查询" className={'button'} />
          </FormContainer>
          <TableContainer name="SMMFeedManage2" formName="SMMFeedManageForm2" columns={columns2} />
        </TabPane>
      </Tabs>
    </div>


  </div>
);
SMMFeedManage.defaultProps = {

};
SMMFeedManage.propTypes = {

};

export default SMMFeedManage;
