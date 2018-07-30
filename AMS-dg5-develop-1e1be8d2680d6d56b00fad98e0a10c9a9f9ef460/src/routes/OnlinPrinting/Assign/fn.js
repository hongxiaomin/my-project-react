import fetchData from '@delta/common-utils/utils/fetchData';
import { FormAction } from '@delta/common-utils';
import { actionWDA, actionInPA, actionCamcelA  } from '../config';

export const onCloseSnack = _this => () => _this.setState({ snackSwitch: false });
export const onInitial = _this => async () => {
  const { message: { rows } = {} } = await fetchData(actionWDA);
  const workorderData = rows.map(({ workOrderId, workOrder }) => ({ workOrderId, workOrder }));
  workorderData.unshift({workOrderId: -1, workOrder:'请选择...'});
  _this.setState({ workorderData });
};
export const onSubmit = _this => () => _this.setState({ selected: undefined });
export const onSuccess = _this => ({ message: data = [] }) => {
  const message = data.length > 0 ? '查询成功' : '未查询到相关结果';
  _this.setState({
    loading: false,
    data4: data,
    snackSwitch: true,
    message,
  });
};
export const dataSourceTemplate = response => response.rows;
export const onChange =_this =>async (value) => {
  const options = { data:{workOrderId: value },method: 'GET'};
  const { message: { rows } = {} } = await fetchData(actionInPA, options);
  _this.setState({
    purchaserData: rows[0].purchaser,
    machineData: rows[0].machineName,
    countryData: rows[0].country,
  });
};
export const getRowProps = _this => selected => (state, rowInfo) => (
  {
    onClick: () => _this.setState({ selected: rowInfo.row.roleId }),
    style: {
      backgroundColor: rowInfo && rowInfo.row.roleId === selected ? '#d4dcda' : 'transparent',
      cursor: 'pointer',
    },
  }
);
export const onConfirm = _this =>(p) =>async  (tools) => {
  if (_this.state.selected === undefined) {
    _this.setState({ snackSwitch: true, message: '请选择一个项目' });
    return;
  }
  const val = _this.state.data4;
  const roleId = _this.state.selected;
  const parameterId = {};
  val.map((v)=>{
      if(v.roleId === roleId){
        Object.assign(parameterId, {parameterId: v.parameterId})
      }
      return null;
  });
  const options = { data:{...parameterId},method: 'GET'};
  const { message: { code } = {} } = await fetchData(p.actionConProps, options);
  if (code >= 0) {
    await onRefresh(tools);
    _this.setState({loading: false, shouldModalShow: false, dialogSwitch:false,  message: 'Success', });
  } else {
    _this.setState({
      shouldModalShow: false,
      loading: false,
      snackSwitch: true,
      dialogSwitch:false,
      message: '提交失败，请确认提交内容是否正确',
    });
  };
};
export const onRefresh = (tools) => {
  const { getProps, trigger } = tools;
  const props = getProps('assignForm');
  return trigger(FormAction.onSubmit(props));
};
