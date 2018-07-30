/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import Request from '../../utils/Request';
import { tableRedecurName } from '../../constants/TableConfig';
import { onFormDataChange, onFormDataSourceChange } from '../FormAction';
import { SERVER_IP_SMM } from '../../constants/Settings';
import { formReducerName } from '../../constants/Config';
import { updateDataSource } from '../../actions/TableAction';


// 表格初始化;
let workOrder;
let side;
let fCar;
let rpCar;
let smtCar;
let materialNo;
let serialNo;
let shelfName1;
let shelfName2;
let flag = false;
let shouldMerge;
let shouldMergeFlag;
let windowIp;
let port;

// 新接口，以后会接，先暂时保存下
// localhost:8081/ams/smm/mergercontrol/getmergerlist?condition=[{"work_order":"2311701656","side":"A"}]；

export const getDefaultData = props => (
  (dispatch, getState) => {
    let dataSource = getState().getIn([tableRedecurName, 'SMMMaterialCarMergeTable', 'rowData']);
    workOrder = dataSource.work_order ? dataSource.work_order : '';
    side = dataSource.side ? dataSource.side : '';
    const url = `${SERVER_IP_SMM}/smm/mergercontrol/getmergerinfo?condition=[{"work_order":"${workOrder}","side":"${side}"}]`;
    const method = 'GET';
    const callback = (response) => {
      if (response.code === 0) {
        const data = response.rows ? response.rows : '';
        fCar = data.f_car ? data.f_car : '';
        rpCar = data.rp_car ? data.rp_car : '';
        smtCar = data.smt_car ? data.smt_car : '';

        const materialno = data.material_no ? data.material_no : '';
        const slot = data.slot ? data.slot : '';
        const slotremainingqty = data.slot_remaining_qty ? data.slot_remaining_qty : '';
        const slotmaterialremainingqty = data.slot_material_remaining_qty ? data.slot_material_remaining_qty : '';
        const mergerqty = data.merger_qty ? data.merger_qty : '';

        const tableName = 'SMMMaterialCarMergeOtherTable';
        dataSource = data.merger_tray_list ? data.merger_tray_list : '';

        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm',
          name: 'f_car',
          value: fCar,
        }));
        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm',
          name: 'rp_car',
          value: rpCar,
        }));
        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm',
          name: 'smt_car',
          value: smtCar,
        }));

        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm2',
          name: 'material_no',
          value: materialno,
        }));
        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm2',
          name: 'slot',
          value: slot,
        }));

        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm2',
          name: 'slot_remaining_qty',
          value: slotremainingqty,
        }));
        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm2',
          name: 'slot_material_remaining_qty',
          value: slotmaterialremainingqty,
        }));


        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm2',
          name: 'merger_qty',
          value: mergerqty,
        }));

        dispatch(updateDataSource({ dataSource, tableName }));
        const message = port ? `打印机端口为:${port},请先确认打印机端口是否正确` : '请先返回上一级设置打印机端口';
        const responseMsg = { message };
        dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response: responseMsg }));
      }
    };

    // 是否初始化的时候进行发送请求
    if (!props.isGetDate) {
      Request({
        url,
        method,
        callback,
      });
    }
  }
);

export const settingPort = props => (
  (dispatch, getState) => {
    const dataSource = getState().getIn([formReducerName, 'SMMDeleteRecordSearchForm', 'data']) ? getState().getIn([formReducerName, 'SMMDeleteRecordSearchForm', 'data']).toJS() : '';
    const portValue = dataSource.port ? dataSource.port : '';
    const method = 'GET'
    const url = `http://localhost:${portValue}/ams/smm/getIpAndPort`;
    const callback = (response) => {
      port = response.port;
      windowIp = response.ip;
    }
    Request({
      url,
      method,
      callback,
    });
  }
);


