import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import IconBoxContainer from '../../containers/IconBoxContainer';
import SearchBarContainer from '../../containers/SearchBarContainer';
import IconSelectorModalHelperContainer from '../../containers/IconSelectorModalHelperContainer';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import * as svgIcons from 'material-ui/svg-icons';

import cssStyles from './iconSelectorModalStyles.js';

/**
 * icon folders
 * @type {Array}
 */
const iconCategories = [
  'Action',
  'Alert',
  'Av',
  'Communication',
  'Content',
  'Device',
  'Editor',
  'File',
  'Hardware',
  'Image',
  'Maps',
  'Navigation',
  'Notification',
  'Places',
  'Social',
  'Toggle',
];
/**
 * temp keep icon object array
 * @type {Object}
 */
let svgIconObjects = Object.assign({}, svgIcons);
/**
 * reset icon object array
 * @return {Object} [description]
 */
const resetSvgIconObjects = () => (svgIconObjects = Object.assign({}, svgIcons));
/**
 * icon tiles
 * @param  {Object} props {}
 * @return {React}
 */
const IconSet = (props) => {
  const regType = new RegExp(`^${props.category}`);
  const tile = [];

  for (const iconName in svgIconObjects) {
    if (regType.test(iconName)) {
      tile.push((
       <IconBoxContainer
         key={uuid.v4()}
         category={props.category}
         iconName={iconName}
       />
      ));

      delete svgIconObjects[iconName];
    }
  }

  return (
    <div style={cssStyles.iconGroup}>
      {tile}
    </div>
  );
};
IconSet.propTypes = {
  category: PropTypes.string.isRequired,
};
/**
 * icon list group
 * @return {React}
 */
const IconGroup = () => (
  <div style={cssStyles.iconGroupContainer}>
    {
      iconCategories.map((category) => (
          <div key={uuid.v4()}>
            <div>
              <hr style={cssStyles.divider} />
              <h3>{category}</h3>
              <IconSet
                category={category}
              />
            </div>
          </div>
        ) // end return
      )// end map
    }
  </div>
);
IconGroup.propTypes = {
};
/**
 * @see https://material.io/icons/
 * @see https://github.com/facebook/react/issues/2608 (render 961 icon slow)
 */
class IconSelectorModal extends React.Component {
  /**
   * [constructor description]
   * @param  {Object} props [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      openIconModalSelector: false,
      renderTimer: 0,
      iconData: {},
    };
  }
  /**
   * [componentWillReceiveProps description]
   * @param  {Object} nextProps [description]
   */
  componentWillReceiveProps(nextProps) {
    const { openIconModalSelector, iconData } = nextProps;
    this.setState({
      renderTimer: ++this.state.renderTimer,
      openIconModalSelector,
      iconData,
    });
    if (openIconModalSelector === false) {
      this.setState({
        renderTimer: 0,
      });
    }
  }
  /**
   * [shouldComponentUpdate description]
   * @param  {Object} nextProps [description]
   * @param  {Object} nextState [description]
   * @return {Boolean}           true|false
   */
  shouldComponentUpdate(nextProps, nextState) {
    // render when close
    if (!nextState.openIconModalSelector) {
      return true;
    }
    // not render when opened
    if (this.state.renderTimer > 1) {
      return false;
    }

    return true;
  }
  /**
   * cancel button
   * @return {[type]} [description]
   */
  onCancel = () => {
    this.props.closeIconSelectorModal(this.state.iconData);
  };
  onSubmit = () => {
    this.props.setNewIcon();
  };
  render() {
    // init
    resetSvgIconObjects();

    const { openIconModalSelector } = this.props; // from store
    const actions = [
      <FlatButton
        label="Cancel"
        style={cssStyles.dialogButton}
        onTouchTap={this.onCancel}
      />,
      <RaisedButton
        label="Submit"
        style={cssStyles.dialogButton}
        primary
        onTouchTap={this.onSubmit}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={openIconModalSelector}
        onRequestClose={this.onCancel}
        contentStyle={cssStyles.dialog}
      >
        {/* searchbar */}
        <SearchBarContainer />
        {/* icon list */}
        {<IconGroup />}
        {/* footer helper */}
        <IconSelectorModalHelperContainer />
      </Dialog>
    );
  }
}

IconSelectorModal.propTypes = {
  openIconModalSelector: PropTypes.bool.isRequired,
  closeIconSelectorModal: PropTypes.func.isRequired,
  setNewIcon: PropTypes.func.isRequired,
};

export default IconSelectorModal;
