import React from 'react';
import {
  Loading,
  SnackBar,
  Form,
  Input,
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
import { field, action } from './config';
import './style.less';
import Table from '../../../components/Table';
import Page from '../../../components/Page';
import PageTitle from '../../../components/PageTitle';
import TitleBar from '../../../components/TitleBar';
import Bread from '../../../components/Bread';
import ResultArea from '../../../components/ResultArea';
import Submit from '../../../components/Submit';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '成品管理',
}, {
  path: '',
  name: '维修统计',
}];

class RepairStat extends React.Component {
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
      lineData: undefined,
    };
  }
  componentWillMount() {
    this.onInitial();
  }
  render() {
    return (
      <div className="repairStat">
        <Page>
          <Loading visible={this.state.loading} />
          <SnackBar
            open={this.state.snackSwitch}
            message={this.state.message}
            onClientRequestClose={this.onCloseSnack}
          />
          <Bread breadMap={breadMap} />
          <TitleBar pageTitle={<PageTitle logo={site} title="维修统计" />} />
          <br />
          <br />
          <Form
            name="RepairStatForm"
            action={action}
            method={this.state.method}
            dataTemplate={dataTemplate}
            dataSourceTemplate={dataSourceTemplate}
            onClientSubmit={this.onSubmit}
            onClientSuccess={this.onSuccess}
          >
            <div className="row margin-vertival-2">
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
                <Input name="workOrder" floatingLabelText="工单号" />
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
              columns={field}
              getTrProps={this.getRowProps(this.state.selected)}
            />
          </ResultArea>
        </Page>
      </div>
    );
  }
}

export default RepairStat;