export const onInputEnter = props => (
  (dispatch, getState) => {
    let dataSource = getState().getIn([formReducerName, 'SMMDeleteRecordSearchForm', 'data']) ? getState().getIn([formReducerName, 'SMMDeleteRecordSearchForm', 'data']).toJS() : '';
    let inputValue = dataSource.labelName;
    inputValue = inputValue.replace(/ /g, '');
    let url;
    const FCar = inputValue.substring(0, 6);
    const RpCar = inputValue.substring(0, 6);
    const inputValueNew = inputValue.split('{');
    const shouldMergeFlagRP = shouldMergeFlag ? shouldMergeFlag.substring(0, 2) : null;
    if (inputValueNew.length === 9) {
      materialNo = inputValueNew[0].trim();
      serialNo = inputValueNew[8].trim();
    }
    shelfName1 = inputValue.substring(2, 3);
    shelfName2 = inputValue.substring(0, 2);
    let method = '';
    method = 'GET';
    let data = {};
    if (inputValue === 'END') {
      // 结束扫描
      flag = false;
      url = `${SERVER_IP_SMM}/smm/mergercontrol/mergertrayend?condition=[{"work_order":"${workOrder}","side":"${side}","car_name":"${inputValue}","print_ip":${windowIp},"print_port":${port}}]`;
      console.log('结束扫描');
    } else if (FCar === 'FT-CAR') {
      console.log('FCar');

      flag = false;
      url = `${SERVER_IP_SMM}/smm/mergercontrol/bindfcar?condition=[{"work_order":"${workOrder}","side":"${side}","car_name":"${inputValue}"}]`;
    } else if (RpCar === 'RP-CAR') {
      console.log('RpCar');

      flag = false;
      url = `${SERVER_IP_SMM}/smm/mergercontrol/bindrpcar?condition=[{"work_order":"${workOrder}","side":"${side}","car_name":"${inputValue}"}]`;
    } else if (fCar && rpCar && inputValueNew.length === 9 && !shouldMergeFlag) {
      // 接料
      console.log('接料');
      flag = false;
      url = `${SERVER_IP_SMM}/smm/mergercontrol/scantray?condition=[{"work_order":"${workOrder}","side":"${side}","material_no":"${materialNo}","serial_no":"${serialNo}","print_ip":${windowIp},"print_port":${port}}]`;
    } else if (shouldMerge && shelfName2 === 'RP' && shelfName1 !== '-') {
      // 余料车合并
      console.log('余料车合并');

      flag = false;
      method = 'POST';
      data = {
        value: JSON.stringify([{
          work_order: workOrder,
          side: side,
          material_no: materialNo,
          serial_no: serialNo,
          shelf_name: inputValue,
        }]),
      };
      url = `${SERVER_IP_SMM}/smm/mergercontrol/confirmmerger`;
    } else if (shouldMerge && shouldMergeFlagRP === 'RP') {
      // 余料车确定大盘，扫描而且需要发送请求,料盘信息确认只扫描不发送请求,料盘信息确认
      console.log('余料车确定大盘,扫描而且需要发送请求,料盘信息确认');
      flag = false;
      method = 'POST';
      data = {
        value: JSON.stringify([{
          work_order: workOrder,
          side: side,
          material_no: materialNo,
          serial_no: serialNo,
          // shelf_name: inputValue,
        }]),
      };
      url = `${SERVER_IP_SMM}/smm/mergercontrol/confirmmerger`;
    } else if (shouldMerge && shouldMergeFlag) {
      // 首盘合并
      console.log('首盘合并');

      flag = false;
      method = 'POST';
      data = {
        value: JSON.stringify([{
          work_order: workOrder,
          side: side,
          material_no: materialNo,
          serial_no: serialNo,
          // shelf_name: inputValue,
        }]),
      };
      url = `${SERVER_IP_SMM}/smm/mergercontrol/confirmmerger`;
    } else {
      // 无效的输入
      console.log('无效的输入');
      flag = true;
      data = {};
      if (!fCar) {
        // 请扫描首盘料盘
        const message = '请扫描首盘料车';
        const response = { message };
        dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
      } else if (!rpCar) {
        // 请扫描余料盘
        const message = '请扫描余料车';
        const response = { message };
        dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
      } else {
        // 请输入正确的扫描信息
        const message = '请输入正确的扫描信息';
        const response = { message };
        dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
      }
    }
    const callback = (response) => {
      if (response.code === 0) {
        data = response.rows ? response.rows : '';
        fCar = data.f_car ? data.f_car : fCar;
        rpCar = data.rp_car ? data.rp_car : rpCar;
        smtCar = data.smt_car ? data.smt_car : smtCar;
        shouldMerge = data.serial_no ? data.serial_no : null;
        shouldMergeFlag = data.shelf_name ? data.shelf_name : null;
        const materialno = data.material_no ? data.material_no : '';
        const slot = data.slot ? data.slot : '';
        const slotremainingqty = data.slot_remaining_qty ? data.slot_remaining_qty : '';
        const slotmaterialremainingqty = data.slot_material_remaining_qty ? data.slot_material_remaining_qty : '';
        const mergerqty = data.merger_qty ? data.merger_qty : '';

        const tableName = 'SMMMaterialCarMergeOtherTable';
        dataSource = data.merger_tray_list ? data.merger_tray_list : '';


        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm',
          name: 'f_car',
          value: fCar,
        }));
        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm',
          name: 'rp_car',
          value: rpCar,
        }));
        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm',
          name: 'smt_car',
          value: smtCar,
        }));
        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm2',
          name: 'material_no',
          value: materialno,
        }));
        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm2',
          name: 'slot',
          value: slot,
        }));

        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm2',
          name: 'slot_remaining_qty',
          value: slotremainingqty,
        }));
        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm2',
          name: 'slot_material_remaining_qty',
          value: slotmaterialremainingqty,
        }));

        dispatch(onFormDataChange({
          formName: 'SMMDeleteRecordSearchForm2',
          name: 'merger_qty',
          value: mergerqty,
        }));

        dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
        dispatch(updateDataSource({ dataSource, tableName }));
      } else if (response.code === -1) {
        dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
      }
    };

    if (!flag) {
      Request({
        url,
        method,
        data,
        callback,
      });
    }
  }
);



