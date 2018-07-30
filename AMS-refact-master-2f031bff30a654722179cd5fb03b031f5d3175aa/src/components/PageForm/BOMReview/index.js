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
import GroupSelectContainer from '../../../containers/GroupSelectContainer';
import Card from '../../../components/Card';
import {
  defaultGetParamTemplate,
  defaultRequestFilters } from '../../../constants/Settings';
import './style.less';

const BOMReview = () => (
  <div>
    <FormContainer
      name="BOMReview"
      action="http://localhost/sample/api/service"
      method="GET"
      paramTemplate={defaultGetParamTemplate}
      filters={defaultRequestFilters}
    >
      <Card title="BOM審核列表">
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
            <label htmlFor="bom_BOMVersion">BOM版本</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="bom_BOMVersion" />
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="bom_lineType">線體類型</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <InputContainer type="text" name="bom_lineType" />
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col xs={12} sm={3} className="col-style">
            <label htmlFor="bom_status">狀態</label>
          </Col>
          <Col xs={12} sm={3} className="col-style">
            <GroupSelectContainer>
              <div>
                <SelectContainer
                  name="bom_status1"
                  action="http://localhost/ams_service/api/service"
                  itemKey="id"
                  itemValue="name"
                  next="bom_status2"
                  load="true"
                />
                <SelectContainer
                  name="bom_status2"
                  action="http://localhost/ams_service/api/service"
                  itemKey="id"
                  itemValue="name"
                  next="bom_status3"
                />
                <SelectContainer
                  name="bom_status3"
                  action="http://localhost/ams_service/api/service"
                  itemKey="id"
                  itemValue="name"
                />
              </div>
            </GroupSelectContainer>
          </Col>
          <Col xs={24} sm={14} className="col-style" />
          <Col xs={24} sm={4} className="col-style">
            <input type="submit" value="查詢" className="btn btn-primary btn-block" />
          </Col>
        </Row>
      </Card>
    </FormContainer>
  </div>
);

export default BOMReview;
