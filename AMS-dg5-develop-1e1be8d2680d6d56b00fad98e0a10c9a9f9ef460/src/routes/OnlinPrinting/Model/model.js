import React from 'react';
import {
  Input,
  Select,
  Form,
  Dialog,
  Loading,
  SnackBar,
  // ChipInput,
  RaisedButton,
} from '@delta/common-utils';
import Page from '../../../components/Page';
import Button from '../../../components/Button';
import Submit from '../../../components/Submit';
import ResultArea from '../../../components/ResultArea';
import Table from '../../../components/Table';
// import Modal from '../../../components/Modal';

const NAME = 'tools';
import { dataHandlerWithEncode } from '../../../utils/Common';
import {
  onInitial,
  ModelDataTemplate,
  onChange,
  onChange1,
  onNextChange,
  onNextChange1,
  onSuccess,
  onSubmit,
  onUpdate,
  dataSourceTemplate,
  onSuccesModal,
  onSubmitModal,
  onCloseModal,
  onErrorModal,
  onCloseSnack,
} from './fn';
import { actionM, modelfield, measureData, actionAddM } from '../config';

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.onInitial = onInitial(this);
    this.onChange = onChange(this);
    this.onNextChange = onNextChange(this);
    this.onChange1 = onChange1(this);
    this.onNextChange1 = onNextChange1(this);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.onSubmitModal = onSubmitModal(this);
    this.onSuccesModal = onSuccesModal(this);
    this.onCloseModal = onCloseModal(this);
    this.onErrorModal = onErrorModal(this);
    this.onUpdate = onUpdate(this);
    this.onCloseSnack = onCloseSnack(this);
    this.state = {
      snackSwitch: undefined,
      loading: undefined,
      message: undefined,
      purchaserData: undefined,
      machineData: undefined,
      countryData: undefined,
      purchaserDataM: undefined,
      machineDataM: undefined,
      countryDataM: undefined,
      formPurchaserData: undefined,
      formPurchaserData1: undefined,
      data3: undefined,
      param: undefined,
      dialogSwitch: false,
      shouldModalShow:false,
    };
  }
  componentWillMount() {
    this.onInitial();
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
      <Form
        name="modelForm"
        action={actionM}
        method="GET"
        direction="column"
        dataTemplate={ModelDataTemplate}
        dataSourceTemplate={dataSourceTemplate}
        onClientSuccess={this.onSuccess}
        onClientSubmit={this.onSubmit}
        contentType="application/json"
      >
      <div className="row">
      <div className="col-4">
        <Input
          name="purchaser"
          type="select"
          valueName="purchaser"
          labelName="purchaser"
          floatingLabelText="客户"
          fullWidth
          data={this.state.purchaserData}
          onClientChange={this.onChange}
        />
        </div>
        <div className="col-4">
        <Input
          name="machine"
          type="select"
          valueName="machine"
          labelName="machine"
          floatingLabelText="机种"
          data={this.state.machineData}
          onClientChange={this.onNextChange}
        />
        </div>
        <div className="col-4">
        <Input
          name="country"
          type="select"
          valueName="country"
          labelName="country"
          floatingLabelText="国别"
          data={this.state.countryData}
        />
        </div>
        <div className="col-1">
          <div className="SearchButton">
            <Submit label="查询" />
          </div>
        </div>
      </div>
     </Form>
     <Dialog
        open={this.state.dialogSwitch}
        onClientRequestClose={this.onCloseModal}
        showOK={false}
        showCancel={false}
      >
      <Form
        name="modelAddModal"
        action={actionAddM}
        method="GET"
        direction="column"
        dataTemplate={ModelDataTemplate}
        dataSourceTemplate={dataSourceTemplate}
        onClientSuccess={this.onSuccesModal}
        onClientSubmit={this.onSubmitModal}
        onClientError={this.onErrorModal}
        contentType="application/json"
      >
      <div className="row">
      <div className="col-4">
        <Input
          name="purchaser"
          type="select"
          valueName="purchaser"
          labelName="purchaser"
          floatingLabelText="客户"
          fullWidth
          data={this.state.purchaserDataM}
          onClientChange={this.onChange1}
        />
        </div>
        </div>
        <div className="row">
        <div className="col-4">
        <Input
          name="machine"
          type="select"
          valueName="machine"
          labelName="machine"
          floatingLabelText="机种"
          data={this.state.machineDataM}
          onClientChange={this.onNextChange1}
        />
        </div>
        </div>
        <div className="row">
        <div className="col-4">
        <Input
          name="country"
          type="select"
          valueName="country"
          labelName="country"
          floatingLabelText="国别"
          data={this.state.countryDataM}
        />
        </div>
        </div>
        <div className="row">
          <div className="col-4">
            <Input type="submit" label="提交" backgroundColor="#007bbb" labelColor="#ffffff" fullWidth />
          </div>
          <div className="col-2" />
          <div className="col-4">
            <Input type="button" label="取消" backgroundColor="#007bbb" labelColor="#ffffff" onClientClick={this.onCloseModal} fullWidth />
          </div>
          <div className="col-12" />
        </div>
      </Form>
    </Dialog>
    <div className="row margin-vertical-2">
      <div className="col-2">
        <RaisedButton label="新增" onClientClick={this.onUpdate} backgroundColor="#1490DE" labelColor="#ffffff" fullWidth />
      </div>
      <div className="col-17" />
        </div>
    <ResultArea>
      <Table
        name={NAME}
        columns={modelfield}
        title="查询结果"
        data={this.state.data3}
        // defaultSorted={[{ id: 'id', desc: true }]}
      />
    </ResultArea>
  </Page>
    )
  }
}

export default Model;
