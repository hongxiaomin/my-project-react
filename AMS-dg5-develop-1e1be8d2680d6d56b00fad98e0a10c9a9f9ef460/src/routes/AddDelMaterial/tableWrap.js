import React from 'react';
import { Button, Row, Col } from 'antd';
import Table from '../../components/Table';
import Card from '../../components/Card';
import { singleField } from './config';
import { handleClickCancel, handleClickOK } from './fn';

class TableWrap extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickCancel = handleClickCancel(this);
    this.handleClickOK = handleClickOK(this);

    this.state = {
      tableWrapShow: true,
      errorMsgText: undefined,
      errorMsg: false,
    };
  }


  render() {

    return (
      this.state.tableWrapShow ?
        <Card title={this.props.title} >
          <div >
            <Table
              title="查询結果"
              data={this.props.dataSource}
              columns={singleField}
              defaultPageSize={5}
              pageSizeOptions={[5, 10, 15, 20, 50]}
              //pages={-1}
            />
          </div>
          <Row type="flex" justify="center" style={{ paddingTop: 10 }}>
            <Col span={6} />
            <Col span={8}><Button type="primary" onClick={this.handleClickCancel}>NG</Button></Col>
            <Col span={8}> <Button type="primary" onClick={this.handleClickOK} >OK</Button></Col>
          </Row>
        </Card>
        : null
    )
  }
}
export default TableWrap;