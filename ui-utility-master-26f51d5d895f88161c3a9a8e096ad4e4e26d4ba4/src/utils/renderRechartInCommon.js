import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import LightBulb from 'material-ui/svg-icons/action/lightbulb-outline';
import addUnitStencil from './addUnitStencil';
import { RECHART_REQUIRED_FIELDS, RECHART_EXPECTED_FORMAT } from '../constants/config';

const styles = {
  aceEditor: {
    height: 240,
    width: 750,
    marginTop: -10,
  },
  h3Text: {
    textAlign: 'left',
    color: '#0087dc',
    fontWeight: 400,
  },
  hintText: {
    color: 'red',
    marginTop: 3,
    marginBottom: 0,
    marginLeft: 5,
    marginRight: 5,
  },
  hintListItem: {
    arginBottom: 0,
    marginTop: 10,
  },
  hintRed: {
    color: 'red',
  },
  hintBold: {
    fontWeight: 'bold',
  },
  hintCode: {
    marginTop: 0,
    color: 'green',
  },
  textField: {
    color: 'black',
    height: 80,
    width: 310,
  },
  singleFloatingLabel: {
    fontSize: 22,
    color: '#0087dc',
  },
  errorStyle: {
    fontSize: 14,
  },
  hintStyle: {
    color: 'green',
    fontSize: 14,
    width: 370,
  },
  label: {
    fontWeight: 'bold',
  },
};

const DefaultTextField = props => (
  <TextField floatingLabelFixed style={styles.twinTextField} inputStyle={styles.text}
    floatingLabelStyle={styles.floatingLabel} type="text" {...props}
  />
);

DefaultTextField.propTypes = {
  needLeftSpace: PropTypes.bool,
};

function _getHintOfKey(chartType) {
  const key = ' the xAxisKey and the key of each series';
  const hint = ' page / uv / pv / amt';
  const chartHintKey = {
    AreaChart: { key, hint },
    BarChart: { key, hint },
    ComposedChart: { key, hint },
    LineChart: { key, hint },
    RadarChart: { key: ' Radar key and Angle key', hint: ' A / B / fullMark' },
    RadialBarChart: { key: ' dataKey', hint: ' employees / women / men' },
    ScatterChart: { key: ' the xAxisKey and yAxisKey', hint: ' uv / pv / amt' },
  };

  if (chartType !== 'PieChart') {
    return (
      <li style={{ marginBottom: 0, marginTop: -20 }}>
        <span style={styles.hintRed}>The key value should be the same as one of
        the object key of required data</span>, take data array above as example,
        {chartHintKey[chartType].key} can be one of
        <span style={styles.hintBold}>{chartHintKey[chartType].hint}</span>
      </li>
    );
  }
  return undefined;
}

function _getColorHint(chartType) {
  const type = `${chartType}WithColor`;
  return (
    <li style={styles.hintListItem}>
      If you want to specify color to each piece of data, the data format should be like:
      <pre style={styles.hintCode}>{RECHART_EXPECTED_FORMAT[type]}</pre>
    </li>
  );
}

function isEmpty(value, key) {
  if (value === undefined || value.length === 0 || value.replace(/\s/g, '').length === 0) {
    return {
      style: styles.errorStyle,
      hint: '* required',
    };
  } else if (key === 'url') {
    return {
      style: styles.hintStyle,
      hint: "ex: http://127.0.0.1:3000/students, don't forget http or https",
    };
  }
  return false;
}

// for ReChartBasicEditorModalContainer and ReChartComposedEditorModalContainer
function checkRemoveLegend(stencilName, currentLegend, deleteIdArray, legendId) {
  if (stencilName === 'Legend' && !currentLegend) {
    deleteIdArray.push(legendId);
  }
}

// for Pie/Radar/RadialBar/Scatter container
function checkDeleteLegend(stencilName, currentLegend, dispatch, deleteStencil, legendId) {
  if (stencilName === 'Legend' && !currentLegend) {
    dispatch(deleteStencil({ id: legendId }));
  }
}


