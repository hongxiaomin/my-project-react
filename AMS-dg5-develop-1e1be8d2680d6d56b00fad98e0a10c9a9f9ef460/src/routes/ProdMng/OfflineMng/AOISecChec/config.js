
import React from 'react';
import Button from '../../../../components/Button';
import Request from '../../../../utils/fetchData';
import { SERVER_IP } from '../../../../constants/Config';
import './style.less';

// const SERVER_IP = 'http://172.22.27.13:8081';

export const action = `${SERVER_IP}/ams/smt/product/aoi/conform/frames`;
export const actionPut = `${SERVER_IP}/ams/smt/product/aoi/conform/update`;

const headers = new Headers();

const callbackGet = _this => (response) => {
  const { code, rows } = response;
  if (code >= 0) {
    const data = rows.map(({ id, lineName, workOrder }) => ({ id, lineName, workOrder }));
    _this.setState({ data });
  }
};

const callback = _this => (response) => {
  const { code } = response;
  if (code === 0) {
    _this.setState({
      loading: false,
      snackSwitch: true,
      detailSelected: undefined,
      message: 'AOI二次确认成功',
    });
    Request(action, {
      headers,
      method: 'GET',
      callback: callbackGet(_this),
    });
  } else {
    _this.setState({
      loading: false,
      snackSwitch: true,
      detailSelected: undefined,
      message: 'AOI二次确认失败',
    });
  }
};

export const field = _this => ([
  { Header: '序号', accessor: 'id', Cell: text => (text.index+1) },
  { Header: '线别', accessor: 'lineName' },
  { Header: '工单', accessor: 'workOrder', width: 400 },
  {
    Header: '操作',
    accessor: 'conform',
    Cell: (row) => {
      const { id } = row.original;
      const admin = 'admin';
      const data = JSON.stringify({
        id,
        aoiSecondConformer: admin,
      });
      return (
        <div className="ModalButton">
          <Button
            label="确认"
            onClientClick={() => {
              Request(actionPut, {
              headers,
              method: 'PUT',
              contentType: 'application/json',
              data,
              callback: callback(_this),
              });
            }
           }
          />
        </div>
      );
    },
  },
]);

export const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '成品管理',
}, {
  path: '',
  name: '下线管理',
}, {
  path: '',
  name: 'AOI二次确认',
}];
