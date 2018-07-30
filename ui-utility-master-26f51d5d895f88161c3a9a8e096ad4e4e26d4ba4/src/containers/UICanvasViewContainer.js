import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { push } from 'react-router-redux';
import UICanvasView from '../components/ui-canvas-view';
import { ROOT_DIV } from '../constants/config';
import { addPageAndRoot, composeStencilTree } from '../actions';

const mapStateToProps = (state) => ({
  // for next line, DO NOT toJS(), will cause maximum call stack size exceeded
  routes: state.getIn(['routing', 'routes']),
  mode: state.getIn(['options', 'mode']),
  pageIndex: state.getIn(['routing', 'index']),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  onCanvasMount: () => {
    // the very first page is index
    dispatch(addPageAndRoot({ pageName: 'index', stencil: ROOT_DIV }));
    dispatch(push('index'));    // push will trigger switchPage on middleware
  },
  onStencilsChange: (stencils) => {
    dispatch(composeStencilTree({ stencils: fromJS(stencils) }));
  },
});

const UICanvasViewContainer =
  new DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(UICanvasView));

export default UICanvasViewContainer;
