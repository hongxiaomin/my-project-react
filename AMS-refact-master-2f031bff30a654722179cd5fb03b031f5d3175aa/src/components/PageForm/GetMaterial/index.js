/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Col, Row } from 'antd';
import InputContainer from '../../../containers/InputContainer';
import FormContainer from '../../../containers/FormContainer';
import SelectContainer from '../../../containers/SelectContainer';
import Card from '../../../components/Card';
import {
  defaultGetParamTemplate,
  defaultRequestFilters } from '../../../constants/Settings';
import './style.less';

const GetMaterial = () => (
  <div>
    <FormContainer
      name="GetMaterial"
      action="http://localhost/sample/api/service"
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
    >
      <Card title="接料查詢">
        <br />
        <Row type="flex" justify="center" align="middle">
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="mtlNo">料號</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="mtlNo" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="serialNo">流水號</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="serialNo" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="workOrder">工單號</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="workOrder" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="operator">接料人</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="operator" />
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="lineName">線別</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="lineName" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="lineName">面別</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <SelectContainer name="side" />
          </Col>
          <Col xs={24} sm={8} className="col-style" />
          <Col xs={24} sm={4} className="col-style">
            <input type="submit" value="查詢" className="btn btn-primary btn-block" />
          </Col>
        </Row>
      </Card>
    </FormContainer>
  </div>
);

export default GetMaterial;
