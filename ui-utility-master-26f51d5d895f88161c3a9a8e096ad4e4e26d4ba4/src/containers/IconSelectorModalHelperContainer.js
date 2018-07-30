import { connect } from 'react-redux';
import IconSelectorModalHelper from '../components/icon-selector-modal-helper';
// import { closePropertySelectionModal, submitSelectedProperty } from '../actions';

const mapStateToProps = (state) => ({
  selectedIcon: state.getIn(['fields', 'iconData', 'selectedIcon']),
  newPickedIcon: state.getIn(['fields', 'iconData', 'newPickedIcon']),
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IconSelectorModalHelper);
