import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import PropsFormContainer from '../../containers/PropsFormContainer';
import StylesFormContainer from '../../containers/StylesFormContainer';
import ActionsFormContainer from '../../containers/ActionsFormContainer';
import DataBindingsFormContainer from '../../containers/DataBindingsFormContainer';
import cssStyles from './stencilEditorTabsStyles2';
/**
 * 4 tab drawer
 */
class StencilEditorTabs2 extends PureComponent {
  /**
   * [constructor description]
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      nowSelectedIndex: false,
    };
  }
  /**
   * [componentWillReceiveProps description]
   * @param  {[type]} nextProps [description]
   * @return {[type]}           [description]
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedStencil &&
      nextProps.selectedStencil.id !== this.props.selectedStencil.id) {
      // reset this view
      this.setState({ nowSelectedIndex: false });
    }
  }
  /**
   * [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  handleTabOnChange = (value) => {
    /*
    init value will proxy event, not real value
     */
    if (/^\d+$/.test(value)) {
      this.setState({ nowSelectedIndex: value });
    }
  }
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    /*
    control the tab for show/click

    Props/Styles:
    only false will disable; undefined or {} are not
    for avoid not declare style key in model

    Actions/Data Binding:
    are set false or {}
     */
    const isPropsDisabled = this.props.selectedStencil.extension &&
      this.props.selectedStencil.extension.prop === false;
    const isStylesDisabled = this.props.selectedStencil.extension &&
      this.props.selectedStencil.extension.style === false;
    const isActionsDisabled = !(this.props.selectedStencil.extension &&
      this.props.selectedStencil.extension.action);
    const isDataBindingsDisabled = !(this.props.selectedStencil.extension &&
      this.props.selectedStencil.extension.dataBinding);

    const tabAvailable = [
      !!isPropsDisabled,
      !!isStylesDisabled,
      !!isActionsDisabled,
      !!isDataBindingsDisabled,
    ];
    /*
    define init tab location

    this view render by whole view at start; not a stencil pop props tab
    so use value={} to change location
     */
    let nowSelectedIndex = tabAvailable.indexOf(false);
    if (this.state.nowSelectedIndex !== false) {
      nowSelectedIndex = this.state.nowSelectedIndex;
    }

    return (
      <Tabs
        initialSelectedIndex={0}
        value={nowSelectedIndex}
        inkBarStyle={cssStyles.inkBar}
        onChange={this.handleTabOnChange}
      >
        <Tab
          label="Props"
          /*
          only false will disable; undefined or {} are not

          for avoid not declare style key in model
           */
          disabled={isPropsDisabled}
          style={
            this.props.selectedStencil.extension &&
            this.props.selectedStencil.extension.prop !== false ?
            cssStyles.tab :
            cssStyles.disabledTab
          }
          children={<PropsFormContainer />}
          value={0}
        />
        <Tab
          label="Styles"
          /*
          only false will disable; undefined or {} are not

          for avoid not declare style key in model
           */
          disabled={isStylesDisabled}
          style={
            this.props.selectedStencil.extension &&
            this.props.selectedStencil.extension.style !== false ?
            cssStyles.tab :
            cssStyles.disabledTab
          }
          children={<StylesFormContainer />}
          value={1}
        />
        <Tab
          label="Actions"
          children={<ActionsFormContainer />}
          // only false will disable; {} is not
          disabled={isActionsDisabled}
          style={
            this.props.selectedStencil.extension && this.props.selectedStencil.extension.action ?
            cssStyles.tab :
            cssStyles.disabledTab
          }
          value={2}
        />
        <Tab
          label="Data Bindings"
          children={<DataBindingsFormContainer />}
          // only false will disable; {} is not
          disabled={isDataBindingsDisabled}
          style={
            this.props.selectedStencil.extension &&
            this.props.selectedStencil.extension.dataBinding ?
            cssStyles.tab :
            cssStyles.disabledTab
          }
          value={3}
        />
      </Tabs>
    );
  }
}

// const StencilEditorTabs2 = (props) => {
//   /*
//   control the tab for show/click

//   Props/Styles:
//   only false will disable; undefined or {} are not
//   for avoid not declare style key in model

//   Actions/Data Binding:
//   are set false or {}
//    */
//   const isPropsDisabled = props.selectedStencil.extension &&
//     props.selectedStencil.extension.prop === false;
//   const isStylesDisabled = props.selectedStencil.extension &&
//     props.selectedStencil.extension.style === false;
//   const isActionsDisabled = !(props.selectedStencil.extension &&
//     props.selectedStencil.extension.action);
//   const isDataBindingsDisabled = !(props.selectedStencil.extension &&
//     props.selectedStencil.extension.dataBinding);

//   const tabAvailable = [
//     !!isPropsDisabled,
//     !!isStylesDisabled,
//     !!isActionsDisabled,
//     !!isDataBindingsDisabled,
//   ];
//   /*
//   define init tab location

//   this view render by whole view at start; not a stencil pop props tab
//   so use value={} to change location
//    */
//   let initialSelectedIndex = tabAvailable.indexOf(false);

//   return (
//     <Tabs
//       initialSelectedIndex={0}
//       value={initialSelectedIndex}
//       inkBarStyle={cssStyles.inkBar}
//     >
//       <Tab
//         label="Props"
//         /*
//         only false will disable; undefined or {} are not

//         for avoid not declare style key in model
//          */
//         disabled={isPropsDisabled}
//         style={
//           props.selectedStencil.extension && props.selectedStencil.extension.prop !== false ?
//           cssStyles.tab :
//           cssStyles.disabledTab
//         }
//         children={<PropsFormContainer />}
//         value={0}
//       />
//       <Tab
//         label="Styles"
//         /*
//         only false will disable; undefined or {} are not

//         for avoid not declare style key in model
//          */
//         disabled={isStylesDisabled}
//         style={
//           props.selectedStencil.extension && props.selectedStencil.extension.style !== false ?
//           cssStyles.tab :
//           cssStyles.disabledTab
//         }
//         children={<StylesFormContainer />}
//         value={1}
//       />
//       <Tab
//         label="Actions"
//         children={<ActionsFormContainer />}
//         // only false will disable; {} is not
//         disabled={isActionsDisabled}
//         style={
//           props.selectedStencil.extension && props.selectedStencil.extension.action ?
//           cssStyles.tab :
//           cssStyles.disabledTab
//         }
//         value={2}
//       />
//       <Tab
//         label="Data Bindings"
//         children={<DataBindingsFormContainer />}
//         // only false will disable; {} is not
//         disabled={isDataBindingsDisabled}
//         style={
//           props.selectedStencil.extension && props.selectedStencil.extension.dataBinding ?
//           cssStyles.tab :
//           cssStyles.disabledTab
//         }
//         value={3}
//       />
//     </Tabs>
//   );
// };

StencilEditorTabs2.displayName = 'StencilEditorTabs2';

StencilEditorTabs2.propTypes = {
  selectedStencil: PropTypes.object.isRequired,
};

StencilEditorTabs2.defaultProps = {
  selectedStencil: {},
};

export default StencilEditorTabs2;
