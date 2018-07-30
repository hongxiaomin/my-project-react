import { connect } from 'react-redux';
import StencilEditorDrawer2 from '../components/stencil-editor-drawer2';

const mapStateToProps = (state) => ({
  stencilEditorDrawerOpen2: state.getIn(['options', 'stencilEditorDrawer', 'open2']),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
});

export default connect(
  mapStateToProps,
)(StencilEditorDrawer2);
