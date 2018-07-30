import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import Input from '../../containers/InputContainer';
import Select from '../../containers/SelectContainer';
import QueryTable from '../../containers/QueryTableContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPostDataTemplate,
  defaultGetParamTemplate2,
  SERVER_IP_PCB } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import SelectContainer from '../../containers/SelectContainer';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';

const PCBShelfConfigAPI = `${SERVER_IP_PCB}/ams/pcb/subshelf`;
const PCBHJAddAPI = `${SERVER_IP_PCB}/ams/pcb/shelf/add`;
const PCBShelfAddAPI = `${SERVER_IP_PCB}/ams/pcb/subshelf/add`;
const PCBFloorAPI = `${SERVER_IP_PCB}/ams/pcb/shelf`;
const PCBShelfUpdateAPI = `${SERVER_IP_PCB}/ams/pcb/subshelf/update`;

const paramTemplate = data => ({
  condition: [{ floor: data }],
});
const paramTemplate2 = data => ({
  condition: [{ serial: data }],
});
const PCBShelfPramTemplate = params => ({
  value: JSON.stringify([{ id: params.id,
    code: params.code,
    shelfSerial: params.shelfSerial,
    subshelfSerial: params.subshelfSerial,
    lightSerial: params.lightSerial }]),
});
// const PCBShelfPramTemplate = params => console.log('param', params);
const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num1',
    render: (text, record, index) => index + 1,
  }, {
    title: '架位编号',
    dataIndex: 'shelfSerial',
    key: 'shelfSerial',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="PCBShelfConfigTableForm"
          name="shelfSerial"
        />
      );
    },
  }, {
    title: '架位二维码',
    dataIndex: 'code',
    key: 'code',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="PCBShelfConfigTableForm"
          name="code"
        />
      );
    },
  }, {
    title: '层',
    dataIndex: 'height',
    key: 'height',
  }, {
    title: '货架编号',
    dataIndex: 'subshelfSerial',
    key: 'subshelfSerial',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="PCBShelfConfigTableForm"
          name="subshelfSerial"
        />
      );
    },
  }, {
    title: 'LED编号',
    dataIndex: 'lightSerial',
    key: 'lightSerial',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          formName="PCBShelfConfigTableForm"
          name="lightSerial"
        />
      );
    },
  },
  {
    title: '操作',
    dataIndex: 'name',
    key: 'name',
    render: (text, record, index) => {
      const { editable } = record;
      return (
        <div>
          {
            <EditableCellButton
              editable={editable}
              index={index}
              formName="PCBShelfConfigTableForm"
              tableName="PCBShelfConfigTable"
              needForName="PCBShelfConfigTableForm"
              needData="id"
              action={PCBShelfUpdateAPI}
              method="PUT"
              record={record}
              paramTemplate={PCBShelfPramTemplate}
              filters={defaultRequestFilters}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          }
        </div>
      );
    },
  },
];
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'PCB',
}, {
  path: '',
  name: '参数配置',
}, {
  path: '',
  name: '架位配置',
}];
const PCBShelfConfig = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="架位配置" />
    <FormContainer
      name="PCBShelfConfigTableForm"
      action={PCBShelfConfigAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate2}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="code" className={'label'}>二维码</label>
        <Input type="text" name="code" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="subshelfSerial" className={'label'}>货架编号</label>
        <Input type="text" name="subshelfSerial" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="shelfSerial" className={'label'}>架位编号</label>
        <Input type="text" name="shelfSerial" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="lightSerial" className={'label'}>LED编号</label>
        <Input type="text" name="lightSerial" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'} style={{ marginBottom: '20px' }}>
      <Modal name="PCBHJAdd" btnName="新增货架" title="新增货架" >
        <ModalForm
          name="PCBHJAdd"
          action={PCBHJAddAPI}
          method="POST"
          filters={defaultRequestFilters}
          dataTemplate={defaultPostDataTemplate}
          modalName="PCBHJAdd"
          formName="PCBShelfConfigTableForm"
        >
          <div className={'modalStyle'}>
            <Row>
              <label htmlFor="floor">楼层</label>
              <Input type="text" name="floor" />
            </Row>
            <Row>
              <label htmlFor="serial">货架编号</label>
              <Input type="text" name="serial" />
            </Row>
            <Row>
              <label htmlFor="height">货架层数</label>
              <Input type="text" name="height" />
            </Row>
            <Row className={'selectLabel'}>
              <label htmlFor="layerSize">每层架位数</label>
              <Input type="text" name="layerSize" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal name="PCBShelfAdd" btnName="新增架位" title="新增架位" >
        <ModalForm
          name="PCBShelfAdd"
          action={PCBShelfAddAPI}
          method="POST"
          filters={defaultRequestFilters}
          dataTemplate={defaultPostDataTemplate}
          modalName="PCBShelfAdd"
          formName="PCBShelfConfigTableForm"
        >
          <div className={'modalStyle'}>
            <GroupSelectContainer name="GroupSelectName">
              <Row style={{ marginBottom: '18px' }}>
                <label htmlFor="serial">楼层</label>
                <span className="select" style={{ left: '115px' }}>
                  <SelectContainer
                    name="floor"
                    action={PCBFloorAPI}
                    itemKey="floor"
                    itemValue="floor"
                    load="true"
                    next="shelfSerial"
                    dataSourceTemplate={(res) => {
                      let data = [];
                      res.rows.map(x => (
                      Object.keys(x).forEach(key => (
                        key === 'floor' ? data.push(x[key]) : null
                      ))
                    ));
                      data = [...new Set(data)].map(v => ({ floor: v }));
                      return data;
                    }}
                  />
                </span>
              </Row>
              <Row style={{ marginBottom: '18px' }}>
                <label htmlFor="shelfSerial">货架编号</label>
                <span className="select" style={{ left: '115px' }}>
                  <SelectContainer
                    name="shelfSerial"
                    itemKey="serial"
                    itemValue="serial"
                    action={PCBFloorAPI}
                    paramTemplate={paramTemplate}
                    dataSourceTemplate={defaultDataSourceTemplate}
                    next="height"
                  />
                </span>
              </Row>
              <Row>
                <label htmlFor="height">货架层数</label>
                <span className="select" style={{ left: '115px' }}>
                  <SelectContainer
                    name="height"
                    itemKey="height"
                    itemValue="height"
                    action={PCBFloorAPI}
                    paramTemplate={paramTemplate2}
                    // dataSourceTemplate={defaultDataSourceTemplate}
                    dataSourceTemplate={(res) => {
                      let data1 = [];
                      res.rows.map(x => (
                      Object.keys(x).forEach(key => (
                        key === 'height' ? data1.push(x[key]) : null
                      ))
                    ));
                      data1 = [...new Set(data1)];
                      const data = [];
                      for (let i = 1; i <= data1[0]; i++) {
                        const dataObject = { height: i };
                        data.push(dataObject);
                      }
                      return data;
                    }}
                  />
                </span>
              </Row>
            </GroupSelectContainer>
            <Row className={'selectLabel'}>
              <label htmlFor="subshelfSerial">架位编号</label>
              <Input type="text" name="subshelfSerial" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
    </div>
    <TableContainer
      name="PCBShelfConfigTable"
      formName="PCBShelfConfigTableForm"
      columns={columns}
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    />
  </div>
);
PCBShelfConfig.defaultProps = {

};
PCBShelfConfig.propTypes = {

};

export default PCBShelfConfig;
