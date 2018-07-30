// import React from 'react';

import { SERVER_IP } from '../../constants/Config';
// export const SERVER_IP = 'http://172.22.27.26:8081';

export const action = `${SERVER_IP}/ams/dg5/bom/query`;
export const singleAction = `${SERVER_IP}/ams/dg5/bom/substitute/validate`;
export const addAction = `${SERVER_IP}/ams/dg5/bom/substitute/create`;
export const deleteAction = `${SERVER_IP}/ams/dg5/bom/substitute/delete`;
export const compareAction = `${SERVER_IP}/ams/dg5/bom/substitute/compare`;

export const field = [
  { Header: '序号', accessor: 'id', Cell: text => text.index + 1, maxWidth: 60 },
  { Header: '程式料表名称', accessor: 'bomReportName', minWidth: 360 },
];

export const groupingField = groupingDataUpdate => ([
  {
    Header: '序号',
    accessor: 'id',
    Cell: text => text.index + 1,
    maxWidth: 60,
  },
  {
    Header: '程式料表名称',
    accessor: 'bomReportName',
    minWidth: 360,
  },
  {
    Header: '位置',
    accessor: 'location',
    show: groupingDataUpdate,
  },
]);

export const groupingField2 = [
  {
    Header: '序号',
    accessor: 'id',
    Cell: text => text.index + 1,
    maxWidth: 60,
  },
  {
    Header: '程式料表名称',
    accessor: 'bomReportName',
    minWidth: 360,
  },
  {
    Header: '位置',
    accessor: 'location',
    //show: groupingDataUpdate,
  },
];

export const singleField = [
  {
    Header: '料号',
    columns: [{
      Header: '',
      accessor: 'materialNo',
      minWidth: 120,
      maxWidth: 160,

    }],
  },
  {
    Header: '变更后程式料表',
    columns: [
      {
        Header: '存在',
        accessor: 'exist',
        maxWidth: 60,
      },
      {
        Header: '站位',
        accessor: 'pos',
        maxWidth: 60,
      }, {
        Header: '位置',
        accessor: 'location',
        // Cell: row => (<p style={{ whiteSpace: 'normal', textAlign: 'left' }}>{row.original.location}</p>),
        minWidth: 220,
      },
    ],
  },
  {
    Header: 'SAP',
    columns: [
      {
        Header: '存在',
        accessor: 'existInSap',
        maxWidth: 60,
      },
      {
        Header: '位置',
        accessor: 'locationInSap',
        // Cell: row => (<p style={{ whiteSpace: 'normal', textAlign: 'left' }}>{row.original.locationInSap}</p>),
        minWidth: 220,
      },
    ],
  },
];

