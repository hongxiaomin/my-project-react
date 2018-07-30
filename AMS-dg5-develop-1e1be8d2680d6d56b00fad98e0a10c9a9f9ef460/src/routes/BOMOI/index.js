import React from 'react';
import {
  Loading,
  SnackBar,
} from '@delta/common-utils';
import { Tabs, Tab } from 'material-ui';
import site from '../../assets/site.svg';
import './style.less';
import Page from '../../components/Page';
import Card from '../../components/Card';
import Single from './single';
import Grouping from './grouping';
import Bread from '../../components/Bread';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '程式料表',
}, {
  path: '',
  name: '程式料表生成',
}];

const BOMOI = props => (
  <Page>
    <Bread breadMap={breadMap} />
    <Tabs tabItemContainerStyle={{ backgroundColor: 'rgba(0, 134, 219,0.9)' }}>
      <Tab label="SINGLE" value="1" >
        <Card title="SINGLE程式料表">
          <Single />
        </Card>
      </Tab>
      <Tab label="GROUPING" value="2" >
        <Card title="GROUPING程式料表">
          <Grouping />
        </Card>
      </Tab>
    </Tabs>
  </Page>
);


export default BOMOI;

