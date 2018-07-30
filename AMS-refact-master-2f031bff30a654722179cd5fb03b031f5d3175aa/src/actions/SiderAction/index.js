/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { message } from 'antd';
import { ONSIDERPROPSCHANGE } from '../../constants/ActionTypes';

export const changeProps = createAction(ONSIDERPROPSCHANGE);

export const handleClick = e => (
  (dispatch) => {
    const current = e.key;
    message.destroy();
    dispatch(changeProps({ current }));
  }
);

export const onOpenChange = openKeys => (
  (dispatch, getState) => {
    const getAncestorKeys = (key) => {
      const map = {
        // smmWarehouseManage: ['smm'],
        // smmReport: ['smm', 'smmWarehouseManage'],
        smmReport: ['smmWarehouseManage'],
        smmSetting: ['smm'],
        smmWarehousePartition: ['smm'],
        smmFeeder: ['smm'],
        smmWork: ['smm'],
        smmWorkOrder: ['smm'],
        smmPreProcessManage: ['smm'],
        smmStockManage: ['smm'],
        jigSetting: ['jig'],
        jigWork: ['jig'],
        jigUse: ['jig'],
        jigSearch: ['jig'],
        jigConf: ['jig'],
        BomManage: ['BOM'],
        InstructorManage: ['BOM'],
        spcUChartSearch: ['SPCUChart'],
        spcAOI: ['SPCUChart'],
        pcbStoreManager: ['pcb'],
        pcbReportSearch: ['pcb', 'pcbStoreManager'],
        pcbMonitorModule: ['pcb'],
        pcbSystemConfig: ['pcb'],
        SPCSetting: ['SPC'],
        Variable: ['SPC'],
        Attribute: ['SPC'],
        SettingPage: ['SPC'],
        EQManage: ['EQM'],
        EQMMaintChec: ['EQM'],
        EQMScrapMng: ['EQM'],
        EQMFaultMaintMng: ['EQM'],
        EQMPartMng: ['EQM'],
        EQMLineSet: ['EQM'],
        EQMSysSet: ['EQM'],
        EQMProdStat: ['EQM'],
        EQMBasicSet: ['EQM'],
        EQMPrevMaint: ['EQM'],
        LMSet: ['LM'],
      };
      return map[key] ? map[key] : [];
    };
    const stateOpenKeys = getState().getIn(['SiderReducer', 'openKeys']);
    const latestOpenKey = openKeys.find(key => !(stateOpenKeys.indexOf(key) > -1));
    const latestCloseKey = stateOpenKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeProps({ openKeys: nextOpenKeys }));
  }
);

export const onSiderInitial = props => (
  (dispatch) => {
    const openKeys = props.openKeys;
    const current = props.current;
    dispatch(changeProps({ current, openKeys }));
  }
);
