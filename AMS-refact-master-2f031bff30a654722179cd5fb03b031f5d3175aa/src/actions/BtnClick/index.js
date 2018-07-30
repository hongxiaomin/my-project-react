import { createAction } from 'redux-actions';
import {
  UPDATEDATASOURCE,
  GETSAVEDATA,
  SAVEROWDATA,
} from '../../constants/ActionTypes';
import Request from '../../utils/Request';
import { updateDataSource, getSaveData, saveRowData, saveTableProps, clearRowsKeys } from '../../actions/TableAction';


// export const getSaveData = createAction(GETSAVEDATA);
// export const saveRowData = createAction(SAVEROWDATA);


export const showDetail = props => (
  (dispatch, getState) => {
    const { record } = props;
    const state = getState();
    const part = props.part || '';
    const id = props.id || '';
    const data = {
      ...record,
      part,
      id,
    };

    const paramData = props.needDataTemplate ? props.needDataTemplate(data) : data;
    const url = props.nextAction ? props.nextAction : props.action;
    const method = props.method || 'GET';
    const tableName = props.tableName;
    const filters = props.filters || '';
    const param = props.paramTemplate ? props.paramTemplate(paramData) : paramData;
    dispatch(clearRowsKeys(tableName));
    dispatch(saveTableProps({ tableName, props }));

    dispatch(saveRowData({ tableName, record }));
    const callback = (response) => {
      dispatch(getSaveData({ tableName, response }));
      if (response.rows) {
        const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
        dispatch(updateDataSource({ dataSource, tableName }));
      } else {
        const dataSource = [];
        dispatch(updateDataSource({ dataSource, tableName }));
      }
    };
    Request({
      url,
      method,
      filters,
      param,
      callback,
    });
  }
);
