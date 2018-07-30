import React from 'react';
import lodash from 'lodash';
import Popover from 'material-ui/Popover';
import { List, ListItem } from 'material-ui/List';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import { Checkbox, IconButton, TableAction } from '@delta/common-utils';
import { isArray } from '../../../utils/Common';
import './style.less';

const { onChangeColumns } = TableAction;
class DisplayColumnTool extends React.Component {
  constructor(props) {
    super(props);
    this.columns = props.columns.slice(0);
    this.tableName = props.tableName;
    this.state = {
      open: false,
    };
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.getListItem = this.getListItem.bind(this);
    this.getUpdatedColumn = this.getUpdatedColumn.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!lodash.isEqual(this.columns, nextProps.columns)) {
      this.columns = nextProps.columns.slice(0);
    }
  }
  onChangeCheck({ accessor }, value, tools) {
    const nextShow = value;
    const { getProps, trigger } = tools;
    this.columns = (isArray(this.columns) && this.columns.length > 0) ?
      this.columns.map(item => (
        this.getUpdatedColumn(item, accessor, nextShow)
      )) :
      this.columns;
    const props = getProps(this.tableName);
    trigger(onChangeColumns(this.columns, props));
  }
  getUpdatedColumn(column, accessor, show) {
    return column.accessor === accessor ?
      lodash.assign({}, column, {
        show,
      }) :
      lodash.assign({}, column, {
        columns: isArray(column.columns) && column.columns.length > 0 ?
          column.columns.map(col => this.getUpdatedColumn(col, accessor, show)) :
          column.columns,
      });
  }
  getListItem(item) {
    return (
      item.hideable !== false ?
        <ListItem
          key={item.accessor}
          leftCheckbox={
            <div>
              <Checkbox
                name={`${item.accessor}-checkbox`}
                checked={!(item.show === false)}
                onClientChange={
                  (value, tools) => this.onChangeCheck(item, value, tools)
                }
                label={item.Header}
                labelStyle={{
                  width: '120px',
                  lineHeight: '16px',
                  marginTop: '5px',
                }}
              />
            </div>
          }
        /> : null
    );
  }
  render() {
    const {
      tooltip: tooltip = 'Show/Hide Columns',
      iconButtonStyle: iconButtonStyle = { height: '62px' },
      icon: icon = <ImageRemoveRedEye style={{ marginRight: 24 }} color="FFF" />,
    } = this.props;
    const list = (
      <List
        style={{ marginBottom: 10 }}
      >
        {
          isArray(this.columns) &&
          this.columns.length > 0 &&
          this.columns.reduce(
            (result, item) => (
            isArray(item.columns) && item.columns.length > 0 ?
              result.concat(item.columns.map(this.getListItem)) :
              result.concat([this.getListItem(item)])
            ),
            [],
          )
        }
      </List>
    );
    return (
      <div
        style={{ display: 'inline-block' }}
        ref={(iconButton) => { this.iconButton = iconButton; }}
      >
        <IconButton
          name="icon-btn"
          style={iconButtonStyle}
          onClientClick={() => this.setState({ open: true })}
          tooltip={tooltip}
        >
          {icon}
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.iconButton}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={() => this.setState({ open: false })}
          style={{
            width: 200,
            maxWidth: '20%',
            height: 'auto',
          }}
        >
          {list}
        </Popover>
      </div>
    );
  }
}
export default DisplayColumnTool;
