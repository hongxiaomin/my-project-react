import React from 'react';
import PropTypes from 'prop-types';

import * as svgIcons from 'material-ui/svg-icons';

import cssStyles from './iconSelectorModalHelperStyles.js';
/**
 * icon box, icon with text in box
 */
export default class IconSelectorModalHelper extends React.Component {
  /**
   * [constructor description]
   * @param  {Object} props {}
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedIcon: '',
      newPickedIcon: '',
    };
  }
  /**
   * [componentWillReceiveProps description] store-dispatch result use this way
   * @param  {Object} nextProps {}
   */
  componentWillReceiveProps(nextProps) {
    const selectedIcon = nextProps.selectedIcon;
    const newPickedIcon = nextProps.newPickedIcon;

    if (selectedIcon) {
      this.setState({ selectedIcon });
    }
    if (newPickedIcon) {
      this.setState({ newPickedIcon });
    }
  }
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    let oldIcon = null;
    if (this.state.selectedIcon) {
      oldIcon = React.createElement(svgIcons[this.state.selectedIcon]);
    } else if (this.props.selectedIcon) {
      oldIcon = React.createElement(svgIcons[this.props.selectedIcon]);
    }
    let newIcon = null;
    if (this.state.newPickedIcon) {
      newIcon = React.createElement(svgIcons[this.state.newPickedIcon]);
    } else if (this.props.newPickedIcon) {
      newIcon = React.createElement(svgIcons[this.props.newPickedIcon]);
    }

    return (
      <div style={cssStyles.footerContainer}>
        <div style={cssStyles.iconShow}>
          <span>Original</span>
          <div style={cssStyles.icon}>{oldIcon}</div>
        </div>
        <div style={cssStyles.iconShowDivider}>»</div>
        <div style={cssStyles.iconShow}>
          <span>New</span>
          <div style={cssStyles.icon}>{newIcon}</div>
        </div>
      </div>
    );
  }
}
IconSelectorModalHelper.propTypes = {
  selectedIcon: PropTypes.string,
  newPickedIcon: PropTypes.string,
};
