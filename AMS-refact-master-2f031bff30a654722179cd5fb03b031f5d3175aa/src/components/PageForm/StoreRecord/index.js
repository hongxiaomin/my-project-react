/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Col, Row } from 'antd';
import InputContainer from '../../../containers/InputContainer';
import FormContainer from '../../../containers/FormContainer';
import Card from '../../../components/Card';
import {
  defaultGetParamTemplate,
  defaultRequestFilters } from '../../../constants/Settings';
import './style.less';

const StoreRecord = () => (
  <div>
    <FormContainer
      name="StoreRecord"
      action="http://localhost/sample/api/service"
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
    >
      <Card title="庫存紀錄">
        <br />
        <Row type="flex" justify="center" align="middle">
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="jigTypeName">治具類型</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="jigTypeName" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="barcode">治具類型</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="barcode" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="statID">狀態</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="statID" />
          </Col>
          <Col xs={24} sm={2} className="col-style" />
          <Col xs={24} sm={4} className="col-style">
            <input type="submit" value="查詢" className="btn btn-primary btn-block" />
          </Col>
        </Row>
      </Card>
    </FormContainer>
  </div>
);

export default StoreRecord;
