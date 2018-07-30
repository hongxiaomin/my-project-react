import store from '../store';
import {
  closeStencilEditorDrawer,
  closeStencilEditorDrawer2,
  resetSelectedProperty,
  resetSelectedStencil,
  resetDoubleSelectedStencil,
} from '../actions';

export default () => {
  store.dispatch(closeStencilEditorDrawer());
  store.dispatch(closeStencilEditorDrawer2());
  store.dispatch(resetSelectedProperty());
  store.dispatch(resetSelectedStencil());
  store.dispatch(resetDoubleSelectedStencil());
};
