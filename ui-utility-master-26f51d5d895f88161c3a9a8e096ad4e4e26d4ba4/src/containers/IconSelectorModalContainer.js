import { connect } from 'react-redux';
import IconSelectorModal from '../components/icon-selector-modal';
import {
  closeIconSelectorModal,
  updateIconData,
} from '../actions';

const mapStateToProps = (state) => ({
  iconData: state.getIn(['fields', 'iconData']).toJS(),
  openIconModalSelector: state.getIn(['options', 'iconSelectorModal', 'open']),
});

const mapDispatchToProps = (dispatch) => ({
  closeIconSelectorModal: (iconData) => {
    dispatch(closeIconSelectorModal());
    dispatch(updateIconData({
      searchedText: '',
      selectedIcon: iconData.selectedIcon,
      oldPickedIcon: '',
      newPickedIcon: '',
    }));
  },
  setNewIcon: () => {
    dispatch(closeIconSelectorModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IconSelectorModal);
