import fetchMock from 'fetch-mock'

const res = result => ({ code: 200000, result })
const api = fetchMock.spy()

api.get('/dirtree', res([
  {
    name: 'A',
    children: [
      {
        name: 'A1',
        children: [
          {
            name: 'AA1',
            children: [
              {
                name: 'AAA1',
              },
              {
                name: 'AAA2',
              },
            ],
          },
        ],
      },
      {
        name: 'A2',
        children: [],
      },
    ],
  },
  {
    name: 'B',
    children: [
      {
        name: 'B1',
        children: [
          {
            name: 'BB1',
          }
        ]
      },
      {
        name: 'B2',
        children: []
      }
    ]
  }
]
))
// 获取用户列表
api.get('/users', res([
  {
    userId: '1',
    userName: '1',
    role: 'admin',
  },
]))

api.get('/models/check', res({
  // targetCode: [
  //   { defect1: { product1: "122/42423", product2: "3000/5000" } },
  //   { defect2: { product1: "552/42423", product2: "3000/5000" } }
  // ],
  // othersCode: [
  //   { defect1: { product1: "122/42423", product2: "3000/5000" } },
  //   { defect2: { product1: "552/42423", product2: "3000/5000" } }
  // ],
}))

// 用户列表
api.get('/api/userlist', res([
  {

  },
]))

// 列表action
api.post('/judging/job/action', res(null))

// inline service 队列列表
api.get('/judging/jobs', res(JSON.stringify([
  {
    messageId: 1,
    processName: 'test',
    productName: 'test',
    modelName: 'test',
    messageStatus: 'received',
    arrivalTime: '2017-09-28 16:57:28',
    glassList: [
      {
        glassId: 1,
        glassName: '玻璃1',
        glassStatus: 'waiting',
      },
      {
        glassId: 2,
        glassName: '玻璃2',
        glassStatus: 'waiting',
      },
      {
        glassId: 3,
        glassName: '玻璃3',
        glassStatus: 'waiting',
      },
      {
        glassId: 4,
        glassName: '玻璃3',
        glassStatus: 'waiting',
      },
    ],
  },
  {
    messageId: 2,
    processName: 'test',
    productName: 'test',
    modelName: 'test',
    messageStatus: 'waiting',
    arrivalTime: '2017-09-28 16:57:28',
    glassList: [
      {
        glassId: 1,
        glassName: '玻璃1',
        glassStatus: 'waiting',
      },
      {
        glassId: 2,
        glassName: '玻璃2',
        glassStatus: 'waiting',
      },
      {
        glassId: 3,
        glassName: '玻璃3',
        glassStatus: 'waiting',
      },
    ],
  },
  {
    messageId: 3,
    processName: 'test',
    productName: 'test',
    modelName: 'test',
    messageStatus: 'running',
    arrivalTime: '2017-09-28 16:57:28',
    glassList: [
      {
        glassId: 1,
        glassName: '玻璃1',
        glassStatus: 'done',
      },
      {
        glassId: 2,
        glassName: '玻璃2',
        glassStatus: 'processing',
      },
      {
        glassId: 3,
        glassName: '玻璃3',
        glassStatus: 'waiting',
      },
    ],
  },
  {
    messageId: 4,
    processName: 'test',
    productName: 'test',
    modelName: 'test',
    messageStatus: 'done',
    arrivalTime: '2017-09-28 16:57:28',
    glassList: [
      {
        glassId: 1,
        glassName: '玻璃1',
        glassStatus: 'done',
      },
      {
        glassId: 2,
        glassName: '玻璃2',
        glassStatus: 'done',
      },
      {
        glassId: 3,
        glassName: '玻璃3',
        glassStatus: 'done',
      },
    ],
  },
])))


api.post('/judging/edit?init', res(null))

api.get('/api/model/details', res(
  {
    result: {
      modelAttributes: {
        createTime: '2017-8-25 16:09:31',
        process: [
          35644,
          18469,
          12343,
          23456,
          3377,
          17899,
        ],
        product: [
          'TC31502AAW02',
          'TC31502AAW02',
        ],
        defect: [
          'defectCode1',
          'defectCode2',
        ],
      },
      trainingInfo: {
        TrainingBeginTime: '2017-08-24 11:24:47',
        TrainingEndTime: '2017-08-24 11:24:47',
        trainingProgress: 1,
      },
      testingInfo: {
        TestingBeginTime: '2017-08-24 11:24:47',
        TestingEndTime: '2017-08-24 11:24:47',
        testingProgress: 0.1,
      },
    },
  },
))

