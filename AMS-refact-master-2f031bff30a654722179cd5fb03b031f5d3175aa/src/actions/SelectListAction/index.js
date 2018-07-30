/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import {
   UPDATEJIGDATASOURCE,
   DATASOURCEONENAME,
   UPDATEJIGSHELFSIDE,
   UPDATEJIGSHELFIAYER,
   UPDATEJIGSHELFLAYERCLICK,
   UPDATEJIGSHELFLAYERLIST, SAVEPARAM, SAVEPROPS, UPDATEJIGTYPEID, SAVEOPTION, SAVEOLDOPTION, SAVEDATATOWSELECT } from '../../constants/ActionTypes';
import Request from '../../utils/Request';
import { SERVER_IP_JIG } from '../../constants/Settings';
import { formReducerName, selectName, formDataName } from '../../constants/Config';
import { SelectListReducerName, SelectListPropsName } from '../../constants/TableConfig';

export const updateJigDataSource = createAction(UPDATEJIGDATASOURCE);
export const dataSourceOneName = createAction(DATASOURCEONENAME);
export const updateJigShelfSide = createAction(UPDATEJIGSHELFSIDE);
export const updateJigTypeId = createAction(UPDATEJIGTYPEID);
export const updateJigShelfLayer = createAction(UPDATEJIGSHELFIAYER);
export const updateJigShelfLayerClick = createAction(UPDATEJIGSHELFLAYERCLICK);
export const updateJigShelfLayerList = createAction(UPDATEJIGSHELFLAYERLIST);
export const saveProps = createAction(SAVEPROPS);
export const saveDateTowSelect = createAction(SAVEDATATOWSELECT);
export const saveParma = createAction(SAVEPARAM);
// 左边按钮的点击回调函数
export const cardRightClickCallBack = params => (
  (dispatch) => {
    const { data, shelflayer, props, i } = params;
    const dat = {
      ...data,
      shelflayer,
      size: 1000,
    };
    Object.assign(dat, { sort: { column: 'shelfName', value: 'ASC' } });
    const url = `${SERVER_IP_JIG}/ams/jig/base/shelf/query`;
    const method = props.method || 'GET';
    const filters = props.filters || '';
    const param = props.paramTemplate ? props.paramTemplate(dat) : dat;
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dispatch(updateJigShelfLayerList({ dataSource, i }));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
    });
  }
);
// 初始化 下面的Button列表
export const getDataSelectList = props => (
  (dispatch) => {
    // Do something...
    const url = props.action || '';
    const method = props.method || '';
    const filters = props.filters || '';
    const paramData = props.param ? props.param : '';
    const propsName = props.propsName || '';
    const param = props.paramTemplate ? props.paramTemplate(paramData) : paramData;
    dispatch(saveProps({ propsName, props }));
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      const dataSourceOne = dataSource[0].areacode;
      dispatch(updateJigDataSource(dataSource));
      dispatch(dataSourceOneName(dataSourceOne));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
    });
  }
);

// 初始化 下面左边的Button
export const buttonLeftInit = props => (
  (dispatch) => {
    const url = props.action || '';
    const method = props.method || '';
    const filters = props.filters || '';
    const data = props.data || '';
    const param = props.paramTemplate ? props.paramTemplate(data) : data;
    const propsName = props.propsName || '';
    dispatch(saveProps({ propsName, props }));
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dispatch(updateJigShelfSide(dataSource));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
    });
  }
);

// 初始化 右边的部分
export const cardRightInit = props => (
  (dispatch, getState) => {
    const jigTypeId = getState().getIn([SelectListReducerName, 'JigTypeId']) || '1';
    const shelfside = getState().getIn([SelectListReducerName, 'shelfSide']);
    const areacode = getState().getIn([SelectListReducerName, 'dataSourceName']);
    const getData = {
      jigTypeId,
      shelfside,
      areacode,
      size: 1000,
    };
    const url = props.action || '';
    const method = props.method || 'GET';
    const filters = props.filters || '';
    const data = shelfside ? getData : props.data;
    const param = props.paramTemplate ? props.paramTemplate(data) : data;
    const propsName = props.propsName || '';
    dispatch(saveProps({ propsName, props }));
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dispatch(updateJigShelfLayer(dataSource));
      const dat = dataSource ? dataSource.map((v, i) => {
        const shelflayer = v.shelflayer;
        dispatch(cardRightClickCallBack({ data, shelflayer, props, i }));
        return null;
      }) : '';
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
    });
  }
);

