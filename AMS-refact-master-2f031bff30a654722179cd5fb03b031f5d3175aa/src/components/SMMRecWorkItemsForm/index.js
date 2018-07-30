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

const SMMRecWorkItems = (props) => {
  const { getFieldDecorator } = props.form;
  const Option = Select.Option;
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };
  const innerProps = {
    isCreate: 1,
  };
  return (
    <fieldset className={'legend'}>
      <legend>项次</legend>
      <Form
        className="ant-advanced-search-form"
      >
        <Row gutter={40}>
          <Col span={6} key="material_id">
            <FormItem {...formItemLayout} label="材料代码">
              {getFieldDecorator('material_id', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Select>
                  <Option value="4020108300">4020108300</Option>
                  <Option value="1511542032">1511542032</Option>
                  <Option value="0341280301">0341280301</Option>
                </Select>,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="material_lot_number">
            <FormItem {...formItemLayout} label="材料批号">
              {getFieldDecorator('material_lot_number', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
              )}
            </FormItem>
          </Col>
          <Col span={6} key="storage_id">
            <FormItem {...formItemLayout} label="收料仓库">
              {getFieldDecorator('storage_id', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Select />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="bin_id">
            <FormItem {...formItemLayout} label="收料储位">
              {getFieldDecorator('bin_id', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Select />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="po_id">
            <FormItem {...formItemLayout} label="采购单号">
              {getFieldDecorator('po_id', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="po_item">
            <FormItem {...formItemLayout} label="采购单项次">
              {getFieldDecorator('po_item', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="item_qty">
            <FormItem {...formItemLayout} label="实收数量">
              {getFieldDecorator('item_qty', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="open_po_qty">
            <FormItem {...formItemLayout} label="PO未交量">
              {getFieldDecorator('open_po_qty', {
                rules: [{
                  required: true, message: 'Con not be empty!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
          </Col>
          <Col span={6} key="delivery_date">
            <FormItem {...formItemLayout} label="送货日期">
              {getFieldDecorator('delivery_date', {
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
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">加入</Button>
          </Col>
        </Row>
      </Form>
    </fieldset>
  );
};
SMMRecWorkItems.defaultProps = {

};
SMMRecWorkItems.propTypes = {

};
const SMMRecWorkItemsForm = Form.create()(SMMRecWorkItems);
export default SMMRecWorkItemsForm;
