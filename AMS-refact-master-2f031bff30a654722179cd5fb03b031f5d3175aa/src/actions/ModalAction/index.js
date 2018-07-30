/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/
import { createAction } from 'redux-actions';
import { message } from 'antd';
// import { moment } from 'moment';
import { onFormDataChange, onFormDataSourceChange } from '../FormAction';
import { ONMODALOKCLICK, ONMODALUPDATEPROPS } from '../../constants/ActionTypes';
import { tableRedecurName, tableSelectedRows } from '../../constants/TableConfig';
import { formReducerName, formDataName } from '../../constants/Config';
import { number2String, updateTime } from '../../constants/Settings';
import { onSelectInitial, onSelectDisable } from '../../actions/SelectAction';
import { checkTray, needTray } from '../SMMMaterialCarMergeOthersAction';
import { updateDataSource } from '../TableAction';


export const onModalUpdateProps = createAction(ONMODALUPDATEPROPS);
export const onModalOkClick = createAction(ONMODALOKCLICK);
export const onModalOk = props => (
  // Do something...
  (dispatch) => {
    // Do something...
    const modalName = props.name;
    const visibleNew = false;
    dispatch(onModalOkClick({ modalName, visibleNew }));
  }
);
export const onSubFormInit = props => (
  (dispatch, getState) => {
    // Do something...
    const tableName = props.tableName;
    let formName = props.formName;
    const state = getState();
    const selectedRows = state.getIn([tableRedecurName, tableName, tableSelectedRows]);
    const selectedRowsObj = selectedRows ? selectedRows[0] : '';
    const num = selectedRows.length;
    const formData = state.getIn([formReducerName, formName, formDataName]) ?
      state.getIn([formReducerName, formName, formDataName]).toJS() : {};
    if (props.useForm) {
      const targetKey = props.tarKey;
      targetKey.map((v) => {
        dispatch(onFormDataChange({
          formName: props.name ? props.name : '',
          name: v,
          value: props.useForm ? formData[v] : selectedRowsObj[v],
        }),
        );
        return null;
      });
      return null;
    }
    if (!selectedRowsObj) {
      return 'noTar';
    }
    if (props.multiple) {
      const targetKey = props.tarKey;
      targetKey.map((v) => {
        if (Object.prototype.toString.call(selectedRowsObj[v]) === '[object Array]') {
          const changeIdArrId = [];
          const changeId = props.ItemId ? props.ItemId : '';
          selectedRowsObj[v].map((value) => {
            changeIdArrId.push(`${value[changeId]}`);
            return null;
          });
          dispatch(onFormDataChange({
            formName: props.name ? props.name : '',
            name: v,
            value: changeIdArrId,
          }));
        } else if (selectedRowsObj[v]) {
          dispatch(onFormDataChange({
            formName: props.name ? props.name : '',
            name: v,
            value: `${selectedRowsObj[v]}` || '',
          }));
        }
        return '';
      });
      return null;
    }
    if (num > 1) {
      return num;
    }
    const targetKey = props.tarKey;
    targetKey.map((v) => {
      if (v.indexOf('jigGroupDtls') !== -1) {
        formName = props.modalName;
        const targetdataSource = selectedRowsObj.jigGroupDtls;
        const dataSource = [];
        targetdataSource.map((v) => {
          dataSource.push({ jigTypeId: v.jigTypeId });
        });
        dispatch(onFormDataSourceChange({ formName, dataSource }));
      } else if (v.indexOf('qcGroupDets') !== -1) {
        formName = props.modalName;
        const targetdataSource = selectedRowsObj.qcGroupDets;
        const dataSource = [];
        targetdataSource.map((v) => {
          dataSource.push({ qcItemId: v.qcItemId, qcItemlimitMax: v.qcItemlimitMax, qcItemTargetLine: v.qcItemTargetLine, qcItemLimitMin: v.qcItemLimitMin, qcItemTimes: v.qcItemTimes });
        });
        dispatch(onFormDataSourceChange({ formName, dataSource }));
      } else if (v.indexOf('maintGroupDtls') !== -1) {
        formName = props.modalName;
        const targetdataSource = selectedRowsObj.maintGroupDtls;
        const dataSource = [];
        targetdataSource.map((v) => {
          dataSource.push({ maintItemId: v.maintItemId });
        });
        dispatch(onFormDataSourceChange({ formName, dataSource }));
      } else if (v.indexOf('scrapGroupDtls') !== -1) {
        formName = props.modalName;
        const targetdataSource = selectedRowsObj.scrapGroupDtls;
        const dataSource = [];
        targetdataSource.map((v) => {
          dataSource.push({ scItemId: v.scItemId });
        });
        dispatch(onFormDataSourceChange({ formName, dataSource }));
      }
      console.log('v', v);
      console.log('selectedRowsObj[v]', selectedRowsObj[v]);
      if (v === 'onlineTimePlan' || v === 'offlineTimePlan' || v === 'onlineTimeActual' || v === 'offlineTimeActual') {
        let defaultValue = '';
        const oldDate = updateTime(selectedRowsObj[v]);
        const moment = require('moment');
        if (oldDate) {
          defaultValue = moment(oldDate, 'YYYY-MM-DD HH:mm:ss');
        } else {
          defaultValue = '';
        }
        dispatch(onFormDataChange({
          formName: props.name ? props.name : '',
          name: v,
          value: props.useForm ? formData[v] : defaultValue,
        }),
        );
        return null;
      }
      dispatch(onFormDataChange({
        formName: props.name ? props.name : '',
        name: v,
        value: props.useForm ? formData[v] : number2String(selectedRowsObj[v]),
      }),
      );
      return null;
    });
  }
);
export const onSubDatasourceInit = props => (
  (dispatch, getState) => {
    // Do something...
    const tableName = props.tableName;
    const state = getState();
    const dataSource = state.getIn([tableRedecurName, tableName, tableSelectedRows]);
    const formName = 'PCBBackUse';
    // const selectedRowsObj = selectedRows || '';
    if (dataSource) {
      dispatch(onFormDataSourceChange({ formName, dataSource }));
      return null;
    }
    message.destroy();
    message.error('请选中具体内容！', 3);
    return null;
  }
);
export const showHideModal = params => (
  (dispatch, getState) => {
    // Do something...
    const a = params.checkFunc ? params.checkFunc({ params, getState }) : true;
    const modalName = params.modalName ? params.modalName : params.name;
    let visibleNew = params.visible ? params.visible : false;
    visibleNew = a ? visibleNew : false;
    const propsChild = params.children ? params.children : '';
    if (Object.prototype.toString.call(propsChild) === '[object Array]') {
      const props = propsChild[0].props ? propsChild[0].props : '';
      if (props.mode === 'checkTray') {
        dispatch(
          checkTray(params),
        );
      } else if (props.mode === 'needTray') {
        dispatch(needTray(params));
      }
    }
    if (params.mode === 'ChecBom') {
      const RowKey = getState().getIn([tableRedecurName, params.tableName, 'selectedRows']);
      const Rowchild = params.children.props.children.props.children;
      for (let i = 0; i < Rowchild.length - 1; i++) {
        const itemChild = Rowchild[i].props.children;
        for (let j = 0; j < itemChild.length - 1; j++) {
          const childsitem = itemChild[1];
          const needitem = childsitem.props.children.props.next;
          if (needitem === 'ckbmFqc') {
            if (RowKey[0].ckbmTypeName === '点检') {
              dispatch(onSelectDisable({ id: needitem, disable: true }));
            } else if (RowKey[0].ckbmTypeName === '保养') {
              dispatch(onSelectDisable({ id: needitem, disable: false }));
            }
          }
        }
      }
    }
    if (!params.select) {
      const selectedRowKey = getState().getIn([tableRedecurName, params.tableName, 'selectedRowKeys']);
      if (!selectedRowKey) {
        dispatch(onModalUpdateProps({ modalName, visibleNew }));
      } else if (params.onHide) {
        dispatch(onModalUpdateProps({ modalName, visibleNew }));
      } else if (selectedRowKey.length > 0) {
        dispatch(onModalUpdateProps({ modalName, visibleNew }));
        if (params.clearDatasourceOnUnselected) {
          const tableName = params.tableName;
          const dataSource = '';
          dispatch(updateDataSource({ tableName, dataSource }));
        }
      }
    } else {
      const selectDate = getState().getIn([tableRedecurName, params.tableName, 'selectedRows']);
      if (selectDate) {
        if (!params.removeDate) {
          dispatch(onModalUpdateProps({ modalName, visibleNew }));
        } else {
          let hasPermanentData = true;
          selectDate.map((item) => {
            if (item.description === '永久报废') {
              hasPermanentData = false;
            }
            return null;
          });
          if (hasPermanentData) {
            dispatch(onModalUpdateProps({ modalName, visibleNew }));
          } else {
            message.error('备注标注为"永久报废"不能恢复使用，请"只选择"短期报废', 3);
          }
        }
      }
    }
    if (params.load && visibleNew) {
      // console.log(params);
      if (params.useForm) {
        dispatch(onSubFormInit({ ...params.children[0].props, tarKey: params.tarKey }));
        return;
      }
      const res = dispatch(onSubFormInit({ ...params.children.props, tarKey: params.tarKey }));
      const num = dispatch(onSubFormInit({ ...params.children.props, tarKey: params.tarKey }));
      if (res === 'noTar') {
        message.destroy();
        message.error('请选中具体内容！', 3);
        return null;
      }
      if (num > 1) {
        const visibleNew = false;
        dispatch(onModalUpdateProps({ modalName, visibleNew }));
        message.destroy();
        message.error('请选中一条内容！', 3);
        return null;
      }
    } else if (params.reuseTable) {
      dispatch(onSubDatasourceInit({ ...params.children[0].props }));
    }
    const id = params.selectId ? params.selectId : '';
    if (id) {
      const param = getState().getIn(['UI', id]) ? getState().getIn(['UI', id]).toJS() : {};
      const { props } = param;
      props ? dispatch(onSelectInitial(id, props)) : '';
    }
  }
);

export const onModalInitial = props => (
  (dispatch) => {
    const modalName = props.name;
    const visibleNew = false;
    dispatch(onModalUpdateProps({ modalName, visibleNew }));
  }
);
