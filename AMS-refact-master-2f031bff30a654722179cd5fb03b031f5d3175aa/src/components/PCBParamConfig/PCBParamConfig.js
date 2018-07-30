import React from 'react';
import Bread from '../Bread';
import Title from '../Title';
import QueryTable from '../../containers/QueryTableContainer';
import { defaultDataSourceTemplate, defaultRequestFilters, colorHex, SERVER_IP_PCB } from '../../constants/Settings';
import ColorPickerNew from '../../containers/ColorPickerNewContainer';
import EditableCell from '../../containers/EditableCellContainer';
import EditableCellButton from '../../containers/EditableCellButtonContainer';

const PCBParamConfigAPI = `${SERVER_IP_PCB}/ams/pcb/system/configuration`;
const PCBParamConfiggUpdateAPI = `${SERVER_IP_PCB}/ams/pcb/system/configuration/update`;
const breadMap = [{
  path: '',
  name: '首页',
}, {
  path: '',
  name: 'PCB',
}, {
  path: '',
  name: '系统配置',
}, {
  path: '',
  name: '参数配置',
}];

const PCBParam = (param) => {
  const { dataParam, colorDate } = param;
  let saveObj = { id: dataParam.id,
    name: dataParam.name,
    miniValue: dataParam.minValue,
    maxiValue: dataParam.maxValue,
    description: dataParam.description };
  if (colorDate) {
    const dataParamId = dataParam.id;
    colorDate.map((item) => {
      if (item.id === dataParamId) {
        const newColorDate = { miniColor: item.minColor,
          midColor: item.midColor,
          maxiColor: item.maxColor };
        saveObj = { ...saveObj, ...newColorDate };
      }
      return null;
    });
  }
  return ({ value: JSON.stringify([saveObj]) });
};

const columns = [{
  title: '序号',
  dataIndex: 'material_no1',
  key: 'material_no1',
  render: (text, render, index) => (index + 1),
}, {
  title: '配置项',
  dataIndex: 'name',
  key: 'name',
  render: (text, record) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        name="name"
      />
    );
  },
}, {
  title: '参数值',
  children: [{
    title: 'min',
    dataIndex: 'minValue',
    key: 'min',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          name="minValue"
        />
      );
    },
  }, {
    title: 'max',
    dataIndex: 'maxValue',
    key: 'max',
    render: (text, record) => {
      const { editable } = record;
      return (
        <EditableCell
          defaultValue={text}
          editable={editable}
          name="maxValue"
        />
      );
    },
  }],
}, {
  title: '单位',
  dataIndex: 'unit',
  key: 'unit',
}, {
  title: '预警颜色级别',
  children: [{
    title: '低',
    dataIndex: 'minColor',
    key: 'minColor',
    render: (text, render) => {
      const minColors = colorHex(render.minColor);
      if (render.item === 'PCBEffectiveTime') {
        return null;
      }
      return <ColorPickerNew color={minColors} tableName="PCBParamConfig" labelColor="minColor" id={render.id} />;
    },
  }, {
    title: '中',
    dataIndex: 'midColor',
    key: 'midColor',
    render: (text, render) => {
      const midColors = colorHex(render.midColor);
      if (render.item === 'PCBEffectiveTime') {
        return null;
      }
      return <ColorPickerNew color={midColors} tableName="PCBParamConfig" labelColor="midColor" id={render.id} />;
    },
  }, {
    title: '高',
    dataIndex: 'maxColor',
    key: 'maxColor',
    render: (text, render) => {
      const maxColors = colorHex(render.maxColor);
      if (render.item === 'PCBEffectiveTime') {
        return null;
      }
      return <ColorPickerNew color={maxColors} tableName="PCBParamConfig" labelColor="maxColor" id={render.id} />;
    },
  }],
}, {
  title: '备注',
  dataIndex: 'description',
  key: 'description',
  render: (text, record) => {
    const { editable } = record;
    return (
      <EditableCell
        defaultValue={text}
        editable={editable}
        name="description"
      />
    );
  },
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  render: (text, record, index) => {
    const { editable } = record;
    return (
      <div>
        {
          <EditableCellButton
            editable={editable}
            index={index}
            tableName="PCBParamConfig"
            action={PCBParamConfiggUpdateAPI}
            method="PUT"
            record={record}
            paramTemplate={PCBParam}
            filters={defaultRequestFilters}
            dataSourceTemplate={defaultDataSourceTemplate}
            isColorBtn
          />
        }
      </div>
    );
  },
}];

const PCBParamConfig = props => (
  <div>
    <Bread breadMap={breadMap} />
    <Title name="参数配置" />
    <QueryTable
      action={PCBParamConfigAPI}
      name="PCBParamConfig"
      columns={columns}
      dataSourceTemplate={defaultDataSourceTemplate}
    />
  </div>
);
PCBParamConfig.defaultProps = {

};
PCBParamConfig.propTypes = {

};

export default PCBParamConfig;
