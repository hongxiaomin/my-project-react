import React from 'react';
import { Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import FormContainer from '../../containers/FormContainer';
import TableContainer from '../../containers/TableContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import './style.less';
import {
  EQMAddPostDataTemplate,
  EQMUpdatePutDataTemplate,
  bomGetParamTemplate,
  defaultRequestFilters,
  defaultDataSourceTemplate,
  EQMHideDataParamTemplate,
  EQMShowDataParamTemplate,
  SERVER_IP_EQM } from '../../constants/Settings';

const EQMPartSetApi = `${SERVER_IP_EQM}/ams/eqm/part/model`;
const ModelItemApi = `${SERVER_IP_EQM}/ams/eqm/part/model/item`;
const TypeItemApi = `${SERVER_IP_EQM}/ams/eqm/part/type/item`;
const ModelItemActive = `${SERVER_IP_EQM}/ams/eqm/part/model/active`;

const targetKeyUpdate = ['modelCode', 'modelName', 'modelDesc', 'partTypeId', 'thresholdInventoryMin', 'thresholdInventoryMax', 'inventory', 'id'];

const columns = [
  {
    title: '序号',
    dataIndex: 'number',
    key: 'number',
    render: (text, record, index) => {
      if (record.inventory < record.thresholdInventoryMin) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{(index + 1)}</p>);
      } else if (record.inventory > record.thresholdInventoryMax) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{(index + 1)}</p>);
      } else if (record.thresholdInventoryMax === 0 || record.thresholdInventoryMin === 0 || ((record.thresholdInventoryMax >= record.inventory && record.thresholdInventoryMin <= record.inventory))) {
        return (<p className={'inlineTable'}>{(index + 1)}</p>);
      }
    },
  }, {
    title: '型号名称',
    dataIndex: 'modelName',
    key: 'modelName',
    render: (text, record) => {
      if (record.inventory < record.thresholdInventoryMin) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.modelName}</p>);
      } else if (record.inventory > record.thresholdInventoryMax) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.modelName}</p>);
      } else if (record.thresholdInventoryMax === 0 || record.thresholdInventoryMin === 0 || ((record.thresholdInventoryMax >= record.inventory && record.thresholdInventoryMin <= record.inventory))) {
        return (<p className={'inlineTable'}>{record.modelName}</p>);
      }
    },
  }, {
    title: '型号代码',
    dataIndex: 'modelCode',
    index: 'modelCode',
    render: (text, record) => {
      if (record.inventory < record.thresholdInventoryMin) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.modelCode}</p>);
      } else if (record.inventory > record.thresholdInventoryMax) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.modelCode}</p>);
      } else if (record.thresholdInventoryMax === 0 || record.thresholdInventoryMin === 0 || ((record.thresholdInventoryMax >= record.inventory && record.thresholdInventoryMin <= record.inventory))) {
        return (<p className={'inlineTable'}>{record.modelCode}</p>);
      }
    },
  }, {
    title: '型号描述',
    dataIndex: 'modelDesc',
    index: 'modelDesc',
    render: (text, record) => {
      if (record.inventory < record.thresholdInventoryMin) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.modelDesc}</p>);
      } else if (record.inventory > record.thresholdInventoryMax) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.modelDesc}</p>);
      } else if (record.thresholdInventoryMax === 0 || record.thresholdInventoryMin === 0 || ((record.thresholdInventoryMax >= record.inventory && record.thresholdInventoryMin <= record.inventory))) {
        return (<p className={'inlineTable'}>{record.modelDesc}</p>);
      }
    },
  }, {
    title: '所属类型',
    dataIndex: 'typeName',
    index: 'typeName',
    render: (text, record) => {
      const { partType } = record;
      if (record.inventory < record.thresholdInventoryMin) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{ partType.typeName}</p>);
      } else if (record.inventory > record.thresholdInventoryMax) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{ partType.typeName}</p>);
      } else if (record.thresholdInventoryMax === 0 || record.thresholdInventoryMin === 0 || ((record.thresholdInventoryMax >= record.inventory && record.thresholdInventoryMin <= record.inventory))) {
        return (<p className={'inlineTable'}>{ partType.typeName}</p>);
      }
    },
  }, {
    title: '当前库存',
    dataIndex: 'inventory',
    index: 'inventory',
    render: (text, record) => {
      if (record.inventory < record.thresholdInventoryMin) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.inventory}</p>);
      } else if (record.inventory > record.thresholdInventoryMax) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.inventory}</p>);
      } else if (record.thresholdInventoryMax === 0 || record.thresholdInventoryMin === 0 || ((record.thresholdInventoryMax >= record.inventory && record.thresholdInventoryMin <= record.inventory))) {
        return (<p className={'inlineTable'}>{record.inventory}</p>);
      }
    },
  }, {
    title: '库存阈值(Min)',
    dataIndex: 'thresholdInventoryMin',
    index: 'thresholdInventoryMin',
    render: (text, record) => {
      if (record.inventory < record.thresholdInventoryMin) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.thresholdInventoryMin}</p>);
      } else if (record.inventory > record.thresholdInventoryMax) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.thresholdInventoryMin}</p>);
      } else if (record.thresholdInventoryMax === 0 || record.thresholdInventoryMin === 0 || ((record.thresholdInventoryMax >= record.inventory && record.thresholdInventoryMin <= record.inventory))) {
        return (<p className={'inlineTable'}>{record.thresholdInventoryMin}</p>);
      }
    },
  }, {
    title: '库存阈值(Max)',
    dataIndex: 'thresholdInventoryMax',
    index: 'thresholdInventoryMax',
    render: (text, record) => {
      if (record.inventory < record.thresholdInventoryMin) {
        return (<p style={{ background: 'red' }} className={'inlineTable'}>{record.thresholdInventoryMax}</p>);
      } else if (record.inventory > record.thresholdInventoryMax) {
        return (<p style={{ background: '#ffff00' }} className={'inlineTable'}>{record.thresholdInventoryMax}</p>);
      } else if (record.thresholdInventoryMax === 0 || record.thresholdInventoryMin === 0 || ((record.thresholdInventoryMax >= record.inventory && record.thresholdInventoryMin <= record.inventory))) {
        return (<p className={'inlineTable'}>{record.thresholdInventoryMax}</p>);
      }
    },
  }];

