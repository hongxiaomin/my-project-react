import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, Checkbox, Col, Row } from 'antd';
import Bread from '../Bread';
import Title from '../Title';
import Modal from '../../containers/ModalContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import { defaultGetParamTemplate, defaultRequestFilters, defaultDataSourceTemplate, SERVER_IP_JIG } from '../../constants/Settings';
import TableContainer from '../../containers/TableContainer';


const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '治工具管理',
}, {
  path: '',
  name: '治具作业',
}, {
  path: '',
  name: '库存管理',
}];

const columns = [{
  title: '序号',
  dataIndex: 'name1',
  key: 'name1',
}, {
  title: '二维码',
  dataIndex: 'name2',
  key: 'name2',
}, {
  title: '状态',
  dataIndex: 'name3',
  index: 'name3',
}, {
  title: '主板',
  dataIndex: 'name4',
  index: 'name4',
}, {
  title: '小板',
  dataIndex: 'name5',
  index: 'name5',
}, {
  title: '钢网类型',
  dataIndex: 'name6',
  index: 'name6',
}, {
  title: '组合料号',
  dataIndex: 'name7',
  index: 'name7',
}, {
  title: '面别',
  dataIndex: 'name8',
  index: 'name8',
}, {
  title: '厚度',
  dataIndex: 'name9',
  index: 'name9',
}, {
  title: '钢网版本',
  dataIndex: 'name10',
  index: 'name10',
}, {
  title: 'PCB料号',
  dataIndex: 'name11',
  index: 'name11',
}, {
  title: 'PCB版本',
  dataIndex: 'name12',
  index: 'name12',
}, {
  title: 'PCB Code',
  dataIndex: 'name13',
  index: 'name13',
}, {
  title: '刮刀尺寸',
  dataIndex: 'name14',
  index: 'name14',
}, {
  title: '刮刀角度',
  dataIndex: 'name15',
  index: 'name15',
}, {
  title: '使用寿命',
  dataIndex: 'name16',
  index: 'name16',
}, {
  title: '制作日期',
  dataIndex: 'name17',
  index: 'name17',
}, {
  title: '制作厂商',
  dataIndex: 'name18',
  index: 'name18',
}];

const JigWorkInventorySearchPage = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="库存管理" />
    <div className={'divBtn'} style={{ marginBottom: `${20}px` }}>
      <Modal name="JigWorkInventorySearchAdd" btnName="新增" title="新增" >
        <FormContainer
          name="JigWorkInventorySearchAdd"
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
      <Modal name="JigWorkInventorySearchCopy" btnName="复制" title="复制" >
        <FormContainer
          name="JigWorkInventorySearchCopy"
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

      <Modal name="JigWorkInventorySearchupdate" btnName="修改" title="修改" >
        <FormContainer
          name="JigWorkInventorySearchupdate"
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
    <FormContainer
      name="JigWorkInventorySearchForm"
      action=""
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
    >
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>治具类型</label>
        <span className={'select'}>
          <SelectContainer type="text" name="select1" />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="select" className={'label'}>状态</label>
        <span className={'select'}>
          <SelectContainer type="text" name="select1" />
        </span>
      </div>
      <div className={'searchCondition'}>
        <label htmlFor="input" className={'label'}>二维码</label>
        <InputContainer type="text" name="input" className={'input'} />
      </div>
      <input type="submit" value="查询" className={'button'} />
    </FormContainer>
    <TableContainer name="JigWorkInventorySearch" formName="JigWorkInventorySearchForm" columns={columns} />
  </div>
  );
JigWorkInventorySearchPage.defaultProps = {

};
JigWorkInventorySearchPage.propTypes = {

};

export default JigWorkInventorySearchPage;
