import { React } from 'react';

export const tableRedecurName = 'Table';
export const tableResponse = 'data';
export const tablePropsName = 'props';
export const tableSelectedRows = 'selectedRows';
export const tableSelectedRowKeys = 'selectedRowKeys';
export const tableDataSourec = 'dataSource';
export const tablePage = 'page';
export const tablePageSize = 'pageSize';
export const tableRowName = 'Row';
// ------------------------------------------------SelectyList----------------------

export const SelectListReducerName = 'selectList';
export const SelectListPropsName = 'props';

// ------------------------------------------function--------------------//

export const dataSourceTemplateLione = (param) => {
  const dataArray = [];
  param.map((v) => {
    const data = v;
    const dataLength = v.list.length;
    const { list } = v;
    delete (data.list);
    list.map((a, i) => {
      const getReport = {};
      let newData = {};
      Object.keys(a).map((key) => {
        getReport[key] = a[key];
        return null;
      });
      if (i === 0) {
        newData = { ...getReport, ...data, idI: 'start', idLength: dataLength };
      } else {
        newData = { ...getReport, idI: 'end' };
      }
      dataArray.push(newData);
      return null;
    });
    return null;
  });
  console.log(dataArray);
  return dataArray;
};

export const dataModifyDataSource = (param) => {
  const a = {
    editable: false,
  };
  const dataArry = [];
  param.map((v) => {
    if (!v.editable) {
      Object.assign(v, a);
    }
    dataArry.push(v);
    return null;
  });
  return dataArry;
};
// export const defaultDataSourceTableTemplate = param => (param ? param : param);
export const LineConfigurationTemplate = (param) => {
  console.log(param);
  const data = (param && param.rows) ? param.rows : [];
  const getData = [];
  data.map((v, i) => {
    const name = v;
    const data2 = {
      id: i,
      name,
    };
    getData.push(data2);
    return null;
  });
  return getData;
};
export const LineConfigurationTemplate1 = (param) => {
  const data = (param && param.rows) ? param.rows : [];
  return data;
};
export const LineConfigurationTemplate2 = (param) => {
  const data = (param && param.rows) ? param.rows : [];
  const getData = [];
  data.map((v) => {
    const name = v ? v.machineType : '';
    const id = v ? `${v.machineType},${v.pc_or_plc}` : '';
    const data2 = {
      id,
      name,
    };
    getData.push(data2);
    return null;
  });
  return getData;
};
// input 默认不校验
export const defaultInputDataCheck = () => (
  () => true
);
// 动态修改表格表头
export const defaultcolumnsTemplate = (param) => {
  // do something;
  const columns1 = [
    {
      title: '序号',
      dataIndex: 'num',
      key: 'num1',
      render: (text, record, index) => index + 1,
    }, {
      title: '二维码',
      dataIndex: 'jigCode',
      key: 'jigCode',
    }, {
      title: '治具类型',
      dataIndex: 'stencilTypeName',
      key: 'stencilTypeName',
    }, {
      title: '主板名称',
      dataIndex: 'mainBoard',
      key: 'mainBoard',
    }, {
      title: '小板名称',
      dataIndex: 'subBoard',
      key: 'subBoard',
    }, {
      title: '面别',
      dataIndex: 'side',
      key: 'side',
    }, {
      title: '组合料号',
      dataIndex: 'compositeMaterial',
      key: 'compositeMaterial',
    }, {
      title: '钢网版本',
      dataIndex: 'stencilVersion',
      key: 'stencilVersion',
    }, {
      title: 'PCB料号',
      dataIndex: 'pcbMaterial',
      key: 'pcbMaterial',
    }, {
      title: 'PCB Code',
      dataIndex: 'pcbCode',
      key: 'pcbCode',
    }, {
      title: 'PCB版本',
      dataIndex: 'pcbVersion',
      key: 'pcbVersion',
    }, {
      title: '连片数',
      dataIndex: 'joinNumber',
      key: 'joinNumber',
    }, {
      title: '刮刀尺寸',
      dataIndex: 'scraperSize',
      key: 'scraperSize',
    }, {
      title: '刮刀角度',
      dataIndex: 'scraperAngle',
      key: 'scraperAngle',
    }, {
      title: '使用寿命',
      dataIndex: 'lifeLong',
      key: 'lifeLong',
    }, {
      title: '使用次数',
      dataIndex: 'useCount',
      key: 'useCount',
    }, {
      title: '借用次数',
      dataIndex: 'loanCount',
      key: 'loanCount',
    }, {
      title: '制作日期',
      dataIndex: 'manufactureDate',
      key: 'manufactureDate',
    }, {
      title: '厚度',
      dataIndex: 'thickness',
      key: 'thickness',
    }, {
      title: '生产厂家',
      dataIndex: 'supplName',
      key: 'supplName',
    }, {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy',
    }, {
      title: '最后修改时间',
      dataIndex: 'lastUpdateDate',
      key: 'lastUpdateDate',
    },
  ];

  const columnsICT = [
    {
      title: '序号',
      dataIndex: 'num',
      key: 'num1',
      render: (text, record, index) => index + 1,
    }, {
      title: '二维码',
      dataIndex: 'jigCode',
      key: 'jigCode',
    }, {
      title: '机种',
      dataIndex: 'subBoard',
      key: 'subBoard',
    }, {
      title: '使用次数',
      dataIndex: 'useCount',
      key: 'useCount',
    }, {
      title: '借用次数',
      dataIndex: 'loanCount',
      key: 'loanCount',
    }, {
      title: '入库时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, {
      title: '操作人',
      dataIndex: 'createBy',
      key: 'createBy',
    }, {
      title: '更新时间',
      dataIndex: 'lastUpdateDate',
      key: 'lastUpdateDate',
    }, {
      title: '供应商',
      dataIndex: 'supplName',
      key: 'supplName',
    }, {
      title: '状态',
      dataIndex: 'statName',
      key: 'statName',
    },
  ];

  const columnsTB = [
    {
      title: '序号',
      dataIndex: 'num',
      key: 'num1',
      render: (text, record, index) => index + 1,
    }, {
      title: '二维码',
      dataIndex: 'jigCode',
      key: 'jigCode',
    }, {
      title: '小板名称',
      dataIndex: 'subBoard',
      key: 'subBoard',
    }, {
      title: '使用次数',
      dataIndex: 'useCount',
      key: 'useCount',
    }, {
      title: '借用次数',
      dataIndex: 'loanCount',
      key: 'loanCount',
    }, {
      title: '入库时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, {
      title: '操作人',
      dataIndex: 'createBy',
      key: 'createBy',
    }, {
      title: '备注',
      dataIndex: 'instoreRemark',
      key: 'instoreRemark',
    }, {
      title: '更新时间',
      dataIndex: 'lastUpdateDate',
      key: 'lastUpdateDate',
    },
  ];

  const columnsScraper = [
    {
      title: '序号',
      dataIndex: 'num',
      key: 'num1',
      render: (text, record, index) => index + 1,
    }, {
      title: '二维码',
      dataIndex: 'jigCode',
      key: 'jigCode',
    }, {
      title: '刮刀角度',
      dataIndex: 'angle',
      key: 'angle',
    }, {
      title: '刮刀尺寸',
      dataIndex: 'size',
      key: 'size',
    }, {
      title: '使用次数',
      dataIndex: 'useCount',
      key: 'useCount',
    }, {
      title: '借用次数',
      dataIndex: 'loanCount',
      key: 'loanCount',
    }, {
      title: '入库时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, {
      title: '入库人员',
      dataIndex: 'createBy',
      key: 'createBy',
    }, {
      title: '更新时间',
      dataIndex: 'lastUpdateDate',
      key: 'lastUpdateDate',
    },
  ];
  const { formData } = param;
  const colunmsData = formData.jigTypeId;
  switch (colunmsData) {
    case '1':
      return columns1;
      break;
    case '2':
      return columnsScraper;
      break;
    case '3':
      return columnsICT;
      break;
    case '4':
      return columnsTB;
      break;
    default:

  }
};


