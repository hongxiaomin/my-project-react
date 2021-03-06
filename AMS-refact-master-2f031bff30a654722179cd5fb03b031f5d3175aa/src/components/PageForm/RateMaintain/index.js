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

const RateMaintain = () => (
  <div>
    <FormContainer
      name="RateMaintain"
      action="http://localhost/sample/api/service"
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
    >
      <Card title="rate維護">
        <br />
        <Row type="flex" justify="center" align="middle">
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="bom_boardName">主板</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="bom_boardName" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="bom_input_smallBoardName">小板</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="bom_input_smallBoardName" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="bom_side">面別</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <SelectContainer name="bom_side" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="bom_machineType">線體類型</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="bom_machineType" />
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col xs={24} sm={20} className="col-style" />
          <Col xs={24} sm={4} className="col-style">
            <input type="submit" value="查詢" className="btn btn-primary btn-block" />
          </Col>
        </Row>
      </Card>
    </FormContainer>
  </div>
);

export default RateMaintain;
