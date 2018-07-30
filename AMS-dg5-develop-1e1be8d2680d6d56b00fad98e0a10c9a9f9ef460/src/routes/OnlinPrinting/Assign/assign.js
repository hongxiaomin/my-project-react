import React from 'react';
import {
  Input,
  Select,
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


import { dataHandlerWithEncode } from '../../../utils/Common';
import {
  onInitial,
  onCloseSnack,
  onChange,
  onSuccess,
  onSubmit,
  dataSourceTemplate,
  getRowProps,
  onConfirm,
  // oncancel,
} from './fn';
import { assignfield, actionTbA, actionConFA, actionCamcelA } from '../config';

class Assign extends React.Component {
  constructor(props) {
    super(props);
    this.onInitial = onInitial(this);
    this.onCloseSnack = onCloseSnack(this);
    this.onChange = onChange(this);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.getRowProps = getRowProps(this);
    this.onConfirm = onConfirm(this);
    // this.oncancel = oncancel(this);
    this.state = {
      snackSwitch: undefined,
      loading: undefined,
      message: undefined,
      data4:undefined,
      selected: undefined,
      workorderData: undefined,
      purchaserData: undefined,
      machineData: undefined,
      countryData: undefined,
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
        name="assignForm"
        action={actionTbA}
        method="GET"
        direction="column"
        dataTemplate={dataHandlerWithEncode}
        dataSourceTemplate={dataSourceTemplate}
        onClientSuccess={this.onSuccess}
        onClientSubmit={this.onSubmit}
        contentType="application/json"
      >
      <div className="row">
        <div className="col-4">
        <Input
          name="workOrderId"
          type="select"
          valueName="workOrderId"
          labelName="workOrder"
          floatingLabelText="工单"
          fullWidth
          data={this.state.workorderData}
          onClientChange={this.onChange}
        />
        </div>
        <div className="col-1">
          <div className="SearchButton">
            <Submit label="查询" />
          </div>
        </div>
      </div>
     </Form>
        <div className="row">
          <div className="col-10">
            <Input
              name="purchaser"
              floatingLabelText="客户"
              disabled
              value={this.state.purchaserData}
            />
          </div>
            <div className="col-4" />
            <div className="col-10">
            <Input
              name="machine"
              disabled
              floatingLabelText="机种"
              value={this.state.machineData}
            />
          </div>
            <div className="col-4" />
            <div className="col-10">
            <Input
              name="country"
              disabled
              value={this.state.countryData}
              floatingLabelText="国别"
            />
          </div>
        </div>
        <div className="col-2">
        <RaisedButton name="Confirm" label="确认" onClientClick={this.onConfirm({ actionConProps:actionConFA })} backgroundColor="#1490DE" labelColor="#ffffff" style={{ marginRight:"10px"}}   />
        <RaisedButton name="cancel" label="取消" onClientClick={this.onConfirm({ actionConProps: actionCamcelA })} backgroundColor="#1490DE" labelColor="#ffffff"  />
        </div>
      <div className="AssignTable">
      <ResultArea>
        <Table
          name="AssignTable"
          columns={assignfield}
          title="查询结果"
          data={this.state.data4}
          defaultSorted={[{ id: 'id', desc: true }]}
          getTrProps={this.getRowProps(this.state.selected)}
        />
    </ResultArea>
      </div>
  </Page>
    )
  }
}

export default Assign;
