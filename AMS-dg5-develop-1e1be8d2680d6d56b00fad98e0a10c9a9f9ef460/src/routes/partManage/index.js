import React from 'react';
import Receipt from 'material-ui/svg-icons/action/receipt';
import {
  Loading,
  SnackBar,
  Input,
  Form,
} from '@delta/common-utils';
import { dataHandlerWithEncode } from '../../utils/Common';
import Table from '../../components/Table';
import Page from '../../components/Page';
import ResultArea from '../../components/ResultArea';
import Bread from '../../components/Bread';
import Submit from '../../components/Submit';
import Modal from '../../components/Modal';
import { DisplayColumnTool } from '../../components/Table/tools';
import { action, actionPut, field, measureData, typeData, breadMap } from './config';
import {
  dataSourceTemplate,
  dialogDataTemplate,
  onSubmit,
  onSuccess,
  getRowProps,
  onCloseSnack,
  onSubmitModal,
  onSuccesModal,
  onErrorModal,
  shouldModalShow,
} from './fn';
import './style.less';

const NAME = 'tools';
const getTitleBarTools = props => (
  [
    <DisplayColumnTool
      key="a"
      tableName={NAME}
      {...props}
      icon={<Receipt style={{ marginRight: 24 }} color="FFF" />}
    />,
  ]
);

class PartManage extends React.Component {
  constructor(props) {
    super(props);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.shouldModalShow = shouldModalShow(this);
    this.getRowProps = getRowProps(this);
    this.onCloseSnack = onCloseSnack(this);
    this.onSubmitModal = onSubmitModal(this);
    this.onSuccesModal = onSuccesModal(this);
    this.onErrorModal = onErrorModal(this);
    this.state = {
      data: undefined,
      selected: undefined,
      method: undefined,
      loading: false,
      snackSwitch: false,
      message: undefined,
      materialNo: undefined,
      msl: undefined,
      esd: undefined,
      usl: undefined,
      lsl: undefined,
      componentType: undefined,
      vendorName: undefined,
      vendorCode: undefined,
      vendorPartNum: undefined,
      marking: undefined,
      description: undefined,
      pin: undefined,
      keyword: undefined,
      componentPackage: undefined,
      develop: undefined,
      measurable: undefined,
      image: undefined,
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
          name="PartManageForm"
          action={action}
          method="GET"
          direction="column"
          dataTemplate={dataHandlerWithEncode}
          dataSourceTemplate={dataSourceTemplate}
          onClientSubmit={this.onSubmit}
          onClientSuccess={this.onSuccess}
          contentType="application/json"
          collapse
        >
          <div className="row">
            <div className="col-4">
              <Input name="materialNo" floatingLabelText="料号" fullWidth />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="vendorName" floatingLabelText="供应商" fullWidth />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="componentType"
                floatingLabelText="零件类型"
                type="select"
                labelName="name"
                valueName="id"
                data={typeData}
                fullWidth
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="msl" floatingLabelText="MSL" fullWidth />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="esd" floatingLabelText="ESD" fullWidth />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="measurable"
                floatingLabelText="可量测"
                type="select"
                labelName="name"
                valueName="id"
                data={measureData}
              />
            </div>
            <div className="col-1">
              <div className="SearchButton">
                <Submit label="查询" />
              </div>
            </div>
          </div>
        </Form>
        <div className="ModalButton">
          <Modal
            name="PartManageUpdateModal"
            title="修改料号"
            btnName="修改"
            shouldModalShow={this.shouldModalShow}
            formName="PartManageUpdateForm"
          >
            <Form
              name="PartManageUpdateForm"
              action={actionPut}
              method={this.state.method}
              dataTemplate={dialogDataTemplate}
              onClientSubmit={this.onSubmitModal}
              onClientSuccess={this.onSuccesModal}
              onClientError={this.onErrorModal}
              contentType="application/json"
            >
              <div className="row">
                <div className="col-10">
                  <Input name="materialNo" floatingLabelText="料号" value={this.state.materialNo} disabled />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="description" floatingLabelText="规格" value={this.state.description} disabled fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="componentType" floatingLabelText="零件类型" value={this.state.componentType} disabled fullWidth />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Input name="vendorName" floatingLabelText="供应商" value={this.state.vendorName} disabled fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="usl" floatingLabelText="USL" value={this.state.usl} fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="lsl" floatingLabelText="LSL" value={this.state.lsl} fullWidth />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Input name="esd" floatingLabelText="ESD" value={this.state.esd} disabled fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="msl" floatingLabelText="MSL" value={this.state.msl} fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="vendorCode" floatingLabelText="Vendor Code" value={this.state.vendorCode} fullWidth />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Input name="vendorPartNum" floatingLabelText="Vendor Part" value={this.state.vendorPartNum} disabled fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="marking" floatingLabelText="Marking" value={this.state.marking} fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="pin" floatingLabelText="Pin脚" value={this.state.pin} fullWidth />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Input name="keyword" floatingLabelText="Keywords" value={this.state.keyword} disabled fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="componentPackage" floatingLabelText="Package" value={this.state.componentPackage} fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="image" floatingLabelText="图片" value={this.state.image} fullWidth />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Input name="develop" floatingLabelText="钢板开发" value={this.state.develop} disabled fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input
                    name="measurable"
                    floatingLabelText="可量测"
                    value={this.state.measurable}
                    disabled
                  />
                </div>
                <div className="col-8" />
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
            getTitleBarTools={getTitleBarTools}
          />
        </ResultArea>
      </Page>
    );
  }
}

export default PartManage;