api.get('/api/model/training', res({
  data: {
    status: 'initing',
    percent: 80,
    initializedAt: '2017-08-26 17:17:10',
    runningAt: '2017-08-26 17:17:15',
    willFinish: '',
    trainingProgress: {
      loseRate: [
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
        '0.001',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.005',
      ],
      accuracy: [
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
        '0.005',
        '0.002',
        '0.003',
        '0.004',
        '0.005',
        '0.001',
      ],
    },
  },
}))

api.get('/api/model/testing', res({
  data: {
    status: 'stopped',
    percent: '0.8',
    initializedAt: '2017-08-26 17:17:10',
    runningAt: '2017-08-26 17:17:15',
    willFinish: '',
  },
}))
api.get('/api/testResultCount', res({
  data: { rightCount: 0.5, otherCount: 0.4, errorCount: 0.1 },
}))
api.get('/api/defectCode', res({
  data: [{
    defectName: 'defect01',
    defectId: 1,
    threshold: 1,
    count: [
      { recall: 10, others: 10, wrong: 50 },
      { recall: 20, others: 10, wrong: 50 },
      { recall: 30, others: 10, wrong: 50 },
      { recall: 40, others: 10, wrong: 50 },
      { recall: 50, others: 10, wrong: 50 },
      { recall: 60, others: 10, wrong: 50 },
      { recall: 70, others: 10, wrong: 50 },
      { recall: 80, others: 10, wrong: 50 },
    ],
  },
  {
    defectName: 'defect02',
    defectId: 2,
    threshold: 5,
    count: [
      { recall: 10, others: 10, wrong: 50 },
      { recall: 20, others: 10, wrong: 50 },
      { recall: 30, others: 10, wrong: 50 },
      { recall: 40, others: 10, wrong: 50 },
      { recall: 50, others: 10, wrong: 50 },
      { recall: 60, others: 10, wrong: 50 },
      { recall: 70, others: 10, wrong: 50 },
      { recall: 80, others: 10, wrong: 50 },
    ],
  }],
}))

api.get('/api/model/list', res({
  data: [
    { id: 1, name: 'test1', currentState: 'test', status: 'started', isPublished: true, iteration: 2000000 },
    { id: 2, name: 'test2', currentState: 'none', status: 'inited', isPublished: true, iteration: 2000000 },
    { id: 3, name: 'test3', currentState: 'train', status: 'fed', isPublished: false, iteration: 2000000 },
    { id: 4, name: 'test4', isVerified: true, currentState: 'test', status: 'stopping', isPublished: true, iteration: 2000000 },
    { id: 5, name: 'test5', currentState: 'none', status: 'destroyed', isPublished: false, iteration: 2000000 },
    { id: 6, name: 'test6', currentState: 'train', status: 'feeding', isPublished: false, iteration: 2000000 },
    { id: 7, name: 'test7', isTrained: true, currentState: 'train', status: 'stopping', isPublished: false, iteration: 2000000 },
    { id: 8, name: 'test8', currentState: 'train', status: 'starting', isPublished: false, iteration: 2000000 },
  ],
}))

api.get('/models', res([
  { id: 1, name: 'test1', currentState: 'test', status: 'started', isPublished: true, iteration: 2000000 },
  { id: 2, name: 'test2', currentState: 'none', status: 'inited', isPublished: true, iteration: 2000000 },
  { id: 3, name: 'test3', currentState: 'train', status: 'fed', isPublished: false, iteration: 2000000 },
  { id: 4, name: 'test4', isVerified: true, currentState: 'test', status: 'stopping', isPublished: true, iteration: 2000000 },
  { id: 5, name: 'test5', currentState: 'none', status: 'destroyed', isPublished: false, iteration: 2000000 },
  { id: 6, name: 'test6', currentState: 'train', status: 'feeding', isPublished: false, iteration: 2000000 },
  { id: 7, name: 'test7', isTrained: true, currentState: 'train', status: 'stopping', isPublished: false, iteration: 2000000 },
  { id: 8, name: 'test8', currentState: 'train', status: 'starting', isPublished: false, iteration: 2000000 },
]))

