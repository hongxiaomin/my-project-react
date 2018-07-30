import { createAction } from 'redux-actions';
import { tableRedecurName, tableDataSourec } from '../../constants/TableConfig';
import { formReducerName } from '../../constants/Config';
import { ONFORMINPUTSAVEDATA } from '../../constants/ActionTypes';
import { colorRgb } from '../../constants/Settings';

export const onFormInputSaveData = createAction(ONFORMINPUTSAVEDATA);

export const savaColorData = param => (
  (dispatch, getState) => {
    const { tableName, labelColor, id, newColor } = param;
    const state = getState();
    const colorObj = {};
    colorObj[labelColor] = colorRgb(newColor);
    const oldTableData = state.getIn([tableRedecurName, tableName, tableDataSourec]);
    const updateTableData = state.getIn([formReducerName, 'input', 'newTableData']);
    let tableData;
    if (updateTableData) {
      tableData = updateTableData;
    } else {
      tableData = oldTableData;
    }
    const tableNewDate = tableData.map((item) => {
      let { ...items } = item;
      if (item.id === id) {
        items = { ...items, ...colorObj };
        return items;
      }
      return item;
    });
    dispatch(onFormInputSaveData({ labelName: 'input', name: 'newTableData', value: tableNewDate }));
    return null;
  }
);
