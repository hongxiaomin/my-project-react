import React from 'react';
import {
    Loading,
    SnackBar,
    Input,
    Form,
} from '@delta/common-utils';
import Page from '../../../../components/Page';
import PageTitle from '../../../../components/PageTitle';
import TitleBar from '../../../../components/TitleBar';
import Bread from '../../../../components/Bread';
import Table from '../../../../components/Table';
import Submit from '../../../../components/Submit';
import site from '../../../../assets/site.svg';
import MsgCard from './MsgCard';
// import './style.less';
import { action, field, lineData,breadMap } from './config';
import {
    dataTemplate,
    dataSourceTemplate,
    onSubmit,
    onSuccess,
    onCloseSnack,
    getRowProps,
    onInitial,
} from './fn';

class OutHisSearch extends React.Component {
    constructor(props) {
        super(props);
        this.onCloseSnack = onCloseSnack(this);
        this.onSuccess = onSuccess(this);
        this.onSubmit = onSubmit(this);
        this.getRowProps = getRowProps(this);
        this.onInitial = onInitial(this);
        this.state = {
            data: undefined,
            selected: undefined,
            barclick: undefined,
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
                <TitleBar pageTitle={<PageTitle logo={site} title="出库记录查询" />} />
                <Form 
                    name="OutHisForm"
                    action={action}
                    method="GET"
                    dataTemplate={dataTemplate}
                    dataSourceTemplate={dataSourceTemplate}
                    onClientSubmit={this.onSubmit}
                    onClientSuccess={this.onSuccess}
                >
                    <div className="row margin-vertival-2">
                        <div className="col-8">
                            <Input name="workOrder" floatingLabelText="工单号" />
                        </div>
                        <div className="col-1" />
                        <div className="col-8">
                            <Input name="barcode" floatingLabelText="框架编号" />
                        </div>
                        <div className="col-1" />
                        <div className="col-6">
                            <Submit label="查询" style={{marginTop:'20px'}}/>
                        </div>
                    </div>   
                </Form>
                <br />
                <Table
                    title="查询结果"
                    data={this.state.data}
                    columns={field}
                    getTrProps={this.getRowProps(this.state.selected)}
                    defaultSorted={[{ id: 'id', desc: false }]}
                    SubComponent={() => (
                        <MsgCard selected={this.state.barclick} />)}
                />
            </Page>
        );
    }
}

export default OutHisSearch;