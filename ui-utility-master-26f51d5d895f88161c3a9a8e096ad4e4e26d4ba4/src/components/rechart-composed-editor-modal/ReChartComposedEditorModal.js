import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import ChartIcon from 'material-ui/svg-icons/editor/insert-chart';
import MinusOne from 'material-ui/svg-icons/content/remove-circle-outline';
import ColorPickerTextField from '../color-picker-textfield';
import { RECHART_CURVE_TYPE, RECHART_BASIC_TYPE } from '../../constants/config';
import { renderRechartInCommon } from '../../utils';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import styles from './rechartComposedEditorModalStyles';
const { getHint, getTransformerEditor,
  getURLInput, getActionButtons, isEmpty } = renderRechartInCommon;

const DefaultTextField = props => (
  <TextField floatingLabelFixed style={styles.twinTextField} inputStyle={styles.text}
    floatingLabelStyle={styles.floatingLabel} type="text" {...props}
  />
);

DefaultTextField.propTypes = {
  needLeftSpace: PropTypes.bool,
};

const DefaultSelectField = props => (
  <SelectField style={styles.twinTextField} floatingLabelStyle={styles.singleFloatingLabel}
    menuStyle={{ marginTop: 20 }} {...props}
  />
);

export default class ReChartComposedEditorModal extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTransformerChange = this.onTransformerChange.bind(this);
    this.state = {
      dataTransformer: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const { props } = nextProps.selectedStencil;
    if (nextProps.rechartEditorModalOpen && !this.props.rechartEditorModalOpen) {
      this.setState({
        dataTransformer: props.dataTransformer,
      });
    }
  }

  onCancel = () => {
    this.props.closeReChartEditorModal();
    this.setState({
      dataTransformer: {},
    });
  }

  onSubmit = () => {
    const { props, id } = this.props.selectedStencil;
    Object.assign(props, { dataTransformer: this.state.dataTransformer });
    this.props.onDataTransformerFormSubmit(id, props);
    this.props.closeReChartEditorModal();
    this.setState({
      dataTransformer: {},
    });
  }

  onSelectFieldChange = (key, idx, type) => (event, index, value) => {
    if (key === 'type' && value !== 'Bar') {
      delete this.state.dataTransformer[type][idx].labelPosition;
      this.state.dataTransformer[type][idx].curveType = 'monotone';
    } else if (key === 'type' && value === 'Bar') {
      delete this.state.dataTransformer[type][idx].curveType;
      this.state.dataTransformer[type][idx].labelPosition = 'inner';
    }
    this.state.dataTransformer[type][idx][key] = value;
    this.setState(
      this.state.dataTransformer
    );
  }

  onChange = (key, index, type) => (event, isChecked) => {
    if (key === 'legend') {
      this.state.dataTransformer[key] = isChecked;
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

  deleteSeries = (index) => () => {
    this.state.dataTransformer.series.splice(index, 1);
    this.setState(
      this.state.dataTransformer
    );
  }

  addNewSeries = () => {
    const emptySeries = { type: 'Area', key: '', curveType: 'monotone', color: '' };
    this.state.dataTransformer.series.push(emptySeries);
    this.setState(
      this.state.dataTransformer
    );
  }

  render() {
    const { chartType } = this.props;
    const { url, transformer, legend, xAxisKey, series, axes } = this.state.dataTransformer;

    return (
      <Dialog
        actions={getActionButtons(url, this.onCancel, this.onSubmit)}
        modal={false}
        onRequestClose={this.onCancel}
        open={this.props.rechartEditorModalOpen}
        autoScrollBodyContent
        contentStyle={{ width: '80%', maxWidth: 'none' }}
      >
        {Object.keys(this.state.dataTransformer).length !== 0 &&
          <div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                {getURLInput(url, this.onChange)}
                <div style={{ marginTop: 5, display: 'flex' }}>
                  <DefaultTextField floatingLabelText="xAxisKey" style={styles.twinTextField}
                    value={xAxisKey} floatingLabelStyle={styles.singleFloatingLabel}
                    onChange={this.onChange('xAxisKey')}
                    errorText={isEmpty(xAxisKey).hint}
                    errorStyle={isEmpty(xAxisKey).style}
                  />
                  <div style={{ marginTop: 35, marginLeft: -5, width: 180 }}>
                    <Checkbox
                      label={'Show Legend'} checked={legend} onCheck={this.onChange('legend')}
                    />
                  </div>
                </div>
                <div style={{ marginLeft: -20, marginTop: -5 }}>
                  <Subheader style={styles.subheader}>axes Label</Subheader>
                  <div style={styles.textFieldContainerWithIcons}>
                    <DefaultTextField floatingLabelText={axes[0].type}
                      value={axes[0].text}
                      style={styles.twinTextField}
                      onChange={this.onChange('text', 0, 'axes')}
                    />
                    <DefaultTextField floatingLabelText={axes[1].type}
                      value={axes[1].text}
                      style={styles.twinTextField}
                      onChange={this.onChange('text', 1, 'axes')}
                    />
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, marginTop: 5 }}>
                {series !== undefined && series.map((aSeries, index) =>
                  <div key={index} style={{ marginLeft: 30 }}>
                    <Subheader style={styles.subheader}>{`Series ${index + 1}`}</Subheader>
                    <div style={styles.textFieldContainerWithIcons}>
                      <DefaultSelectField floatingLabelText="Chart Type"
                        value={aSeries.type}
                        onChange={this.onSelectFieldChange('type', index, 'series')}
                      >
                        {Object.values(RECHART_BASIC_TYPE).map((type, i) =>
                          <MenuItem key={i} value={type} primaryText={type} />
                        )}
                      </DefaultSelectField>
                      <DefaultTextField floatingLabelText="Key"
                        value={aSeries.key} style={styles.quadTextField}
                        onChange={this.onChange('key', index, 'series')}
                        errorText={isEmpty(series[index].key).hint}
                        errorStyle={isEmpty(series[index].key).style}
                      />
                      {aSeries.curveType !== undefined &&
                        <DefaultSelectField floatingLabelText="Curve Type" value={aSeries.curveType}
                          onChange={this.onSelectFieldChange('curveType', index, 'series')}
                        >
                          {RECHART_CURVE_TYPE.map((type, i) =>
                            <MenuItem key={i} value={type} primaryText={type} />
                          )}
                        </DefaultSelectField>
                      }
                      {aSeries.labelPosition !== undefined &&
                        <DefaultSelectField floatingLabelText="Label Position"
                          value={aSeries.labelPosition}
                          onChange={this.onSelectFieldChange('labelPosition', index, 'series')}
                        >
                          <MenuItem key={0} value={'inner'} primaryText={'inner'} />
                          <MenuItem key={1} value={'outer'} primaryText={'outer'} />
                        </DefaultSelectField>
                      }
                      <ColorPickerTextField
                        TextField={
                          <DefaultTextField floatingLabelText="Color"
                            value={aSeries.color}
                            onChange={this.onChange('color', index, 'series')}
                            style={styles.quadTextField}
                          />
                        }
                        colorValue={aSeries.color}
                        onChange={this.onColorChange('color', index, 'series')}
                      />
                      {series.length > 1 &&
                        <IconButton iconStyle={{ fill: 'green' }} tooltipPosition="top-left"
                          tooltip="delete this series" style={{ marginLeft: 2, marginTop: 30 }}
                          onTouchTap={this.deleteSeries(index)}
                        >
                          <MinusOne />
                        </IconButton>}
                    </div>
                  </div>
                )}
                <RaisedButton primary icon={<ChartIcon />}
                  style={{ marginLeft: 50, borderRadius: 5, width: 310, marginTop: 15 }}
                  label="Add New Series" labelPosition="before"
                  onTouchTap={this.addNewSeries}
                />
              </div>
            </div>
            {getTransformerEditor(transformer, this.onTransformerChange)}
            {getHint(chartType)}
          </div>
        }
      </Dialog>
    );
  }
}

ReChartComposedEditorModal.propTypes = {
  rechartEditorModalOpen: PropTypes.bool.isRequired,
  closeReChartEditorModal: PropTypes.func.isRequired,
  onDataTransformerFormSubmit: PropTypes.func.isRequired,
  chartType: PropTypes.string,
  selectedStencil: PropTypes.object.isRequired,
};
