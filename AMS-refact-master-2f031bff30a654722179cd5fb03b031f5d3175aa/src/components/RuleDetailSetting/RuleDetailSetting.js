import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import Bread from '../Bread';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import {
  defaultRequestFilters,
  defaultDataSourceTemplate,
  defaultPutParamTemplateRule,
  defaultParamTemplateAddRule,
  defaultGetParamTemplateSel,
  SERVER_IP_RULE,
} from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';

import ActionBtn from '../../containers/ActionBtnContainer';
import ModalForm from '../../containers/ModalFormContainer';
import Modal from '../../containers/ModalContainer';
import Select from '../../containers/SelectContainer';


import ActionBtnShowSureModel from '../../containers/ActionBtnShowSureModelContainer';


const RuleDetailSettingApi = `${SERVER_IP_RULE}/webapi/ams/route/rule/detail`;
const RuleSettingApi = `${SERVER_IP_RULE}/webapi/ams/route/rule`;

const targetKeyModify = ['rule_id', 'source_node', 'id', 'condition', 'dest_node'];



const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '途程管理',
}, {
  path: '',
  name: '规则详情设定',
}];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '规则名称',
  dataIndex: 'ruleIdName',
  key: 'ruleIdName',
  
}, {
  title: '上一个节点',
  dataIndex: 'sourceNodeName',
  key: 'sourceNodeName',
  render: (text) => {
    if (text) {
      return text;
    } else {
      return '--';
    }
  }
}, {
  title: '条件',
  dataIndex: 'condition',
  key: 'condition',
 
}, {
  title: '下一个节点',
  dataIndex: 'destNodeName',
  key: 'destNodeName',
  render: (text) => {
    if (text) {
      return text;
    } else {
      return '--';
    }
  }
}, {
  title: '最后修改人员',
  dataIndex: 'last_update_by',
  key: 'last_update_by',
}, {
  title: '最后修改时间',
  dataIndex: 'last_update_date',
  key: 'last_update_date',
}];


const deleteUrlTemplate = (param) => {
  const data = { id: param };
  return {
    param: [data],
  };
};



