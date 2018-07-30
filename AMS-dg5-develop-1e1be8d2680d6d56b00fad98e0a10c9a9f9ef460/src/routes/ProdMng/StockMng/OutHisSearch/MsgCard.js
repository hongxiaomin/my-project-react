import React from 'react';
import Card from '../../../../components/Card';
import Request from '../../../../utils/fetchData';
import {SERVER_IP} from '../../../../constants/Config'

class MsgCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: undefined,
      snList: undefined,
    };
  }
  componentWillMount() {
    const method = 'GET';
    const param = this.props.selected;
    const url = `${SERVER_IP}/ams/smt/product/stockout/frame?barcode=${param}`;
    // const url = `http://172.22.27.13:8081/ams/smt/product/stockout/frame?barcode=${param}`;
    const callback = (response) => {
      const data = response.rows;
      const barcoder = data[0].barcode;
      const snList = data[0].snList;
      this.setState({
        barcode: barcoder,
        snList
      });
    };
    Request(url, {
      method,
      param,
      callback,
    });
  }
  render() {
    let { snList } =this.state;
    let snr = snList!==undefined?snList.map((item,index)=>{
      return <span key={index} style={item.pcbStatus==="1"?{ color:"#ff0000", marginLeft:'76px'}:{ color:"#000", marginLeft:'76px'}}>{item.sn}</span>
    }):null
    return (
      <div style={{ padding: '20px' }}>
        <Card title="框架详情">
          <p style={{ marginTop: '20px' }}>框架编号： {`${this.state.barcode}`}</p>
          <div><span>PCB编号：</span><br />{snr}</div>
        </Card>
      </div>
    );
  }
}
export default MsgCard;
