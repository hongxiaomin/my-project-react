import React from 'react';
import { Tabs, Icon } from 'antd';
import { Input, Form, Dialog, SnackBar, RaisedButton } from '@delta/common-utils';
// import { getCheckedRow } from '@delta/common-utils/';
import Table from '../../components/Table';
import {
  singleAction,
  groupingField,
  groupingField2,
} from './config';
import Submit from '../../components/Submit';
import Modal from '../../components/Modal';
import { onSingleUpdate, dataTemplateSingle, dataSourceTemplateSingle, changeErrorMsg, shouldModalShow, onBeforeSubmit, onCloseSnack, onSubmit } from './fn';
import './style.less';

const TabPane = Tabs.TabPane;
class Grouping extends React.Component {
  constructor(props) {
    super(props);
    this.onSingleUpdate = onSingleUpdate(this);
    this.changeErrorMsg = changeErrorMsg(this);
    this.dataTemplateSingle = dataTemplateSingle(this);
    this.shouldModalShow = shouldModalShow(this);
    this.onBeforeSubmit = onBeforeSubmit(this);
    this.onCloseSnack = onCloseSnack(this);
    this.onSubmit = onSubmit(this);
    this.state = {
      message: undefined,
      arrData: [],
      //modalShow: false,
      groupingDialogOpen: false,
      SnackBarOpen: false,
      groupingErrorMsg: [],
      modalErrorMsg: [],
      formData: {},
      tools: undefined,
    };
  }
  render() {
    const field = [
      {
        Header: '序号',
        accessor: 'id',
        Cell: text => text.index + 1,
        maxWidth: 60,
      },
      {
        Header: '程式料表名称',
        accessor: 'bomReportName',
        minWidth: 360,
      },
      {
        Header: '位置',
        accessor: 'location',
        show: this.props.p_this.state.groupingDataUpdate,
      },
    ];
    return (
      <div>
        <SnackBar
          open={this.state.SnackBarOpen}
          message={this.state.message}
          onClientRequestClose={this.onCloseSnack}
        />
        <Dialog title="代用料已存在" name="dialog3" open={this.state.open}>
          {this.state.message}
        </Dialog>
        <Tabs defaultActiveKey="1" >
          <TabPane tab={<span><Icon type="plus-square-o" />新增代用料</span>} key="1">
            <Form
              name="addGroupingForm"
              action={singleAction}
              method="POST"
              dataTemplate={this.dataTemplateSingle}
              dataSourceTemplate={dataSourceTemplateSingle}
              onClientSubmit={this.onSubmit}
              onClientSuccess={this.onSingleUpdate}
              onClientBeforeSubmit={this.onBeforeSubmit}
            >
              <div className="row margin-vertival-2">
                <div className="col-5">
                  {/* <Input name="materialNo" floatingLabelText="代用料号" defaultValue="1234567890" /> */}
                  <Input name="materialNo" floatingLabelText="代用料号" />
                </div>
                <div className="col-1" />
                <div className="col-5">
                  {/* <Input name="description" floatingLabelText="规格" defaultValue=" CAP MC SMD 25V 3300pF K X7R" /> */}
                  <Input name="description" floatingLabelText="规格" />
                </div>
                <div className="col-1" />
                <div className="col-5">
                  <Input name="location" floatingLabelText="位置" />
                </div>
                <div className="col-1" />
                <div className="col-5">
                  {/* <Input name="mainMaterialNo" floatingLabelText="主料号" defaultValue="1552447A00" /> */}
                  <Input name="mainMaterialNo" floatingLabelText="主料号" />
                </div>
                <div className="col-1" style={{ display: 'none' }}>
                  <Input name="productType" defaultValue="grouping" floatingLabelText="Grouping" />
                </div>
                <div className="col-1" style={{ display: 'none' }}>
                  <Input name="operation" defaultValue="add" floatingLabelText="Add" />
                </div>
                <div className="col-1">
                  <div className="DispatchMaterial">
                    <Submit label="同步变更" disabled={(this.props.dataSource.length) ? false : true} />
                  </div>
                </div>
              </div>
            </Form>
          </TabPane>
          <TabPane tab={<span><Icon type="delete" />删除代用料</span>} key="2">
            <Form
              name="deleteGroupingForm"
              action={singleAction}
              method="POST"
              dataTemplate={this.dataTemplateSingle}
              dataSourceTemplate={dataSourceTemplateSingle}
              onClientSubmit={this.onSubmit}
              onClientSuccess={this.onSingleUpdate}
              onClientBeforeSubmit={this.onBeforeSubmit}
            >
              <div className="row margin-vertival-2">
                <div className="col-6">
                  <Input name="materialNo" floatingLabelText="代用料号" />
                </div>
                <div className="col-1" />
                <div className="col-6">
                  <Input name="location" floatingLabelText="位置" />
                </div>
                <div className="col-1" />
                <div className="col-6">
                  <Input name="mainMaterialNo" floatingLabelText="主料号" />
                </div>
                <div className="col-1" style={{ display: 'none' }}>
                  <Input name="productType" defaultValue="grouping" floatingLabelText="Grouping" />
                </div>
                <div className="col-1" style={{ display: 'none' }}>
                  <Input name="operation" defaultValue="delete" floatingLabelText="Delete" />
                </div>
                <div className="col-1">
                  <div className="DispatchMaterial">
                    <Submit label="同步变更" disabled={(this.props.dataSource.length) ? false : true} />
                  </div>
                </div>
              </div>
            </Form>
          </TabPane>
        </Tabs>


        <Table
          selectable
          //selectable={this.props.p_this.state.groupingDataUpdate}
          title="查询結果"
          name="checkboxTable"
          data={this.props.dataSource}
          //columns={groupingField(this.props.p_this.state.groupingDataUpdate)}
          //columns={field}
          columns={groupingField2}

        />

        {
          this.props.p_this.state.groupingDataUpdate ?
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'red', marginTop: 20 }}>{this.state.message}</p>
              <div className="row margin-vertival-2">
                <div className="col-4" />
                <div className="col-2" >
                  <RaisedButton
                    name="确认变更"
                    label="确认变更"
                    backgroundColor="#0086DB"
                    labelColor="#fff"
                    style={{ width: 120 }}
                    onClientClick={shouldModalShow(this, this.state.tools)}
                  />
                </div>
                <div className="col-4" />
              </div>
            </div>
            : ''
        }
        <Dialog
          title="Table 查询结果"
          name="dialog4"
          open={this.state.groupingDialogOpen}
          contentStyle={{ width: '86%', maxWidth: 'none' }}
          showCancel={false}
        //modal
        >
          {
            this.state.groupingErrorMsg.length
              ? <ul style={{ color: 'red' }}>{this.state.groupingErrorMsg}</ul>
              : null
          }
          <div className="tableWrap" >
            {this.state.arrData ? this.state.arrData : ''}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Grouping;
