/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Col, Row } from 'antd';
import InputContainer from '../../../containers/InputContainer';
import DatePickerContainer from '../../../containers/DatePickerContainer';
import FormContainer from '../../../containers/FormContainer';
import SelectContainer from '../../../containers/SelectContainer';
import Card from '../../../components/Card';
import {
  defaultGetParamTemplate,
  defaultRequestFilters } from '../../../constants/Settings';
import './style.less';

const InventoryRecord = () => (
  <div>
    <FormContainer
      name="InventoryRecord"
      action="http://localhost/sample/api/service"
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
    >
      <Card title="庫存查詢">
        <br />
        <Row type="flex" justify="center" align="middle">
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="startTime">入庫時間</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <DatePickerContainer name="startTime" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="endTime">至</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <DatePickerContainer name="endTime" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="mtlNo">
              <span style={{ color: '#c9171e' }}>*</span>
              料號
            </label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="mtlNo" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="area">存放區域</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <SelectContainer name="area" />
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="period">週期</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="period" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="shelvesNo">架位</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="shelvesNo" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="vendor">提供商</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="vendor" />
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

export default InventoryRecord;