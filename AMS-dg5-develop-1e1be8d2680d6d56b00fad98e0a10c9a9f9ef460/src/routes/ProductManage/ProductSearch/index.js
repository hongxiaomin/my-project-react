import React from 'react';
import Receipt from 'material-ui/svg-icons/action/receipt';
import {
  Loading,
  SnackBar,
  Input,
  Form,
} from '@delta/common-utils';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import Submit from '../../../components/Submit';
import Page from '../../../components/Page';
import ResultArea from '../../../components/ResultArea';
import Bread from '../../../components/Bread';
import { DisplayColumnTool } from '../../../components/Table/tools';
import { action, actionPut, field, barCodeData, paintData, breadMap } from './config';
import {
  dataTemplate,
  dataSourceTemplate,
  dialogDataTemplate,
  // onInitial,
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
class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    // this.onInitial = onInitial(this);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.getRowProps = getRowProps(this);
    this.onCloseSnack = onCloseSnack(this);
    this.onSubmitModal = onSubmitModal(this);
    this.onSuccesModal = onSuccesModal(this);
    this.onErrorModal = onErrorModal(this);
    this.shouldModalShow = shouldModalShow(this);
    this.state = {
      data: undefined,
      selected: undefined,
      method: undefined,
      loading: false,
      snackSwitch: false,
      message: undefined,
      combinationNumber: undefined,
      count: undefined,
      status: undefined,
      productName: undefined,
      msl: undefined,
      esd: undefined,
    };
  }
  // componentWillMount() {
  //   this.onInitial();
  // }
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
          name="ProductSearchForm"
          action={action}
          method="GET"
          direction="column"
          dataTemplate={dataTemplate}
          dataSourceTemplate={dataSourceTemplate}
          onClientSubmit={this.onSubmit}
          onClientSuccess={this.onSuccess}
          collapse
        >
          <div className="row">
            <div className="col-4">
              <Input name="workorder" floatingLabelText="组合十码" fullWidth />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="vendor" floatingLabelText="客户" fullWidth />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="type" floatingLabelText="PCB料号" fullWidth />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="paint"
                floatingLabelText="白漆"
                type="select"
                labelName="name"
                valueName="id"
                data={paintData}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="barCode"
                floatingLabelText="条码类型"
                type="select"
                labelName="name"
                valueName="id"
                data={barCodeData}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="type" floatingLabelText="特殊工艺" fullWidth />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="size" floatingLabelText="PCB尺寸" fullWidth />
            </div>
            <div className="col-1">
              <div className="SearchButton">
                <Submit label="查询" />
              </div>
            </div>
            <div className="col-1" />
          </div>
        </Form>
        <div className="ModalButton">
          <Modal
            name="ProductSearchUpdateModal"
            title="修改机种"
            btnName="修改"
            shouldModalShow={this.shouldModalShow}
            formName="ProductSearchUpdateForm"
          >
            <Form
              name="ProductSearchUpdateForm"
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
                  <Input name="combinationNumber" floatingLabelText="组合十码" value={this.state.combinationNumber} disabled fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="productName" floatingLabelText="机种名称" value={this.state.productName} disabled fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="status" floatingLabelText="PCB料号" value={this.state.status} disabled fullWidth />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Input name="count" floatingLabelText="客户" value={this.state.count} disabled fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="msl" floatingLabelText="MSL" value={this.state.msl} fullWidth />
                </div>
                <div className="col-4" />
                <div className="col-10">
                  <Input name="esd" floatingLabelText="ESD" value={this.state.esd} disabled fullWidth />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Input
                    name="barCodeData"
                    type="select"
                    floatingLabelText="条码类型"
                    labelName="name"
                    valueName="id"
                    data={barCodeData}
                  />
                </div>
                <div className="col-20" />
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

export default ProductSearch;
