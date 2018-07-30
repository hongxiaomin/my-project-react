import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cssStyles from './propsFormStyles';

import { fromJS } from 'immutable';
import uuid from 'uuid';

import { getPropertySpecs } from '../../utils';

import FormInputField from '../form-input-field';
import TabFormAction from '../tab-form-action';
import { Tabs, Tab } from 'material-ui/Tabs';
import Subheader from 'material-ui/Subheader';
/**
 * control render in due time
 * @type {Number}
 */
let statusCode = 0;
const UI_STATUS = {
  READY: statusCode++,
  SHOWN: statusCode++,
  NEW_STENCIL: statusCode++,
  STENCIL_UPDATED: statusCode++,
  STOP_RENDER: statusCode++,
};
/**
 * UI on Props tab
 */
class PropsForm extends Component {
  /**
   * when component created
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      props: {},
      uiStatus: UI_STATUS.READY,
    };
  }
  /**
   * decide update state time
   * 1) new stencil selected
   * 2) store selectedStencil updated
   *
   * @param  {[type]} nextProps [description]
   * @return {[type]}           [description]
   */
  componentWillReceiveProps(nextProps) {
    const {
      stencilEditorDrawerOpen2,
      selectedStencil,
    } = nextProps;
    /*
    first drawer open || drawer open & new stencil || stencil updated (by self or other Tab page)
     */
    const isFirstShowWithStencil = stencilEditorDrawerOpen2 && !this.props.stencilEditorDrawerOpen2;
    const isShownButNewStencil =
      (stencilEditorDrawerOpen2 && (this.props.selectedStencil.id !== undefined &&
        this.props.selectedStencil.id !== selectedStencil.id));
    const isStencilUpdated = (this.state.uiStatus === UI_STATUS.STENCIL_UPDATED) ||
      selectedStencil !== this.props.selectedStencil;

    if (isFirstShowWithStencil || isShownButNewStencil || isStencilUpdated) {
      let uiStatus = this.state.uiStatus;

      if (isFirstShowWithStencil) {
        uiStatus = UI_STATUS.SHOWN;
      }
      if (isShownButNewStencil) {
        uiStatus = UI_STATUS.NEW_STENCIL;
      }
      if (isStencilUpdated) {
        // model data may be updated by OTHER tab (style or action or data binding), not self
        uiStatus = UI_STATUS.STENCIL_UPDATED;
      }

      this.setState({
        props: selectedStencil.props,
        uiStatus,
      });
    }
  }
  /**
   * no update when ui ready, let inner component update self
   * @return {[type]} [description]
   */
  shouldComponentUpdate(nextProps, nextState) {
    // console.debug('shouldComponentUpdate UI_STATUS', UI_STATUS, nextState.uiStatus);
    switch (nextState.uiStatus) {
      case UI_STATUS.STOP_RENDER:
        return false;
      case UI_STATUS.SHOWN:
      case UI_STATUS.NEW_STENCIL:
      case UI_STATUS.STENCIL_UPDATED:
        this.setState({ uiStatus: UI_STATUS.STOP_RENDER });
        return true;
      default:
        return true;
    }
  }
  /**
   * get GridLayout, output key with dependency
   * @param  {[type]} selfPropertySpecs [description]
   * @param  {[type]} selfProps         [description]
   * @return {[type]}                   [description]
   */
  getGridLayout = (selfPropertySpecs, selfProps) => {
    const view = [];
    const groupView = {}; // tab1:[], tab2:[], tab3:[]...
    /*
    callback (normal case)
     */
    const handleChanged = ({ key, value }) => {
      const rightValue = /^\d+$/.test(value) ? Number(value) : value;
      this.setState({ props:
        fromJS(this.state.props).mergeDeep(fromJS({ [key]: rightValue })).toJS(),
      });
    };
    /*
    callback with group value
     */
    const handleGroupChanged = ({ key, value }) => {
      const propKey = key.match(/[a-z]+/i)[0];
      const propPositionInArray = key.match(/[_0-9]+/i)[0].replace('_', '');
      const newArray = this.state.props[propKey] || Array(this.state.props.col);
      newArray[propPositionInArray] = /^\d+$/.test(value) ? Number(value) : value;
      const propValue = newArray;

      this.setState({ props:
        fromJS(this.state.props).mergeDeep(fromJS({ [propKey]: propValue })).toJS(),
      });
    };
    /*
    show tab?
     */
    const cols = selfProps.col;
    view.push(<FormInputField
      key={uuid.v4()}
      fieldName="col"
      fieldSpec={selfPropertySpecs.col}
      fieldSetPropValue={this.state.col || selfProps.col} // use state value first
      handleChanged={handleChanged}
    />);
    /*
    caculate tab
     */
    const TAB_VIEW_BASE = 4;
    const tabs = Math.floor((cols + TAB_VIEW_BASE - 1) / TAB_VIEW_BASE);
    const tabLabelValus = [];
    for (let i = 0, j = tabs; i < j; i += 1) {
      const predictLastNumber = (i + 1) * TAB_VIEW_BASE;
      const lastNumber = predictLastNumber > cols ? cols : predictLastNumber;
      tabLabelValus.push(`${TAB_VIEW_BASE * i + 1}-${lastNumber}`);
    }
    /*
    iterate spec
     */
    for (const propName in selfPropertySpecs) {
      if (Object.hasOwnProperty.call(selfPropertySpecs, propName)) {
        if (propName === 'col') {
          continue; // has generated view
        }
        if (!selfPropertySpecs[propName].dependency) {
          view.push(<FormInputField
            key={uuid.v4()}
            fieldName={propName}
            fieldSpec={selfPropertySpecs[propName]}
            // use state value first
            fieldSetPropValue={this.state[propName] || selfProps[propName]}
            handleChanged={handleChanged}
          />);
        } else {
          for (let i = 0, j = tabs; i < j; i += 1) {
            groupView[`tab_${i}`] = groupView[`tab_${i}`] || {};
            groupView[`tab_${i}`][propName] = [];
            /*
            by tabs & TAB_VIEW_BASE to split value into array
             */
            const tabContentStart = i * TAB_VIEW_BASE;
            const tmpTabContentEnd = tabContentStart + TAB_VIEW_BASE;
            const tabContentEnd = tmpTabContentEnd > cols ? cols : tmpTabContentEnd;
            /*
            element padding with each other
             */
            const padding = '2'; // 2%
            let distributionWidth;
            if (tabs === 1) {
              distributionWidth = 100 / cols - padding;
            } else {
              const items = tabContentEnd - tabContentStart;
              distributionWidth = 100 / items - padding;
            }
            /*
            // for (let a = 0, b = selfProps[propName].length; a < b; a += 1) {
            NO use selfProps this key, use col to define require inputs
             */
            for (let a = tabContentStart, b = tabContentEnd; a < b; a += 1) {
              groupView[`tab_${i}`][propName].push(<FormInputField
                key={uuid.v4()}
                showLable={false}
                fieldName={`${propName}_${a}`}
                fieldSpec={selfPropertySpecs[propName]}
                // use state value first
                fieldSetPropValue={
                  (this.state[propName] && this.state[propName][a]) ||
                  (selfProps[propName] && selfProps[propName][a])
                }
                handleChanged={handleGroupChanged}
                style={{ width: `${distributionWidth}%` }}
              />);
            }
          }
        }// end if group setting
      } // end if object has key
    } // end for loop
    /*
    group prop input for output view
     */
    const renderTabContent = (tabNumber) => {
      const viewGroup = [];

      for (const groupKey in groupView[`tab_${tabNumber}`]) {
        if (Object.hasOwnProperty.call(groupView[`tab_${tabNumber}`], groupKey)) {
          const splitBgColors = groupView[`tab_${tabNumber}`][groupKey].length;
          const bgColor = `
            linear-gradient(to right,
              ${Array(splitBgColors).fill('transparent').map((value, index) => {
                const bgC = (index % 2) ? cssStyles.gridLayoutInputEven.backgroundColor : value;
                const position = 100 / splitBgColors;

                return `${bgC} ${position * index}%, ${bgC} ${(position * (index + 1))}%`;
              }).toString()}
            )
          `;

          viewGroup.push(
            <Subheader
              key={uuid.v4()}
              style={Object.assign({}, cssStyles.gridLayoutSubHeader, { backgroundImage: bgColor })}
              children={`${this.turnCamelToSplit(groupKey)} (→)`}
            />
          );
          viewGroup.push(
            <div
              key={uuid.v4()}
              style={
                Object.assign(
                  {},
                  { display: 'flex', justifyContent: 'space-between' },
                  { backgroundImage: bgColor })
              }
              children={groupView[`tab_${tabNumber}`][groupKey]}
            />
          );
        }
      } // end for loop

      return viewGroup;
    };
    // if more than base
    if (tabs > 1) {
      view.push(
        <Tabs key={uuid.v4()} inkBarStyle={cssStyles.gridLayoutInkBar}>
          {
            Array(tabs).fill('').map((value, index) => (
              <Tab label={tabLabelValus[index]} key={uuid.v4()} style={cssStyles.gridLayoutTab} >
                {renderTabContent(index)}
              </Tab>
            ))
          }
        </Tabs>
      );
    } else {
      // no tab here
      view.push(renderTabContent(0));
    } // end if show tab

    return view;
  };
  /**
   * decide their present way
   * @param  {[type]} options.name  [description]
   * @param  {[type]} options.props [description]
   * @return {[type]}               [description]
   */
  getInputFields = ({ name, props }) => {
    let propertySpecs = getPropertySpecs(name);
    let inputs = [];
    /**
     * default handler with prop value
     * by case on which compoenet, it will do different way, but receive the same args
     * @param  {[type]} options.key   [description]
     * @param  {[type]} options.value [description]
     * @return {[type]}               [description]
     */
    const handleChanged = ({ key, value }) => {
      // use shouldComponentUpdate() to fixed render children again(if change input value will stop)
      const rightValue = !Array.isArray(value) && /^\d+$/.test(value) ? Number(value) : value;
      this.setState({ props:
        fromJS(this.state.props).set(key, rightValue),
      });
    };
    /*
    propertySpec keys in alphabetical order
     */
    const outputByAlphabeticalOrder = () => {
      const newObject = {};
      const tmpSpectKeys = [];
      for (const keyName in propertySpecs) {
        if (Object.hasOwnProperty.call(propertySpecs, keyName)) {
          tmpSpectKeys.push(keyName);
        }
      }
      tmpSpectKeys.sort();

      for (let i = 0, j = tmpSpectKeys.length; i < j; i += 1) {
        const keyName = tmpSpectKeys[i];
        newObject[keyName] = propertySpecs[keyName];
      }
      propertySpecs = newObject;
    };
    const needSortedByAlphabetical = [];
    if (needSortedByAlphabetical.indexOf(name) > -1) {
      outputByAlphabeticalOrder();
    }

    switch (name) {
      case 'GridLayout':
        inputs = (this[`get${name}`](propertySpecs, props));
        break;
      default:
        for (const propName in propertySpecs) {
          if (Object.hasOwnProperty.call(propertySpecs, propName)) {
            inputs.push(<FormInputField
              key={uuid.v4()}
              fieldName={propName}
              fieldSpec={propertySpecs[propName]}
              fieldSetPropValue={this.state[propName] || props[propName]} // use state value first
              handleChanged={handleChanged}
            />);
          }
        }
        break;
    }

    return inputs;
  };
  /**
   * aaaaBbbbbbbCcccc -> Aaaa Bbbbbbb Ccccc
   * @param  {[type]} string) [description]
   * @return {[type]}         [description]
   */
  turnCamelToSplit = (string) => (
    string.replace(/^[a-z]/, (u) => u.toUpperCase()).replace(/([a-z](?=[A-Z]))/g, '$1 ')
  );
  /**
   * output view
   * @return {[type]} [description]
   */
  render() {
    // console.debug('PropsForm render', this.state.uiStatus);
    const {
      selectedStencil,
      stencilEditorDrawerOpen2,
      pageIndex,
      routes,
    } = this.props;
    /**
     * handle checkbox button
     * @return {[type]} [description]
     */
    const handleApplyBtn = () => {
      this.setState({
        uiStatus: UI_STATUS.STENCIL_UPDATED,
      });

      this.props.handleApplyBtn({
        selectedStencil,
        stencilId: selectedStencil.id,
        stencilProps: fromJS(this.state.props),
        stencils: routes[pageIndex].stencils,
      });
    };
    /**
     * handle collapse button
     * @return {[type]} [description]
     */
    const handleCollapseBtn = () => {
      this.props.handleCollapseBtn();
    };

    const output = (
        stencilEditorDrawerOpen2 === false || selectedStencil.extension.prop === false
      ) ?
      null :
      (
        <div style={cssStyles.form}>
          {
            this.getInputFields(selectedStencil)
          }
          <TabFormAction
            handleApplyBtn={handleApplyBtn}
            handleCollapseBtn={handleCollapseBtn}
          />
        </div>
      );

    return output;
  }
}

PropsForm.displayName = 'PropsForm';

PropsForm.propTypes = {
  handleApplyBtn: PropTypes.func,
  handleCollapseBtn: PropTypes.func,
  pageIndex: PropTypes.number,
  routes: PropTypes.array,
  selectedStencil: PropTypes.object.isRequired,
  stencilEditorDrawerOpen2: PropTypes.bool.isRequired,
};

PropsForm.defaultProps = {
  handleApplyBtn: () => {},
  handleCollapseBtn: () => {},
  pageIndex: 0,
  routes: [],
  selectedStencil: {},
  stencilEditorDrawerOpen2: false,
};

export default PropsForm;
