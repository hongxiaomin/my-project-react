import React from 'react';
import {
  Loading,
  SnackBar,
  Input,
  Form,
} from '@delta/common-utils';
import Table from '../../components/Table';
import Page from '../../components/Page';
import PageTitle from '../../components/PageTitle';
import TitleBar from '../../components/TitleBar';
import Bread from '../../components/Bread';
import Button from '../../components/Button';
import Submit from '../../components/Submit';
import site from '../../assets/site.svg';
import { field, breadMap, action, colunm, UPMIP } from './config';
import Request from '../../utils/fetchData';
import {SERVER_IP} from '../../constants/Config'
import './style.less';
import {
  dataTemplate,
  dataSourceTemplate,
  onSubmit,
  onSuccess,
  onCloseSnack,
  getRowProps,
  // onInitial,
} from './fn';

class UpMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.onCloseSnack = onCloseSnack(this);
    this.getRowProps = getRowProps(this);
    // this.onInitial = onInitial(this);
    this.state = {
      data: undefined,
      side: undefined,
      productName: undefined,
      assembleNo: undefined,
      nxtType: undefined,
      moduleNum: undefined,
      TableshowData:undefined,
      loading: false,
      snackSwitch: false,
      message: undefined,
      selected: undefined,
    };
  }
  onClick = (props) => {
    const { getData } = props;
    const formData = getData('UPMaterialForm').toJS();
    const tabId = this.state.selected;
    const userName = '1';
    const param = `id=${tabId}&userName=${userName}&workorder=${formData.workorder}&side=${formData.side}`;
    this.getRequest(param);
  }
  getRequest = (params) => {
      const method = 'GET';
      const param = params;
      const url = `${SERVER_IP}/ams/dg5/bom/feeding/create?${param}`
      // const url = `http://172.22.27.20:8081/ams/dg5/bom/feeding/create?${param}`;
      // const url = `${UPMIP}/ams/dg5/bom/feeding/create?${param}`;
      const callback = (response) => {
        const data = response.rows;
        const TableshowData = data.feedingDetailEntity;
        const side = data.feedingCommonEntity.side;
        const productName = data.feedingCommonEntity.productName;
        const assembleNo = data.feedingCommonEntity.assembleNo;
        const nxtType = data.feedingCommonEntity.nxtType;
        const moduleNum = data.feedingCommonEntity.moduleNum;
        this.setState({
          side: side,
          productName: productName,
          assembleNo: assembleNo,
          nxtType: nxtType,
          TableshowData:TableshowData,
          moduleNum:moduleNum,
        });
      };
      Request(url,{
        method,
        param,
        callback,
      });
    }
  componentWillMount() {
    // this.onInitial();
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
        <TitleBar pageTitle={<PageTitle logo={site} title="上料料表" />} />
        <Form 
          name="UPMaterialForm"
          action={action}
          method="GET"
          direction="column"
          dataTemplate={dataTemplate}
          dataSourceTemplate={dataSourceTemplate}
          onClientSubmit={this.onSubmit}
          onClientSuccess={this.onSuccess}
        >
          <div className="row margin-vertical-2">
            <div className="col-8">
              <Input name="workorder" floatingLabelText="工单号" />
            </div>
            <div className="col-1" />
            <div className="col-8">
              <Input name="side" floatingLabelText="面别" />
            </div>
            <div className="col-1" />
            <div className="col-6" style={{paddingTop:'20px'}}>
              <Submit label="查询程序料表" />
            </div>
          </div>
        </Form>
        <Table
            title="查询结果"
            data={this.state.data}
            columns={colunm}
            getTrProps={this.getRowProps(this.state.selected)}
            defaultSorted={[{ id: 'id', desc: false }]}
          />
        <div className="row margin-vertical-2">
            <div className="col-8" /><div className="col-1" />
            <div className="col-6">
              <Button 
                label="生成上料料表" 
                onClientClick={this.onClick}
                style={{marginTop:'10px'}}
              />
            </div>
            <div className="col-1" /><div className="col-8" />
        </div>
        <div className="row margin-vertical-2">
          <div className="col-4">
            <Input name="assembleNo" floatingLabelText="组合十码" value={this.state.assembleNo} disabled />
          </div>
          <div className="col-1" />
          <div className="col-4">
            <Input name="moduleNum" floatingLabelText="模组数" value={this.state.moduleNum} disabled />
          </div>
          <div className="col-1" />
          <div className="col-4">
            <Input name="nxtType" floatingLabelText="NXT类型" value={this.state.nxtType} disabled />
          </div>
          <div className="col-1" />
          <div className="col-4">
            <Input name="productName" floatingLabelText="机种" value={this.state.productName} disabled />
          </div>
          <div className="col-1" />
          <div className="col-4">
            <Input name="side" floatingLabelText="面別" value={this.state.side} disabled />
          </div>
        </div>
        <Table
          title="上料料表"
          data={this.state.TableshowData}
          columns={field}
          defaultSorted={[{ id: 'id', desc: false }]}
        />
      </Page>
    );
  }
}

export default UpMaterial;
