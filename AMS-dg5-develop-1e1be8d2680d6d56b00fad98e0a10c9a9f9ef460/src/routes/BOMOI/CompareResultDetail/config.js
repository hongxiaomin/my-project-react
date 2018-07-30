const columns = [{
  title: '料号',
  key: 'material',
  children: [{
    title: '',
    dataIndex: 'materialNo',
    key: 'materialNo',
  }],
}, {
  title: 'Flexa',
  key: 'Flexa',
  children: [{
    title: '站位',
    dataIndex: 'pos',
    key: 'pos',
  }, {
    title: '位置',
    dataIndex: 'location',
    key: 'location',
  }],
}, {
  title: 'SAP',
  key: 'sap',
  children: [{
    title: '位置',
    dataIndex: 'sapLocation',
    key: 'sapLocation',
  }],
}];

export default columns;
