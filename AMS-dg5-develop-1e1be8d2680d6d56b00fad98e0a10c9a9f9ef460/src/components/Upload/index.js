/**
fileName    : index.js
writer      : Chao.Wang
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Upload as AntdUpload, Button, Icon, Row } from 'antd';
import Input from '../../components/Input';
import {
  defaultProps,
  propTypes,
  NAME,
  ACTION,
  HEADERS,
  MULTIPLE,
  ACCEPT,
  SHOWUPLOADLIST,
  BUTTONNAME,
} from './props';
import { customRequest, beforeUpload } from './fn';
import './style.less';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.customRequest = customRequest(this);
    this.beforeUpload = beforeUpload(this);
    this.state = {
      value: undefined,
    };
  }
  render() {
    return (
      <Row type="flex" justify="left" align="middle">
        <Input
          type="text"
          value={this.state.value}
          disabled
          style={{
 border: '1px solid #ccc', outline: 'none', borderRadius: '6px', marginRight: '10px', paddingLeft: '10px',
}}
        />
        <AntdUpload
          name={this.props[NAME]}
          action={this.props[ACTION]}
          headers={this.props[HEADERS]}
          customRequest={this.customRequest}
          beforeUpload={this.beforeUpload}
          multiple={this.props[MULTIPLE]}
          accept={this.props[ACCEPT]}
          showUploadList={this.props[SHOWUPLOADLIST]}
        >
          <Button>
            <Icon type="upload" />{this.props[BUTTONNAME]}
          </Button>
        </AntdUpload>
      </Row>
    );
  }
}
Upload.defaultProps = defaultProps;
Upload.propTypes = propTypes;
export default Upload;
