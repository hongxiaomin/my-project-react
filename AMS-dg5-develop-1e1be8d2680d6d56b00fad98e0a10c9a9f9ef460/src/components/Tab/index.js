import React from 'react';
import { Tab as MUITab } from 'material-ui';
import {
  defaultProps,
  propTypes,
  BUTTONSTYLE,
  CLASSNAME,
  ICON,
  LABEL,
  ONACTIVE,
  STYLE,
  VALUE,
  ONINITIAL,
  ONRECEIVEPROPS,
  ONDISPOSE,
  CHILDREN,
  SELECTED,
  ONTOUCHTAP,
  INDEX,
  WIDTH,
} from './props';
import './style.less';

class Tab extends React.Component {
  componentDidMount() {
    this.props[ONINITIAL]();
  }
  componentWillReceiveProps(nextProps) {
    this.props[ONRECEIVEPROPS](nextProps);
  }
  componentWillUnmount() {
    this.props[ONDISPOSE]();
  }
  render() {
    return (
      <MUITab
        buttonStyle={this.props[BUTTONSTYLE]}
        icon={this.props[ICON]}
        label={this.props[LABEL]}
        onActive={this.props[ONACTIVE]}
        value={this.props[VALUE]}
        selected={this.props[SELECTED]}
        onTouchTap={this.props[ONTOUCHTAP]}
        index={this.props[INDEX]}
        width={this.props[WIDTH]}
        style={this.props[STYLE]}
        className={this.props[CLASSNAME]}
      >
        {this.props[CHILDREN]}
      </MUITab>
    );
  }
}
Tab.defaultProps = defaultProps;
Tab.propTypes = propTypes;

export default Tab;
