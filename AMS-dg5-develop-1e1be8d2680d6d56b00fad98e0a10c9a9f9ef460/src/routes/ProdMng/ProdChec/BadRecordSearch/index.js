import React from 'react';
import {
  Loading,
  SnackBar,
  Input,
  Form,
} from '@delta/common-utils';
import { dataHandlerWithEncode } from '../../../../utils/Common';
import Submit from '../../../../components/Submit';
import Card from '../../../../components/Card';
import Table from '../../../../components/Table';
import Page from '../../../../components/Page';
import ResultArea from '../../../../components/ResultArea';
import Bread from '../../../../components/Bread';
import { action, actionPut, field, breadMap } from './config';
import {
  dialogDataTemplate,
  dataSourceTemplate,
  onSubmit,
  onSuccess,
  onCloseSnack,
  onCloseModal,
  onSubmitModal,
  onSuccesModal,
  onErrorModal,
  onInitial,
} from './fn';
import './style.less';

class BadRecordSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.onInitial = onInitial(this);
    this.onCloseSnack = onCloseSnack(this);
    this.onCloseModal = onCloseModal(this);
    this.onSubmitModal = onSubmitModal(this);
    this.onSuccesModal = onSuccesModal(this);
    this.onErrorModal = onErrorModal(this);
    this.state = {
      data: undefined,
      loading: false,
      snackSwitch: false,
      message: undefined,
      phenomenaData: undefined,
      responsibilityUnitId: undefined,
      defectivePhenomenaId: undefined,
      unitData: undefined,
      lineData: undefined,
      lineId: undefined,
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
        <Bread breadMap={breadMap} />
        <Form
          name="BadRecordSearchForm"
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
              <Input
                name="lineId"
                floatingLabelText="线别"
                type="select"
                labelName="lineName"
                valueName="id"
                data={this.state.lineData}
                value={this.state.lineId}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="workOrder" floatingLabelText="工单" fullWidth />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input name="model" floatingLabelText="机种" fullWidth />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="defectivePhenomenaId"
                floatingLabelText="不良现象"
                type="select"
                labelName="defectivePhenomena"
                valueName="id"
                data={this.state.phenomenaData}
                value={this.state.defectivePhenomenaId}
              />
            </div>
            <div className="col-1" />
            <div className="col-4">
              <Input
                name="responsibilityUnitId"
                floatingLabelText="责任单位"
                type="select"
                labelName="responsibilityUnit"
                valueName="id"
                data={this.state.unitData}
                value={this.state.responsibilityUnitId}
              />
            </div>
            <div className="col-1">
              <div className="SearchButton">
                <Submit label="查询" />
              </div>
            </div>
          </div>
        </Form>
        <ResultArea>
          <Table
            title="查询结果"
            data={this.state.data}
            columns={field}
            defaultPageSize={10}
            SubComponent={({ row }) => {
              return (
                <div style={{ padding: '20px' }}>
                  <Card title={`PCB编号：${row.sn}`}>
                    <Form
                      action={actionPut}
                      method="PUT"
                      dataTemplate={dialogDataTemplate}
                      onClientSubmit={this.onSubmitModal}
                      onClientSuccess={this.onSuccesModal}
                      onClientError={this.onErrorModal}
                      contentType="application/json"
                    >
                      <Input name="id" type="hidden" value={`${row.defectiveDetailId}`} />
                      <Input name="reason" floatingLabelText="不良原因" value={row._original.reason ? `${row._original.reason}` : ''} />
                      <Input name="solution" floatingLabelText="改善对策" value={row._original.solution ? `${row._original.solution}` : ''} />
                      <br />
                      <div className="row">
                        <div className="col-10" />
                        <div className="col-3" >
                          <Submit label="提交变更" />
                        </div>
                        <div className="col-10" />
                      </div>
                    </Form>
                  </Card>
                </div>
              );
             }
            }
          />
        </ResultArea>
      </Page>
    );
  }
}

export default BadRecordSearch;
