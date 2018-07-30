import React from 'react';
import { fromJS } from 'immutable';
import store from '../store';
import { getElementType } from 'ui-utility-code-generator/lib/utils';
import {
  openStencilEditorDrawer, resetSelectedProperty, setSelectedStencil, resetIconData,
} from '../actions';


function openStencilEditor(stencil) {
  return {
    onDoubleClick: (event) => {
      event.stopPropagation();
      store.dispatch(openStencilEditorDrawer());
      store.dispatch(resetSelectedProperty());
      store.dispatch(setSelectedStencil({ stencil: fromJS(stencil) }));
      store.dispatch(resetIconData());
    },
  };
}

export default (stencil) =>
  React.createElement(
    getElementType('material-ui', 'RadioButton'),
    Object.assign(
      {}, stencil.props, openStencilEditor(stencil),
    ),
  );
