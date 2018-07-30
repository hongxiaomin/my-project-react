import React from 'react';
import {
  Loading,
  SnackBar,
  Input,
  Form,
} from '@delta/common-utils';
import Page from '../../../../components/Page';
import PageTitle from '../../../../components/PageTitle';
import TitleBar from '../../../../components/TitleBar';
import Bread from '../../../../components/Bread';
import Table from '../../../../components/Table';
import Submit from '../../../../components/Submit';
import site from '../../../../assets/site.svg';
import MsgCard from './MsgCard';
import { action, field, breadMap } from './config';
import {
  dataTemplate,
  dataSourceTemplate,
  onSubmit,
  onSuccess,
  onError,
  onCloseSnack,
  onInitial,
  onTabInitial,
  getRowProps,
} from './fn';
class StockSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.onError = onError(this);
    this.onCloseSnack = onCloseSnack(this);
    this.getRowProps = getRowProps(this);
    this.onInitial = onInitial(this);
    this.onTabInitial = onTabInitial(this);
    this.state = {
      data: undefined,
      selected: undefined,
      barclick: undefined,
      loading: false,
      snackSwitch: false,
      message: undefined,
    };
  }
  componentWillMount() {
    this.onInitial();
    this.onTabInitial();
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
        <TitleBar pageTitle={<PageTitle logo={site} title="库存查询" />} />
        <Form
          name="StockSearchForm"
          action={action}
          method="GET"
          dataTemplate={dataTemplate}
          dataSourceTemplate={dataSourceTemplate}
          onClientSubmit={this.onSubmit}
          onClientSuccess={this.onSuccess}
          onClientError={this.onError}
        >
          <div className="row margin-vertival-2">
            <div className="col-4">
              <Input
                name="lineId"
                floatingLabelText="线别"
                type="select"
                labelName="lineName"
                valueName="id"
                key="id"
                data={this.state.LineData}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="workOrder" floatingLabelText="工单" />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="startTime" type="date" floatingLabelText="起始时间" />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="endTime" type="date" floatingLabelText="结束时间" />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Submit label="查询" style={{ marginTop: '20px' }} />
            </div>
          </div>
        </Form>
        <Table
          title="查询结果"
          data={this.state.data}
          columns={field}
          getTrProps={this.getRowProps(this.state.selected)}
          defaultSorted={[{ id: 'id', desc: false }]}
          SubComponent={() => (
            <MsgCard selected={this.state.barclick} />)}
        />
      </Page>
    );
  }
}

export default StockSearch;
