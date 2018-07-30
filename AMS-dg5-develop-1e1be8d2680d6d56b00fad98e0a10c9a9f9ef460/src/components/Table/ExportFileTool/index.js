import React from 'react';
import moment from 'moment';
import lodash from 'lodash';
import xml2js from 'xml2js';
import XLSX from 'xlsx';
import FileSaver from 'file-saver';
import Popover from 'material-ui/Popover';
import { List, ListItem } from 'material-ui/List';
import { IconButton } from '@delta/common-utils';
import { getGUID } from '@delta/common-utils/utils/Common';
import Download from 'material-ui/svg-icons/file/file-download';
import {
  DATE,
  TIME,
  DATETIME,
  BOM,
  EXT_CSV,
  EXT_JSON,
  EXT_XML,
  EXT_XLSX,
} from './config';
import './style.less';

const onExportFile = (data, columns, extension) => {
  const fileName = `${getGUID()}.${extension}`;
  let dataString;
  let dataType;
  const blobParts = [];
  if (extension === EXT_JSON) {
    dataString = JSON.stringify(data);
    dataType = { type: 'application/json' };
  } else if (extension === EXT_XML) {
    const xmlBuilder = new xml2js.Builder({
      pretty: true,
      indent: ' ',
      newline: '\n',
    });
    const arrayObj = { root: { record: data } };
    dataString = xmlBuilder.buildObject(arrayObj);
    dataType = { type: 'text/xml' };
  } else {
    const renderedColumns = columns.filter(
      column => (column.show === undefined || column.show !== false),
    ).map((column) => {
      const { Header, accessor } = column;
      if (typeof Header === 'string') {
        return Header;
      }
      return accessor;
    });
    const ws = XLSX.utils.aoa_to_sheet([renderedColumns]);
    XLSX.utils.sheet_add_json(ws, data, {
      skipHeader: true,
      origin: 'A2',
    });
    if (extension === EXT_CSV) {
      blobParts.push(BOM);
      dataString = XLSX.utils.sheet_to_csv(ws);
      dataType = { type: 'text/csv' };
    } else {
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws);
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      const string2ArrayBuffer = (str) => {
        const buf = new ArrayBuffer(str.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== str.length; i += 1) {
          view[i] = str.charCodeAt(i) & 0xFF;
        }
        return buf;
      };
      dataString = string2ArrayBuffer(wbout);
      dataType = { type: 'application/octet-stream' };
    }
  }
  blobParts.push(dataString);
  const blob = new Blob(blobParts, dataType);
  FileSaver.saveAs(blob, fileName);
};
const getFormattedData = (dataSet, columns) => {
  const renderedColumns = columns.filter(
    column => (
      column.show === undefined || column.show !== false
    ),
  );
  return dataSet.map((data) => {
    let result = {};
    renderedColumns.forEach((column) => {
      const { accessor, type } = column;
      switch (type) {
        case DATETIME:
          result = lodash.assign(
            {},
            result,
            { [accessor]: moment(data[accessor]).format('YYYY-MM-DD HH:mm') },
          );
          break;
        case DATE:
          result = lodash.assign(
            {},
            result,
            { [accessor]: moment(data[accessor]).format('YYYY-MM-DD') },
          );
          break;
        case TIME:
          result = lodash.assign(
            {},
            result,
            { [accessor]: moment(data[accessor]).format('HH:mm') },
          );
          break;
        default:
          result = lodash.assign(
            {},
            result,
            { [accessor]: data[accessor] },
          );
      }
    });
    return result;
  });
};
class ExportFileTool extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.data.slice(0);
    this.tableName = props.tableName;
    this.state = {
      open: false,
    };
    this.onExportFile = this.onExportFile.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!lodash.isEqual(this.data, nextProps.data)) {
      this.data = nextProps.data.slice(0);
    }
  }
  onExportFile(extension) {
    const { data, columns } = this.props;
    const formattedData = getFormattedData(data, columns);
    onExportFile(formattedData, columns, extension);
    this.setState({ open: false });
  }
  render() {
    const {
      tooltip: tooltip = 'Export File',
      iconButtonStyle: iconButtonStyle = { height: '62px' },
      icon: icon = <Download style={{ marginRight: 24 }} color="#FFF" />,
    } = this.props;
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
            width: 180,
            maxWidth: '20%',
            height: 'auto',
          }}
        >
          <List>
            <ListItem
              primaryText="Export as CSV"
              onClick={() => this.onExportFile(EXT_CSV)}
            />
            <ListItem
              primaryText="Export as JSON"
              onClick={() => this.onExportFile(EXT_JSON)}
            />
            <ListItem
              primaryText="Export as XML"
              onClick={() => this.onExportFile(EXT_XML)}
            />
            <ListItem
              primaryText="Export as XLSX"
              onClick={() => this.onExportFile(EXT_XLSX)}
            />
          </List>
        </Popover>
      </div>
    );
  }
}
export default ExportFileTool;
