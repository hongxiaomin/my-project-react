import { connect } from 'react-redux';
import UIUtilityView from '../components/ui-utility-view';

const mapStateToProps = (state) => ({
  mode: state.getIn(['options', 'mode']),
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UIUtilityView);
