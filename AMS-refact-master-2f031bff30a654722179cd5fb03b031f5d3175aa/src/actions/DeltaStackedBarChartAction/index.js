/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { ONDELTASTACKEDBARCHARTDATACHANGE } from '../../constants/ActionTypes';

import Request from '../../utils/Request';
import { UIName, DeltaStackedBarChartData } from '../../constants/Config';
// export const onDeltaLineChartInitial = createAction(ONDELTALINECHARTINITIAL);
export const onDeltaStackedBarChartDataChange = createAction(ONDELTASTACKEDBARCHARTDATACHANGE);

// Temporary
const TestData =[
	{ name: 'Arrived', Achieve: 4000, unAchieve: 2400, amt: 2400 },
]

export const onDeltaStackedBarChartInitial = props => (
  (dispatch) => {
  	const chartName = props.name;
  	const dataSource = [];
    dispatch(onDeltaStackedBarChartGetData(props));
    // dispatch(onDeltaStackedBarChartDataChange({props, data})) ;
  }
);

const onDeltaStackedBarChartGetDataFail = e => (
  () => console.log(e)
);

const onDeltaStackedBarChartGetData = props => (
	(dispatch, getState) => {
		const chartName = props.name;
	    // const onSubmit = typeof props.onSubmit === 'function' ? props.onSubmit : () => {};
	    const onError = typeof props.onError === 'function' ? props.onError : () => {};
	    const onChange = typeof props.onChange === 'function' ? props.onChange : () => {};
	    const state = getState();
	    const imuteData = state.getIn([UIName, chartName, DeltaStackedBarChartData]);
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
	      dispatch(onDeltaStackedBarChartDataChange({chartName, dataSource})) ;
	      // dispatch(onDeltaStackedBarChartDataChange({ chartName, dataSource }));
	      //onChange(dataSource);
	      //onSubmit(dataSource);
	    };
	    const error = (e) => {
	      dispatch(onDeltaStackedBarChartGetDataFail(e));
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