const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '零件管理',
}, {
  path: '',
  name: '零件型号配置',
}];
const EQMPartModSet = props => (
  <div className="EQMPartModSet">
    <Bread breadMap={breadMap} />
    <Title name="零件型号配置" />
    <FormContainer
      name="EQMPartModSetForm"
      action={EQMPartSetApi}
      method="GET"
      paramTemplate={bomGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="modelName" className={'label'}>型号名称</label>
        <span className={'select'}>
          <SelectContainer
            name="modelName"
            className={'select'}
            itemKey="name"
            itemValue="name"
            load="true"
            action={ModelItemApi}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="modelCode" className={'label'}>型号代码</label>
        <span className={'select'}>
          <SelectContainer
            name="modelCode"
            className={'select'}
            itemKey="code"
            itemValue="code"
            load="true"
            action={ModelItemApi}
            dataSourceTemplate={defaultDataSourceTemplate}
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <span className={'select'}>
          <SelectContainer
            name="active"
            className={'select'}
            itemKey="id"
            itemValue="name"
            data={showData}
            load="true"
            defaultKey="Y"
            defaultValue="显示项"
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="EQMModSetAdd" btnName="新增" title="新增" >
        <ModalForm
          name="EQMModSetAdd"
          action={EQMPartSetApi}
          method="POST"
          dataTemplate={EQMAddPostDataTemplate}
          formName="EQMPartModSetForm"
          filters={defaultRequestFilters}
          modalName="EQMModSetAdd"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="modelCode">型号代码</label>
              <InputContainer type="text" name="modelCode" />
            </Row>
            <Row>
              <label htmlFor="modelName">型号名称</label>
              <InputContainer type="text" name="modelName" />
            </Row>
            <Row>
              <label htmlFor="modelDesc">型号描述</label>
              <InputContainer type="text" name="modelDesc" />
            </Row>
            <Row>
              <label htmlFor="inventory">型号库存</label>
              <InputContainer type="text" name="inventory" />
            </Row>
            <Row>
              <label htmlFor="partTypeId">所属类型</label>
              <span className={'select'}>
                <SelectContainer
                  name="partTypeId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  action={TypeItemApi}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="thresholdInventoryMin">库存阈值(Min)</label>
              <InputContainer type="text" name="thresholdInventoryMin" />
            </Row>
            <Row>
              <label htmlFor="thresholdInventoryMax">库存阈值(Max)</label>
              <InputContainer type="text" name="thresholdInventoryMax" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal
        name="EQMModSetUpdate"
        formName="EQMPartModSetForm"
        tableName="EQMPartModSetTab"
        btnName="修改"
        title="修改"
        load="true"
        tarKey={targetKeyUpdate}
      >
        <ModalForm
          name="EQMModSetUpdate"
          modalName="EQMModSetUpdate"
          action={EQMPartSetApi}
          method="PUT"
          paramTemplate={() => ('')}
          dataTemplate={EQMUpdatePutDataTemplate}
          filters={defaultRequestFilters}
          formName="EQMPartModSetForm"
          tableName="EQMPartModSetTab"
        >
          <div className="modalStyle">
            <Row>
              <label htmlFor="modelCode">型号代码</label>
              <InputContainer type="text" name="modelCode" />
            </Row>
            <Row>
              <label htmlFor="modelName">型号名称</label>
              <InputContainer type="text" name="modelName" />
            </Row>
            <Row>
              <label htmlFor="modelDesc">型号描述</label>
              <InputContainer type="text" name="modelDesc" />
            </Row>
            <Row>
              <label htmlFor="inventory">型号库存</label>
              <InputContainer type="text" name="inventory" />
            </Row>
            <Row>
              <label htmlFor="partTypeId">所属类型</label>
              <span className={'select'}>
                <SelectContainer
                  name="partTypeId"
                  className={'select'}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  noClr
                  action={TypeItemApi}
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="thresholdInventoryMin">库存阈值(Min)</label>
              <InputContainer type="text" name="thresholdInventoryMin" />
            </Row>
            <Row>
              <label htmlFor="thresholdInventoryMax">库存阈值(Max)</label>
              <InputContainer type="text" name="thresholdInventoryMax" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="提交" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <ActionBtn
        btnName="隐藏"
        mode="update"
        action={ModelItemActive}
        tableName="EQMPartModSetTab"
        formName="EQMPartModSetForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMHideDataParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="update"
        action={ModelItemActive}
        tableName="EQMPartModSetTab"
        formName="EQMPartModSetForm"
        paramTemplate={() => ('')}
        dataTemplate={EQMShowDataParamTemplate}
      />
    </div>
    <TableContainer
      name="EQMPartModSetTab"
      formName="EQMPartModSetForm"
      columns={columns}
      onRowClick
    />
  </div>
);
EQMPartModSet.defaultProps = {

};
EQMPartModSet.propTypes = {

};

export default EQMPartModSet;
