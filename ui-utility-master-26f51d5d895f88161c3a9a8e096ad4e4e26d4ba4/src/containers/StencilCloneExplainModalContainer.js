import { connect } from 'react-redux';
import StencilCloneExplainModal from '../components/stencil-clone-explain-modal';
import { closeStencilCloneExplainModal } from '../actions';

const mapStateToProps = (state) => ({
  stencilCloneExplainModalOpen: state.getIn(['options', 'stencilCloneExplainModal', 'open']),
});

const mapDispatchToProps = (dispatch) => ({
  onCloseClick: () => {
    dispatch(closeStencilCloneExplainModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StencilCloneExplainModal);