export const undoOperation = props => (
  (dispatch, getState) => {
    const url = `${SERVER_IP_SMM}/smm/mergercontrol/cancelscan?condition=[{"work_order":"${workOrder}","side":"${side}"}]`;

    const method = 'GET';
    const callback = (response) => {
      const data = response.rows ? response.rows : '';

      const materialno = data.material_no ? data.material_no : '';
      const slot = data.slot ? data.slot : '';
      const slotremainingqty = data.slot_remaining_qty ? data.slot_remaining_qty : '';
      const slotmaterialremainingqty = data.slot_material_remaining_qty ? data.slot_material_remaining_qty : '';

      const mergerqty = data.merger_qty ? data.merger_qty : '';

      const tableName = 'SMMMaterialCarMergeOtherTable';
      const dataSource = data.merger_tray_list ? data.merger_tray_list : '';

      shouldMergeFlag = null;

      dispatch(onFormDataChange({
        formName: 'SMMDeleteRecordSearchForm2',
        name: 'material_no',
        value: materialno,
      }));
      dispatch(onFormDataChange({
        formName: 'SMMDeleteRecordSearchForm2',
        name: 'slot',
        value: slot,
      }));

      dispatch(onFormDataChange({
        formName: 'SMMDeleteRecordSearchForm2',
        name: 'slot_remaining_qty',
        value: slotremainingqty,
      }));

      dispatch(onFormDataChange({
        formName: 'SMMDeleteRecordSearchForm2',
        name: 'slot_material_remaining_qty',
        value: slotmaterialremainingqty,
      }));

      dispatch(onFormDataChange({
        formName: 'SMMDeleteRecordSearchForm2',
        name: 'merger_qty',
        value: mergerqty,
      }));

      dispatch(updateDataSource({ dataSource, tableName }));
      dispatch(onFormDataSourceChange({ formName: 'SMMDeleteRecordSearchForm', dataSource: data, response }));
    };
    Request({
      url,
      method,
      callback,
    });
  }
);

export const checkTray = props => (
  (dispatch, getState) => {
    const url = `${SERVER_IP_SMM}/smm/mergercontrol/rptray/list?condition=[{"work_order":"${workOrder}","side":"${side}"}]`;
    const method = 'GET';
    const callback = (response) => {
      const dataSource = response.rows ? response.rows : '';
      dispatch(onFormDataSourceChange({ formName: 'SMMMaterialCarMergeCheckTray', dataSource, response }));
    };
    Request({
      url,
      method,
      callback,
    });
  }

);
export const needTray = props => (
  (dispatch, getState) => {
    const url = `${SERVER_IP_SMM}/smm/mergercontrol/getmergerlist?condition=[{"work_order":${workOrder},"side":${side}}]`;
    const method = 'GET';
    const callback = (response) => {
      const dataSource = response.rows ? response.rows : '';
      dispatch(onFormDataSourceChange({ formName: 'SMMMaterialCarMergeTray', dataSource, response }));
    };
    Request({
      url,
      method,
      callback,
    });
  }

);
