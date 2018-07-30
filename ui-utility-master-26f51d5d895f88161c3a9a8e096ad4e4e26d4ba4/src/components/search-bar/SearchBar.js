import React from 'react';
import PropTypes from 'prop-types';

import ActionSearch from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';

import cssStyles from './searchBarStyles';

export default function SearchBar(props) {
  /**
   * search result
   * @param  {String} searchText ''
   */
  const onSearch = (searchText) => {
    props.onSetIconSearchedText(searchText);
  };

  return (
    <div style={cssStyles.searchBar}>
      <div>
        <ActionSearch style={cssStyles.searchBarIcon} color={cssStyles.searchBarIcon.color} />
      </div>
      <AutoComplete
        autoFocus
        style={cssStyles.searchBarAutoField}
        textFieldStyle={cssStyles.searchBarTextField}
        dataSource={[]}
        hintText="Search"
        onUpdateInput={onSearch}
      />
    </div>
  );
}
SearchBar.propTypes = {
  onSetIconSearchedText: PropTypes.func,
};
