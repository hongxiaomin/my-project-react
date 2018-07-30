import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, Checkbox, Col, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import { defaultGetParamTemplate, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import Select from '../../containers/SelectContainer';

const JigTypeSettingGroupApi = `${SERVER_IP_JIG}/ams/jig/setting/qcgroup/query/item/`;
const JigGroupSetAPI = `${SERVER_IP_JIG}/ams/jig/setting/jiggroup/query`;

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '治工具管理',
}, {
  path: '',
  name: '治具管理设定',
}, {
  path: '',
  name: '治工具群组设定',
}];

const columns = [{
  title: '序号',
  dataIndex: 'num',
  key: 'num1',
  render: (text, record, index) => index + 1,
}, {
  title: '治具群组代码',
  dataIndex: 'groupCode',
  key: 'groupCode',
}, {
  title: '治具群组名称',
  dataIndex: 'groupName',
  index: 'groupName',
}, {
  title: '治具类型',
  dataIndex: 'jigTypeName',
  index: 'jigTypeName',
}, {
  title: '治具群组描述',
  dataIndex: 'groupDesc',
  index: 'groupDesc',
}, {
  title: '创建日期',
  dataIndex: 'createDate',
  index: 'createDate',
}, {
  title: '创建人员',
  dataIndex: 'createBy',
  index: 'createBy',
}, {
  title: '最后修改时间',
  dataIndex: 'lastUpdateDate',
  index: 'lastUpdateDate',
}, {
  title: '最后修改人员',
  dataIndex: 'lastUpdateBy',
  index: 'lastUpdateBy',
}, {
  title: '状态',
  dataIndex: 'active',
  index: 'active',
}];


const JigGroupSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="治工具群组设定" />
    <FormContainer
      name="JigGroupSettingForm"
      action={JigGroupSetAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="jigTypeGroupCode" className={'label'}>治具群组代号</label>
        <span className={'select'}>
          <Select
            name="jigTypeGroupCode"
            className={'select'}
            itemKey="code"
            itemValue="code"
            action={JigTypeSettingGroupApi}
            dataSourceTemplate={defaultDataSourceTemplate}
            load="true"
          />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>治具群组名称</label>
        <InputContainer type="text" name="groupName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>治具类型</label>
        <InputContainer type="text" name="jigTypeName" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="JigGroupSettingAdd" btnName="新增" title="新增" >
        <FormContainer
          name="JigGroupSettingAdd"
          action=""
          method="GET"
          paramTemplate={defaultGetParamTemplate}
          filters={defaultRequestFilters}
        >
          <Card title="Demo" style={{ width: '100%', zIndex: 100 }} bodyStyle={{ padding: 0, zIndex: 200 }}>
            <Row>
              <Col span="8">
                <label htmlFor="input" />
              </Col>
              <Col span="16">
                <InputContainer type="text" name="input" />
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <input type="submit" value="submit" />
              </Col>
            </Row>
            <br />
          </Card>
        </FormContainer>
      </Modal>
      <Modal name="JigGroupSettingCopy" btnName="复制" title="复制" >
        <FormContainer
          name="JigGroupSettingCopy"
          action=""
          method="GET"
          paramTemplate={defaultGetParamTemplate}
          filters={defaultRequestFilters}
        >
          <Card title="Demo" style={{ width: '100%', zIndex: 100 }} bodyStyle={{ padding: 0, zIndex: 200 }}>
            <Row>
              <Col span="8">
                <label htmlFor="input" />
              </Col>
              <Col span="16">
                <InputContainer type="text" name="input" />
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <input type="submit" value="submit" />
              </Col>
            </Row>
            <br />
          </Card>
        </FormContainer>
      </Modal>

      <Modal name="JigGroupSettingupdate" btnName="修改" title="修改" >
        <FormContainer
          name="JigGroupSettingupdate"
          action=""
          method="GET"
          paramTemplate={defaultGetParamTemplate}
          filters={defaultRequestFilters}
        >
          <Card title="Demo" style={{ width: '100%', zIndex: 100 }} bodyStyle={{ padding: 0, zIndex: 200 }}>
            <Row>
              <Col span="8">
                <label htmlFor="input" />
              </Col>
              <Col span="16">
                <InputContainer type="text" name="input" />
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <input type="submit" value="submit" />
              </Col>
            </Row>
            <br />
          </Card>
        </FormContainer>
      </Modal>

      <Button type="primary"><Icon type="reload" />刷新</Button>
      <Button type="primary"><Icon type="eye" />隐藏</Button>
      <Button type="primary"><Icon type="eye-o" />取消隐藏</Button>
      <Checkbox>显示隐藏项</Checkbox>
    </div>
    <TableContainer name="JigGroupSetting" formName="JigGroupSetting" columns={columns} />

  </div>
);
JigGroupSetting.defaultProps = {

};
JigGroupSetting.propTypes = {

};

export default JigGroupSetting;
