/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { createAction } from 'redux-actions';
import { ONDELTAMETERCHARTDATACHANGE } from '../../constants/ActionTypes';

import Request from '../../utils/Request';
import { UIName, DeltaMeterChartData } from '../../constants/Config';
export const onDeltaMeterChartDataChange = createAction(ONDELTAMETERCHARTDATACHANGE);

export const onDeltaMeterChartInitial = props => (
  (dispatch) => {
  	const chartName = props.name;
    dispatch(onDeltaMeterChartGetData(props));
    // dispatch(onDeltaStackedBarChartDataChange({props, data})) ;
  }
);

const onDeltaMeterChartGetDataFail = e => (
  () => console.log(e)
);

const onDeltaMeterChartGetData = props => (
	(dispatch, getState) => {
		const chartName = props.name;
	    // const onSubmit = typeof props.onSubmit === 'function' ? props.onSubmit : () => {};
	    const onError = typeof props.onError === 'function' ? props.onError : () => {};
	    const onChange = typeof props.onChange === 'function' ? props.onChange : () => {};
	    const state = getState();
	    const imuteData = state.getIn([UIName, chartName, DeltaMeterChartData]);
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
	      dispatch(onDeltaMeterChartDataChange({chartName, dataSource})) ;
	      // dispatch(onDeltaStackedBarChartDataChange({ chartName, dataSource }));
	      //onChange(dataSource);
	      //onSubmit(dataSource);
	    };
	    const error = (e) => {
	      dispatch(onDeltaMeterChartGetDataFail(e));
	      onError(e);
	    };

	    callback(60);
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

