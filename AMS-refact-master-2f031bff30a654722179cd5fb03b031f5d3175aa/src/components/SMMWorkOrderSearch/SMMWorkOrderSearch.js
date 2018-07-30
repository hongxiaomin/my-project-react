import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import {
    defaultRequestFilters,
    defaultDataSourceTemplate,
    defaultGetParamTemplate,
    SERVER_IP_SMM,
} from '../../constants/Settings';
import TimeAlertTable from '../../containers/TimeAlertTableContainer';
import './style.less';

const smmWorkOrderSearchApi = `${SERVER_IP_SMM}/smm/workorder/getallworkorderlog?condition=[{"id":"1"}]&page={%22size%22:10,%22current%22:1}&sort=[{%22column%22:%22start_time_on_line%22,%22value%22:%22ASC%22}]`;

const columns = [
    {
        title: '序号',
        dataIndex: 'num',
        key: 'num1',
        render: (text, record, index) => index + 1,
    }, {
        title: '工单',
        dataIndex: 'work_order',
        key: 'work_order',
    }, {
        title: '线别',
        dataIndex: 'line_name',
        key: 'line_name',
    }, {
        title: '面别',
        dataIndex: 'side',
        key: 'side',
    }, {
        title: '机种[大板/小板]',
        dataIndex: 'product_name_main',
        key: 'product_name_main',
        render: (text, record, index) => {
            return (
                `${text} / ${record.product_name}`
            )
        }
    }, {
        title: '仓库发料',
        dataIndex: 'start_time_warehouse_issue',
        key: 'start_time_warehouse_issue',
        render: (text, record, index) => {
            let bg = record.warehouse_issue;
            let startTime = text;
            let endTime = record.end_time_warehouse_issue;
            if (bg === -1) {
                return (<p>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -2) {
                return (<p style={{ background: 'green' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -3) {
                return (<p style={{ background: 'red' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else {
                return (<p style={{ background: 'yellow' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            }
        }
    }, {
        title: '尾数仓发料',
        dataIndex: 'start_time_mantissa_issue',
        key: 'start_time_mantissa_issue',
        render: (text, record, index) => {
            let bg = record.mantissa_issue;
            let startTime = text;
            let endTime = record.end_time_mantissa_issue;
            if (bg === -1) {
                return (<p>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -2) {
                return (<p style={{ background: 'green' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -3) {
                return (<p style={{ background: 'red' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else {
                return (<p style={{ background: 'yellow' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            }
        }

    }, {
        title: '接料与料车合并',
        dataIndex: 'start_time_prep_merger',
        key: 'start_time_prep_merger',
        render: (text, record, index) => {
            let bg = record.prep_merger;
            let startTime = text;
            let endTime = record.end_time_prep_merger;
            if (bg === -1) {
                return (<p>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -2) {
                return (<p style={{ background: 'green' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -3) {
                return (<p style={{ background: 'red' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else {
                return (<p style={{ background: 'yellow' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            }
        }
    }, {
        title: '上feeder',
        dataIndex: 'start_time_pluge_feeder',
        key: 'start_time_pluge_feeder',
        render: (text, record, index) => {
            let bg = record.pluge_feeder;
            let startTime = text;
            let endTime = record.end_time_pluge_feeder;
            if (bg === -1) {
                return (<p>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -2) {
                return (<p style={{ background: 'green' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -3) {
                return (<p style={{ background: 'red' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else {
                return (<p style={{ background: 'yellow' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            }
        }

    }, {
        title: 'feeder缓存区发料',
        dataIndex: 'start_time_feederbuffer_issue',
        key: 'start_time_feederbuffer_issue',
        render: (text, record, index) => {
            let bg = record.feederbuffer_issue;
            let startTime = text;
            let endTime = record.end_time_feederbuffer_issue;
            if (bg === -1) {
                return (<p>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -2) {
                return (<p style={{ background: 'green' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -3) {
                return (<p style={{ background: 'red' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else {
                return (<p style={{ background: 'yellow' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            }
        }

    }, {
        title: '上线',
        dataIndex: 'start_time_on_line',
        key: 'start_time_on_line',
        render: (text, record, index) => {
            let bg = record.on_line;
            let startTime = text;
            let endTime = record.end_time_on_line;
            if (bg === -1) {
                return (<p>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -2) {
                return (<p style={{ background: 'green' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -3) {
                return (<p style={{ background: 'red' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else {
                return (<p style={{ background: 'yellow' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            }
        }
    }, {
        title: 'feeder缓存区入库',
        dataIndex: 'start_time_feederbuffer_storage',
        key: 'start_time_feederbuffer_storage',
        render: (text, record, index) => {
            let bg = record.feederbuffer_storage;
            let startTime = text;
            let endTime = record.end_time_feederbuffer_storage;
            if (bg === -1) {
                return (<p>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -2) {
                return (<p style={{ background: 'green' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -3) {
                return (<p style={{ background: 'red' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else {
                return (<p style={{ background: 'yellow' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            }
        }

    }, {
        title: '尾数仓入库',
        dataIndex: 'start_time_mantissa_storage',
        key: 'start_time_mantissa_storage',
        render: (text, record, index) => {
            let bg = record.mantissa_storage;
            let startTime = text;
            let endTime = record.end_time_mantissa_storage;
            if (bg === -1) {
                return (<p>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -2) {
                return (<p style={{ background: 'green' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else if (bg === -3) {
                return (<p style={{ background: 'red' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            } else {
                return (<p style={{ background: 'yellow' }}>
                    <span className="startTime">{startTime}</span>
                    <span>{endTime}</span>
                </p>);
            }
        }
    }
];
const breadMap = [{
    path: '',
    name: '首页',
}, {
    path: '',
    name: '原材料管理',
}, {
    path: '',
    name: '工单管理',
}, {
    path: '',
    name: ' 工单状态',
}];

const SMMWorkOrderSearch = props => (
    <div className="smmWorkOrderSearchWrap">
        <div className="SMMWorkOrderSearch">
            <Bread breadMap={breadMap} />
            <Title name=" 工单状态" />

            <TimeAlertTable
                action={smmWorkOrderSearchApi}
                method="GET"
                timeAlert="SMMWorkOrderSearch"
                name="SMMWorkOrderSearch"
                columns={columns}
                filters={defaultRequestFilters}
                dataSourceTemplate={defaultDataSourceTemplate}
                needClear
                nopagination
            />

        </div>
    </div>
);
SMMWorkOrderSearch.defaultProps = {

};
SMMWorkOrderSearch.propTypes = {

};

export default SMMWorkOrderSearch;
