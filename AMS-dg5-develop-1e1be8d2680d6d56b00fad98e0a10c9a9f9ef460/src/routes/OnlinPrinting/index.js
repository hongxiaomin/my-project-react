import React from 'react';
import { Tabs } from 'antd';
import Page from '../../components/Page';
import Bread from '../../components/Bread';
import { breadMap } from './config';
import Assign from './Assign/assign';
import Manage from './Manage/manage';
import Character from './Character/character';
import Model from './Model/model';
import {
  SnackBar,
  Loading,
} from '@delta/common-utils';
import {
  onCloseSnack,//弹框
} from './fn';
import './style.less';

const TabPane = Tabs.TabPane;

class OnlinPrinting extends React.Component {
  constructor(props) {
    super(props);
    // this.onInitial = onInitial(this);
    this.onCloseSnack = onCloseSnack(this);
    this.state = {
      message: undefined,
      snackSwitch: false,
      loading: false,
    };
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
          <Bread breadMap={breadMap}/>
            <Tabs defaultActiveKey="1">
            <TabPane tab={<span>角色管理</span>} key="1">
              <Character />
            </TabPane>
            <TabPane tab={<span>机种管理</span>} key="2">
              <Model />
            </TabPane>
            <TabPane tab={<span>参数管理</span>} key="3">
              <Manage />
            </TabPane>
            <TabPane tab={<span>参数分配</span>} key="4">
              <Assign />
            </TabPane>
          </Tabs>
       </Page>
      )
    }
}
export default OnlinPrinting;
