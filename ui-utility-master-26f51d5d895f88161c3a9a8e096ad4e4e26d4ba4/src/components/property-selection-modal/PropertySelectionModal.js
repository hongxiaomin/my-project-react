import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Checkbox from 'material-ui/Checkbox';
import { stylePropsList } from '../../constants';
import { getPropertySpecs } from '../../utils';
import styles from './propertySelectionModalStyles';

export default class PropertySelectionModal extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      prop: [],
      style: [],
    };
  }

  onPropCheck = (prop) => (e, isChecked) => {
    if (isChecked) {
      this.state.prop.push(prop);
    } else {
      const index = this.state.prop.indexOf(prop);
      this.state.prop.splice(index, 1);
    }
    this.setState({ prop: this.state.prop });
  }

  onStyleCheck = (prop) => (e, isChecked) => {
    if (isChecked) {
      this.state.style.push(prop);
    } else {
      const index = this.state.style.indexOf(prop);
      this.state.style.splice(index, 1);
    }
    this.setState({ style: this.state.style });
  }

  onCancel() {
    this.props.closePropertySelectionModal();
    this.setState({ prop: [], style: [] });
  }

  onSubmit() {
    this.props.onPropsSubmit(this.state);
    this.props.closePropertySelectionModal();
    this.setState({ prop: [], style: [] });
  }

  /**
   * [renderPropsList description]
   * @param  {Object}   options.propsList   {} spec data (css or attribute)
   * @param  {Function} options.onCheck     func
   * @param  {Boolean}  options.isItemGroup has group not flattening
   * @param  {Object}   options.used        {}
   * @return {Array}                        []
   */
  renderPropsList({ propsList, onCheck, isItemGroup, used = {} }) {
    let list;
    const usedStyle = used.style || {};
    const usedProp = used || {};

    if (isItemGroup) {
      list = propsList.items.map((item, index) =>
        <ListItem
          key={index}
          primaryText={item.name}
          primaryTogglesNestedList
          style={styles.label}
          nestedItems={
            item.subItems && item.subItems.map((subItem, subItemIndex) => {
              if (usedStyle.hasOwnProperty(subItem)) {
                return null;
              }

              return (
                <ListItem
                  key={subItemIndex}
                  primaryText={subItem}
                  style={styles.label}
                  leftCheckbox={<Checkbox onCheck={onCheck(subItem)} />}
                />
              );
            })
          }
        />
      );
    } else {
      list = [];
      let run = 0;
      for (const key in propsList) {
        if (propsList.hasOwnProperty(key)) {
          if (usedProp.hasOwnProperty(key)) {
            continue;
          }

          list.push(
            <ListItem
              key={run++}
              primaryText={key}
              style={styles.label}
              leftCheckbox={<Checkbox onCheck={onCheck(key)} />}
            />
          );
        } // end if
      }
    }

    return list;
  }

  render() {
    const { propertySelectionModalOpen, selectedStencil, selectedProperty } = this.props;
    const { onPropCheck, onStyleCheck, renderPropsList } = this;
    const { name, props, namespace } = selectedStencil;
    const notSubmitProperty = selectedProperty.prop;
    const notSubmitstyle = selectedProperty.style;
    // combine all (ready to UI's property + exist UI's property)
    const usedProperties = props;
    if (usedProperties) {
      for (let i = 0, j = notSubmitProperty; i < j.length; i += 1) {
        usedProperties[j[i]] = '';
      }
      usedProperties.style = usedProperties.style || {};
      for (let i = 0, j = notSubmitstyle; i < j.length; i += 1) {
        usedProperties.style[j[i]] = '';
      }
    }

    // if ListItem has nestedItems, user cannot add rightIcon or nestedItems cannot displayed
    if (name === 'ListItem' && props.nestedItems.length > 0) {
      usedProperties.rightIcon = '';
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        labelStyle={styles.label}
        onTouchTap={this.onCancel}
      />,
      <FlatButton
        label="Submit"
        primary
        labelStyle={styles.label}
        onTouchTap={this.onSubmit}
      />,
    ];

    // autoScrollBodyContent
    return (
      <Dialog
        actions={actions}
        modal={false}
        onRequestClose={this.onCancel}
        open={propertySelectionModalOpen}
        contentStyle={{ width: '50%', maxWidth: 'none' }}
      >
        <Tabs>
          <Tab label="STYLE PROPERTY" style={styles.tab}>
            <List style={styles.list}>
              {renderPropsList({
                propsList: stylePropsList,
                onCheck: onStyleCheck.bind(this),
                isItemGroup: true,
                used: usedProperties,
              })}
            </List>
          </Tab>
          <Tab label="ELEMENT PROPERTY" style={styles.tab}>
            <List style={styles.list}>
              {name !== undefined ? renderPropsList({
                propsList: namespace === 'icons' ?
                            getPropertySpecs('Icons') : getPropertySpecs(name),
                onCheck: onPropCheck.bind(this),
                isItemGroup: false,
                used: usedProperties,
              }) : ''}
            </List>
          </Tab>
        </Tabs>
      </Dialog>
    );
  }
}

PropertySelectionModal.propTypes = {
  propertySelectionModalOpen: PropTypes.bool.isRequired,
  closePropertySelectionModal: PropTypes.func.isRequired,
  onPropsSubmit: PropTypes.func.isRequired,
  selectedStencil: PropTypes.object.isRequired,
  selectedProperty: PropTypes.object.isRequired,
};
