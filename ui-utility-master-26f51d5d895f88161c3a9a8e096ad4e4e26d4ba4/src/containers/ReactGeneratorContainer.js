import { connect } from 'react-redux';
import { ReactGenerator } from 'ui-utility-code-generator';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => ({
  stencilTree: state.get('stencilTree').toJS(),
  mqttData: state.getIn(['fields', 'mqttData']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReactGenerator);
