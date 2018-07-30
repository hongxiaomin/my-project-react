import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import store from '../store';
import PlainTableEditorModal from '../components/plain-table-editor-modal';
import {
  closePlainTableEditorModal,
  updateStencilProperty,
  setRESTData,
} from '../actions';

const mapStateToProps = (state) => ({
  plainTableEditorModalOpen: state.getIn(['options', 'plainTableEditorModal', 'open']),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
  currentPageIndex: state.getIn(['routing', 'index']),
  routes: state.getIn(['routing', 'routes']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  closePlainTableEditorModal: () => {
    dispatch(closePlainTableEditorModal());
  },
  onDataTransformerFormSubmit: (id, props, pageStencils) => {
    // update stencil property first
    Object.assign(props.dataTransformer,
      { transformer: eval(`(${props.dataTransformer.transformer})`) }
    );
    dispatch(updateStencilProperty({ id, properties: fromJS(props) }));

    const {
      url,
      transformer,
    } = props.dataTransformer;
    // do fetch
    if (url.length !== 0 && url.replace(/\s/g, '').length !== 0) {
      fetch(url)
      .then(resp => resp.json())
      .then(json => {
        const prefix = `${pageStencils[id].name}${props.key.split('-')[0]}`;
        // save data into store
        dispatch(setRESTData({ prefix, restData: fromJS(json) }));

        const restData = store.getState().getIn(['fields', 'restData']).toJS();

        Object.assign(
          props,
          { columnDefs: transformer(restData[prefix]).columnDefs },
          { rowData: transformer(restData[prefix]).rowData },
        );
        // update stencil
        dispatch(updateStencilProperty({ id, properties: fromJS(props) }));
      }).catch(ex => {
        window.console.error(ex);
      });
    }// end if url error
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    onDataTransformerFormSubmit: (id, props) => {
      const pageStencils = stateProps.routes[stateProps.currentPageIndex].stencils;
      dispatchProps.onDataTransformerFormSubmit(id, props, pageStencils);
    },
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PlainTableEditorModal);
