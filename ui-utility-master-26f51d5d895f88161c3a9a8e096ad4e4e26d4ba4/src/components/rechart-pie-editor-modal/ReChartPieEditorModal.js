import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import ColorPickerTextField from '../color-picker-textfield';
import styles from './rechartPieEditorModalStyles';
import { RECHART_PIE_LABEL_POSITION } from '../../constants/config';
import { renderRechartInCommon } from '../../utils';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
const { getHint, getTransformerEditor, getURLInput, getActionButtons } = renderRechartInCommon;

const DefaultTextField = props => (
  <TextField floatingLabelFixed style={styles.twinTextField} inputStyle={styles.text}
    floatingLabelStyle={styles.floatingLabel} type="text" {...props}
  />
);

const DefaultSelectField = props => (
  <SelectField style={styles.twinTextField} floatingLabelStyle={styles.singleFloatingLabel}
    menuStyle={{ marginTop: 20 }} {...props}
  />
);

DefaultTextField.propTypes = {
  needLeftSpace: PropTypes.bool,
};

export default class ReChartPieEditorModal extends Component {
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

  onSelectFieldChange = (key) => (event, index, value) => {
    this.state.dataTransformer[key] = value;
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

  render() {
    const { chartType } = this.props;
    const {
      url, transformer, legend,   // for every rechart
      labelPosition, outerRadius, innerRadius, color,
    } = this.state.dataTransformer;

    return (
      <Dialog
        actions={getActionButtons(url, this.onCancel, this.onSubmit)}
        modal={false}
        onRequestClose={this.onCancel}
        open={this.props.rechartEditorModalOpen}
        autoScrollBodyContent
        contentStyle={{ width: '70%', maxWidth: 'none' }}
      >
        {Object.keys(this.state.dataTransformer).length !== 0 &&
          <div>
            <div style={{ display: 'flex', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 50 }}>
                {getURLInput(url, this.onChange)}
                <div>
                  <div style={{ marginTop: 15, display: 'flex' }}>
                    <DefaultTextField floatingLabelText="outerRadius" style={styles.twinTextField}
                      value={outerRadius} floatingLabelStyle={styles.singleFloatingLabel}
                      onChange={this.onChange('outerRadius')}
                    />
                    <DefaultTextField floatingLabelText="innerRadius" style={styles.twinTextField}
                      value={innerRadius} floatingLabelStyle={styles.singleFloatingLabel}
                      onChange={this.onChange('innerRadius')}
                    />
                  </div>
                  <p style={styles.hint}>
                    If you want a Pie Chart instead of Donut Chart, give innerRadius 0
                  </p>
                </div>
              </div>
              <div style={{ flex: 1, marginTop: 5 }}>
                <div style={{ marginLeft: 75 }}>
                  <ColorPickerTextField
                    TextField={
                      <DefaultTextField floatingLabelText="color" style={styles.textField}
                        value={color} floatingLabelStyle={styles.singleFloatingLabel}
                        onChange={this.onChange('color')}
                      />
                    }
                    colorValue={color}
                    onChange={this.onColorChange('color')}
                  />
                  <p style={styles.hint}>
                    If data object doesn't contain color then this is default color
                  </p>
                  <div style={{ display: 'flex', flex: 1, marginTop: -15 }}>
                    <DefaultSelectField floatingLabelText="Label Position" value={labelPosition}
                      onChange={this.onSelectFieldChange('labelPosition')} style={{ width: 150 }}
                    >
                      {RECHART_PIE_LABEL_POSITION.map((position, i) =>
                        <MenuItem key={i} value={position} primaryText={position} />
                      )}
                    </DefaultSelectField>
                    <Checkbox style={{ marginLeft: 15, width: 180, marginTop: 30 }}
                      label={'Show Legend'} checked={legend} onCheck={this.onChange('legend')}
                    />
                  </div>
                </div>
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

ReChartPieEditorModal.propTypes = {
  rechartEditorModalOpen: PropTypes.bool.isRequired,
  closeReChartEditorModal: PropTypes.func.isRequired,
  onDataTransformerFormSubmit: PropTypes.func.isRequired,
  chartType: PropTypes.string,
  selectedStencil: PropTypes.object.isRequired,
};
