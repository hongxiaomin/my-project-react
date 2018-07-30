import React from 'react';
import {
  Loading,
  SnackBar,
  Input,
  RaisedButton,
} from '@delta/common-utils';
import Table from '../../components/Table';
import Page from '../../components/Page';
import Bread from '../../components/Bread';
import PageTitle from '../../components/PageTitle';
import TitleBar from '../../components/TitleBar';
import ResultArea from '../../components/ResultArea';
import site from '../../assets/site.svg';
import { field, breadMap } from './config';
import {
  onInitial,
  onSubmit,
  onSuccess,
  getRowProps,
  onCloseSnack,
  onCloseModal,
  onSubmitModal,
  onSuccesModal,
  onErrorModal,
  onCreate,
  onUpdate,
  onDelete,
} from './fn';
import './style.less';

class DispatchMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.onInitial = onInitial(this);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.onCreate = onCreate(this);
    this.onUpdate = onUpdate(this);
    this.onDelete = onDelete(this);
    this.getRowProps = getRowProps(this);
    this.onCloseSnack = onCloseSnack(this);
    this.onCloseModal = onCloseModal(this);
    this.onSubmitModal = onSubmitModal(this);
    this.onSuccesModal = onSuccesModal(this);
    this.onErrorModal = onErrorModal(this);
    this.state = {
      data: undefined,
      selected: undefined,
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
        <TitleBar pageTitle={<PageTitle logo={site} title="发料料表" />} />
        <br />
        <br />
        <div className="row margin-vertical-2">
          <div className="col-2.4">
            <Input name="workOrder" floatingLabelText="工单号" />
          </div>
          <div className="DispatchMaterial">
            <RaisedButton label="生成发料料表" onClientClick={this.onUpdate} backgroundColor="#007bbb" labelColor="#ffffff" fullWidth />
          </div>
        </div>
        <div className="row margin-vertical-2">
          <div className="col-2.4">
            <Input name="combinationNumber" floatingLabelText="组合十码" />
          </div>
          <div className="col-1" />
          <div className="col-2.4">
            <Input name="partNumber" floatingLabelText="PCB料号" />
          </div>
          <div className="col-1" />
          <div className="col-2.4">
            <Input name="publishDate" type="date" floatingLabelText="发行日期" />
          </div>
          <div className="col-1" />
          <div className="col-2.4">
            <Input name="machinetype" floatingLabelText="机种" />
          </div>
          <div className="col-1" />
          <div className="col-2.4">
            <Input name="version" floatingLabelText="版本" />
          </div>
          <div className="col-1" />
          <div className="col-2.4">
            <Input name="side" floatingLabelText="面別" />
          </div>
        </div>
        <ResultArea>
          <Table
            title="查询結果"
            data={this.state.data}
            columns={field}
            getTrProps={this.getRowProps(this.state.selected)}
            defaultSorted={[{ id: 'id', desc: true }]}
          />
        </ResultArea>
      </Page>
    );
  }
}

export default DispatchMaterial;
