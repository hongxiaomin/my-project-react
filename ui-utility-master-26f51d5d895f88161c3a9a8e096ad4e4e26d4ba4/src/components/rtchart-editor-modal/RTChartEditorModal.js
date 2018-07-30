import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LightBulb from 'material-ui/svg-icons/action/lightbulb-outline';
import ColorPickerTextField from '../color-picker-textfield';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import PaletteIcon from 'material-ui/svg-icons/image/color-lens';
import MinusOne from 'material-ui/svg-icons/content/remove-circle-outline';
import {
  RTCHART_LABEL_POSITION,
  RTCHART_OPTIONAL_FIELDS, RTCHART_REQUIRED_FIELDS,
  GAUGE_OPTIONAL_FIELDS, GAUGE_REQUIRED_FIELDS,
} from '../../constants/config';
import styles from './rtchartEditorModalStyles';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

const DefaultTextField = props => (
  <TextField floatingLabelFixed style={styles.textField} inputStyle={styles.text}
    floatingLabelStyle={styles.floatingLabel} type="text" {...props}
  />
);

export default class RTChartEditorModal extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTransformerChange = this.onTransformerChange.bind(this);
    this.state = {
      type: '',
      dataTransformer: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const { props } = nextProps.selectedStencil;
    if (nextProps.rtchartEditorModalOpen && !this.props.rtchartEditorModalOpen) {
      Object.assign(props.dataTransformer, { fields: props.dataTransformer.fields.join(',') });
      this.setState({
        type: props.chart.data.type,
        dataTransformer: props.dataTransformer,
      });
    }
  }

  onCancel = () => {
    this.props.closeRTChartEditorModal();
    this.setState({
      type: '',
      dataTransformer: {},
    });
  }

  onSubmit = () => {
    const { props, id } = this.props.selectedStencil;
    const { dataTransformer, type } = this.state;
    const { fields, yLines, max, min, arcWidth, colorLevels } = dataTransformer;
    Object.assign(props, { dataTransformer });
    Object.assign(props.dataTransformer, { fields: this.handleSpace(fields) });
    if (type !== 'gauge') {
      Object.assign(props.dataTransformer, { yLines: this.stringToNumber(yLines) });
    } else {
      Object.assign(props.dataTransformer, this.stringToNumber({ max, min, arcWidth }));
      Object.assign(props.dataTransformer, { colorLevels: this.stringToNumber(colorLevels) });
    }
    this.props.onDataTransformerFormSubmit(id, props, type);
    this.props.closeRTChartEditorModal();
    this.setState({
      type: '',
      dataTransformer: {},
    });
  }

  onChange = (key, index, type) => (event, idx, value) => {
    if (type === 'axes' && key === 'position') {
      this.state.dataTransformer[type][index][key] = value;
    } else if (index !== undefined) {
      this.state.dataTransformer[type][index][key] = event.target.value;
    } else {
      this.state.dataTransformer[key] = event.target.value;
    }
    this.setState(
      this.state.dataTransformer
    );
  }

  /**
   * color change for color picker event
   * @param  {Any} key
   * @param  {Number} index
   * @param  {String} type
   * @param  {Object} color
   * @param  {Object} event
   */
  onColorChange = (key, index, type) => (color) => {
    const hex = color.hex;

    if (index !== undefined) {
      this.state.dataTransformer[type][index][key] = hex;
    } else {
      this.state.dataTransformer[key] = hex;
    }
    this.setState(
      this.state.dataTransformer
    );
  }

  onTransformerChange(value) {
    this.state.dataTransformer.transformer = value;
    this.setState(
      this.state.dataTransformer
    );
  }

  // parse 'max', 'min', 'value', 'arcWidth' to number
  stringToNumber(beforeParsed) {
    let afterParsed;
    if (!Array.isArray(beforeParsed)) {
      afterParsed = {};
      for (const key in beforeParsed) {
        if (isNaN(parseFloat(beforeParsed[key]))) {
          afterParsed[key] = '';
        } else {
          afterParsed[key] = parseFloat(beforeParsed[key]);
        }
      }
    } else {
      const shouldBeNumber = ['max', 'min', 'value'];
      afterParsed = beforeParsed;
      for (let i = 0; i < afterParsed.length; i++) {
        const yLineKeys = Object.keys(afterParsed[i]);
        for (let j = 0; j < yLineKeys.length; j++) {
          if (shouldBeNumber.indexOf(yLineKeys[j]) > -1) {
            afterParsed[i][yLineKeys[j]] = parseFloat(afterParsed[i][yLineKeys[j]]);
            if (isNaN(afterParsed[i][yLineKeys[j]])) {
              afterParsed[i][yLineKeys[j]] = '';
            }
          }
        }
      }
    }
    return afterParsed;
  }

  deleteColorLevel = (index) => () => {
    this.state.dataTransformer.colorLevels.splice(index, 1);
    this.setState(
      this.state.dataTransformer
    );
  }

  addNewColorLevel = () => {
    const emptyColorLevel = { value: '', color: '' };
    this.state.dataTransformer.colorLevels.push(emptyColorLevel);
    this.setState(
      this.state.dataTransformer
    );
  }

  handleSpace(fields) {
    const fieldsArray = fields.split(',');
    if (this.state.type === 'gauge') {
      fieldsArray.map((field) => field.trim());
      fieldsArray.splice(1);
      return fieldsArray;
    }
    return fieldsArray.map((field) => field.trim());
  }

  isEmpty(value, key, chartType) {
    if (value === undefined || value.length === 0 ||
      value.toString().replace(/\s/g, '').length === 0) {
      return { style: styles.errorStyle, hint: '* required' };
    } else if (key === 'fields' && chartType === 'gauge') {
      return { style: styles.hintStyle,
        hint: 'Gauge Chart only shows one data, ex: car' };
    } else if (key === 'fields') {
      return { style: styles.hintStyle,
        hint: 'Use commas to separate names, ex: car,bus,truck' };
    }
    return false;
  }

  render() {
    const { dataTransformer, type } = this.state;
    const {
      fields, topic, transformer,               // basic, for every RTChart
      max, min, units, arcWidth, colorLevels,   // for Gauge
      yLines, axes,                             // for other else
    } = dataTransformer;
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

    return (
      <Dialog
        actions={actions}
        modal={false}
        onRequestClose={this.onCancel}
        open={this.props.rtchartEditorModalOpen}
        autoScrollBodyContent
        contentStyle={{ width: '70%', maxWidth: 'none' }}
      >
        {Object.keys(dataTransformer).length !== 0 &&
          <div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 40 }}>
                <div style={{ marginTop: 5, display: 'flex' }}>
                  <DefaultTextField floatingLabelText="Topic Name"
                    floatingLabelStyle={styles.singleFloatingLabel}
                    autoFocus value={topic}
                    onChange={this.onChange('topic')}
                    errorText={this.isEmpty(topic, 'topic').hint}
                    errorStyle={styles.errorStyle}
                  />
                </div>
                <div style={{ marginTop: 5 }}>
                  <DefaultTextField floatingLabelText="Field Name"
                    floatingLabelStyle={styles.singleFloatingLabel}
                    value={fields}
                    onChange={this.onChange('fields')}
                    errorText={this.isEmpty(fields, 'fields', type).hint}
                    errorStyle={this.isEmpty(fields, 'fields', type).style}
                  />
                </div>
                <div style={{ marginTop: -25 }}>
                  <h3 style={styles.h3Text}>Transformer Function</h3>
                  <AceEditor
                    mode="javascript"
                    theme="tomorrow"
                    fontSize={16}
                    style={styles.aceEditor}
                    value={transformer.toString()}  // need string when load JSON
                    onChange={this.onTransformerChange}
                    editorProps={{ $blockScrolling: true }}
                  />
                </div>
              </div>
              {type === 'gauge' &&
                <div style={{ flex: 1, marginTop: 5, marginLeft: 5 }}>
                  <div>
                    <Subheader style={styles.subheader}>Bound</Subheader>
                    <div style={styles.twinTextFieldContainer}>
                      <DefaultTextField floatingLabelText="Max"
                        value={max} style={styles.twinTextField}
                        onChange={this.onChange('max')}
                        errorText={this.isEmpty(max).hint}
                        errorStyle={this.isEmpty(max).style}
                      />
                      <DefaultTextField floatingLabelText="Min"
                        value={min} style={styles.twinTextField}
                        onChange={this.onChange('min')}
                        errorText={this.isEmpty(min).hint}
                        errorStyle={this.isEmpty(min).style}
                      />
                    </div>
                  </div>
                  <div>
                    <Subheader style={styles.subheader}>Unit & Arc Width</Subheader>
                    <div style={styles.twinTextFieldContainer}>
                      <DefaultTextField floatingLabelText="Unit"
                        value={units}
                        style={styles.twinTextField}
                        onChange={this.onChange('units')}
                      />
                      <DefaultTextField floatingLabelText="Arc Width"
                        value={arcWidth}
                        style={styles.twinTextField}
                        onChange={this.onChange('arcWidth')}
                      />
                    </div>
                  </div>
                  {colorLevels !== undefined && colorLevels.map((colorLevel, index) =>
                    <div key={index} style={{ marginTop: -10 }}>
                      <Subheader style={styles.colorLevelSubheader}>
                        {`Color Level ${index + 1}`}
                      </Subheader>
                      <div style={styles.textFieldContainerWithIcons}>
                        <DefaultTextField floatingLabelText="Value below"
                          value={colorLevel.value} style={styles.twinTextField}
                          onChange={this.onChange('value', index, 'colorLevels')}
                          errorText={this.isEmpty(colorLevels[index].value).hint}
                          errorStyle={this.isEmpty(colorLevels[index].value).style}
                        />
                        <ColorPickerTextField
                          TextField={
                            <DefaultTextField floatingLabelText="Color"
                              value={colorLevel.color}
                              onChange={this.onChange('color', index, 'colorLevels')}
                              style={styles.twinTextFieldNoMargin}
                            />
                          }
                          colorValue={colorLevel.color}
                          onChange={this.onColorChange('color', index, 'colorLevels')}
                        />
                        {colorLevels.length > 1 &&
                          <IconButton iconStyle={{ fill: 'green' }} tooltipPosition="top-left"
                            tooltip="delete this color level"
                            style={{ marginLeft: 2, marginTop: 30 }}
                            onTouchTap={this.deleteColorLevel(index)}
                          >
                            <MinusOne />
                          </IconButton>}
                      </div>
                    </div>
                  )}
                  <RaisedButton primary icon={<PaletteIcon />}
                    style={{ marginLeft: 20, borderRadius: 5, width: 310, marginTop: 13 }}
                    label="Add New Color Level" labelPosition="before"
                    onTouchTap={this.addNewColorLevel}
                  />
                </div>
              }
              {type !== 'gauge' &&
                <div style={{ flex: 1, marginTop: 5, marginLeft: 5 }}>
                  {axes.map((axis, index) => {
                    const axisKeys = Object.keys(axis);
                    return (
                      <div key={index}>
                        <Subheader style={styles.subheader}>{`${axis.type} Label`}</Subheader>
                        <div style={styles.twinTextFieldContainer}>
                          <DefaultTextField floatingLabelText={axisKeys[1]}
                            value={axis[axisKeys[1]]}
                            style={styles.twinTextField}
                            onChange={this.onChange(axisKeys[1], index, 'axes')}
                          />
                          <SelectField floatingLabelText={axisKeys[2]}
                            floatingLabelStyle={styles.floatingLabel}
                            value={axis[axisKeys[2]]}
                            style={styles.twinTextField}
                            onChange={this.onChange(axisKeys[2], index, 'axes')}
                          >
                            {RTCHART_LABEL_POSITION[axis.type].map((position, idx) =>
                              <MenuItem key={idx} value={position} primaryText={position} />
                            )}
                          </SelectField>
                        </div>
                      </div>
                    );
                  })}
                  {yLines.map((yLine, index) => {
                    const yLineKeys = Object.keys(yLine);
                    return (
                      <div key={index} style={{ marginTop: -10 }}>
                        <Subheader style={styles.subheader}>{yLine.type}</Subheader>
                        <div style={styles.twinTextFieldContainer}>
                          <DefaultTextField floatingLabelText={yLineKeys[1]}
                            hintText={/Bound/ig.test(yLine.type) ? yLine.type : ''}
                            hintStyle={styles.boundHintStyle}
                            value={yLine[yLineKeys[1]]}
                            style={styles.twinTextField}
                            onChange={this.onChange(yLineKeys[1], index, 'yLines')}
                          />
                          <DefaultTextField floatingLabelText={yLineKeys[2]}
                            value={yLine[yLineKeys[2]]}
                            style={styles.twinTextField}
                            onChange={this.onChange(yLineKeys[2], index, 'yLines')}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              }
            </div>
            <Divider style={{ marginLeft: 20, marginTop: 20 }} />
            <div>
              <div style={{ marginLeft: 20, marginTop: 15, display: 'flex' }}>
                <LightBulb color="green" />
                <h3 style={styles.hintText}>Hint</h3>
                <LightBulb color="green" />
              </div>
              <div style={{ marginLeft: 20 }}>
                <ul>
                  <li style={styles.hintListItem}>
                    Before getting started here,
                    <span style={styles.hintRed}> please go to set up the MQTT first</span>,
                    which is the gear button on the top-right corner of appbar
                  </li>
                  <li style={styles.hintListItem}>
                    {type === 'gauge' ?
                      GAUGE_REQUIRED_FIELDS : RTCHART_REQUIRED_FIELDS} are
                    <span style={styles.hintRed}> ALL required</span>
                  </li>
                  <li style={styles.hintListItem}>
                    {type === 'gauge' ?
                      GAUGE_OPTIONAL_FIELDS : RTCHART_OPTIONAL_FIELDS} are not required,
                    leave the input field empty if you don't need them
                  </li>
                  <li style={styles.hintListItem}>
                    The data format expected by RTChart should be an object like:
                  </li>
                  <pre style={styles.hintCode}>{`
                    {
                      date: 1486099482,  // can be new Date() or timestamp
                      europe: 100,
                      asia: 200,
                      africa: 300,
                      ... more data
                    }
                    `}</pre>
                  <li style={{ marginBottom: 0, marginTop: -20 }}>
                    <span style={styles.hintRed}>The data name inside data
                     object should be the same as Field Name</span>,
                    take data object above as example, the Field Name should be
                    {type === 'gauge' ?
                      ' either europe or asia or africa' :
                      <span style={styles.hintItalic}> europe,asia,africa</span>}
                  </li>
                  <li style={styles.hintListItem}>
                    If the data returned from mqtt is valid JSON string,
                    it will be parsed to object for Transformer Function
                  </li>
                  <li style={{ marginTop: 15 }}>
                    If the data returned from mqtt does not match the requirement of RTChart,
                    write your own Transformer Function,
                    and please start Transformer Function based on this:
                    <pre style={styles.hintCode}>{`
                    function transformer(data) {
                      if (data !== undefined) {
                        ...
                        return ...;
                      }
                    }
                    `}</pre>
                    otherwise, the Transformer Function should just return the mqtt data, like:
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
          </div>
        }
      </Dialog>
    );
  }
}

RTChartEditorModal.propTypes = {
  rtchartEditorModalOpen: PropTypes.bool.isRequired,
  closeRTChartEditorModal: PropTypes.func.isRequired,
  onDataTransformerFormSubmit: PropTypes.func.isRequired,
  selectedStencil: PropTypes.object.isRequired,
};
