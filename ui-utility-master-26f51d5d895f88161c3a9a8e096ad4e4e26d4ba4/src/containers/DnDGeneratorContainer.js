import { connect } from 'react-redux';
import DnDGenerator from '../components/dnd-generator/DnDGenerator';

const mapStateToProps = (state) => ({
  stencilTree: state.get('stencilTree').toJS(),
});

export default connect(
  mapStateToProps,
)(DnDGenerator);
