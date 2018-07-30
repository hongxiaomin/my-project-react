/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { ONDELTALINECHARTDATACHANGE } from '../../constants/ActionTypes';

import Request from '../../utils/Request';
import { UIName, DeltaLineChartData } from '../../constants/Config';
// export const onDeltaLineChartInitial = createAction(ONDELTALINECHARTINITIAL);
export const onDeltaLineChartDataChange = createAction(ONDELTALINECHARTDATACHANGE);

// temporary
const TestData = [
      {name: 'Page A', value: 7000, pv: 2400, amt: 2400},
      {name: 'Page B', value: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', value: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', value: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', value: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', value: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', value: 3490, pv: 4300, amt: 2100},
];

export const onDeltaLineChartInitial = props => (
  (dispatch) => {
  	const chartName = props.name;
  	const dataSource = [];
    dispatch(onDeltaLineChartGetData(props));
    // dispatch(onDeltaLineChartDataChange({props, data})) ;
  }
);

const onDeltaLineChartGetDataFail = e => (
  () => console.log(e)
);

const onDeltaLineChartGetData = props => (
	(dispatch, getState) => {
		const chartName = props.name;
	    // const onSubmit = typeof props.onSubmit === 'function' ? props.onSubmit : () => {};
	    const onError = typeof props.onError === 'function' ? props.onError : () => {};
	    const onChange = typeof props.onChange === 'function' ? props.onChange : () => {};
	    const state = getState();
	    const imuteData = state.getIn([UIName, chartName, DeltaLineChartData]);
	    const jsonData = imuteData ? imuteData.toJS() : undefined;
	    //const data = props.dataTemplate ? props.dataTemplate(jsonData) : jsonData;
	    const data =props.dataTemplate ? jsonData : jsonData;
	    const url = props.action;
	    const method = props.method;
	    const paramData = props.param ? props.param : data;
	    //const param = props.paramTemplate ? props.paramTemplate(paramData) : paramData;
	    const param = props.paramTemplate ? paramData : paramData;
	    const filters = props.filters;

	    const callback = (response) => {
	      const dataSource = props.dataSourceTemplate ? props.dataSourceTemplate(response) : response;
	      // const pack = dataSource.rows;

	      dispatch(onDeltaLineChartDataChange({ chartName, dataSource }));
	      // onChange(dataSource);
	      // onSubmit(dataSource);
	    };
	    const error = (e) => {
	      dispatch(onDeltaLineChartGetDataFail(e));
	      onError(e);
	    };

	    
	    callback(TestData);
	    
	    // Request({
	    //   url,
	    //   method,
	    //   param,
	    //   data,
	    //   filters,
	    //   callback,
	    //   error,
	    // });

	}
) ;

