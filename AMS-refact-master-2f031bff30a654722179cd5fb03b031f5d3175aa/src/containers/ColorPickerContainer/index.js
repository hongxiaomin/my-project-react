/**
fileName    : index.js
writer      : Chuck Wu
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import ColorPicker from '../../components/ColorPicker';
import {
  onColorPickerInitial,
  onColorPickerPisplay,
  onColorPickerChange } from '../../actions/UIAction';
import { onFormDataChange } from '../../actions/FormAction';
import { GUID } from '../../utils/Common';
import {
  colorPickerName,
  UIName,
  displayColorPickerName,
  colorName,
  hiddenColorPicker,
  showColorPicker } from '../../constants/Config';

const mapStateToProps = state => ({
  state,
});
const mapDispatchToProps = (dispatch, props) => {
  const id = GUID();
  return {
    id,
    onInitial: (() => {
      dispatch(onColorPickerInitial({
        id,
        formName: props.formName ? props.formName : colorPickerName,
        name: props.name,
        displayColorPicker: hiddenColorPicker }));
    })(),
    onColorPickerShow: () => dispatch(onColorPickerPisplay({
      id,
      displayColorPicker: showColorPicker })),
    onColorPickerClose: () => dispatch(onColorPickerPisplay({
      id,
      displayColorPicker: hiddenColorPicker })),
    onColorPickerChange: (color) => {
      dispatch(onFormDataChange({
        formName: props.formName ? props.formName : colorPickerName,
        name: props.name,
        value: color.hex.replace('#', '') }));
      dispatch(onColorPickerChange({
        id,
        color: color.rgb,
      }));
    },
  };
};
const mergeProps = (stateProps, dispatchProps) => ({
  displayColorPicker: stateProps.state.getIn([UIName, dispatchProps.id, displayColorPickerName]),
  color: stateProps.state.getIn([UIName, dispatchProps.id, colorName]),
  ...dispatchProps,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ColorPicker);