api.get('/judging/info', res([
  {
    serviceId: '1',
    viewId: '1000',
    serviceName: '',
    deviceName: 'device911',
    deviceId: '1',
    processName: '12350',
    productName: 'TC59901AAC00',
    glassName: 'T5A476U0F9B',
    modelId: '',
    modelName: '',
    createTime: '2017-8-31 13:39:02',
    status: '',
  },
  {
    serviceId: '2',
    viewId: '1001',
    serviceName: 'MMP2',
    deviceName: 'device911',
    deviceId: '1',
    processName: '12580',
    productName: 'TC59901AAC01',
    glassName: 'T5A476U0F9B',
    modelId: '2',
    modelName: 'modelName2',
    createTime: '2017-8-31 13:39:02',
    status: 'None',
  },
  {
    serviceId: '3',
    viewId: '1002',
    serviceName: 'MMP3',
    deviceName: 'device911',
    deviceId: '1',
    processName: '12351',
    productName: 'TC59901AAC02',
    glassName: 'T5A476U0F9B',
    modelId: '1',
    modelName: 'modelName3',
    createTime: '2017-8-31 13:39:02',
    status: 'initing',
  },
  {
    serviceId: '4',
    viewId: '1003',
    serviceName: 'MMP4',
    deviceName: 'device911',
    deviceId: '1',
    processName: '12352',
    productName: 'TC59901AAC03',
    glassName: 'T5A476U0F9B',
    modelId: '2',
    modelName: 'modelName3',
    createTime: '2017-8-31 13:39:02',
    status: 'started',
  },
  {
    serviceId: '4',
    viewId: '1004',
    serviceName: 'MMP4',
    deviceName: 'device911',
    deviceId: '1',
    processName: '12352',
    productName: 'TC59901AAC03',
    glassName: 'T5A476U0F9B',
    modelId: '1',
    modelName: 'modelName3',
    createTime: '2017-8-31 13:39:02',
    status: 'feeding_0.45',
  },
  {
    serviceId: '5',
    viewId: '1005',
    serviceName: 'MMP5',
    deviceName: 'device911',
    deviceId: '1',
    processName: '12355',
    productName: 'TC59901AAC03',
    glassName: 'T5A476U0F9B',
    modelId: '1',
    modelName: 'modelName3',
    createTime: '2017-8-31 13:39:02',
    status: 'destroying',
  },
]))

