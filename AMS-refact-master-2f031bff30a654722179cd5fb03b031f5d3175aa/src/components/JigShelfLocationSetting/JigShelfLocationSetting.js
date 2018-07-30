import React from 'react';
import { Card, Col, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Select from '../../containers/SelectContainer';
import Modal from '../../containers/ModalContainer';
import ModalForm from '../../containers/ModalFormContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters, defaultDataSourceTemplate, defaultPostDataTemplate, defaultPutParamTemplate, SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';
import ActionBtn from '../../containers/ActionBtnContainer';

const jigShelfLocationSettingAPI = `${SERVER_IP_JIG}/ams/jig/base/shelf/query`;
// const jigShelfLocationSettingAddApi = `${SERVER_IP_JIG}/ams/jig/base/shelf/add`;
const JigScrapReasonSettingAPIPost = `${SERVER_IP_JIG}/ams/jig/base/shelf/add`;
const JigScrapReasonSettingAPIPut = `${SERVER_IP_JIG}/ams/jig/base/shelf/update`;
const JigTypeAPI = `${SERVER_IP_JIG}/ams/jig/setting/jigtype/query/item`;

const MainFormName = 'JigShelfLocationSettingForm';
const MainTableName = 'JigShelfLocationSetting';
const setDate1 = [{
  id: '1',
  name: 'A',
}, {
  id: '2',
  name: 'B',
}];
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
  name: '架位设定',
}];
const showData = [{
  id: 'Y',
  name: '显示项',
}, {
  id: 'N',
  name: '隐藏项',
}];
const columns = [{
  title: '序号',
  dataIndex: 'name1',
  key: 'name1',
  render: (text, record, index) => index + 1,
}, {
  title: '架位二维码',
  dataIndex: 'shelfCode',
  key: 'shelfCode',
}, {
  title: '治具类型',
  dataIndex: 'jigTypeName',
  index: 'jigTypeName',
}, {
  title: '货架编号',
  dataIndex: 'shelfNo',
  index: 'shelfNo',
}, {
  title: 'LED编号',
  dataIndex: 'name5',
  index: 'name5',
}, {
  title: 'LED状态',
  dataIndex: 'ledStatus',
  index: 'ledStatus',
}, {
  title: '更新时间',
  dataIndex: 'lastUpdateDate',
  index: 'lastUpdateDate',
}];

const jigShelfLocationSetting = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="架位设定" />
    <FormContainer
      name={MainFormName}
      action={jigShelfLocationSettingAPI}
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>架位二维码</label>
        <InputContainer type="text" name="shelfCode" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>治具类型</label>
        <InputContainer type="text" name="jigTypeName" className={'input'} />
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="active" className={'label'}>显示项/隐藏项</label>
        <span className={'select'}>
          <Select
            name="active"
            className={'select'}
            itemKey="id"
            itemValue="name"
            data={showData}
            load="true"
          />
        </span>
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <div className={'divBtn'}>
      <Modal name="JigShelfLocationSettingAdd" btnName="新增" title="新增" >
        <ModalForm
          name="JigShelfLocationSettingAdd"
          action={JigScrapReasonSettingAPIPost}
          method="POST"
          filters={defaultRequestFilters}
          dataTemplate={defaultPostDataTemplate}
          modalName="JigShelfLocationSettingAdd"
          formName={MainFormName}
        >
          <div className={'modalStyle'}>
            <Row className={'searchCondition'} style={{ position: 'relative', marginTop: '30px', marginBottom: '-10px' }}>
              <label htmlFor="input">治具类型</label>
              <span className={'select'} style={{ marginLeft: '0px' }}>
                <Select
                  name="jigTypeId"
                  action={JigTypeAPI}
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  dataSourceTemplate={defaultDataSourceTemplate}
                />
              </span>
            </Row>
            <Row>
              <label htmlFor="datepicker">架位号</label>
              <InputContainer type="text" name="shelfNo" />
            </Row>
            <Row className={'searchCondition'} style={{ position: 'relative', marginTop: '16px', marginBottom: '-10px' }}>
              {/* <label htmlFor="input">架位面别</label>
              <InputContainer type="text" name="shelfSide" /> */}
              {/* <div className={'searchCondition'}> */}
              <label htmlFor="side" className={'label'}>面别</label>
              <span className={'select'} style={{ marginLeft: '0px' }}>
                <Select
                  name="shelfSide"
                  itemKey="id"
                  itemValue="name"
                  load="true"
                  data={setDate1}
                />
              </span>
              {/* </div> */}
            </Row>
            <Row>
              <label htmlFor="input">架位层数</label>
              <InputContainer type="text" name="shelfLayer" />
            </Row>
            <Row>
              <label htmlFor="input">储位数量</label>
              <InputContainer type="text" name="areaCode" />
            </Row>
            <Row className={'submitBtn'}>
              <input type="submit" value="Submit" />
            </Row>
          </div>
        </ModalForm>
      </Modal>
      <Modal name="JigShelfLocationSettingCopy" btnName="复制" title="复制" >
        <FormContainer
          name="JigShelfLocationSettingCopy"
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

      <Modal name="JigShelfLocationSettingupdate" btnName="修改" title="修改" >
        <FormContainer
          name="JigShelfLocationSettingupdate"
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
      <ActionBtn
        btnName="刷新"
        mode="refresh"
        action={JigScrapReasonSettingAPIPut}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
      <ActionBtn
        btnName="隐藏"
        mode="hide"
        action={JigScrapReasonSettingAPIPut}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
      <ActionBtn
        btnName="取消隐藏"
        mode="show"
        action={JigScrapReasonSettingAPIPut}
        tableName={MainTableName}
        formName={MainFormName}
        paramTemplate={defaultPutParamTemplate}
      />
    </div>
    <TableContainer
      name={MainTableName}
      formName={MainFormName}
      columns={columns}
    />
  </div>
);
jigShelfLocationSetting.defaultProps = {

};
jigShelfLocationSetting.propTypes = {

};

export default jigShelfLocationSetting;
