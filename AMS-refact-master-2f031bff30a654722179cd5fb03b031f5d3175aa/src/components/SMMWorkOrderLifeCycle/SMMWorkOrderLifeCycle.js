import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import {
    defaultRequestFilters,
    defaultDataSourceTemplate,
    SERVER_IP_SMM,
    defaultGetParamTemplate2,
} from '../../constants/Settings';

import TableContainer from '../../containers/TableContainer';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';
import './style.less'



const smmWorkOrderLifeCycle = `${SERVER_IP_SMM}/smm/workorder/getallworkorderlog`;
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
    name: ' 工单生命周期',
}];

const setDate = [{
    id: 'A',
    name: 'A',
}, {
    id: 'B',
    name: 'B',
}, {
    id: '單面',
    name: '單面',
}];

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
        title: '大板',
        dataIndex: 'product_name_main',
        key: 'product_name_main',
    }, {
        title: '小板',
        dataIndex: 'product_name',
        key: 'product_name',
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

const SMMWorkOrderLifeCycle = props => (
    <div className="smmWorkOrderLifeCycleWrap">


        <div className="SMMWorkOrderLifeCycle">
            <Bread breadMap={breadMap} />
            <Title name="工单生命周期" />

            <FormContainer
                name="LineBOMSearchPage"
                action={smmWorkOrderLifeCycle}
                method="GET"
                paramTemplate={defaultGetParamTemplate2}
                filters={defaultRequestFilters}
                dataSourceTemplate={defaultDataSourceTemplate}
            >
                <div className={'searchCondition'}>
                    <label htmlFor="input" className={'label'}>工单号:</label>
                    <InputContainer type="text" name="work_order" className={'input'} />
                </div>
                <div className={'searchCondition'} style={{ display: 'none' }}>
                    <label htmlFor="input" className={'label'}>工单号:</label>
                    <InputContainer type="text" name="id" className={'input'} value="1" />
                </div>
                <div className={'searchCondition'}>
                    <label htmlFor="input" className={'label'}>面别:</label>
                    <span className={'select'}>
                        <SelectContainer
                            name="side"
                            itemKey="id"
                            itemValue="name"
                            load="true"
                            data={setDate}
                        />
                    </span>
                </div>
                <input type="submit" value="查询" className={'button'} />
            </FormContainer>

            <TableContainer name="add" formName="LineBOMSearchPage" columns={columns} noRowSelection />


        </div>
    </div>
);

SMMWorkOrderLifeCycle.defaultProps = {

};
SMMWorkOrderLifeCycle.propTypes = {

};

export default SMMWorkOrderLifeCycle;