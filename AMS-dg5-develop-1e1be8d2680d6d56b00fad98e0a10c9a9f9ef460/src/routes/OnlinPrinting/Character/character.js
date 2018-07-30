import React from 'react';
import {
  Input,
  Select,
  Form,
  Dialog,
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


import { dataHandlerWithEncode } from '../../../utils/Common';
import {
  dataSourceTemplate,
  ModelDataTemplate,
  ModelDataTemplateSet,
  onSubmit,
  onSuccess,
  onInitial,
  onSubmitModal,
  onSuccesModal,
  onErrorModal,
  onUpdate,
  onCloseModal,
  getRowProps,
  onSubmitModalSet,
  onSuccesModalSet,
  shouldModalShow,
  onCloseSnack,
} from './fn';
import { field, actionC, actionAddC, actionUpdateC } from '../config';

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.onInitial = onInitial(this);
    this.onSubmitModal = onSubmitModal(this);
    this.onSuccesModal = onSuccesModal(this);
    this.onSubmitModalSet = onSubmitModalSet(this);
    this.onSuccesModalSet = onSuccesModalSet(this);
    this.onErrorModal = onErrorModal(this);
    this.onUpdate = onUpdate(this);
    this.onCloseModal = onCloseModal(this);
    this.getRowProps = getRowProps(this);
    this.shouldModalShow = shouldModalShow(this);
    this.ModelDataTemplateSet = ModelDataTemplateSet(this)
    this.onCloseSnack = onCloseSnack(this);
    this.state = {
      message: undefined,
      data: undefined,
      selected: undefined,
      data1:undefined,
      roleData:undefined,
      roleDataM:undefined,
      roleDataMSetId: undefined,
      roleDataMSet: undefined,
      descriptionSet: undefined,
      snackSwitch: undefined,
      loading: undefined,
      // shouldModalShow: false,
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
        name="CharacterForm"
        action={actionC}
        method="GET"
        direction="column"
        // NAME="CharacterForm"
        dataTemplate={ModelDataTemplate}
        dataSourceTemplate={dataSourceTemplate}
        onClientSuccess={this.onSuccess}
        onClientSubmit={this.onSubmit}
        contentType="application/json"
      >
      <div className="row">
        <div className="col-4">
        <Input
          name="role"
          type="select"
          valueName="name"
          labelName="name"
          floatingLabelText="角色"
          fullWidth
          data={this.state.roleData}
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
        name="CharacterAddModal"
        action={actionAddC}
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
        name="role"
        type="select"
        valueName="name"
        labelName="name"
        floatingLabelText="角色"
        fullWidth
        data={this.state.roleDataM}
        />
        </div>
        </div>
        <div className="row">
      <div className="col-4">
      <Input
        name="description"
        floatingLabelText="备注"
        fullWidth />
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
        <RaisedButton label="新增" onClientClick={this.onUpdate} backgroundColor="#1490DE" labelColor="#ffffff"  />
     <div className="ModalButton">
      <Modal
        name="characterUpdateModal"
        title="修改"
        btnName="修改"
        shouldModalShow={this.shouldModalShow}
        formName="characterUpdateForm"
      >
        <Form
          name="characterUpdateForm"
          action={actionUpdateC}
          method="GET"
          contentType="application/json"
          dataTemplate={this.ModelDataTemplateSet}
          onClientSubmit={this.onSubmitModalSet}
          onClientSuccess={this.onSuccesModalSet}
          onClientError={this.onErrorModal}
        >
        <div className="row">
          <div className="col-10">
          <Input
            name="role"
            // type="select"
            //valueName="name"
           // labelName="name"
            floatingLabelText="角色"
            fullWidth
            value={this.state.roleDataMSetId}
            //data={this.state.roleDataMSet}
          />
        </div>
        </div>
        <div className="row">
         <div className="col-4">
          <Input
            name="description"
            floatingLabelText="备注"
            value={this.state.descriptionSet}
            fullWidth />
        </div>
        </div>
      </Form>
    </Modal>
  </div>
  </div>
  </div>
    <ResultArea>
      <Table
        name="characterTable"
        columns={field}
        title="查询结果"
        data={this.state.data1}
        //defaultSorted={[{ id: 'id', desc: true }]}
        getTrProps={this.getRowProps(this.state.selected)}
      />
    </ResultArea>
  </Page>
    )
  }
}

export default Character;
