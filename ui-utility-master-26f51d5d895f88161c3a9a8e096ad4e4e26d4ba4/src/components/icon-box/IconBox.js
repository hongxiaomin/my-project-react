import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import FlatButton from 'material-ui/FlatButton';
import * as svgIcons from 'material-ui/svg-icons';

import cssStyles from './iconBoxStyles.js';
/**
 * remove svg icon folder name
 * @param  {String} word         ''
 * @param  {String} regexpString ''
 * @return {String}
 */
const removeFolderNameWithIcon = (word, regexpString) => (
  word.replace(new RegExp(`^${regexpString}`), '')
);
/**
 * ex: AccountBalance > account balance
 * @param  {String} words ''
 * @return {String}       ''
 */
const converCamelCaseToSpaceCase = (word) => (
  word.replace(/[A-Z]/g, (character) => (` ${character.toLowerCase()}`)).trim()
);
/**
 * [description]
 * @param  {String} iconName [description]
 * @param  {String} category [description]
 * @return {String}          [description]
 */
const getHumanReadableIconName = (iconName, category) => (
  converCamelCaseToSpaceCase(removeFolderNameWithIcon(iconName, category))
);
/**
 * icon box, icon with text in box
 */
export default class IconBox extends React.Component {
  /**
   * [constructor description]
   * @param  {Object} props {}
   */
  constructor(props) {
    super(props);
    this.state = {
      searchedText: '',
      oldPickedIcon: '',
      newPickedIcon: '',
    };
  }
  /**
   * [componentWillReceiveProps description] store-dispatch result use this way
   * @param  {Object} nextProps {}
   */
  componentWillReceiveProps(nextProps) {
    const searchedText = nextProps.searchedText;
    const oldPickedIcon = nextProps.oldPickedIcon;
    const newPickedIcon = nextProps.newPickedIcon;

    if (searchedText !== undefined) {
      this.setState({ searchedText });
    }
    if (oldPickedIcon) {
      this.setState({ oldPickedIcon });
    }
    if (newPickedIcon) {
      this.setState({ newPickedIcon });
    }
  }
  /**
   * [shouldComponentUpdate description]
   * @param  {[type]} nextProps   [description]
   * @param  {[type]} nextState   [description]
   * @param  {[type]} nextContext [description]
   * @return {[type]}             [description]
   */
  shouldComponentUpdate(nextProps, nextState) {
    // only cliking new and clicked old icon render
    if (nextState.oldPickedIcon === this.props.iconName ||
        nextState.newPickedIcon === this.props.iconName
      ) {
      return true;
    }
    if (getHumanReadableIconName(this.props.iconName, this.props.category)
          .indexOf(this.state.searchedText) === -1) {
      return true;
    }

    return false;
  }
  /**
   * click event
   * @param  {String} iconName
   */
  onClick = (iconName) => () => {
    this.setState({ newPickedIcon: iconName });
    // dispatch
    this.props.onPickNewIcon(iconName);
  };
  /**
   * process icon background color
   * @param  {String} iconName [description]
   * @return {String}          [description]
   */
  getBackgroundColor = (iconName) => {
    let value = '';

    if (iconName === this.props.selectedIcon) {
      value = cssStyles.iconSelected.backgroundColor;
    }
    if (iconName === this.props.newPickedIcon || iconName === this.state.newPickedIcon) {
      value = cssStyles.newIconSelected.backgroundColor;
    }

    return value;
  };
  /**
   * process icon style color
   * @param  {String} iconName [description]
   * @param  {Object} style    {}
   * @return {Object}          {}
   */
  getIconStyle = (iconName, style) => {
    let newStyle = style;

    if (iconName === this.props.newPickedIcon || iconName === this.state.newPickedIcon) {
      newStyle = fromJS(style).mergeDeep(
        fromJS({ color: cssStyles.newIconSelected.color })).toJSON();
    }

    return newStyle;
  };
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const { category, iconName } = this.props; // from parent component
    const { selectedIcon } = this.props; // from store
    const presentName = getHumanReadableIconName(iconName, category);
    let output = null;
    // filter
    if (presentName.indexOf(this.state.searchedText) > -1) {
      output = (
        <FlatButton
          style={cssStyles.iconSquare}
          backgroundColor={this.getBackgroundColor(iconName)}
          onClick={this.onClick(iconName)}
          hoverColor={this.getBackgroundColor(iconName)}
          disabled={
            iconName === selectedIcon ||
            iconName === this.state.newPickedIcon
          }
        >
          <div>
            {
              React.createElement(
                svgIcons[iconName],
                { style: this.getIconStyle(iconName, cssStyles.icon) })
            }
          </div>
          <div style={this.getIconStyle(iconName, cssStyles.iconTitle)}>{presentName}</div>
        </FlatButton>
      );
    }

    return output;
  }
}
IconBox.propTypes = {
  category: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  // by redux
  onPickNewIcon: PropTypes.func.isRequired,
  selectedIcon: PropTypes.string,
  newPickedIcon: PropTypes.string,
};
