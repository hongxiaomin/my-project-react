import React from 'react';
import {
  Loading,
  SnackBar,
} from '@delta/common-utils';
import Table from '../../../../components/Table';
import Page from '../../../../components/Page';
import ResultArea from '../../../../components/ResultArea';
import Bread from '../../../../components/Bread';
import TitleBar from '../../../../components/TitleBar';
import site from '../../../../assets/site.svg';
import PageTitle from '../../../../components/PageTitle';
import {
  breadMap,
  storageTimeoutAlarmTableField,
} from './config';
import './style.less';
import { onInitial, onCloseSnack } from './fn';

class StorageTimeoutAlarm extends React.Component {
  constructor(props) {
    super(props);
    this.onInitial = onInitial(this);
    this.onCloseSnack = onCloseSnack(this);
    this.state = {
      data: undefined,
      loading: false,
      snackSwitch: false,
      message: undefined,
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
        <div className="noFormTitle">
          <TitleBar pageTitle={<PageTitle logo={site} title="存放超时预警" />} />
        </div>
        <ResultArea>
          <Table
            title="存放超时预警"
            columns={storageTimeoutAlarmTableField}
            data={this.state.data}
            defaultPageSize={10}
            // action={url}
          />
        </ResultArea>
      </Page>
    );
  }
}
export default StorageTimeoutAlarm;