api.get('/api/ojs/services', res({
  data: [
    { id: 1, kernelId: 1, serviceName: 'serviceTest1', deviceId: 1, deviceName: 'Device1', status: 'started', model: 'MOEL3' },
    { id: 1, kernelId: 2, serviceName: 'serviceTest2', deviceId: 2, deviceName: 'Device1', status: 'feeding', model: 'MODEL1' },
    { id: 1, kernelId: 3, serviceName: 'serviceTest3', deviceId: 3, deviceName: 'Device1', status: 'destroyed', model: 'MODEL2' },
    { id: 1, kernelId: 4, serviceName: 'serviceTest4', deviceId: 4, deviceName: 'Device1', status: '' },
  ],
}))
api.get('/api/ojs/queueList', res({
  data: [
    { processId: '12350', productId: '11', model: 'test1', status: 'Running', arrivalTime: '' },
    { processId: '22350', productId: '21', model: 'test2', status: 'Running', arrivalTime: '' },
    { processId: '33250', productId: '31', model: 'test3', status: 'Running', arrivalTime: '' },
    { processId: '42324', productId: '41', model: 'test4', status: 'Running', arrivalTime: '' },
    { processId: '28225', productId: '22', model: 'test5', status: 'Waiting', arrivalTime: '' },
    { processId: '32505', productId: '23', model: 'test6', status: 'Waiting', arrivalTime: '' },
    { processId: '11545', productId: '24', model: 'test7', status: 'Waiting', arrivalTime: '' },
    { processId: '22554', productId: '25', model: 'test8', status: 'Waiting', arrivalTime: '' },
    { processId: '32500', productId: '26', model: 'test9', status: 'Waiting', arrivalTime: '' },
  ],
}))
api.get('/api/ojs/modelSettingList', res({
  data: [
    { configid: 1, processId: '12350', productId: '11', model: 'test1', defectCode: 'TNSDO1/TNSDO0/TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0/' },
    { configid: 2, processId: '22350', productId: '21', model: 'test2', defectCode: 'TNSDO1/TNSDO0/TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0' },
    { configid: 3, processId: '33250', productId: '31', model: 'test3', defectCode: 'TNSDO1/TNSDO0/TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0' },
    { configid: 4, processId: '42324', productId: '41', model: 'test4', defectCode: 'TNSDO1/TNSDO0/TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0' },
    { configid: 5, processId: '28225', productId: '22', model: 'test5', defectCode: 'TNSDO0/TNSDO0/TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0' },
    { configid: 6, processId: '32505', productId: '23', model: 'test6', defectCode: 'TNSDO0/TNSDO0/TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0' },
    { configid: 7, processId: '11545', productId: '24', model: 'test7', defectCode: 'TNSDO0/TNSDO0/TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0' },
    { configid: 8, processId: '22554', productId: '25', model: 'test8', defectCode: 'TNSDO0/TNSDO0/TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0' },
    { configid: 9, processId: '32500', productId: '26', model: 'test9', defectCode: 'TNSDO0/TNSDO0/TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0TNSDO0/TNSDO0' },
  ],
}))
api.get('/api/confidence/list', res({
  data: [
    {
      configId: 1,
      process: {
        processId: '1',
        processName: '12350',
      },
      product: {
        productId: '1',
        productName: 'TC59901AAC00',
      },
      modelName: 'model1',
      defectType: [
        'defectCode1',
        'defectCode2',
        'defectCode3',
        'defectCode4',
      ],
    },
    {
      configId: 2,
      process: {
        processId: '1',
        processName: '12350',
      },
      product: {
        productId: '2',
        productName: 'TC59901AAC01',
      },
      modelName: 'model1',
      defectType: [
        'defectCode1',
        'defectCode2',
        'defectCode3',
        'defectCode4',
      ],
    },
    // {
    //   configId: 3,
    //   process: {
    //     processId: '3',
    //     processName: '12353',
    //   },
    //   product: {
    //     productId: '3',
    //     productName: 'TC59901AAC03',
    //   },
    //   modelName: 'model3',
    //   defectType: [
    //     'defectCode1',
    //     'defectCode2',
    //     'defectCode3',
    //     'defectCode4',
    //   ],
    // },
    // {
    //   configId: 4,
    //   process: {
    //     processId: '4',
    //     processName: '12354',
    //   },
    //   product: {
    //     productId: '4',
    //     productName: 'TC59901AAC04',
    //   },
    //   modelName: 'model4',
    //   defectType: [
    //     'defectCode1',
    //     'defectCode2',
    //     'defectCode3',
    //     'defectCode4',
    //   ],
    // },
  ],
}))

api.get('/api/ojs/selectData', res({
  data: [
    { productId: 1, processId: 11, model: 'test1' },
    { productId: 2, processId: 22, model: 'test2' },
    { productId: 3, processId: 33, model: 'test3' },
    { productId: 4, processId: 44, model: 'test4' },
  ],
}))

api.get('/api/ojs/modelOption', res({
  data: [
    {
      model: 'model1',
      defectCode: [
        'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0',
      ],
    },
    {
      model: 'model2',
      defectCode: [
        'TNSDO1', 'TNSDO1', 'TNSDO1', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0',
      ],
    },
  ],
}))

api.get('/api/ojs/editModelOption', res({
  data: [
    {
      model: 'model1',
      modelId: 1,
      defectCode: [
        'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0',
      ],
    },
    {
      model: 'model2',
      modelId: 2,
      defectCode: [
        'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0', 'TNSDO0',
      ],
    },
  ],
}))
api.get('/api/ojs/deleteModel', res({
  data: { configid: 1 },
}))
api.get('/aiModel/defectCode?id=1', res({
  data: [
    {
      defectName: 'defect01',
      confidence: 20,
    },
    {
      defectName: 'defect02',
      confidence: 50,
    },
  ],
}))
api.get('/api/glass/list', res({
  glassList: [
    {
      glassID: 'TA27502BBV00',
      stepID: 'TPAb',
      ODF: '3.5',
      groupName: 'PV45Xv1',
    }, {
      glassID: 'AA27502BBV00',
      stepID: 'APAt',
      ODF: '1.5',
      groupName: 'SV45Xv2',
    },
  ],
}))
api.get('/api/ojs/licenseList', res({
  data: [
    { id: 1,
      name: 'DEVICETEST1',
      deviceHash: 'FFJFLFJLFJELFIEFJDJGGJOJGDFKLGJLKGJLGREGRGSEG',
      serviceCount: 1,
      license: 'sdffffffffffffffffffffffff',
      isTrainingDevice: true,
      isActivate: true,
    },
    { id: 2,
      name: 'DEVICETEST2',
      deviceHash: 'FFJFLFJLFJELFIEFJDJGGJOJGDFKLGJLKGJLGREGRGSEG',
      serviceCount: 2,
      license: 'dddddddddddddddasffffffffffffffffff',
      isTrainingDevice: false,
      isActivate: false,
    },
    { id: 3,
      name: 'DEVICETEST3',
      deviceHash: 'FFJFLFJLFJELFIEFJDJGGJOJGDFKLGJLKGJLGREGRGSEG',
      serviceCount: 3,
      license: '',
      isTrainingDevice: false,
      isActivate: false,
    },
    { id: 4,
      name: 'DEVICETEST4',
      deviceHash: 'FFJFLFJLFJELFIEFJDJGGJOJGDFKLGJLKGJLGREGRGSEG',
      serviceCount: 6,
      license: '',
      isTrainingDevice: false,
      isActivate: false,
    },
  ],
}))
api.get('/api/ojs/userEmail', res({
  data: {
    eMail: '535345345@163.com',
  },
}))

