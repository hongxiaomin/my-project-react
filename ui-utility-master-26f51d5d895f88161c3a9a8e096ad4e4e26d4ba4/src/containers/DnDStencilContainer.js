import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import DnDStencil from '../components/dnd-stencil/DnDStencil';
import {
  changeStencilOrder,
  changeParent,
  openStencilEditorDrawer,
  openStencilEditorDrawer2,
  setSelectedStencil,
  resetSelectedProperty,
  setDoubleSelectedStencil,
  resetIconData,
} from '../actions';

const mapStateToProps = (state, ownProps) => ({
  model: ownProps.model,
  index: ownProps.index,
  stencilEditorDrawerOpen: state.getIn(['options', 'stencilEditorDrawer', 'open']),
  routes: state.getIn(['routing', 'routes']).toJS(),
  pageIndex: state.getIn(['routing', 'index']),
  selectedStencilModelId: state.getIn(['fields', 'selectedStencilModelId']),
  doubleSelectedStencilModelId: state.getIn(['fields', 'doubleSelectedStencilModelId']),
});

const mapDispatchToProps = (dispatch) => ({
  changeStencilOrder: (dragId, hoverId) => {
    dispatch(changeStencilOrder({ dragId, hoverId }));
  },
  changeStencilParent: (dragId, hoverId) => {
    dispatch(changeParent({ id: dragId, newParentId: hoverId }));
  },
  openStencilEditorDrawer: (stencil) => {
    dispatch(openStencilEditorDrawer());
    dispatch(resetSelectedProperty());
    dispatch(setSelectedStencil({ stencil: fromJS(stencil) }));
    dispatch(resetIconData());
  },
  openStencilEditorDrawer2: (stencil) => {
    dispatch(openStencilEditorDrawer2());
    dispatch(resetSelectedProperty());
    dispatch(setSelectedStencil({ stencil: fromJS(stencil) }));
    dispatch(resetIconData());
  },
  setDoubleSelectedStencil: (modelId) => {
    dispatch(setDoubleSelectedStencil({ modelId }));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    openStencilEditorDrawer: (id) => {
      // get selectedStencil from routingReducers since model props is modified: remove onTouchTap
      const { routes, pageIndex } = stateProps;
      const selectedStencil = routes[pageIndex].stencils[id];
      dispatchProps.openStencilEditorDrawer(selectedStencil);
    },
    openStencilEditorDrawer2: (id) => {
      // get selectedStencil from routingReducers since model props is modified: remove onTouchTap
      const { routes, pageIndex } = stateProps;
      const selectedStencil = routes[pageIndex].stencils[id];
      dispatchProps.openStencilEditorDrawer2(selectedStencil);
    },
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(DnDStencil);
