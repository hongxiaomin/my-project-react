import { PIWIK_ID, PIWIK_URL } from '../constants/config';
import { addParamsToURL } from '../utils';

export default () => next => (action) => {
  const { type, payload } = action;
  if (type === 'ADD_STENCIL') {
    const { stencil } = payload;
    fetch(
      addParamsToURL(
        PIWIK_URL,
        {
          url: window.location.ref,
          idsite: PIWIK_ID,
          rec: 1,
          action_name: `[${type}] ${stencil.get('namespace')}.${stencil.get('name')}`,
        },
      ),
    );
  }
  return next(action);
};
