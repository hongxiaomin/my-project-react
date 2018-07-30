import React from 'react';
import { Button as AntdButton, Icon, message, Row } from 'antd';
import {
  Input,
  Form,
  SnackBar,
  Loading,
} from '@delta/common-utils';
import Card from '../../components/Card';
import { sideData, moduleData, NXTData } from './config';
import CompareResult from './CompareResult';
import Button from '../../components/Button';
import UploadGroupFlexa from './UploadGroupFlexa';
import UploadFlexa from './UploadFlexa';
import CompareResultDetail from './CompareResultDetail';
import './style.less';
import {
  onGroupClick,
  handleGroupNGClick,
  handleGroupOkClick,
  postGroupRequest,
  groupAllUploadClick,
  handleGroupCancel,
  requestClose,
  handleChange,
  clickLookDetail,
  handleANGClick,
  handleBNGClick,
  handleAChange,
  handleBChange,
  handleGroupAOkClick,
  handleGroupBOkClick,
} from './fn';

class Grouping extends React.Component {
  constructor(props) {
    super(props);
    this.onGroupClick = onGroupClick(this);
    this.handleGroupNGClick = handleGroupNGClick(this);
    this.handleGroupOkClick = handleGroupOkClick(this);
    this.postGroupRequest = postGroupRequest(this);
    this.groupAllUploadClick = groupAllUploadClick(this);
    this.handleGroupCancel = handleGroupCancel(this);
    this.requestClose = requestClose(this);
    this.handleChange = handleChange(this);
    this.clickLookDetail = clickLookDetail(this);
    this.handleANGClick = handleANGClick(this);
    this.handleBNGClick = handleBNGClick(this);
    this.handleAChange = handleAChange(this);
    this.handleBChange = handleBChange(this);
    this.handleGroupAOkClick = handleGroupAOkClick(this);
    this.handleGroupBOkClick = handleGroupBOkClick(this);
    this.state = {
      uploadGroupFlexaVisible: false,
      compareResultVisible: false,
      groupFormData: null,
      compareResultData: null,
      CompareResultDeatilVisible: false,
      sheetName: {},
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
          name="BOMOIGroup"
          action="test"
        >
          <div className="row margin-vertival-2">
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
          <div className="margin-vertival-2">
            <Card title="GROUPING 组合十码">
              <div>
                <div style={{ lineHeight: '72px', display: 'inline-block', width: '8%' }}>
                  A面
                </div>
                <div style={{ display: 'inline-block', width: '92%' }}>
                  <Input name="groupA" floatingLabelText="多个Grouping，请用逗号隔开" />
                </div>
              </div>
              <div>
                <div style={{ lineHeight: '72px', display: 'inline-block', width: '8%' }}>
                  B面
                </div>
                <div style={{ display: 'inline-block', width: '92%' }}>
                  <Input name="groupB" floatingLabelText="多个Grouping，请用逗号隔开" />
                </div>
              </div>
            </Card>
          </div>
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-10" />
            <div className="col-4">
              <Button label="生成程式料表" onClientClick={this.onGroupClick} />
              <UploadFlexa
                uploadFlexaVisible={this.state.uploadGroupFlexaVisible}
                handleCancel={this.handleGroupCancel}
                data={this.state.groupFormData}
                allUploadClick={this.groupAllUploadClick}
                isMoreFlexa={this.state.isMoreFlexa}
              />
              <CompareResult
                CompareResultVisible={this.state.compareResultVisible}
                value={this.state.compareResultData}
                inputValue={this.state.sheetName}
                handleNGClick={this.handleGroupNGClick}
                handleOkClick={this.handleGroupOkClick}
                handleChange={this.handleChange}
                handleAChange={this.handleAChange}
                handleBChange={this.handleBChange}
                clickLookDetail={this.clickLookDetail}
                isMoreFlexa={this.state.isMoreFlexa}
                handleANGClick={this.handleANGClick}
                handleBNGClick={this.handleBNGClick}
                handleAOKClick={this.handleGroupAOkClick}
                handleBOKClick={this.handleGroupBOkClick}
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
                handleNGClick={this.handleGroupNGClick}
                handleOkClick={this.handleGroupOkClick}
                handleAOKClick={this.handleGroupAOkClick}
                handleBOKClick={this.handleGroupBOkClick}
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

export default Grouping;
