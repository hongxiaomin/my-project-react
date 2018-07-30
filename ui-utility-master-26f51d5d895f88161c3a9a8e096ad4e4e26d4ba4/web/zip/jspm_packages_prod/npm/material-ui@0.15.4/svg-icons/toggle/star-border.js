/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _pure = require('recompose/pure');
var _pure2 = _interopRequireDefault(_pure);
var _SvgIcon = require('../../SvgIcon/index');
var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var ToggleStarBorder = function ToggleStarBorder(props) {
  return _react2.default.createElement(_SvgIcon2.default, props, _react2.default.createElement('path', {d: 'M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'}));
};
ToggleStarBorder = (0, _pure2.default)(ToggleStarBorder);
ToggleStarBorder.displayName = 'ToggleStarBorder';
ToggleStarBorder.muiName = 'SvgIcon';
exports.default = ToggleStarBorder;
