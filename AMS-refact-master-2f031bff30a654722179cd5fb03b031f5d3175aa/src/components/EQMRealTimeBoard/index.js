/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import ShowImgList from '../../containers/ShowImgListContainer';
import Form from '../../containers/FormContainer';
import SelectContainer from '../../containers/SelectContainer';
import GroupSelectContainer from '../../containers/GroupSelectContainer';
import { defaultDataSourceTemplate, defaultRequestFilters, SERVER_IP_EQM } from '../../constants/Settings';
import './style.less';

const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: '设备管理',
}, {
  path: '',
  name: '生产统计',
}, {
  path: '',
  name: '实时看板',
}];
// API
const EQMRealTimeBoardAPI = `${SERVER_IP_EQM}/ams/eqm/eqp/line`;
const factoryAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/factory/item`;
const lineAPI = `${SERVER_IP_EQM}/ams/eqm/produceline/setting/line/item`;

const EQMRealTimeBoard = () => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="实时看板" />
    <Form
      name="EQMRealTimeBoard"
      action={EQMRealTimeBoardAPI}
      paramTemplate={(data) => {
        const { lineId } = data;
        return { lineId: Number(lineId) };
      }}
      method="GET"
      filters={defaultRequestFilters}
      dataSourceTemplate={defaultDataSourceTemplate}
    >
      <GroupSelectContainer name="BorderAndSmallBorder">
        <div className={'searchCondition'}>
          <label htmlFor="factoryId" className={'label'}>所属厂别</label>
          <span className="select" >
            <SelectContainer
              name="factoryId"
              action={factoryAPI}
              itemKey="id"
              itemValue="name"
              paramTemplate={() => ('')}
              dataSourceTemplate={defaultDataSourceTemplate}
              next="lineId"
              load
            />
          </span>
        </div>
        <div className={'searchCondition'}>
          <label htmlFor="lineId" className={'label'}>所属线别</label>
          <span className="select" >
            <SelectContainer
              name="lineId"
              action={lineAPI}
              itemKey="id"
              itemValue="name"
              paramTemplate={(data) => {
                const condition = { factoryId: data };
                return { condition };
              }}
              dataSourceTemplate={defaultDataSourceTemplate}
            />
          </span>
        </div>
      </GroupSelectContainer>
      <input type="submit" value="查询" className={'button'} />
    </Form>
    <div className={'realTimeBoardTip'}>
      <span className="titleDot">
        <span className="normal" />
      </span>
      <label htmlFor="normal" className={'name'}>正常</label>

      <span className="titleDot">
        <span className="abnormal" />
      </span>
      <label htmlFor="abnormal" className={'name'}>异常</label>

      <span className="titleDot">
        <span className="lining" />
      </span>
      <label htmlFor="lining" className={'name'}>换线中</label>

      <span className="titleDot">
        <span className="warning" />
      </span>
      <label htmlFor="warning" className={'name'}>待机</label>

      <span className="titleDot">
        <span className="offline" />
      </span>
      <label htmlFor="offline" className={'name'}>暂停</label>

      <span className="titleDot">
        <span className="disconnect" />
      </span>
      <label htmlFor="disconnect" className={'name'}>未连接</label>

      <span className="titleDot">
        <span className="toBeRepair" />
      </span>
      <label htmlFor="toBeRepair" className={'name'}>维修</label>

      <span className="titleDot">
        <span className="repairing" />
      </span>
      <label htmlFor="repairing" className={'name'}>待料</label>

      <span className="titleDot">
        <span className="toBeCheck" />
      </span>
      <label htmlFor="toBeCheck" className={'name'}>产出满料</label>

      <span className="titleDot">
        <span className="toBeCheck" />
      </span>
      <label htmlFor="scrap" className={'name'}>材料低位预警</label>
    </div>
    <div className="EQMRealTimeBoard" />

    <ShowImgList auto name="showImgList" formName="EQMRealTimeBoard" />
  </div>
  );
EQMRealTimeBoard.defaultProps = {

};
EQMRealTimeBoard.propTypes = {

};

export default EQMRealTimeBoard;
