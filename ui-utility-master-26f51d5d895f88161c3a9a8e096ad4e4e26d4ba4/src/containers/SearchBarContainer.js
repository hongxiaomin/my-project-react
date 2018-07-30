import { connect } from 'react-redux';
import SearchBar from '../components/search-bar';
import {
  setIconSearchedText,
} from '../actions';

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  onSetIconSearchedText: (searchText) => {
    dispatch(setIconSearchedText({ searchText }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
