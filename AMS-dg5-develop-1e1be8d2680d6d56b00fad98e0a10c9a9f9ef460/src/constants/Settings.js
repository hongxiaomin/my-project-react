import lazyLoading from '../hocs/lazyLoading';

export default [
  {
    route: 'PartManage',
    title: '料号管理',
    component: lazyLoading(() => import('../routes/PartManage')),
  },
  {
    route: 'ProductManage',
    title: '机种管理',
    children: [
      {
        route: 'ProductSearch',
        title: '机种查询',
        component: lazyLoading(() => import('../routes/ProductManage/ProductSearch')),
      },
      {
        route: 'UPHSetting',
        title: 'UPH设定',
        component: lazyLoading(() => import('../routes/ProductManage/UPHSetting')),
      },
      {
        route: 'MachineHourSetting',
        title: '机器工时设定',
        component: lazyLoading(() => import('../routes/ProductManage/MachineHourSetting')),
      },
      {
        route: 'HumanHourSetting',
        title: '人力工时设定',
        component: lazyLoading(() => import('../routes/ProductManage/HumanHourSetting')),
      },
      {
        route: 'DotCountSetting',
        title: '点数设定',
        component: lazyLoading(() => import('../routes/ProductManage/DotCountSetting')),
      },
      {
        route: 'PCBSetting',
        title: 'PCB设定',
        component: lazyLoading(() => import('../routes/ProductManage/PCBSetting')),
      },
    ],
  },
  {
    route: 'UPMaterial',
    title: '上料料表',
    component: lazyLoading(() => import('../routes/Upmaterial')),
  },
  {
    route: 'DispatchMaterial',
    title: '发料料表',
    component: lazyLoading(() => import('../routes/DispatchMaterial')),
  },
  {
    route: 'ProBOM',
    title: '程式料表',
    children: [
      {
        route: 'BOMOI',
        title: '程式料表生成',
        component: lazyLoading(() => import('../routes/BOMOI')),
      },
      {
        route: 'AddDelMaterial',
        title: '新增/删除代用料',
        component: lazyLoading(() => import('../routes/AddDelMaterial')),
      },
      {
        route: 'ProBOMSearch',
        title: '程式料表查询',
        component: lazyLoading(() => import('../routes/ProBOMSearch')),
      },
    ],
  },
  {
    route: 'ProdMng',
    title: '成品管理',
    children: [
      {
        route: 'ProdChec',
        title: '成品抽检',
        children: [
          {
            route: 'BadRecordSearch',
            title: '不良记录查询',
            component: lazyLoading(() => import('../routes/ProdMng/ProdChec/BadRecordSearch')),
          },
        ],
      },
      {
        route: 'OfflineMng',
        title: '下线管理',
        children: [
          {
            route: 'AOISecChec',
            title: 'AOI二次确认',
            component: lazyLoading(() => import('../routes/ProdMng/OfflineMng/AOISecChec')),
          },
        ],
      }, {
        route: 'StockMng',
        title: '库存管理',
        children: [
          {
            route: 'StorageTimeoutAlarm',
            title: '存放超时预警',
            component: lazyLoading(() => import('../routes/ProdMng/StockMng/StorageTimeoutAlarm')),
          },
          {
            route: 'WaterLevelAlarm',
            title: '水位预警',
            component: lazyLoading(() => import('../routes/ProdMng/StockMng/WaterLevelAlarm')),
          },
          {
            route: 'StockSearch',
            title: '库存查询',
            component: lazyLoading(() => import('../routes/ProdMng/StockMng/StockSearch')),
          },
          {
            route: 'OutHisSearch',
            title: '出库记录查询',
            component: lazyLoading(() => import('../routes/ProdMng/StockMng/OutHisSearch')),
          },
        ],
      },
      {
        route: 'RepairMng',
        title: '维修管理',
        component: lazyLoading(() => import('../routes/ProdMng/RepairMng')),
      },
      {
        route: 'RepairStat',
        title: '维修统计',
        component: lazyLoading(() => import('../routes/ProdMng/RepairStat')),
      },
    ],
  },
  {
    route: 'OnlinePrinting',
    title: '在线列印',
    component: lazyLoading(() => import('../routes/OnlinPrinting')),
  },
];
