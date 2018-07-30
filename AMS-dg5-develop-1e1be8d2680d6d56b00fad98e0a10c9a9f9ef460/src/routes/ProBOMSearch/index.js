import React from 'react';
import Download from 'material-ui/svg-icons/file/file-download';
import Receipt from 'material-ui/svg-icons/action/receipt';
import { Input, Loading, SnackBar, Form } from '@delta/common-utils';
import { dataHandlerWithEncode } from '../../utils/Common';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Submit from '../../components/Submit';
import Table from '../../components/Table';
import Page from '../../components/Page';
import ResultArea from '../../components/ResultArea';
import Bread from '../../components/Bread';
import { DisplayColumnTool, ExportFileFromServerTool } from '../../../src/components/Table/tools';
import {
  dataSourceTemplate,
  getRowProps,
  getDetailRowProps,
  onSuccess,
  onSubmit,
  onCloseSnack,
  onDelete,
  onModalSubmit,
  onModalSuccess,
  onCopyModalSuccess,
  onModalError,
  dialogDataTemplate,
  copyDataTemplate,
  shouldModalShowUpdate,
  shouldModalShowAdd,
  shouldModalShowCopy,
  shouldModalSubmit,
} from './fn';
import { action, copyAction, detailAction, detailActionPut, detailActionPost, field, detailField, breadMap, NXTData, GroupingData, moduleData, sideData } from './config';
import './style.less';

const NAME = 'tools';
const getTitleBarTools = _this => props => (
  [
    <DisplayColumnTool
      key="a"
      tableName={NAME}
      {...props}
      icon={<Receipt style={{ marginRight: 24 }} color="FFF" />}
    />,
    <ExportFileFromServerTool
      key="b"
      tableName={NAME}
      {...props}
      icon={<Download style={{ marginRight: 24 }} color="FFF" />}
      action={_this.state.downloadAction}
      selected={_this.state.selected}
    />,
  ]
);

class ProBOMSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = onSubmit(this);
    this.onSuccess = onSuccess(this);
    this.getRowProps = getRowProps(this);
    this.getDetailRowProps = getDetailRowProps(this);
    this.onModalSubmit = onModalSubmit(this);
    this.onModalSuccess = onModalSuccess(this);
    this.onCopyModalSuccess = onCopyModalSuccess(this);
    this.onModalError = onModalError(this);
    this.onCloseSnack = onCloseSnack(this);
    this.onDelete = onDelete(this);
    this.shouldModalShowUpdate = shouldModalShowUpdate(this);
    this.shouldModalShowAdd = shouldModalShowAdd(this);
    this.shouldModalShowCopy = shouldModalShowCopy(this);
    this.shouldModalSubmit = shouldModalSubmit(this);
    this.state = {
      data: undefined,
      detail: undefined,
      selected: undefined,
      detailSelected: undefined,
      loading: false,
      id: undefined,
      bomId: undefined,
      pos: undefined,
      materialNo: undefined,
      description: undefined,
      qty: undefined,
      location: undefined,
      feederType: undefined,
      alternativeMaterial: undefined,
      msl: undefined,
      method: undefined,
      snackSwitch: undefined,
      message: undefined,
      // common: undefined,
      // detailList: undefined,
      // bomReportName: undefined,
    };
  }
  render() {
    return (
      <Page>
        <Loading visible={this.state.loading} />
        <SnackBar
          open={this.state.snackSwitch}
          message={this.state.message}
          onClientRequestClose={this.onCloseSnack}
        />
        <Bread breadMap={breadMap} />
        <Form
          name="ProBOMSearchForm"
          action={action}
          method="GET"
          direction="column"
          dataTemplate={dataHandlerWithEncode}
          dataSourceTemplate={dataSourceTemplate}
          onClientSubmit={this.onSubmit}
          onClientSuccess={this.onSuccess}
          collapse
        >
          <div className="row">
            <div className="col-4">
              <Input name="assembleNo" floatingLabelText="组合十码" />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="productName" floatingLabelText="机种名称" />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="nxtType"
                floatingLabelText="NXT类型"
                type="select"
                labelName="name"
                valueName="id"
                data={NXTData}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="moduleNum"
                floatingLabelText="模组数"
                type="select"
                labelName="name"
                valueName="id"
                data={moduleData}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="side"
                floatingLabelText="面别"
                type="select"
                labelName="name"
                valueName="id"
                data={sideData}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="grouping"
                floatingLabelText="Grouping"
                type="select"
                labelName="name"
                valueName="id"
                data={GroupingData}
              />
            </div>
            <div className="col-1">
              <div className="row">
                <div className="SearchButton">
                  <Submit label="查询" />
                </div>
              </div>
            </div>
          </div>
        </Form>
        <div className="modalButton">
          <Modal
            name="ProBOMSearchCodyModal"
            title="复制程式料表"
            btnName="复制"
            shouldModalShow={this.shouldModalShowCopy}
            shouldModalSubmit={this.shouldModalSubmit}
            formName="ProBOMSearchCopyForm"
          >
            <Form
              name="ProBOMSearchCopyForm"
              action={copyAction}
              method={this.state.method}
              dataTemplate={copyDataTemplate(this)}
              onClientSubmit={this.onModalSubmit}
              onClientSuccess={this.onCopyModalSuccess}
              onClientError={this.onModalError}
              contentType="application/json"
            >
              <div className="row">
                <div className="col-10">
                  <Input name="bomReportName" floatingLabelText="另存程式料表为" fullWidth />
                </div>
              </div>
            </Form>
          </Modal>
        </div>
        <ResultArea>
          <Table
            name={NAME}
            title="查询结果"
            data={this.state.data}
            columns={field}
            getTrProps={this.getRowProps(this.state.selected)}
            getTitleBarTools={getTitleBarTools(this)}
          />
          <br />
          <hr />
          <Form
            name="ProBOMSearchDetailForm"
            action={detailAction}
            method="GET"
            direction="column"
            dataTemplate={dataHandlerWithEncode}
            dataSourceTemplate={dataSourceTemplate}
            onClientSubmit={this.onSubmit}
            onClientSuccess={this.onSuccess}
            collapse
          />
          <div className="row">
            <div className="modalButton">
              <Modal
                name="ProBOMSearchAddModal"
                title="新增程式料表详情"
                btnName="新增"
                shouldModalShow={this.shouldModalShowAdd}
                formName="ProBOMSearchAddForm"
              >
                <Form
                  name="ProBOMSearchAddForm"
                  action={detailActionPost}
                  method={this.state.method}
                  dataTemplate={dialogDataTemplate}
                  onClientSubmit={this.onModalSubmit}
                  onClientSuccess={this.onModalSuccess}
                  onClientError={this.onModalError}
                  contentType="application/json"
                >
                  <div className="row">
                    <Input name="bomId" type="hidden" value={this.state.bomId} />
                    <div className="col-10">
                      <Input name="pos" floatingLabelText="站位" fullWidth />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="materialNo" floatingLabelText="料号" fullWidth />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="feederType" floatingLabelText="Feeder类型" fullWidth />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-10">
                      <Input name="qty" floatingLabelText="用量" fullWidth />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="location" floatingLabelText="打件位置" fullWidth />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="alternativeMaterial" floatingLabelText="代用料" fullWidth />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-10">
                      <Input name="msl" floatingLabelText="MSL等级" fullWidth />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="description" floatingLabelText="规格" fullWidth />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="createBy" floatingLabelText="创建者" fullWidth />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-10">
                      <Input name="lastUpdateBy" floatingLabelText="最后更新者" fullWidth />
                    </div>
                    <div className="col-4" />
                    <div className="col-24" />
                  </div>
                </Form>
              </Modal>
            </div>
            <div className="modalButton">
              <Button
                label="删除"
                onClientClick={this.onDelete}
              />
            </div>
            <div className="modalButton">
              <Modal
                name="ProBOMSearchUpdateModal"
                title="修改程式料表详情"
                btnName="修改"
                shouldModalShow={this.shouldModalShowUpdate}
                formName="ProBOMSearchUpdateForm"
              >
                <Form
                  name="ProBOMSearchUpdateForm"
                  action={detailActionPut}
                  method={this.state.method}
                  dataTemplate={dialogDataTemplate}
                  onClientSubmit={this.onModalSubmit}
                  onClientSuccess={this.onModalSuccess}
                  onClientError={this.onModalError}
                  contentType="application/json"
                >
                  <div className="row">
                    <Input name="id" type="hidden" value={this.state.id} disabled fullWidth />
                    <div className="col-10">
                      <Input name="pos" floatingLabelText="站位" value={this.state.pos} disabled fullWidth />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="materialNo" floatingLabelText="料号" value={this.state.materialNo} disabled />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="feederType" floatingLabelText="Feeder类型" value={this.state.feederType} fullWidth />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-10">
                      <Input name="qty" floatingLabelText="用量" value={this.state.qty} disaled />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="location" floatingLabelText="打件位置" value={this.state.location} fullWidth />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="alternativeMaterial" floatingLabelText="代用料" value={this.state.alternativeMaterial} fullWidth />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-10">
                      <Input name="msl" floatingLabelText="MSL等级" value={this.state.msl} disabled />
                    </div>
                    <div className="col-4" />
                    <div className="col-10">
                      <Input name="description" floatingLabelText="规格" value={this.state.description} disabled fullWidth />
                    </div>
                    <div className="col-14" />
                  </div>
                </Form>
              </Modal>
            </div>
          </div>
          <br />
          <Table
            title="料表详情"
            data={this.state.detail}
            columns={detailField}
            getTrProps={this.getDetailRowProps(this.state.detailSelected)}
            defaultPageSize={10}
          />
        </ResultArea>
      </Page>
    );
  }
}

export default ProBOMSearch;