// 下拉框改变
export const onSlectChange = params => (
  (dispatch, getState) => {
    const { name, e, props } = params;
    const url = props.action || '';
    const method = props.method || '';
    const filters = props.filters || '';
    const getProps = getState().getIn([SelectListReducerName, SelectListPropsName, 'JigShelfCardLeftButtonProps']);
    const data = {};
    data[name] = e;
    const param = props.paramTemplate ? props.paramTemplate(data) : data;
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      const dataSourceOne = dataSource[0].areacode;
      dispatch(updateJigTypeId(e));
      dispatch(updateJigDataSource(dataSource));
      dispatch(dataSourceOneName(dataSourceOne));
      dispatch(cardRightInit(getProps));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
    });
  }
);

// button点击 上面的
export const onClick = props => (
  (dispatch, getState) => {
    const { areaCode } = props;
    const selected = getState().getIn([formReducerName, selectName, formDataName]).toJS();
    const getProps = getState().getIn([SelectListReducerName, SelectListPropsName, 'JigShelfCardLeftButtonProps']);
    const url = props.action || '';
    const method = props.method || 'GET';
    const filters = props.filters || '';
    const data = { ...selected, areaCode, size: 1000 };
    const param = props.paramTemplate ? props.paramTemplate(data) : data;
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      const shelfside = dataSource[0].shelfside;
      dispatch(updateJigShelfSide(dataSource));
      dispatch(dataSourceOneName(areaCode));
      dispatch(updateJigShelfLayerClick(shelfside));
      dispatch(cardRightInit(getProps));
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
    });
  }
);

// button 点击事件 下面左面的
export const onButtonLeftClick = props => (
  (dispatch, getState) => {
    const areaCode = getState().getIn([SelectListReducerName, 'dataSourceName']);
    const jigTypeId = getState().getIn([formReducerName, selectName, formDataName]).toJS();
    const shelfside = props.shelfSide;
    const data = {
      areaCode,
      ...jigTypeId,
      shelfside,
      size: 1000,
    };
    const url = props.action || '';
    const method = props.method || 'GET';
    const filters = props.filters || '';
    const param = props.paramTemplate ? props.paramTemplate(data) : data;
    const callback = (response) => {
      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
      dispatch(updateJigShelfLayer(dataSource));
      dispatch(updateJigShelfLayerClick(shelfside));
      const dat = dataSource ? dataSource.map((v, i) => {
        const shelflayer = v.shelflayer;
        dispatch(cardRightClickCallBack({ data, shelflayer, props, i }));
        return null;
      }) : '';
    };
    Request({
      url,
      method,
      param,
      filters,
      callback,
    });
  }
);

// -------------------------线体配置---------------------------------------------//
export const saveOption = createAction(SAVEOPTION);
export const saveOldOption = createAction(SAVEOLDOPTION);
// ---------------------------联动Select------------------------------------//
export const TowSelectInital = param => (
  (dispatch) => {
    dispatch(saveDateTowSelect(param));
  }
);
export const onSelectListChange = param => (
  (dispatch, getState) => {
    const { e, props } = param;
    let SelectNeedLoad;
    const needSelectName = props.needSelectName;
    const SelectOne = needSelectName ? needSelectName[0] : '';
    const SelectTwo = needSelectName ? needSelectName[1] : '';
    const state = getState();
    const name = props.name;
    // const SelectListData = state.getIn([SelectListReducerName, 'SelectListProps', SelectOne]);
    // const SelectListData = state.getIn([SelectListReducerName, 'SelectListProps', SelectTwo]);
    const FormData = state.getIn([formReducerName, props.formName, formDataName]).toJS();
    const { workOrder, lineNumber } = FormData;
    // debugger;
    const data = {
      workOrder,
      lineNumber,
      [name]: e,
    };
    SelectNeedLoad = SelectOne;
    const load = true;
    dispatch(saveParma({ data, SelectNeedLoad }));
    dispatch(TowSelectInital({ load, SelectNeedLoad }));
    SelectNeedLoad = SelectTwo;
    dispatch(TowSelectInital({ load, SelectNeedLoad }));
    dispatch(saveParma({ data, SelectNeedLoad }));
  }
);
