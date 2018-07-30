import React from 'react';
import * as svgIcons from 'material-ui/svg-icons';

// load -> string to function
// save -> function to string
// if already string and save, no need to convertType
// or will be transferred to function, then cannot be saved to JSON, prop missing
function convertType(prop, saveOrLoad) {
  let result = prop;
  if (typeof(prop) === 'string' && saveOrLoad === 'load') {
    result = eval(`(${prop})`);
  } else if (typeof(prop) === 'function' && saveOrLoad === 'save') {
    result = prop.toString();
  }
  return result;
}

export default (pages, saveOrLoad) => {
  for (let i = 0; i < pages.length; i++) {
    const stencils = pages[i].stencils;
    const stencilKeys = Object.keys(stencils);
    for (let j = 0; j < stencilKeys.length; j++) {
      const stencil = stencils[stencilKeys[j]];
      const { namespace, name, props } = stencil;
      // FloatingActionButton and IconButton with icon will have props.children
      // render the icon by the third parameter of React.createElement, delete props.children
      delete props.children;

      switch (name) {
        case 'RTChart':
          props.dataTransformer.transformer =
            convertType(props.dataTransformer.transformer, saveOrLoad);
          if (props.chart.data.type === 'gauge') {
            props.chart.gauge.label.format =
              convertType(props.chart.gauge.label.format, saveOrLoad);
          } else {
            props.chart.tooltip.format.value =
              convertType(props.chart.tooltip.format.value, saveOrLoad);
          }
          break;
        case 'AreaChart':
        case 'BarChart':
        case 'ComposedChart':
        case 'LineChart':
        case 'PieChart':
        case 'RadarChart':
        case 'RadialBarChart':
        case 'ScatterChart':
          props.dataTransformer.transformer =
            convertType(props.dataTransformer.transformer, saveOrLoad);
          break;
        case 'Pie':
        case 'Scatter':
          props.transformer = convertType(props.transformer, saveOrLoad);
          break;
        case 'DatePicker':
          if (typeof(props.defaultDate) === 'string') {
            props.defaultDate = new Date(props.defaultDate);
          }
          if (typeof(props.maxDate) === 'string') {
            props.maxDate = new Date(props.maxDate);
          }
          if (typeof(props.minDate) === 'string') {
            props.minDate = new Date(props.minDate);
          }
          if (typeof(props.value) === 'string') {
            props.value = new Date(props.value);
          }
          break;
        case 'TimePicker':
          if (typeof(props.defaultTime) === 'string') {
            props.defaultTime = new Date(props.defaultTime);
          }
          if (typeof(props.value) === 'string') {
            props.value = new Date(props.value);
          }
          break;
        default:
          break;
      } // end switch
      /*
      if material-ui SvgIcon component series:
      convert the icon object (from createElement()) between its displayName (string)
      otherwise its icon info will miss or cannot show the icon

      Except for 'icons' component

      Avatar
      RaisedButton
      FlatButton
      ListItem
      ...
       */
      if (namespace !== 'icons') {
        for (const propKey in props) {
          if (/icon/ig.test(propKey)) {
            if (typeof(props[propKey]) === 'string') {
              props[propKey] = React.createElement(svgIcons[props[propKey]]);
            } else if (typeof(props[propKey]) === 'object') {
              props[propKey] = props[propKey].type.displayName;
            }
          }
        }// end for check icon
      }
    } // end for
  }
  return pages;
};
