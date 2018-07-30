import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import LightBulb from 'material-ui/svg-icons/action/lightbulb-outline';
import styles from './plainTableEditorModalStyles';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

const DefaultTextField = props => (
  <TextField floatingLabelFixed style={styles.twinTextField} inputStyle={styles.text}
    floatingLabelStyle={styles.floatingLabel} type="text" {...props}
  />
);

DefaultTextField.propTypes = {
  needLeftSpace: PropTypes.bool,
};

export default class PlainTableEditorModal extends Component {
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
    if (nextProps.plainTableEditorModalOpen && !this.props.plainTableEditorModalOpen) {
      this.setState({
        dataTransformer: props.dataTransformer,
      });
    }
  }

  onCancel = () => {
    this.props.closePlainTableEditorModal();
    this.setState({
      dataTransformer: {},
    });
  }

  onSubmit = () => {
    const { props, id } = this.props.selectedStencil;
    Object.assign(props, { dataTransformer: this.state.dataTransformer });
    this.props.onDataTransformerFormSubmit(id, props);
    this.props.closePlainTableEditorModal();
    this.setState({
      dataTransformer: {},
    });
  }

  onChange = (key, index, type) => (event) => {
    if (index !== undefined) {
      this.state.dataTransformer[type][index][key] = event.target.value;
    } else {
      this.state.dataTransformer[key] = event.target.value;
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

  isEmpty(value, key) {
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

  renderTransformerEditor(transformer) {
    return (
      <div>
        <h3 style={styles.h3Text}>Transformer Function</h3>
        <AceEditor
          mode="javascript"
          theme="tomorrow"
          fontSize={16}
          style={styles.aceEditor}
          value={transformer.toString()}      // need string when load from JSON
          onChange={this.onTransformerChange}
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    );
  }

  render() {
    const { dataTransformer } = this.state;
    const {
      url,
      transformer,
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
        disabled={url === undefined || url.length === 0 || url.replace(/\s/g, '').length === 0}
        labelStyle={styles.label}
        onTouchTap={this.onSubmit}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        modal={false}
        onRequestClose={this.onCancel}
        open={this.props.plainTableEditorModalOpen}
        autoScrollBodyContent
        contentStyle={{ width: '70%', maxWidth: 'none' }}
      >
        {Object.keys(dataTransformer).length !== 0 &&
          <div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 35 }}>
                <div>
                  <DefaultTextField
                    floatingLabelText="URL"
                    autoFocus
                    errorStyle={this.isEmpty(url, 'url').style}
                    errorText={this.isEmpty(url, 'url').hint}
                    floatingLabelStyle={styles.singleFloatingLabel}
                    onChange={this.onChange('url')}
                    style={styles.textField}
                    value={url}
                  />
                </div>
                {this.renderTransformerEditor(transformer)}
              </div>
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
                    Required keys: "columnDefs" & "rowData"
                  </li>
                  <li style={styles.hintListItem}>
                    The data format expected by PlainTable should be an array of objects like:
                  </li>
                  <pre style={styles.hintCode}>
                    {
                      `{
                        columnDefs:[
                          { headerName: "Name", field: "name", width: 300 },
                          { headerName: "Age", field: "age", width: 300 },
                        ],
                        rowData:[
                          {name: "Bob", age: 10},
                          {name: "Harry", age: 3},
                          {name: "Sally", age: 20},
                          {name: "Mary", age: 5},
                          {name: "John", age: 15},
                          {name: "Bob", age: 10},
                          {name: "Harry", age: 3},
                          {name: "Sally", age: 20},
                          {name: "Mary", age: 5},
                          {name: "John", age: 15},
                          {name: "Jack", age: 25},
                          {name: "Sue", age: 43},
                          {name: "Sean", age: 44},
                          {name: "Niall", age: 2},
                          {name: "Alberto", age: 32},
                          {name: "Fred", age: 53},
                          {name: "Jenny", age: 34},
                          {name: "Larry", age: 13},
                        ],
                      }`
                    }
                  </pre>
                  <li style={styles.hintListItem}>
                    The data returned from REST APIs should be valid JSON
                  </li>
                  <li style={{ marginTop: 15 }}>
                    If the data returned from REST APIs does not match the
                    requirement of PlainTable, write your own Transformer Function,
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
          </div>
        }
      </Dialog>
    );
  }
}

PlainTableEditorModal.propTypes = {
  plainTableEditorModalOpen: PropTypes.bool.isRequired,
  closePlainTableEditorModal: PropTypes.func.isRequired,
  onDataTransformerFormSubmit: PropTypes.func.isRequired,
  selectedStencil: PropTypes.object.isRequired,
};
