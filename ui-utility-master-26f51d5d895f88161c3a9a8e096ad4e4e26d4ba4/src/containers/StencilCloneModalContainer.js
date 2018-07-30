import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import StencilCloneModal from '../components/stencil-clone-modal';
import { cloneStencil, closeStencilCloneModal } from '../actions';
import { ROOT_DIV_ID } from '../constants/config';

const mapStateToProps = (state) => ({
  routes: state.getIn(['routing', 'routes']).toJS(),
  stencilCloneModalOpen: state.getIn(['options', 'stencilCloneModal', 'open']),
  stencilCloneModalType: state.getIn(['options', 'stencilCloneModal', 'type']),
  currentPage: state.getIn(['routing', 'currentPage']),
  currentPageIndex: state.getIn(['routing', 'index']),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  onDifferentPageCloneSubmit: (selectedStencil, pageIndexes, cloneType, currentPageIndex) => {
    for (let i = 0; i < pageIndexes.length; i++) {
      dispatch(cloneStencil({
        stencil: fromJS(selectedStencil),
        parentId: ROOT_DIV_ID,
        sourcePageIndex: currentPageIndex,
        destinationPageIndex: pageIndexes[i],
        cloneType,
      }));
    }
  },
  closeStencilCloneModal: () => {
    dispatch(closeStencilCloneModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StencilCloneModal);
