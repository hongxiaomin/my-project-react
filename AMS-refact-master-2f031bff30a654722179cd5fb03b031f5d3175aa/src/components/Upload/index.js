/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Upload as AntUpload, Button, Icon, Col, Row } from 'antd';
import Input from '../../components/Input';
import './style.less';

const Upload = props => (
  <Row type="flex" justify="left" align="middle">
    {/* <Col xs={24} sm={16} className="col-style"> */}
    <Input type="text" value={props.value} disabled style={{ border: '1px solid #ccc', outline: 'none', borderRadius: '6px', marginRight: '10px', paddingLeft: '10px' }} />
    {/* </Col> */}
    {/* <Col xs={24} sm={2} className="col-style" />
    <Col xs={24} sm={6} className="col-style"> */}
    <AntUpload
      name={props.name}
      action={props.action}
      headers={props.headers}
      customRequest={props.customRequest}
      beforeUpload={props.beforeUpload}
      multiple={props.multiple}
      accept={props.accept}
      showUploadList={props.showUploadList}
    >
      <Button>
        <Icon type="upload" />上傳檔案
        </Button>
    </AntUpload>
    {/* </Col> */}
  </Row>
);
Upload.defaultProps = {
  showUploadList: false,
};
Upload.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  action: PropTypes.string.isRequired,
  headers: PropTypes.objectOf(PropTypes.any),
  customRequest: PropTypes.func,
  beforeUpload: PropTypes.func,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  showUploadList: PropTypes.bool,
};

export default Upload;
