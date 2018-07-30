import React from 'react';
import { Modal } from 'antd';
import Upload from '../../../components/Upload';
import { UPLOADFLEXAVISIBLE, HANDLECANCEL, DATA, ALLUPLOADCLICK, ISMOREFLEXA } from './props';
import Button from '../../../components/Button';
import Request from '../../../utils/fetchData/Request';
import '../style.less';

class UploadFlexa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bomFile: null,
      flexaFile: null,
      flexaABFile: null,
      flexa1This: null,
      flexa2This: null,
      bom1This: null,
    };
  }
  getBomFile = (file) => {
    this.setState({ bomFile: file });
  }
  getFlexaFlie=(file) => {
    this.setState({ flexaFile: file });
  }
  getABFlexaFlie=(fileObj) => {
    const flexa = this.state.flexaABFile;
    const fileObjs = { ...flexa };
    if (fileObj.aFlexa) {
      fileObjs.aFlexa = fileObj.aFlexa;
    } else if (fileObj.bFlexa) {
      fileObjs.bFlexa = fileObj.bFlexa;
    }
    this.setState({ flexaABFile: fileObjs });
  }
  handleClick = () => {
    this.props[ALLUPLOADCLICK](this.state.flexaFile, this.state.bomFile);
  }
  render() {
    return (
      <Modal
        visible={this.props[UPLOADFLEXAVISIBLE]}
        title="上传料表"
        footer={null}
        onCancel={this.props[HANDLECANCEL]}
        className="setUploadModalWidth"
      >
        {this.props[ISMOREFLEXA] ? (
          <div>
            <div className="row modalRow">
              <div className="formContent">
                <span style={{ marginRight: '10px' }}>{this.props[DATA] ? this.props[DATA].assembleNo : ''}</span><span>A面Flexa 料表</span>
              </div>
              <div className="uploadFile">
                <Upload
                  buttonName="浏览Flexa料表"
                  preload
                  getUploadFile={(file, uploadFileThis) => { this.getABFlexaFlie({ aFlexa: file }); this.setState({ flexa1This: uploadFileThis }); }}
                  accept=".xml"
                />
              </div>
            </div>
            <div className="row modalRow">
              <div className="formContent">
                <span style={{ marginRight: '10px' }}>{this.props[DATA] ? this.props[DATA].assembleNo : ''}</span><span>B面Flexa 料表</span>
              </div>
              <div className="uploadFile">
                <Upload
                  buttonName="浏览Flexa料表"
                  preload
                  getUploadFile={(file, uploadFileThis) => { this.getABFlexaFlie({ bFlexa: file }); this.setState({ flexa2This: uploadFileThis }); }}
                  accept=".xml"
                />
              </div>
            </div>
          </div>)
        : (<div className="row modalRow">
          <div className="formContent">
            <span style={{ marginRight: '10px' }}>{this.props[DATA] ? this.props[DATA].assembleNo : ''}</span><span>Flexa 料表</span>
          </div>
          <div className="uploadFile">
            <Upload
              buttonName="浏览Flexa料表"
              preload
              getUploadFile={(file, uploadFileThis) => { this.getFlexaFlie(file); this.setState({ flexa1This: uploadFileThis }); }}
              accept=".xml"
            />
          </div>
           </div>)}
        <div className="row modalRow">
          <div className="formContent">
            <span style={{ marginRight: '10px' }}>{this.props[DATA] ? this.props[DATA].assembleNo : ''}</span><span>SAP BOM表</span>
          </div>
          <div className="uploadFile">
            <Upload
              buttonName="浏览SAP BOM表"
              getUploadFile={(file, bomThis) => { this.getBomFile(file); this.setState({ bom1This: bomThis }); }}
              preload
              accept=".txt"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-18" />
          <div className="col-6">
            <Button
              label="全部上传"
              onClientClick={
              this.props[ALLUPLOADCLICK](
                  this.state.flexaFile,
                  this.state.bomFile,
                  this.state.flexaABFile,
                  this.state.flexa1This,
                  this.state.flexa2This,
                  this.state.bom1This,
                  this,
)}
              name="uploadAll"
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default UploadFlexa;
