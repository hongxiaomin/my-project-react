import React from 'react';
import classnames from 'classnames';
import { Tabs as MUITabs } from 'material-ui/Tabs';
import {
  defaultProps,
  propTypes,
  NAME,
  ZINDEX,
  ONINITIAL,
  ONRECEIVEPROPS,
  ONDISPOSE,
  CLASSNAME,
  CONTENTCONTAINERCLASSNAME,
  CONTENTCONTAINERSTYLE,
  INITIALSELECTEDINDEX,
  INKBARSTYLE,
  STYLE,
  TABITEMCONTAINERSTYLE,
  TABTEMPLATE,
  TABTEMPLATESTYLE,
  CHILDREN,
  INNERVALUE,
  ONCHANGE,
} from './props';
import './style.less';

class Tabs extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps
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
      <MUITabs
        name={this.props[NAME]}
        value={this.props[INNERVALUE]}
        className={classnames('tabs-style', this.props[CLASSNAME])}
        contentContainerClassName={classnames('tab', this.props[CONTENTCONTAINERCLASSNAME])}
        contentContainerStyle={this.props[CONTENTCONTAINERSTYLE]}
        initialSelectedIndex={this.props[INITIALSELECTEDINDEX]}
        inkBarStyle={{ zIndex: this.props[ZINDEX], ...this.props[INKBARSTYLE] }}
        style={this.props[STYLE]}
        tabItemContainerStyle={this.props[TABITEMCONTAINERSTYLE]}
        tabTemplate={this.props[TABTEMPLATE]}
        tabTemplateStyle={this.props[TABTEMPLATESTYLE]}
        onChange={this.props[ONCHANGE]}
      >
        {this.props[CHILDREN]}
      </MUITabs>
    );
  }
}

export default Tabs;
