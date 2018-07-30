import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
/**
 * produce tag name for component
 * @param  {[type]} options.model                   [description]
 * @param  {[type]} options.editPropHelperClassName [description]
 * @param  {[type]} options.self                    [description]
 * @return {[type]}                                 [description]
 */
const tagNameElement = ({ model, editPropHelperClassName, self }) => {
  const tagName = uuid.v4();
  const baseColor = '#ffeb3b';
  const elementStyle = {
    fontSize: 14,
    position: 'absolute',
    backgroundColor: baseColor,
    zIndex: 9999, // use this value to overlay AppBar z-index
    paddingLeft: 4,
    paddingRight: 4,
  };
  const triangleCSS = `
    position: absolute;
    content: '';
    width: 0px;
    height: 0px;
    border-color: ${baseColor} transparent transparent transparent;
    border-style: solid solid solid solid;border-width: 17px 17px 0px 0px;
    right: -17px;`;

  /*
  because parent modify event behavior,

  so if want to control dbclick & other event,
  have to take care of parent event with event.stopPropagation();
  ex: const _onMouseDown = (event) => {event.stopPropagation();};
   */
  const _onMouseDown = (event) => {
    event.stopPropagation();
  };
  const _onDoubleClick = () => self.onDoubleClick(model.id);

  return (
    <div
      id={tagName}
      key={uuid.v4()}
      style={elementStyle}
      onMouseDown={_onMouseDown}
      onDoubleClick={_onDoubleClick}
    >
      {model.alias}
      <style>
        {`.${editPropHelperClassName} [id="${tagName}"] {opacity:0;}`}
        {`.${editPropHelperClassName} [id="${tagName}"]:after {${triangleCSS}}`}
        {`.${editPropHelperClassName}:hover [id="${tagName}"] {opacity: 0.85;}`}
      </style>
    </div>
  );
};
tagNameElement.propTypes = {
  model: PropTypes.object.isRequired,
  editPropHelperClassName: PropTypes.string.isRequired,
  self: PropTypes.object.isRequired,
};
/**
 * produce prop edting button
 * @param  {[type]} options.model [description]
 * @param  {[type]} options.self  [description]
 * @return {[type]}               [description]
 */
const editPropsBtnElement = ({ model, self }) => {
  /*
  create editor btn
   */
  const componentHeight = model.props.height ?
    model.props.height :
    model.props.style && model.props.style.height;
  const componentWidth = model.props.width ?
    model.props.width :
    model.props.style && model.props.style.width;

  const styles = {
    sensingArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: `${componentHeight}px`,
      width: `${componentWidth}px`,
    },
    floatingActionButton: {
      position: 'absolute',
      top: `${componentHeight - 40 - 8}px`, // 40 is icon size, 8 is padding
      right: 8,
    },
    floatingActionButtonBackgroundColor: '#fff',
    floatingActionButtonIcon: {
      fill: '#555',
    },
  };
  /*
  event handler: onDoubleClick
   */
  const onDoubleClick = (clickId) => (event) => {
    event.stopPropagation();
    // this.props.openStencilEditorDrawer(clickId);
    self.props.openStencilEditorDrawer2(clickId);
    self.setState({ isDbSelected: true });
    self.props.setDoubleSelectedStencil(clickId);
  };

  return (
    <div key={uuid.v4()} style={ styles.sensingArea } id={model.id} >
      <FloatingActionButton
        mini
        backgroundColor={styles.floatingActionButtonBackgroundColor}
        style={styles.floatingActionButton}
        data-tip={`Edit ${model.name} props`}
        data-for="floatingEditPropBtnWithToolip"
        iconStyle={styles.floatingActionButtonIcon}
        children={<ModeEdit />}
        /*
        react-tap-event-plugin provides onTouchTap() = onClick()
        http://www.material-ui.com/v0.18.7/#/get-started/installation
        by Mavis help
         */
        onTouchTap={onDoubleClick(model.id)}
      />
      <ReactTooltip id="floatingEditPropBtnWithToolip" effect="float" />
      <style>
        {`[id="${model.id}"] {opacity:0;}`}
        {`[id="${model.id}"]:hover {opacity:1;}`}
      </style>
    </div>
  );
};
editPropsBtnElement.propTypes = {
  model: PropTypes.object.isRequired,
  self: PropTypes.object.isRequired,
};

/**
 * create a helper operation for editing component
 * @param  {[type]} options.model                   [description]
 * @param  {[type]} options.self                    [description]
 * @param  {[type]} options.editPropHelperClassName [description]
 * @return {[type]}                                 [description]
 */
export default ({ model, self, editPropHelperClassName }) => {
  const helperElement = (
    <div key={uuid.v4()}>
      {tagNameElement({ model, editPropHelperClassName, self })}
      {
        model.namespace === 'native' &&
        model.name === 'iframe' &&
        editPropsBtnElement({ model, self })}
    </div>
  );

  return helperElement;
};
