/* eslint jsx-a11y/label-has-for: off */
import React from 'react';
import FilterList from 'material-ui/svg-icons/content/filter-list';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import { IconButton, TableAction } from '@delta/common-utils';
import ExportFileTool from './ExportFileTool';
import DisplayColumnTool from './DisplayColumnTool';
import ExportFileFromServerTool from './ExportFileFromServerTool';
import './style.less';

const { onChangeData, onToggleFilter } = TableAction;
const textColor = (hex) => {
  if (hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return ((Math.round((r * 299) + (g * 587) + (b * 114)) / 1000) > 125) ?
      '#000000' :
      '#FFFFFF';
  }
  return null;
};
export const ProgressBar = (row) => {
  const bgColor = row.value > 66 ?
    '#85cc00' :
    row.value > 33 ? '#ffbf00' : '#ff2e00';
  return (
    <div className="retable-progress-bar">
      <div
        style={{
          width: `${row.value}%`,
          height: '100%',
          backgroundColor: bgColor,
          borderRadius: '2px',
          transition: 'all .2s ease-out',
          zIndex: 1,
        }}
      />
      <span className="text">
        {`${row.value}%`}
      </span>
    </div>
  );
};
export const ColorDiv = ({ color }) => (
  <div
    style={{
      width: '100%',
      height: 36,
      backgroundColor: '#fff',
      padding: '2.5px',
      borderRadius: '2px',
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: color,
        color: textColor(color),
        borderRadius: '2px',
        fontSize: '14px',
        textAlign: 'center',
        paddingTop: '5px',
        fontWeight: 'bolder',
      }}
    >
      <span>{color.toUpperCase()}</span>
    </div>
  </div>
);
export const CheckBoxCell = ({ checked, onChange }) => (
  <label>
    <input
      type="checkbox"
      checked={checked === 1}
      onChange={onChange}
      hidden
    />
    <i className="fa fa-square-o fa-fw" />
    <i className="fa fa-check-square-o fa-fw" />
  </label>
);
export const CheckBoxHeader = ({ checked, onChange }) => (
  <label>
    <input
      type="checkbox"
      checked={checked === 1}
      ref={(input) => { if (input) { input.indeterminate = checked === 2; } }}
      onChange={onChange}
      hidden
    />
    <i className="fa fa-square-o fa-fw" />
    <i className="fa fa-minus-square-o fa-fw" />
    <i className="fa fa-check-square-o fa-fw" />
  </label>
);
export const RefreshTool = ({
  tableName,
  tooltip: tooltip = 'Refresh',
  data,
  iconButtonStyle: iconButtonStyle = { height: '62px' },
  icon = <Refresh style={{ marginRight: 24 }} color="FFF" />,
}) => (
  <IconButton
    style={iconButtonStyle}
    tooltip={tooltip}
    onClientClick={(tools) => {
      const { getProps, trigger } = tools;
      const editableProps = getProps(tableName);
      trigger(onChangeData(data, editableProps));
    }}
  >
    {icon}
  </IconButton>
);
export const FilterTool = ({
  tableName,
  filterable,
  showFilter,
  tooltip: tooltip = 'Filter',
  iconButtonStyle: iconButtonStyle = { height: '62px' },
  icon = <FilterList style={{ marginRight: 24 }} color="FFF" />,
}) => (
  <IconButton
    style={iconButtonStyle}
    tooltip={tooltip}
    onClientClick={(tools) => {
      const { getProps, trigger } = tools;
      const editableProps = getProps(tableName);
      trigger(onToggleFilter(filterable, !showFilter, editableProps));
    }}
  >
    {icon}
  </IconButton>
);
export { DisplayColumnTool, ExportFileTool, ExportFileFromServerTool };
