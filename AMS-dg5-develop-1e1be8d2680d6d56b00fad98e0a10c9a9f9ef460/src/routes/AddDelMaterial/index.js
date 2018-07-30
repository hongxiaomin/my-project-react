import React from 'react';
import {
  Input,
  Loading,
  SnackBar,
  Form,
} from '@delta/common-utils';
import { Tabs, Tab } from 'material-ui/Tabs';
import {
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
  dataTemplate,
  dataSourceTemplate,
  onBeforeSubmit,
} from './fn';
import { action } from './config';
import Submit from '../../components/Submit';
import './style.less';
import Page from '../../components/Page';
import Bread from '../../components/Bread';
import Card from '../../components/Card';
import Single from './single';
import Grouping from './grouping';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '程式料表',
}, {
  path: '',
  name: '新增/刪除代用料',
}];


class AddDelMaterial extends React.Component {
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
    this.onBeforeSubmit = onBeforeSubmit(this);
    this.state = {
      loading: false,
      snackSwitch: undefined,
      message: undefined,
      method: 'GET',
      singleData: [],
      groupingData: [],
      groupingDataUpdate: false,

    };
  }
  render() {
    return (
      <div className="addDelMaterial">
        < Page >
          <Loading visible={this.state.loading} />
          <SnackBar
            open={this.state.snackSwitch}
            message={this.state.message}
            onClientRequestClose={this.onCloseSnack}
          />
          <Bread breadMap={breadMap} />
          <Form
            name="addDelMaterialForm"
            action={action}
            method={this.state.method}
            dataTemplate={dataTemplate}
            dataSourceTemplate={dataSourceTemplate}
            onClientSubmit={this.onSubmit}
            onClientSuccess={this.onSuccess}
            onClientBeforeSubmit={this.onBeforeSubmit}
          >
            <div className="row margin-vertival-2">

              <div className="col-8">
                {/* <Input name="assembleNo" floatingLabelText="组合十码" defaultValue="3941309995" /> */}
                <Input name="assembleNo" floatingLabelText="组合十码" />
              </div>
              <div className="col-1">
                <div className="DispatchMaterial">
                  <Submit label="查询" />

                </div>
              </div>
            </div>
          </Form>
          <br />
          <br />
          <Tabs>
            <Tab label="SINGLE" value="1">
              <Card title="SINGLE 代用料">
                <Single dataSource={this.state.singleData} />
              </Card>
            </Tab>
            <Tab label="GROUPING" value="2">
              <Card title="GROUPING 代用料">
                <Grouping dataSource={this.state.groupingData} p_this={this} />
              </Card>
            </Tab>
          </Tabs>
        </Page >
      </div>
    );
  }
}

export default AddDelMaterial;
