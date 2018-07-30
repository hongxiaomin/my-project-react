import { connect } from 'react-redux';
import StencilEditorDrawer from '../components/stencil-editor-drawer';

const mapStateToProps = (state) => ({
  stencilEditorDrawerOpen: state.getIn(['options', 'stencilEditorDrawer', 'open']),
});

export default connect(
  mapStateToProps,
)(StencilEditorDrawer);
