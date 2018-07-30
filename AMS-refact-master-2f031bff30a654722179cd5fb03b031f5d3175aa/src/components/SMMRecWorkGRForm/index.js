/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Select, Input, DatePicker, Form, Row, Col, Button } from 'antd';
import './style.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const SMMRecWorkGR = (props) => {
  const { onRadioClick, isCreate } = props;
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };
  const innerProps = {
    isCreate: 1,
  };
  return (
    <fieldset className={'legend'}>
      <legend>GR</legend>
      <div>
        <RadioGroup onChange={onRadioClick} style={{ width: '100%', margin: '20px' }} value={isCreate}>
          <Row>
            <Col span={2}>
              <label><Radio value={1} />收料单建立：</label>
            </Col>
            <Col span={3}>
              <Input name="number" disabled={isCreate !== 1} />
            </Col>
            <Col span={1} />
            <Col span={2}>
              <label><Radio value={2} />收料单修改：</label>
            </Col>
            <Col span={3}>
              <Select style={{ width: '100%' }} disabled={isCreate !== 2}>
                <Select.Option key="default" value="">--请选择--</Select.Option>
              </Select>
            </Col>
          </Row>
        </RadioGroup>
      </div>
      <Form
        className="ant-advanced-search-form"
      >
        <Row gutter={40}>
          <Col span={6} key="receive_type">
            <FormItem {...formItemLayout} label="收料类型">
              {getFieldDecorator('receive_type', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Select>
                  <Select.Option value="IQC 原材料收料">IQC 原材料收料</Select.Option>
                  <Select.Option value="OutSourcingIQC 外包收料">OutSourcingIQC 外包收料</Select.Option>
                </Select>,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="vendor_id">
            <FormItem {...formItemLayout} label="厂商">
              {getFieldDecorator('vendor_id', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Select />,
              )}
            </FormItem>
          </Col>
          <Col span={6} key="vendor_ship_number">
            <FormItem {...formItemLayout} label="提供商出货单号">
              {getFieldDecorator('vendor_ship_number', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="vendor_ship_date">
            <FormItem {...formItemLayout} label="提供商出货日期">
              {getFieldDecorator('vendor_ship_date', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <DatePicker style={{ width: '100%' }} />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="packing_ship">
            <FormItem {...formItemLayout} label="随货附带发票号码">
              {getFieldDecorator('packing_ship', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="freight_carrier">
            <FormItem {...formItemLayout} label="承运商名称">
              {getFieldDecorator('freight_carrier', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="containers">
            <FormItem {...formItemLayout} label="柜号">
              {getFieldDecorator('containers', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="waybill">
            <FormItem {...formItemLayout} label="水单号码">
              {getFieldDecorator('waybill', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="bill_lading">
            <FormItem {...formItemLayout} label="提单单号">
              {getFieldDecorator('bill_lading', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="receive_date">
            <FormItem {...formItemLayout} label="收料日期">
              {getFieldDecorator('receive_date', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <DatePicker style={{ width: '100%' }} />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="cmt">
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('cmt')(
                <Input />,
                )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </fieldset>
  );
};
SMMRecWorkGR.defaultProps = {

};
SMMRecWorkGR.propTypes = {

};
const SMMRecWorkGRForm = Form.create(
  {
    onFieldsChange(props, field) {
      console.log(field);
    },
  },
  )(SMMRecWorkGR);
export default SMMRecWorkGRForm;
