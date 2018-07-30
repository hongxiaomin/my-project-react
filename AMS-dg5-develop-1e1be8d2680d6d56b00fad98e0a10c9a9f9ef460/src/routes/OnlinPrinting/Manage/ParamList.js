import React from 'react';
import {
  Input,
  Form,
  RaisedButton,
} from '@delta/common-utils';
import Button from '../../../components/Button';
import Submit from '../../../components/Submit';
import {
  ParamDialogTemplate,
} from './fn';
import { actionParamMG } from '../config';

class ParamList extends React.Component {
  constructor(props) {
    super(props);
    this.ParamDialogTemplate = ParamDialogTemplate(this);
    this.state = {
      ParamListData: [...props.value],
      parameterId: props.dataId,
    };
  }
  render() {
    return (
        <div>
        <div className="row">
              <div className="col-10">
                <span style={{marginRight:'86px'}}>参数名</span><span>参数值</span>
              </div>
          </div>
        <Form
            name="paramForm"
            action={actionParamMG}
            method="GET"
            contentType="application/json"
            dataTemplate={this.ParamDialogTemplate}
            onClientSuccess={this.props.onParamSuccess}
            onClientSubmit={this.onSubmit}
          >
          {
            this.props.value.map((v,i)=>(
              <div className="row"  key={i}>
              <div className="col-6"  key={i}>
                  <Input
                    name={`${i}key`}
                    defaultValue={v.i}
                    key={i}
                  />
              </div>
              <div className="col-1">
                  <span style={{paddingLeft:'12px'}}> : </span>
              </div>
              <div className="col-6">
                  <Input
                    name={`${i+1020}val`}
                    defaultValue={v.v}
                    style={{marginLeft:'10px'}}
                  />
              </div>
              <div className="col-2">
              <RaisedButton name="i" index={i} label="删除" onClientClick={this.props.onCelParameter(i)} backgroundColor="#1490DE" labelColor="#ffffff" style={{ marginLeft:"30px", marginBottom:'10px'}} />
              </div>
              <div className="col-9" />
          </div>
            ))
          }
          <div className="row">
            <div className="col-4">
            <RaisedButton name="AddParameter" label="添加参数" onClientClick={this.props.onAddParameter} backgroundColor="#1490DE" labelColor="#ffffff" style={{ marginRight:"10px"}}   />
            </div>
            <div className="col-20" />
          </div>
          <div className="row" style={{marginTop:'20px'}}>
              <div className="col-4" />
              <div className="col-4">
                <Submit label="提交"></Submit>
              </div>
              <div className="col-4">
                <Input type="button" label="取消" backgroundColor="#0086db" labelColor="#ffffff" onClientClick={this.props.onCloseDialog} fullWidth style={{marginLeft:'10px'}}/>
              </div>
              <div className="col-6" />
          </div>
          </Form>
        </div>

    );
  }
}

export default ParamList;