export const defaultcolumnsReturnTemplate = (param) => {
  const columnReturn = [
    {
      title: '序号',
      dataIndex: 'num',
      key: 'num1',
      render: (text, record, index) => index + 1,
    }, {
      title: '料号',
      dataIndex: 'material_no',
      key: 'material_no',
    }, {
      title: '发料数量',
      dataIndex: 'issue_amount',
      key: 'issue_amount',
    }, {
      title: '需求数量',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: '应退数量',
      dataIndex: 'rentrun_amount',
      key: 'rentrun_amount',
    }, {
      title: '已经退数量',
      dataIndex: 'rentruned_amount',
      key: 'rentruned_amount',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        switch (text) {
          case 0:
            return '未完成';
            break;
          case 1:
            return '已完成';
            break;
          default:
            return '未定义';
        }
      },
    },
  ];
  const columnReturnComp = [
    {
      title: '序号',
      dataIndex: 'num2',
      key: 'num2',
      render: (text, record, index) => index + 1,
    }, {
      title: '料号',
      dataIndex: 'material_no',
      key: 'material_no',
    }, {
      title: '需求量',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: '消耗量',
      dataIndex: 'consum_amount',
      key: 'consum_amount',
    }, {
      title: '损耗量',
      dataIndex: 'loss_amount',
      key: 'loss_amount',
    }, {
      title: '损耗金额',
      dataIndex: 'loss_mony',
      key: 'loss_mony',
    }, {
      title: '退料员',
      dataIndex: 'operator_id',
      key: 'operator_id',
    },
  ];
  const { clickTableData } = param;
  const colunmsData = clickTableData ? clickTableData.progress : '';
  if (colunmsData === '100%') {
    return columnReturnComp;
  }
  return columnReturn;
};