function checkAddLegend(allChildrenName, currentLegend, dispatch, parentId) {
  if (allChildrenName.indexOf('Legend') === -1 && currentLegend) {
    addUnitStencil(dispatch, 're-Legend', parentId);
  }
}

function getActionButtons(url, onCancel, onSubmit) {
  return ([
    <FlatButton
      label="Cancel"
      primary
      labelStyle={styles.label}
      onTouchTap={onCancel}
    />,
    <FlatButton
      label="Submit"
      primary
      disabled={url === undefined || url.length === 0 || url.replace(/\s/g, '').length === 0}
      labelStyle={styles.label}
      onTouchTap={onSubmit}
    />,
  ]);
}

function getURLInput(url, onChange) {
  return (
    <div style={{ marginTop: 5, display: 'flex' }}>
      <DefaultTextField floatingLabelText="URL" style={styles.textField}
        autoFocus value={url} floatingLabelStyle={styles.singleFloatingLabel}
        onChange={onChange('url')}
        errorText={isEmpty(url, 'url').hint}
        errorStyle={isEmpty(url, 'url').style}
      />
    </div>
  );
}

function getTransformerEditor(transformer, onChange) {
  return (
    <div>
      <Divider style={{ marginLeft: 25, marginRight: 25, marginTop: 10 }} />
      <div style={{ marginLeft: 55, marginTop: -5 }}>
        <h3 style={styles.h3Text}>Transformer Function</h3>
        <AceEditor
          mode="javascript"
          theme="tomorrow"
          fontSize={16}
          style={styles.aceEditor}
          value={transformer.toString()}      // need string when load from JSON
          onChange={onChange}
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  );
}

function getHint(chartType) {
  return (
    <div>
      <Divider style={{ marginLeft: 25, marginTop: 20 }} />
      <div style={{ marginLeft: 20, marginTop: 15, display: 'flex' }}>
        <LightBulb color="green" />
        <h3 style={styles.hintText}>Hint</h3>
        <LightBulb color="green" />
      </div>
      <div style={{ marginLeft: 20 }}>
        <ul>
          <li style={styles.hintListItem}>
            {RECHART_REQUIRED_FIELDS[chartType]} are
            <span style={styles.hintRed}> ALL required</span>
          </li>
          {chartType === 'RadialBarChart' &&
            <li style={styles.hintListItem}>
              The data of RadialBarChart <span style={styles.hintRed}> MUST </span>
              have a <span style={styles.hintRed}> name</span> property, legend will show the value
            </li>
          }
          <li style={styles.hintListItem}>
            The data format expected by {chartType} should be an array of objects like:
          </li>
          <pre style={styles.hintCode}>{RECHART_EXPECTED_FORMAT[chartType]}</pre>
          {(chartType === 'PieChart' || chartType === 'RadialBarChart') && _getColorHint(chartType)}
          {_getHintOfKey(chartType)}
          <li style={styles.hintListItem}>
            The data returned from REST APIs should be valid JSON
          </li>
          <li style={{ marginTop: 15 }}>
            If the data returned from REST APIs does not match the
            requirement of {chartType}, write your own Transformer Function,
            and please start Transformer Function based on this:
            <pre style={styles.hintCode}>{`
            function transformer(data) {
              if (data !== undefined) {
                ...
                return ...;
              }
            }
            `}</pre>
            otherwise, the Transformer Function should just return the REST APIs data, like:
          </li>
          <pre style={styles.hintCode}>{`
            function transformer(data) {
              if (data !== undefined) {
                return data;
              }
            }
            `}</pre>
        </ul>
      </div>
    </div>
  );
}

export default {
  getHint, getTransformerEditor, getURLInput, getActionButtons,
  isEmpty, checkRemoveLegend, checkDeleteLegend, checkAddLegend,
};
