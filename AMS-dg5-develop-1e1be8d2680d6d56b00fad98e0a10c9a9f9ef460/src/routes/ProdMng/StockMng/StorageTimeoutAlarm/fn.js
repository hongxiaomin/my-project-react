/* eslint no-alert: off */
import fetchData from '@delta/common-utils/utils/fetchData';
import { action } from './config';

export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false });
export const onInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(action);
  const data = rows.map(({
    id, workOrder, lineName, shelfCode, barcode, pcbCount, stockInTime, overtime,
  }) => ({
    id, workOrder, lineName, shelfCode, barcode, pcbCount, stockInTime, overtime,
  }));
  _this.setState({ data });
};
