import React from 'react';
import { Modal } from 'antd';
import Upload from '../../../components/Upload';
import Button from '../../../components/Button';
import { UPLOADGROUPFLEXAVISIBLE, HANDLECANCEL, GROUPALLUPLOADCLICK } from './props';
import '../style.less';

class UploadGroupFlexa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bomFile: null,
      flexaFile: null,
      flexaThis: null,
      bomThis: null,
    };
  }
  getFlexaFile=(file) => {
    this.setState({ flexaFile: file });
  }
  getBomFile=(file) => {
    this.setState({ bomFile: file });
  }
  render() {
    return (
      <Modal
        visible={this.props[UPLOADGROUPFLEXAVISIBLE]}
        title="上传料表"
        footer={null}
        onCancel={this.props[HANDLECANCEL]}
        className="setUploadModalWidth"
      >
        <div className="row modalRow">
          <div className="formContent">
            <span style={{ marginRight: '10px' }} >{this.props.data ? this.props.data.assembleNo : ''}</span><span>Flexa 料表</span>
          </div>
          <div className="uploadFile">
            <Upload
              buttonName="浏览Flexa料表"
              preload
              getUploadFile={(file, flexaThis) => { this.getFlexaFile(file); this.setState({ flexaThis }); }}
              accept=".xml"
            />
          </div>
        </div>
        <div className="row modalRow">
          <div className="formContent">
            <span style={{ marginRight: '10px' }} >{this.props.data ? this.props.data.assembleNo : ''}</span><span>SAP BOM表</span>
          </div>
          <div className="uploadFile">
            <Upload
              buttonName="浏览SAP BOM表"
              preload
              getUploadFile={(file, bomThis) => { this.getBomFile(file); this.setState({ bomThis }); }}
              accept=".txt"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-18" />
          <div className="col-6">
            <Button
              label="全部上传"
              onClientClick={this.props[GROUPALLUPLOADCLICK](
              this.state.flexaFile,
              this.state.bomFile,
              this.state.flexaThis,
              this.state.bomThis,
              this,
              )}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default UploadGroupFlexa;
