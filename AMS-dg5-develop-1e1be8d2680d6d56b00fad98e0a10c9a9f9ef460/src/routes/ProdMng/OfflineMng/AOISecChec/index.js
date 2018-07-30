import React from 'react';
import {
  Loading,
  SnackBar,
} from '@delta/common-utils';
import Table from '../../../../components/Table';
import Page from '../../../../components/Page';
import ResultArea from '../../../../components/ResultArea';
import Bread from '../../../../components/Bread';
import { field, breadMap } from './config';
import { onCloseSnack, onInitial } from './fn';

class AOISecChec extends React.Component {
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
        <ResultArea>
          <Table
            title="AOI二次确认"
            data={this.state.data}
            columns={field(this)}
            defaultPageSize={10}
          />
        </ResultArea>
      </Page>
    );
  }
}

export default AOISecChec;
