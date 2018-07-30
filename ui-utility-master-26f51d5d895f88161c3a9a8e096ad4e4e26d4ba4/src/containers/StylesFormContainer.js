import { connect } from 'react-redux';

import { fromJS } from 'immutable';

import StylesForm from '../components/styles-form';

import { resetDrawerSelectedStencil } from '../utils';
import {
  updateStencilProperty,
  resetSelectedProperty,
} from '../actions';

const mapStateToProps = (state) => ({
  stencilEditorDrawerOpen2: state.getIn(['options', 'stencilEditorDrawer', 'open2']),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
  pageIndex: state.getIn(['routing', 'index']),
  routes: state.getIn(['routing', 'routes']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  handleApplyBtn: ({ selectedStencil, stencilId, stencilPropsStyle }) => {
    // update store
    dispatch(updateStencilProperty({
      id: stencilId,
      properties: fromJS(selectedStencil.props).set('style', stencilPropsStyle),
    }));
    // for get newest
    dispatch(resetSelectedProperty());
  },
  handleCollapseBtn: () => {
    // hide drawer & reset everything
    resetDrawerSelectedStencil();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StylesForm);
