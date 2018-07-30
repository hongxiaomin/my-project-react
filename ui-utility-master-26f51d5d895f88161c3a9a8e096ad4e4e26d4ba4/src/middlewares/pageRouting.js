import check from 'check-types';
import { resetDrawerSelectedStencil } from '../utils';
import { switchPage } from '../actions';

export default ({ dispatch }) => next => (action) => {
  if (check.not.undefined(action)) {
    const { type, payload } = action;
    if (type === '@@router/LOCATION_CHANGE' && payload.pathname !== '/undefined') {
      const { action: act, pathname: pathName } = payload;
      if (act === 'PUSH') {
        dispatch(switchPage({ pageName: pathName }));
      } else if (act === 'POP') {
        const pageName = pathName.split('/').pop();
        if (pageName.length !== 0) {
          dispatch(switchPage({ pageName }));
        }
      }
      resetDrawerSelectedStencil();
    }
  }
  return next(action);
};
