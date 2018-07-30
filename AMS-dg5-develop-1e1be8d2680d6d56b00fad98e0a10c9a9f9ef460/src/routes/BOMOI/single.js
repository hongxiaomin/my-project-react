import React from 'react';
import {
  Input,
  Form,
  SnackBar,
  Loading,
} from '@delta/common-utils';
import { sideData, moduleData, NXTData } from './config';
import CompareResult from './CompareResult';
import Button from '../../components/Button';
import UploadFlexa from './UploadFlexa';
import CompareResultDetail from './CompareResultDetail';
import {
  onClick,
  handleCancel,
  postSingleRequest,
  allUploadClick,
  handleNGClick,
  handleOkClick,
  requestClose,
  handleChange,
  clickLookDetail,
  handleANGClick,
  handleBNGClick,
  handleAOKClick,
  handleBOKClick,
  handleAChange,
  handleBChange,
  // clearFile,
} from './fn';

class Single extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = onClick(this);
    this.handleCancel = handleCancel(this);
    this.postSingleRequest = postSingleRequest(this);
    this.allUploadClick = allUploadClick(this);
    this.handleNGClick = handleNGClick(this);
    this.handleOkClick = handleOkClick(this);
    this.requestClose = requestClose(this);
    this.handleChange = handleChange(this);
    this.clickLookDetail = clickLookDetail(this);
    this.handleANGClick = handleANGClick(this);
    this.handleBNGClick = handleBNGClick(this);
    this.handleAOKClick = handleAOKClick(this);
    this.handleBOKClick = handleBOKClick(this);
    this.handleAChange = handleAChange(this);
    this.handleBChange = handleBChange(this);
    // this.clearFile = clearFile(this);
    this.state = {
      uploadFlexaVisible: false,
      formData: null,
      compareResultVisible: false,
      compareResultData: null,
      sheetName: {},
      CompareResultDeatilVisible: false,
      snackSwitch: false,
      message: 'success',
      isMoreFlexa: false,
      compareResultAModalShow: 'block',
      compareResultBModalShow: 'block',
      sideName: null,
      loading: false,
      doubleClick: false,
      ADoubleClick: false,
      BDoubleClick: false,
      isTip: 'none',
      AIsTip: 'none',
      BIsTip: 'none',
      tools: null,
    };
  }
  render() {
    return (
      <div>
        <Form
          name="BOMOISingle"
          action="test"
        >
          <div className="row margin-vertical-2">
            <div className="col-4">
              <Input name="assembleNo" floatingLabelText="请输入十位数数字" min={1000000000} type="number" max={9999999999} />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="nxtType"
                type="select"
                valueName="id"
                labelName="name"
                floatingLabelText="NXT"
                data={NXTData}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="moduleNum"
                type="select"
                valueName="id"
                labelName="name"
                floatingLabelText="模組"
                data={moduleData}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="side"
                type="select"
                valueName="id"
                labelName="name"
                floatingLabelText="制程"
                data={sideData}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-10" />
            <div className="col-4">
              <Button onClientClick={this.onClick} label="生成程式料表" />
              <UploadFlexa
                uploadFlexaVisible={this.state.uploadFlexaVisible}
                handleCancel={this.handleCancel}
                data={this.state.formData}
                allUploadClick={this.allUploadClick}
                isMoreFlexa={this.state.isMoreFlexa}
              />
              <CompareResult
                CompareResultVisible={this.state.compareResultVisible}
                value={this.state.compareResultData}
                inputValue={this.state.sheetName}
                handleNGClick={this.handleNGClick}
                handleOkClick={this.handleOkClick}
                handleChange={this.handleChange}
                handleAChange={this.handleAChange}
                handleBChange={this.handleBChange}
                clickLookDetail={this.clickLookDetail}
                isMoreFlexa={this.state.isMoreFlexa}
                handleANGClick={this.handleANGClick}
                handleBNGClick={this.handleBNGClick}
                handleAOKClick={this.handleAOKClick}
                handleBOKClick={this.handleBOKClick}
                modalAShow={this.state.compareResultAModalShow}
                modalBShow={this.state.compareResultBModalShow}
                isTip={this.state.isTip}
                AIsTip={this.state.AIsTip}
                BIsTip={this.state.BIsTip}
              />
              <CompareResultDetail
                CompareResultDeatilVisible={this.state.CompareResultDeatilVisible}
                value={this.state.compareResultData}
                inputValue={this.state.sheetName}
                handleNGClick={this.handleNGClick}
                handleOkClick={this.handleOkClick}
                handleAOKClick={this.handleAOKClick}
                handleBOKClick={this.handleBOKClick}
                handleChange={this.handleChange}
                handleAChange={this.handleAChange}
                handleBChange={this.handleBChange}
                isMoreFlexa={this.state.isMoreFlexa}
                clickDetailSideName={this.state.sideName}
                isTip={this.state.isTip}
                AIsTip={this.state.AIsTip}
                BIsTip={this.state.BIsTip}
              />
            </div>
            <div className="col-10" />
          </div>
        </Form>
        <SnackBar
          open={this.state.snackSwitch}
          message={this.state.message}
          autoHideDuration={4000}
          onClientRequestClose={this.requestClose}
        />
        <Loading visible={this.state.loading} />
      </div>

    );
  }
}

export default Single;
