import { fromJS } from 'immutable';
import check from 'check-types';
import { ROUTER_LOCATION_CHANGE } from '../constants/actionTypes';

const initialState = fromJS({
  locationBeforeTransitions: {},
});

const handleRouterLocationChanged = (state, { payload }) =>
  state.set('locationBeforeTransitions', fromJS(payload));

const reducers = {
  [ROUTER_LOCATION_CHANGE]: handleRouterLocationChanged,
};

const routing = (state = initialState, action) => {
  let nextState = state;
  if (!check.undefined(reducers[action.type])) {
    nextState = reducers[action.type](state, action);
  }
  return nextState;
};

export default routing;
