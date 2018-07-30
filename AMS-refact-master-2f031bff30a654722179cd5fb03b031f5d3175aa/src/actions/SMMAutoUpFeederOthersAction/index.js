/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/
import Request from '../../utils/Request';
import { tableRedecurName } from '../../constants/TableConfig';
import { onFormDataChange, onFormDataSourceChange } from '../FormAction';
import { SERVER_IP_SMM } from '../../constants/Settings';
import { formReducerName } from '../../constants/Config';
import { updateDataSource, getSaveData } from '../../actions/TableAction';

// export const onFormUpdateChildren = createAction(ONFORMUPDATECHILDREN);
// 表格初始化;
let workOrder;
let side;
let materialNo;
let serialNo;
let feederId;
let flag = true;
let myFlag = false;
let slot;
let isFeederBuffer;

export const getDefaultData = props => (
  (dispatch, getState) => {
    let dataSource = getState().getIn([tableRedecurName, 'SMMAutoUpFeederTable', 'rowData']);
    console.log(dataSource);
    workOrder = dataSource.work_order;
    side = dataSource.side;
    const url = `${SERVER_IP_SMM}/smm/plugmodcontroller/getmodsbywordorder?condition=[{"work_order":"${workOrder}","side":"${side}"}]`;
    const method = 'GET';
    const callback = (response) => {
      if (response.code === 0) {
        console.log(response);
        const data = response.rows ? response.rows : '';
        const tableName = 'SMMAutoUpFeederOthersTable';
        dataSource = data;
        dispatch(updateDataSource({ dataSource, tableName }));
        dispatch(getSaveData({ tableName, response }));
      }
    };
    // 是否初始化的时候进行发送请求
    // if (!props.isGetDate) {
    Request({
      url,
      method,
      callback,
    });
    // }
  }
);

export const onFeederInputEnter = props => (
  (dispatch, getState) => {
    const compareSource = getState().getIn([tableRedecurName, 'SMMAutoUpFeederOthersTable', 'dataSource']) ? getState().getIn([tableRedecurName, 'SMMAutoUpFeederOthersTable', 'dataSource']) : '';
    const needSource = getState().getIn([tableRedecurName, 'SMMAutoUpFeederTable', 'rowData']) ? getState().getIn([tableRedecurName, 'SMMAutoUpFeederTable', 'rowData']) : '';
    let dataSource = getState().getIn([formReducerName, 'SMMDeleteRecordSearchForm', 'data']) ? getState().getIn([formReducerName, 'SMMDeleteRecordSearchForm', 'data']).toJS() : '';
    workOrder = needSource.work_order;
    side = needSource.side;
    let data = {};
    let response = { message: '' };
    dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
    const inputValue = dataSource.labelName;
    const inputValueKT = inputValue.substring(0, 2);
    const tableName = props.tableName;
    let url;
    let method;
    method = 'GET';
    const inputValueNew = inputValue.trim().split('{');
    if (inputValueKT === 'KT' && materialNo) {
      flag = false;
      feederId = inputValue;
    } else if (inputValueKT === 'KT' && !materialNo) {
      data = {};
      response = { message: '请先扫描料盘' };
      dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
      feederId = '';
      myFlag = true;
    } else {
      myFlag = false;
      materialNo = inputValueNew[0].trim();
      serialNo = inputValueNew[8].trim();
      for (let i = 0, length = compareSource.length; i < length; i++) {
        if (materialNo === compareSource[i].material_no && serialNo === compareSource[i].serial_no && !compareSource[i].feederId) {
          [compareSource[i], compareSource[0]] = [compareSource[0], compareSource[i]]
          const slot = compareSource[0].slot;
          const message = slot;
          flag = compareSource[0].feederId ? true : false;
          compareSource[i].hightColor = '';
          compareSource[0].hightColor = 'ok';
          myFlag = true;
          break;
        }
      }
    }
    slot = compareSource[0].slot;
    if (!myFlag) {
      const data = {};
      const response = { message: '没有找到对应的料盘，请确认扫描是否正确' };
      dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
      dispatch(getDefaultData());
      materialNo = '';
      serialNo = '';
      slot = '';
    }
    dataSource = compareSource;
    dispatch(updateDataSource({ dataSource: [], tableName }));
    dispatch(updateDataSource({ dataSource, tableName }));
    url = `${SERVER_IP_SMM}/smm/plugmodcontroller/updatemod?condition=[{"work_order":"${workOrder}","side":"${side}","material_no":"${materialNo}","feeder_id":"${feederId}","serial_no":"${serialNo}"}]`;
    console.log(materialNo, serialNo, feederId);
    const callback = (response) => {
      if (response.code === 0) {
        console.log(response);
        let data = response.rows ? response.rows : '';
        console.log(slot);
        response.message = slot;
        const tableName = 'SMMMaterialCarMergeOtherTable';
        const dataSource = data.merger_tray_list ? data.merger_tray_list : '';
        dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
        dispatch(updateDataSource({ dataSource, tableName }));
        data = {
          value: JSON.stringify([{
            work_order: workOrder,
            side: side,
            mes_mode: 1,
            is_feeder_buffer: 0,
            feeding_list: [{
              material_no: materialNo,
              serial_no: serialNo,
              feeder_id: feederId,
              slot: slot,
            }],
          }]),
        };
        url = `${SERVER_IP_SMM}/smm/plugmodcontroller/uploadtomes`;
        method = 'POST';
        Request({
          url,
          method,
          data,
        });
        dispatch(getDefaultData());
        feederId = '';
        materialNo = '';
        serialNo = '';
      } else if (response.code === -1) {
        feederId = '';
        const data = {};
        dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
      }
    };
    if (!flag && materialNo && feederId) {
      myFlag = false;
      Request({
        url,
        method,
        callback,
      });
    }
  }
);


