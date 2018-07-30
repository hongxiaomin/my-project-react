import React from 'react';
import { Tabs, Icon } from 'antd';
import {
  Input,
  Form,
  Dialog,
  SnackBar,
} from '@delta/common-utils';
import Table from '../../components/Table';
import { field, singleAction } from './config';
import { dataTemplateSingle, onSingleUpdate, dataSourceTemplateSingle, changeErrorMsg, onBeforeSubmit, onCloseSnack } from './fn';
import Submit from '../../components/Submit';

const TabPane = Tabs.TabPane;
class Single extends React.Component {
  constructor(props) {
    super(props);
    this.onSingleUpdate = onSingleUpdate(this);
    this.dataTemplateSingle = dataTemplateSingle(this);
    this.changeErrorMsg = changeErrorMsg(this);
    this.onBeforeSubmit = onBeforeSubmit(this);
    this.onCloseSnack = onCloseSnack(this);
    this.state = {
      message: undefined,
      open: false,
      dialogOpen: false,
      arrData: [],
      formData: {},
      errorMsg: [],
      SnackBarOpen: false,
    };
  }

  render() {
    return (
      <div>
        <SnackBar
          open={this.state.SnackBarOpen}
          message={this.state.message}
          onClientRequestClose={this.onCloseSnack}
          autoDetectWindowHeight={false}
        />
        <Dialog title="代用料已存在" name="dialog1" open={this.state.open} showCancel={false} >
          {this.state.message}
        </Dialog>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><Icon type="plus-square-o" />新增代用料</span>} key="1">
            <Form
              name="addSingleForm"
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
                  {/* <Input name="materialNo" floatingLabelText="代用料号" defaultValue="2924380312" /> */}
                  <Input name="materialNo" floatingLabelText="代用料号"/>
                </div>
                <div className="col-1" />
                <div className="col-5">
                  <Input name="description" floatingLabelText="规格"/>
                </div>
                <div className="col-1" />
                <div className="col-5">
                  <Input name="location" floatingLabelText="位置"/>
                </div>
                <div className="col-1" />
                <div className="col-5">
                  <Input name="mainMaterialNo" floatingLabelText="主料号" />
                </div>
                <div className="col-1" style={{ display: 'none' }}>
                  <Input name="productType" defaultValue="single" floatingLabelText="Single" />
                </div>
                <div className="col-1" style={{ display: 'none' }}>
                  <Input name="operation" defaultValue="add" floatingLabelText="Add" />
                </div>
                <div className="col-1">
                  <div className="DispatchMaterial">
                    <Submit
                      label="同步变更"
                      disabled={(this.props.dataSource ? this.props.dataSource.length : 0) ? false : true}
                    />
                  </div>
                </div>
              </div>
            </Form>
          </TabPane>
          <TabPane tab={<span><Icon type="delete" />删除代用料</span>} key="2">
            <Form
              name="deleteSingleForm"
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
                  <Input name="productType" defaultValue="single" floatingLabelText="Single" />
                </div>
                <div className="col-1" style={{ display: 'none' }}>
                  <Input name="operation" defaultValue="delete" floatingLabelText="DeltD" />
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
          title="查询結果"
          data={this.props.dataSource}
          columns={field}
          defaultSorted={[{ id: 'id', desc: true }]}
        />

        <Dialog
          title="对比结果"
          name="dialog2"
          open={this.state.dialogOpen}
          //modal
          //autoDetectWindowHeight={false}
          //autoScrollBodyContent={false}
          contentStyle={{ width: '86%', maxWidth: 'none' }}
          showCancel={false}
        >
          {
            this.state.errorMsg.length
              ? <ul style={{ color: 'red' }}>{this.state.errorMsg}</ul>
              : null
          }
          <div className="tableWrap">
            {this.state.arrData ? this.state.arrData : ''}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Single;
