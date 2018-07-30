/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Provider } from 'react-redux';
import { Card, Col, Row } from 'antd';
import AppStore from '../store';
import FormContainer from '../containers/FormContainer';
import InputContainer from '../containers/InputContainer';
import SelectContainer from '../containers/SelectContainer';
import DatePickerContainer from '../containers/DatePickerContainer';
import ColorPickerContainer from '../containers/ColorPickerContainer';
import {
  defaultGetParamTemplate,
  defaultRequestFilters } from '../constants/Settings';

export default () => (
  <Provider store={AppStore}>
    <div>
      <FormContainer
        name="form2"
        action="http://172.22.40.22/ams/warehouse/gr/querygrlist"
        method="GET"
        paramTemplate={defaultGetParamTemplate}
        filters={defaultRequestFilters}
      >
        <Card title="Demo" style={{ width: '100%', zIndex: 100 }} bodyStyle={{ padding: 0, zIndex: 200 }}>
          <br />
          <Row>
            <Col span="8">
              <label htmlFor="select">Select</label>
            </Col>
            <Col span="16">
              <SelectContainer name="select" key="key" itemName="itemName" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span="8">
              <label htmlFor="datepicker">DatePicker</label>
            </Col>
            <Col span="16">
              <DatePickerContainer name="datepicker" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span="8">
              <label htmlFor="input">Input</label>
            </Col>
            <Col span="16">
              <InputContainer type="text" name="input" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span="8">
              <label htmlFor="colorpicker">ColorPicker</label>
            </Col>
            <Col span="16">
              <ColorPickerContainer name="colorpicker" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span="24">
              <input type="submit" value="submit" />
            </Col>
          </Row>
        </Card>
      </FormContainer>
      <div>
        <SelectContainer name="number4" key="key" itemName="itemName" />
        <input type="submit" value="submit" />
      </div>
    </div>
  </Provider>
);
