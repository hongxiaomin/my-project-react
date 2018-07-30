import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fromJS } from 'immutable';
import uuid from 'uuid';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
// import 'brace/snippets/javascript';
// import 'brace/snippets/css';
import 'brace/theme/xcode';
import 'brace/theme/xcode';
// import 'brace/ext/language_tools'; // for pop keyword selector, but here are js css, no help
// import 'brace/ext/searchbox'; // for pop keyword selector, but here are js css, no help
import jsonic from 'jsonic';

import { getPropertySpecs } from '../../utils';
import { stylePropsList } from '../../constants';

import FormInputField from '../form-input-field';
import TabFormAction from '../tab-form-action';

import cssStyles from './stylesFormStyles';
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
 * UI on Styles tab
 */
class StylesForm extends Component {
  /**
   * when component created
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      advancedStyle: {},
      uiStatus: UI_STATUS.READY,
    };
    // diff from prop.style using
    this.advancedStyle = {};
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
        style: (selectedStencil.props && selectedStencil.props.style) || {},
        uiStatus,
      });
    }
  }
  /**
   * no update when ui ready, let inner component update self
   * @return {[type]} [description]
   */
  shouldComponentUpdate(nextProps, nextState) {
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
   * render CSS ACE editor
   * @return {[type]} [description]
   */
  getCssAceEditor = () => {
    const helperWord = `
/**
please write codes inner {}

camelCased properties
@see https://www.w3schools.com/jsref/dom_obj_style.asp

ex:
{
  "width": "auto",
  "height": "2px"
}

verify values format
@see https://jsonlint.com/
*/`;
    const defaultValue = `${helperWord}
{
${
  // format with tab, remove {}, first & last space line
  JSON.stringify(this.advancedStyle, null, '\t')
      .replace(/^{|}$/g, '')
      .replace(/^\r|\n/, '')
      .replace(/\r|\n$/, '')
}
}`;

    const onChange = (newValue) => {
      let rightValue = newValue.replace(helperWord, '');
      try {
        rightValue = jsonic(rightValue);
        this.setState({ advancedStyle: fromJS(rightValue) });
      } catch (error) {
        window.console.warn(`Advanced JSS: ${error.name}\n ${error.message}`);
      }
    };

    return (
      <AceEditor
        key={uuid.v4()}
        editorProps={{ $blockScrolling: true }}
        highlightActiveLine
        mode="javascript"
        name="css-advance-editor"
        onChange={onChange}
        showGutter
        theme="xcode"
        tabSize={2}
        value={defaultValue}
        enableBasicAutocompletion
        enableLiveAutocompletion
        enableSnippets
        showLineNumbers
        tabSize={2}
        style={cssStyles.ace}
      />
    );
  };
  /**
   * decide their present way
   * @param  {[type]} options.name  [description]
   * @param  {[type]} options.props [description]
   * @return {[type]}               [description]
   */
  getInputFields = ({ name, props }) => {
    // re-asign css value to codes
    this.advancedStyle = Object.assign({}, props.style) || {};

    const styleSpecs = getPropertySpecs('cssStyle');
    const propertyStyleSpecs = getPropertySpecs(name).style;
    const inputsWithGroup = [];
    let propertySpecs = getPropertySpecs(name);
    let propertySpecsTmp = '';
    for (const key in propertySpecs) {
      if (key === 'style') {
        continue;
      }
      propertySpecsTmp += `${key},`;
    }
    propertySpecs = propertySpecsTmp;
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
      this.setState({ style:
        fromJS(this.state.style).set(key, rightValue),
      });
    };
    /*
    loop list all css that could tune for user
     */
    for (let i = 0, j = stylePropsList.items, k = j.length; i < k; i += 1) {
      const classifyName = j[i].name;
      if (propertyStyleSpecs && propertyStyleSpecs[classifyName] === false) {
        // jump: forbidden setting
        continue;
      }
      /*
      classify title
       */
      inputsWithGroup.push(<div key={uuid.v4()} style={cssStyles.groupTitle}>{classifyName}</div>);

      const inputs = [];
      for (let a = 0, b = j[i].subItems, c = b.length; a < c; a += 1) {
        // const cssAttribute = this.turnCamelToSplit(b[a]);// for test only, NONE USE

        if (propertyStyleSpecs &&
          propertyStyleSpecs[classifyName] && propertyStyleSpecs[classifyName][b[a]] === false) {
          // jump: forbidden setting
          continue;
        }
        if (propertySpecs.indexOf(b[a]) > -1) {
          // jump: the same key is also in prop tab
          continue;
        }
        // inputs.push(<div key={uuid.v4()}>{cssAttribute}</div>); // for test only, NONE USE
        /*
        list css key
         */
        inputs.push(<FormInputField
          key={uuid.v4()}
          showLable
          fieldName={b[a]}
          fieldSpec={styleSpecs[b[a]]}
          /*
          use state value first, if three value are undefined,
          then 'FormInputField' will use CSS spec default value

          state value is reset by user
          props value is component init created
          propertyspec is component default value
           */
          fieldSetPropValue={
            (this.state.style[b] && this.state.style[b[a]]) || (props.style && props.style[b[a]]) ||
            (propertyStyleSpecs &&
              propertyStyleSpecs[classifyName] && propertyStyleSpecs[classifyName][b[a]])
          }
          handleChanged={handleChanged}
        />);
        // remove listed
        if (b[a] in this.advancedStyle) {
          delete this.advancedStyle[b[a]];
        }
      }
      inputsWithGroup.push(<div key={uuid.v4()} style={cssStyles.groupAttribute}>{inputs}</div>);
    }
    // add ACE editor
    inputsWithGroup.push(<div key={uuid.v4()} style={cssStyles.groupTitle}>
      Advanced JSS
    </div>);
    inputsWithGroup.push(<div key={uuid.v4()} style={cssStyles.groupAttribute}>
      {this.getCssAceEditor()}
    </div>);

    return inputsWithGroup;
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
    const {
      selectedStencil,
      stencilEditorDrawerOpen2,
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
        stencilPropsStyle: fromJS(this.state.style).mergeDeep(this.state.advancedStyle),
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
        stencilEditorDrawerOpen2 === false || selectedStencil.extension.style === false
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

StylesForm.displayName = 'StylesForm';

StylesForm.propTypes = {
  selectedStencil: PropTypes.object.isRequired,
  stencilEditorDrawerOpen2: PropTypes.bool.isRequired,
  handleApplyBtn: PropTypes.func,
  handleCollapseBtn: PropTypes.func,
};

StylesForm.defaultProps = {
  selectedStencil: {},
  stencilEditorDrawerOpen2: false,
  handleApplyBtn: () => {},
  handleCollapseBtn: () => {},
};

export default StylesForm;