export const getDefaultMESData = props => (
  (dispatch, getState) => {
    const dataSource = getState()
      .getIn([tableRedecurName, 'SMMAutoUpFeederTable', 'rowData']);
    console.log(dataSource);
    workOrder = dataSource.work_order;
    side = dataSource.side;
    const url = `${SERVER_IP_SMM}/smm/plugmodcontroller/getneeduploadtomesmaterials?condition=[{"work_order":"${workOrder}","side":"${side}","is_feeder_buffer":"0"}]`;
    const method = 'GET';
    const callback = (response) => {
      if (response.code === 0) {
        const data = response.rows ? response.rows : '';
        const feedingList = data.feeding_list;
        const materialList = data.material_list;
        isFeederBuffer = data.is_feeder_buffer;
        dispatch(updateDataSource({ dataSource: feedingList, tableName: 'SMMAutoUpFeederMESFeeding' }));
        dispatch(updateDataSource({ dataSource: materialList, tableName: 'SMMAutoUpFeederMESMaterial' }));
      }
    };
    if (!props.isGetDate) {
      Request({
        url,
        method,
        callback,
      });
    }
    const data = {};
    const response = {};
    dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm1', dataSource: data, response }));
  }
);

export const uploadMES = props => (
  (dispatch, getState) => {
    const state = getState();
    const selectedRowsFeed = state.getIn([tableRedecurName, 'SMMAutoUpFeederMESFeeding', 'selectedRows']);
    const selectedRowsMaterial = state.getIn([tableRedecurName, 'SMMAutoUpFeederMESMaterial', 'selectedRows']);
    const selectedFeedData = [];
    const selectedMaterialData = [];
    selectedRowsFeed ? selectedRowsFeed.map((item) => {
      const data = {
        material_no: item.material_no,
        serial_no: item.serial_no,
        feeder_id: item.feeder_id,
        slot: item.slot,
      };
      selectedFeedData.push(data);
      return null;
    }) : '';
    selectedRowsMaterial ? selectedRowsMaterial.map((item) => {
      const data = {
        material_no: item.material_no,
        serial_no: item.serial_no,
        feeder_id: item.feeder_id,
        slot: item.slot,
      };
      selectedMaterialData.push(data);
      return null;
    }) : '';
    console.log('selectedFeedData', selectedFeedData)
    console.log('selectedMaterialData', selectedMaterialData)
    const data = {
      value: JSON.stringify([{
        work_order: workOrder,
        side: side,
        mes_mode: 0,
        is_feeder_buffer: isFeederBuffer,
        feeding_list: selectedFeedData,
        material_list: selectedMaterialData,
      }])
    };

    const url = `${SERVER_IP_SMM}/smm/plugmodcontroller/uploadtomes`;
    const method = 'POST';
    const callback = (response) => {
      console.log('上传到MES请求已经发送');
      let data = {};
      console.log('response', response);
      dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm1', dataSource: data, response }));
      if (response.code === 0) {}
    };
    // 是否初始化的时候进行发送请求
    if (!props.isGetDate) {
      Request({
        url,
        method,
        data,
        callback,
      });
    }
  }
);
