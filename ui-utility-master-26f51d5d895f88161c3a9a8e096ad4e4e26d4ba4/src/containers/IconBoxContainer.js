import { connect } from 'react-redux';
import IconBox from '../components/icon-box';
import {
  pickNewIcon,
  pickOldIcon,
} from '../actions';

const mapStateToProps = (state) => ({
  searchedText: state.getIn(['fields', 'iconData', 'searchedText']),
  selectedIcon: state.getIn(['fields', 'iconData', 'selectedIcon']),
  oldPickedIcon: state.getIn(['fields', 'iconData', 'oldPickedIcon']),
  newPickedIcon: state.getIn(['fields', 'iconData', 'newPickedIcon']),
});

const mapDispatchToProps = (dispatch) => ({
  onPickNewIcon: (iconName) => {
    dispatch(pickOldIcon());
    dispatch(pickNewIcon({ iconName }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IconBox);
