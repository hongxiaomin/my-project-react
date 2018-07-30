import React from 'react';
import {
  Input,
  Dialog,
  Form,
  Loading,
  SnackBar,
  RaisedButton,
} from '@delta/common-utils';
import Page from '../../../components/Page';
import Button from '../../../components/Button';
import Submit from '../../../components/Submit';
import ResultArea from '../../../components/ResultArea';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import ParamList from './ParamList';
import Request from '../../../utils/fetchData';

import { dataHandlerWithEncode } from '../../../utils/Common';
import {
  onCloseSnack,
  onInitial,
  onInitialQuest,
  onSuccess,
  onSubmit,
  onQuestChange,
  onMachineChange,
  onCountryChange,
  onSuccesModal,
  onSuccesModalSet,
  onSubmitModal,
  onSubmitModalSet,
  onErrorModal,
  onErrorModalSet,
  onCloseModal,
  onCloseDialog,
  dataSourceTemplate,
  AdddialogDataTemplate,
  ModelDataTemplateSet,
  getRowProps,
  onInitialVal,
  onCreate,
  onUpdate,
  onParametersChange,
  onAddParameter,
  onCelParameter,
  onParamSuccess,
  ParamDialogTemplate,
} from './fn';
import { managefield, actionMG, actionAddOrSetMG, actionParamMG } from '../config';