api.post('/labeling/images', {
  code: 200000,
  msg: 'success',
  result: [
    {
      imageId: 1,
      name: 'image1',
      path: '/PROCESS5_T5A466Q04PB_PRODUCT5_248.050_-465.929_O_M_20160701_image5.jpg',
      isLabeled: true,
    },
    {
      imageId: 2,
      name: 'image2',
      path: '/PROCESS5_T5A466Q04PB_PRODUCT5_248.050_-465.929_O_M_20160701_image5.jpg',
      isLabeled: true,
    },
    {
      imageId: 3,
      name: 'image3',
      path: '/PROCESS5_T5A466Q04PB_PRODUCT5_248.050_-465.929_O_M_20160701_image5.jpg',
      isLabeled: false,
    },
  ],
})

api.get('/labeling/image/search', {
  code: 200000,
  message: 'Success',
  result: {
    members: {
      process: {
        elements: [
          {
            members: {
              processId: {
                value: 638,
              },
              processName: {
                value: 'PRODUCT5',
              },
            },
          },
          {
            members: {
              processId: {
                value: 656,
              },
              processName: {
                value: 'PRODUCT6',
              },
            },
          },
        ],
      },
      product: {
        elements: [
          {
            members: {
              productId: {
                value: 647,
              },
              productName: {
                value: 'PROCESS1',
              },
            },
          },
          {
            members: {
              productId: {
                value: 648,
              },
              productName: {
                value: 'PROCESS2',
              },
            },
          },
        ],
      },
      defect: {
        elements: [
          {
            members: {
              defectId: {
                value: 295,
              },
              defectCode: {
                value: '中文27',
              },
            },
          },
          {
            members: {
              defectId: {
                value: 296,
              },
              defectCode: {
                value: 'test1503989062619',
              },
            },
          },
          {
            members: {
              defectId: {
                value: 297,
              },
              defectCode: {
                value: 'test1503989062619_9',
              },
            },
          },
          {
            members: {
              defectId: {
                value: 299,
              },
              defectCode: {
                value: 'test1503989161252',
              },
            },
          },
        ],
      },
    },
  },
})

api.get('/labeling/image/defect/info?imagePath=D:/adc/image2/PROCESS5_T5A466Q04PB_PRODUCT5_248.050_-465.929_O_M_20160701_image5.jpg', {
  code: 200000,
  message: 'Success',
  result: {
    members: {
      defectInfo: {
        value: '[{"coordinate": ["15.1_25.2_35.3_45.4","10.01_20.02_30.03_40.04"],"defectId": 207, "defectCode": "test",  "preview": ["base64: test","base64: test"]},{"coordinate": ["1.11_2.22_30.33_40.41"],"defectId": 208, "defectCode": "test2",  "preview": ["base64: test"]}]',
      },
    },
  },
})

// 新增defectCode
api.post('/labeling/defect', {
  code: 200000,
  message: 'success',
  result: 200,
})

// 快捷键获取
api.get('/labeling/shortcuts', {
  code: 200000,
  message: 'Success',
  result: {
    add: 76,
    next: 39,
    previous: 37,
    zoomIn: 187,
    save: 13,
    zoomOut: 189,
    delete: 46,
  },
})

// 快捷键更新
api.put('/labeling/shortcuts', {
  code: 200000,
  message: 'success',
  result: {
    add: 76,
    next: 39,
    previous: 37,
    zoomIn: 187,
    save: 13,
    zoomOut: 189,
    delete: 46,
  },
})
