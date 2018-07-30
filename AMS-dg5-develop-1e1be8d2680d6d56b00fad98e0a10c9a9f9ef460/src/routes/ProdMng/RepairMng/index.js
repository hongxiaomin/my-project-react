import React from 'react';
import {
  Loading,
  SnackBar,
  Input,
  RaisedButton,
  Form,
} from '@delta/common-utils';
import site from '../../../assets/site.svg';
import {
  dataTemplate,
  dataSourceTemplate,
  onSubmit,
  onSuccess,
  getRowProps,
  onModalClose,
  onCreate,
  onCloseSnack,
  onModalSubmit,
  onModalSuccess,
  onModalError,
  onUpdate,
  onDelete,
  onInitial,
} from './fn';
import { field, action, status, actionUpdate } from './config';
import './style.less';
import Table from '../../../components/Table';
import Page from '../../../components/Page';
import PageTitle from '../../../components/PageTitle';
import TitleBar from '../../../components/TitleBar';
import Bread from '../../../components/Bread';
import ResultArea from '../../../components/ResultArea';
import Card from '../../../components/Card';
import Submit from '../../../components/Submit';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '成品管理',
}, {
  path: '',
  name: '维修管理',
}];

class RepairMng extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = onSubmit(this);
    this.onSuccess = onSuccess(this);
    this.getRowProps = getRowProps(this);
    this.onModalClose = onModalClose(this);
    this.onModalSubmit = onModalSubmit(this);
    this.onModalSuccess = onModalSuccess(this);
    this.onModalError = onModalError(this);
    this.onCloseSnack = onCloseSnack(this);
    this.onCreate = onCreate(this);
    this.onUpdate = onUpdate(this);
    this.onDelete = onDelete(this);
    this.onInitial = onInitial(this);
    this.state = {
      loading: false,
      data: undefined,
      selected: undefined,
      snackSwitch: undefined,
      message: undefined,
      method: 'GET',
      tools: undefined,
      scrapData: undefined,
      lineData: undefined,
    };
  }
  // componentWillMount() {
  //   this.onInitial();
  // }

  render() {
    return (
      <div className="repairMng">
        <Page>
          <Loading visible={this.state.loading} />
          <SnackBar
            open={this.state.snackSwitch}
            message={this.state.message}
            onClientRequestClose={this.onCloseSnack}
          />
          <Bread breadMap={breadMap} />
          <TitleBar pageTitle={<PageTitle logo={site} title="维修管理" />} />
          <br />
          <br />
          <Form
            name="RepairMngForm"
            action={action}
            method={this.state.method}
            dataTemplate={dataTemplate}
            dataSourceTemplate={dataSourceTemplate}
            onClientInitial={this.onInitial}
            onClientSubmit={this.onSubmit}
            onClientSuccess={this.onSuccess}
            contentType="application/json"
          >
            <div className="row margin-vertival-2">
              <div className="col-4">
                <Input name="workOrder" floatingLabelText="工单号" />
              </div>
              <div className="col-1" />
              <div className="col-4">
                <Input
                  name="lineId"
                  type="select"
                  valueName="id"
                  labelName="lineName"
                  floatingLabelText="线别"
                  data={this.state.lineData}
                />
              </div>
              <div className="col-1" />
              <div className="col-4">
                <Input name="sn" floatingLabelText="PCB编号" />
              </div>
              <div className="col-1" />
              <div className="col-4">
                <Input
                  name="status"
                  type="select"
                  valueName="id"
                  labelName="name"
                  floatingLabelText="维修状态"
                  data={status}
                />
              </div>
              <div className="col-2">
                <div className="DispatchMaterial">
                  <Submit label="查询" />
                </div>
              </div>
            </div>
          </Form>
          <ResultArea>
            <Table
              title="查询結果"
              data={this.state.data}
              columns={field(this, this.state.tools, this.state.scrapData)}
              getTrProps={this.getRowProps(this.state.selected)}
            />
          </ResultArea>
          <div className="cardStyle">
            <Card title="开始/结束维修">
              <Form
                name="RepairMngForm2"
                action={actionUpdate}
                method={this.state.method}
                dataTemplate={dataTemplate}
                dataSourceTemplate={dataSourceTemplate}
                onClientSubmit={this.onSubmit}
                onClientSuccess={this.onSuccess}
                contentType="application/json"
              >
                <div className="row margin-vertival-2">
                  <div className="col-4">
                    <Input name="PCBName" floatingLabelText="PCB编号" />
                  </div>
                  <div className="col-2">
                    <div className="DispatchMaterial">
                      <RaisedButton label="确定" onClientClick={onUpdate(this, this.state.tools)} backgroundColor="#0086DB" labelColor="#ffffff" fullWidth />
                    </div>
                  </div>
                </div>
              </Form>
            </Card>
          </div>
        </Page>
      </div>
    );
  }
}

export default RepairMng;