class Manage extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseSnack = onCloseSnack(this),
    this.onInitial = onInitial(this);
    this.onInitialQuest = onInitialQuest(this);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.onQuestChange = onQuestChange(this);
    this.onMachineChange = onMachineChange(this);
    this.onCountryChange = onCountryChange(this);
    this.onSuccesModal = onSuccesModal(this);
    this.onSubmitModal = onSubmitModal(this);
    this.onErrorModal = onErrorModal(this);
    this.onCloseModal = onCloseModal(this);
    this.onCloseDialog = onCloseDialog(this);
    this.getRowProps = getRowProps(this);
    this.onInitialVal = onInitialVal(this);
    this.AdddialogDataTemplate = AdddialogDataTemplate(this);
    this.ModelDataTemplateSet = ModelDataTemplateSet(this);
    this.onSuccesModalSet = onSuccesModalSet(this);
    this.onSubmitModalSet = onSubmitModalSet(this);
    this.onErrorModalSet = onErrorModalSet(this);
    this.onCreate = onCreate(this);
    this.onUpdate = onUpdate(this);
    this.onParametersChange = onParametersChange(this);
    this.onAddParameter = onAddParameter(this);
    this.onCelParameter= onCelParameter(this);
    this.onParamSuccess = onParamSuccess(this);
    // this.ParamDialogTemplate = ParamDialogTemplate(this);
    this.state = {
      snackSwitch: undefined,
      message: undefined,
      loading: false,
      data3: undefined,
      selected: undefined,
      workOrderData: undefined,
      questData: undefined,
      machineData: undefined,
      countryData: undefined,
      questVal: undefined,
      machineVal: undefined,
      specId: undefined,
      open: false,
      ParamListData:[],
      roleData:undefined,
      parameterId:undefined,
    };
  }
  componentWillMount() {
    this.onInitialQuest();
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
          name="manageForm"
          action={actionMG}
          method="GET"
          contentType="application/json"
          dataSourceTemplate={dataSourceTemplate}
          onClientSuccess={this.onSuccess}
          onClientSubmit={this.onSubmit}
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
                data={this.state.questData}
                onClientChange={this.onQuestChange}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="machineName"
                type="select"
                valueName="purchaserMachineId"
                labelName="machineName"
                floatingLabelText="机种"
                fullWidth
                data={this.state.machineData}
                onClientChange={this.onMachineChange}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="country"
                type="select"
                valueName="machineCountryId"
                labelName="country"
                floatingLabelText="国别"
                fullWidth
                data={this.state.countryData}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="workOrder"
                type="select"
                valueName="workOrder"
                labelName="workOrder"
                floatingLabelText="工单"
                fullWidth
                data={this.state.workOrderData}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <div className="SearchButton" style={{paddingTop:'20px'}}>
                <Submit label="查询" />
              </div>
            </div>
          </div>
        </Form>
          <Dialog
            open={this.state.open}
            title="维护工单参数"
            onClientRequestClose={this.onModalClose}
            showOK={false}
            showCancel={false}
          >
          <div className="row">
            <div className="col-10">
              <Input
                name="role"
                floatingLabelText="维护人员"
                type="select"
                valueName="roleId"
                labelName="role"
                fullWidth
                defaultValue={1}
                data={this.state.roleData}
                onClientChange={this.onParametersChange}
              />
            </div>
          </div>
          <div className="row">
           <ParamList 
              value={[...this.state.ParamListData]} 
              onParamSuccess={this.onParamSuccess} 
              dataId ={this.state.parameterId} 
              onAddParameter={this.onAddParameter} 
              onCloseDialog={this.onCloseDialog} 
              onCelParameter={this.onCelParameter}
            />
          </div>
        </Dialog>
        <Dialog
          open={this.state.dialogSwitch}
          onClientRequestClose={this.onModalClose}
          showOK={false}
          showCancel={false}
        >
          <Form
            action={actionAddOrSetMG}
            method="GET"
            dataTemplate={this.AdddialogDataTemplate}
            onClientSubmit={this.onSubmitModal}
            onClientSuccess={this.onSuccesModal}
            onClientError={this.onErrorModal}
            contentType="application/json"
          >
            <div className="row">
              <div className="col-10">
                  <Input name="workOrder" floatingLabelText="工单" value={this.state.workOrder} />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Input
                    name="purchaser"
                    type="select"
                    valueName="purchaserId"
                    labelName="purchaser"
                    floatingLabelText="客户"
                    fullWidth
                    data={this.state.questData}
                    onClientChange={this.onQuestChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Input
                    name="machineName"
                    type="select"
                    valueName="purchaserMachineId"
                    labelName="machineName"
                    floatingLabelText="机种"
                    fullWidth
                    data={this.state.machineData}
                    onClientChange={this.onMachineChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <Input
                    name="country"
                    type="select"
                    valueName="machineCountryId"
                    labelName="country"
                    floatingLabelText="国别"
                    fullWidth
                    data={this.state.countryData}
                    onClientChange={this.onCountryChange}
                  />
                </div>
              </div>
              <div className="row" style={{paddingTop:'10px'}}>
                <div className="col-4">
                  <Submit label="提交" />
                </div>
                <div className="col-2" />
                <div className="col-4">
                  <Input type="button" label="取消" backgroundColor="#0086db" labelColor="#ffffff" onClientClick={this.onCloseModal} fullWidth />
                </div>
                <div className="col-12" />
              </div>
            </Form>
          </Dialog>
          <div className="row margin-vertival-2" style={{paddingTop:'10px'}}>
            <div className="col-4">
              <Button label="新增" onClientClick={this.onCreate}/>
            </div>
            <div className="col-1" />
            <div className="col-4">
              <div>
                <Modal
                  name="manageUpdateModal"
                  title="修改"
                  btnName="修改"
                  shouldModalShow={this.onUpdate}
                  formName="manageUpdateForm"
                >
                  <Form
                    name="manageUpdateForm"
                    action={actionAddOrSetMG}
                    method="GET"
                    contentType="application/json"
                    dataTemplate={this.ModelDataTemplateSet}
                    onClientSubmit={this.onSubmitModalSet}
                    onClientSuccess={this.onSuccesModalSet}
                    onClientError={this.onErrorModalSet}
                  >
                    <div className="row">
                      <div className="col-10">
                        <Input name="workOrder" floatingLabelText="工单" value={this.state.workOrder} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-10">
                        <Input
                          name="purchaser"
                          type="select"
                          valueName="purchaserId"
                          labelName="purchaser"
                          floatingLabelText="客户"
                          fullWidth
                          defaultValue={this.state.purchaserId}
                          data={this.state.questData}
                          onClientChange={this.onQuestChange}

                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-10">
                        <Input
                          name="machineName"
                          type="select"
                          valueName="purchaserMachineId"
                          labelName="machineName"
                          floatingLabelText="机种"
                          fullWidth
                          defaultValue={this.state.purchaserMachineId}
                          data={this.state.machineData}
                          onClientChange={this.onMachineChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-10">
                        <Input
                          name="country"
                          type="select"
                          valueName="machineCountryId"
                          labelName="country"
                          floatingLabelText="国别"
                          fullWidth
                          defaultValue={this.state.machineCountryId}
                          data={this.state.countryData}
                          onClientChange={this.onCountryChange}
                        />
                      </div>
                    </div>
                  </Form>
                </Modal>
              </div>
            </div>
            <div className="col-1" />
            <div className="col-14" style={{paddingTop:'7px'}}>
              <span style={{color:'red'}}>双击表格数据可维护工单参数</span>
            </div>
        </div>
      <ResultArea>
        <Table
          name="manageTable"
          columns={managefield}
          title="查询结果"
          data={this.state.data3}
          defaultSorted={[{ id: 'id' }]}
          getTrProps={this.getRowProps(this.state.selected)}
        />
      </ResultArea>
    </Page>
    )
  }
}

export default Manage;