const RuleDetailSetting = props => (
  <div className='ruleDetailSettingPage'>
    <Bread breadMap={breadMap} />
    <Title name="规则详情设定" />
    <FormContainer
      name="RuleDetailSettingForm"
      action={RuleDetailSettingApi}
      method="GET"
      paramTemplate={defaultPutParamTemplateRule}
      responseFormatter={res => JSON.parse(res)}
      dataSourceTemplate={defaultDataSourceTemplate}
      filters={defaultRequestFilters}
    >

      <div className={'searchCondition'}>

        <label htmlFor="rule_id" className={'label'}>规则名称</label>
        <span className={'select'}>
          <Select
            name="rule_id"
            className={'select'}
            itemKey="id"
            itemValue="name"
            action={RuleSettingApi}
            load="true"
            paramTemplate={defaultGetParamTemplateSel}
            responseFormatter={res => JSON.parse(res)}
            dataSourceTemplate={(response) => {
              const dataSource = response.rows;
              const newDataSource = [];
              if (Array.isArray(dataSource) && dataSource.length > 0) {
                dataSource.map((v, i) => {
                  newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                });
              }
              return newDataSource;
            }}
          />
        </span>
      </div>

      <input type="submit" value="查询" className={'button'} />
    </FormContainer>



    <Modal name="RuleDetailSettingAdd" btnName="新增" title="新增" >
      <ModalForm
        name="RuleDetailSettingAdd"
        action={RuleDetailSettingApi}
        method="POST"
        dataTemplate={defaultParamTemplateAddRule}
        filters={defaultRequestFilters}
        modalName="RuleDetailSettingAdd"
        formName="RuleDetailSettingForm"
      >
        <div className={'modalStyle'}>
          <Row  style={{paddingBottom:'5'}}>
            <label htmlFor="rule_id">规则名称</label>
            <span className={'select'}>
              <Select
                name="rule_id"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RuleSettingApi}
                load="true"
                paramTemplate={defaultGetParamTemplateSel}
                responseFormatter={res => JSON.parse(res)}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="source_node">上一个节点</label>
            <span className={'select'}>
              <Select
                name="source_node"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RuleSettingApi}
                load="true"
                paramTemplate={defaultGetParamTemplateSel}
                responseFormatter={res => JSON.parse(res)}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="condition">条件</label>
            <InputContainer type="text" name="condition" />
          </Row>
          <Row>
            <label htmlFor="dest_node">下一个节点</label>
             <span className={'select'}>
              <Select
                name="dest_node"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RuleSettingApi}
                load="true"
                paramTemplate={defaultGetParamTemplateSel}
                responseFormatter={res => JSON.parse(res)}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row style={{ display: 'none' }}>
            <label htmlFor="username">用户名</label>
            <InputContainer type="text" name="username" value="Admin" />
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>

    <Modal
      name="RuleDetailSettingUpdate"
      btnName="修改"
      title="修改"
      formName="RuleDetailSettingForm"
      tableName="RuleDetailSettingTable"
      load="true"
      tarKey={targetKeyModify}
    >
      <ModalForm
        name="RuleDetailSettingUpdate"
        action={RuleDetailSettingApi}
        method="PUT"
        filters={defaultRequestFilters}
        paramTemplate={() => { }}
        dataTemplate={defaultParamTemplateAddRule}
        modalName="RuleDetailSettingUpdate"
        formName="RuleDetailSettingForm"
        tableName="RuleDetailSettingTable"
      >
        <div className={'modalStyle'}>
          <Row style={{paddingBottom:'5'}}>
            <label htmlFor="rule_id">规则名称</label>
            <span className={'select'} style={{marginLeft:'0'}}>
              <Select
                name="rule_id"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RuleSettingApi}
                load="true"
                noClr
                disabled
                paramTemplate={defaultGetParamTemplateSel}
                responseFormatter={res => JSON.parse(res)}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="source_node">上一个节点</label>
            <span className={'select'}>
              <Select
                name="source_node"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RuleSettingApi}
                load="true"
                noClr
                paramTemplate={defaultGetParamTemplateSel}
                responseFormatter={res => JSON.parse(res)}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row>
            <label htmlFor="condition">条件</label>
            <InputContainer type="text" name="condition" />
          </Row>
          <Row>
            <label htmlFor="dest_node">下一个节点</label>
            <span className={'select'}>
              <Select
                name="dest_node"
                className={'select'}
                itemKey="id"
                itemValue="name"
                action={RuleSettingApi}
                load="true"
                noClr
                paramTemplate={defaultGetParamTemplateSel}
                responseFormatter={res => JSON.parse(res)}
                dataSourceTemplate={(response) => {
                  const dataSource = response.rows;
                  const newDataSource = [];
                  if (Array.isArray(dataSource) && dataSource.length > 0) {
                    dataSource.map((v, i) => {
                      newDataSource.push({ id: v.id, name: `${v.code}--${v.name}` });
                    });
                  }
                  return newDataSource;
                }}
              />
            </span>
          </Row>
          <Row style={{ display: 'none' }}>
            <label htmlFor="username">用户名</label>
            <InputContainer type="text" name="username" value="Admin" />
          </Row>
          <Row className={'submitBtn'}>
            <input type="submit" value="Submit" />
          </Row>
        </div>
      </ModalForm>
    </Modal>
    <ActionBtn
      btnName="刷新"
      mode="refresh"
      action={RuleDetailSettingApi}
      tableName="RuleDetailSettingTable"
      formName="RuleDetailSettingForm"
      paramTemplate={defaultPutParamTemplateRule}
    />

    <ActionBtnShowSureModel
      btnName="删除"
      mode="delete"
      action={RuleDetailSettingApi}
      tableName="RuleDetailSettingTable"
      formName="RuleDetailSettingForm"
      dataTemplate={deleteUrlTemplate}
      responseFormatter={res => JSON.parse(res)}
      newDeleteMethod
    />

    <div style={{ width: '100%', overflow: 'auto', marginBottom: '70px' }}>
      <div style={{ minWidth: '1200px' }}>
        <TableContainer
          name="RuleDetailSettingTable"
          formName="RuleDetailSettingForm"
          columns={columns}
          responseFormatter={res => JSON.parse(res)}
          isRadio
          dataSourceTemplate={defaultDataSourceTemplate}
        />
      </div>
    </div>
  </div>
);
RuleDetailSetting.defaultProps = {

};
RuleDetailSetting.propTypes = {

};

export default RuleDetailSetting;
