import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import './style.less';

const SubMenu = Menu.SubMenu;
const Sider = props => (
  <div className={'sider'}>
    <Menu
      onClick={props.handleClick}
      openKeys={props.openKeys}
      selectedKeys={[props.selectedKeys]}
      onOpenChange={props.onOpenChange}
      mode="inline"
    >
      <SubMenu key="ProductOtherSetting" title={<span><Icon type="tool" /><span>机种管理</span></span>}>
        <Menu.Item key="ProductOtherSetting"><Link to="/ProductOtherSetting">产品别设定</Link></Menu.Item>
        <Menu.Item key="DepartSetting"><Link to="/DepartSetting">系列别设定</Link></Menu.Item>
        <Menu.Item key="MachineCodeSetting"><Link to="/MachineCodeSetting">机种简码设定</Link></Menu.Item>
        <Menu.Item key="PCBCodeSetting"><Link to="/PCBCodeSetting">PCB简码设定</Link></Menu.Item>
        <Menu.Item key="ProductSetting"><Link to="/ProductSetting">产品设定</Link></Menu.Item>
        <Menu.Item key="ProductBasicSetting"><Link to="/ProductBasicSetting">产品基本设定</Link></Menu.Item>
        <Menu.Item key="ProjectParamSetting"><Link to="/ProjectParamSetting">工程参数设定</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="RM" title={<span><Icon type="tool" /><span>配方管理</span></span>}>
        <Menu.Item key="RMPatternConf"><Link to="/RMPatternConf ">机台参数配置</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="BOM" title={<span><Icon type="tool" /><span>电子BOM管理</span></span>}>
        <SubMenu key="BomManage" title="BOM管理">
          <Menu.Item key="BomSearch"><Link to="/BomSearch">BOM查询</Link></Menu.Item>
          <Menu.Item key="BomProduct"><Link to="/BomProduct">BOM制作</Link></Menu.Item>
          <Menu.Item key="BomAudit"><Link to="/BomAudit">BOM审核</Link></Menu.Item>
          <Menu.Item key="BomMaintain"><Link to="/BomMaintain">BOM维护</Link></Menu.Item>
          <Menu.Item key="BomRecordSearch"><Link to="/BomRecordSearch">对料记录查询</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="InstructorManage" title="作业指导书管理">
          <Menu.Item key="BomInstSearch"><Link to="/BomInstSearch">查询</Link></Menu.Item>
          <Menu.Item key="BomInstProduct"><Link to="/BomInstProduct">制作</Link></Menu.Item>
          <Menu.Item key="BomInstAudit"><Link to="/BomInstAudit">审核</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="RateMaintain"><Link to="/RateMaintain">rate维护</Link></Menu.Item>
      </SubMenu>
      {/* <SubMenu key="smmWorkOrder" title={<span><Icon type="tool" /><span>工单管理</span></span>}>
        <Menu.Item key="smmWorkOrderSearch"><Link to="/smmWorkOrderSearch"> 工单状态</Link></Menu.Item>
        <Menu.Item key="smmWorkOrderLifeCycle"><Link to="/smmWorkOrderLifeCycle"> 工单生命周期</Link></Menu.Item>
      </SubMenu> */}
      <SubMenu key="RoutingManager" title={<span><Icon type="tool" /><span>途程管理</span></span>}>
        {/* <Menu.Item key="RuleSetting"><Link to="/RuleSetting">规则设定</Link></Menu.Item>
        <Menu.Item key="RuleDetailSetting"><Link to="/RuleDetailSetting">规则详情设定</Link></Menu.Item>
        <Menu.Item key="RuleSearch"><Link to="/RuleSearch">规则查询</Link></Menu.Item> */}
        <Menu.Item key="RuleNodeSetting"><Link to="/RuleNodeSetting">规则节点设定</Link></Menu.Item>
        <Menu.Item key="RuleSetting1"><Link to="/RuleSetting1">规则设定</Link></Menu.Item>
        <Menu.Item key="RuleSearch1"><Link to="/RuleSearch1">规则查询</Link></Menu.Item>
        <Menu.Item key="StationRule"><Link to="/StationRule">工作站-规则关联设定</Link></Menu.Item>
        <Menu.Item key="RoutingManager1"><Link to="/RoutingSetting1">途程设定</Link></Menu.Item>
        <Menu.Item key="RoutingGroup"><Link to="/RoutingGroup">途程查询</Link></Menu.Item>
        <Menu.Item key="ProductRouting"><Link to="/ProductRouting">产品-途程关联设定</Link></Menu.Item>
        {/* <Menu.Item key="RoutingManager"><Link to="/RoutingSetting">途程设定</Link></Menu.Item>
        <Menu.Item key="RoutingDetailSetting"><Link to="/RoutingDetailSetting">途程详情设定</Link></Menu.Item> */}
      </SubMenu>
      <SubMenu key="OrderManager" title={<span><Icon type="tool" /><span>工单管理</span></span>}>
        <Menu.Item key="OrderSetting"><Link to="/OrderSetting">工单设定</Link></Menu.Item>
        <Menu.Item key="SerialnumSetting"><Link to="/SerialnumSetting">在制品序号设定</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="smmWarehouseManage" title={<span><Icon type="tool" /><span>仓库管理</span></span>}>
        <SubMenu key="smmReport" title="报表">
          <Menu.Item key="addRecordSearch">
            <Link to="/smmAddRecordSearch">入库记录查询</Link>
          </Menu.Item>
          <Menu.Item key="inventoryRecord">
            <Link to="/smmInventoryRecord">库存查询</Link>
          </Menu.Item>
          <Menu.Item key="deliveryOfCargoFromStorage">
            <Link to="/smmDeleteRecordSearch">出库记录查询</Link>
          </Menu.Item>
          <Menu.Item key="smmMaterialTraySearch">
            <Link to="/smmMaterialTraySearch">料盘查询</Link>
          </Menu.Item>
          <Menu.Item key="smmPickMaterialSearch">
            <Link to="/smmPickMaterialSearch">接料查询</Link>
          </Menu.Item>
          <Menu.Item key="smmPCBTrack">
            <Link to="/smmPCBTrack">PCB追踪</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="prepareMaterialCondition">
          <Link to="/smmPrepareMaterialCondition">发料状态查询</Link>
        </Menu.Item>
        <Menu.Item key="smmUnbindStockCar"><Link to="/smmUnbindStockCar">解绑备料车</Link></Menu.Item>
        <Menu.Item key="smmAddWorkOrder"><Link to="/smmAddWorkOrder">增加SAP物料清單</Link></Menu.Item>
        <Menu.Item key="smmWarehouseSetting"><Link to="/smmWarehouseSetting">仓库设定</Link></Menu.Item>
        <Menu.Item key="smmBinSetting"><Link to="/smmBinSetting">仓库储位设定</Link></Menu.Item>
        <Menu.Item key="smmWarehousePartition"><Link to="/smmWarehousePartition">小仓库划分</Link></Menu.Item>
        <Menu.Item key="cangjiawei">
          <Link to="/smmCangjiawei">尾数仓架位管理</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="smm" title={<span><Icon type="tool" /><span>原材料管理</span></span>}>
        {/* <SubMenu key="smmWarehouseManage" title="仓库管理">
          <SubMenu key="smmReport" title="报表">
            <Menu.Item key="addRecordSearch">
              <Link to="/smmAddRecordSearch">入库记录查询</Link>
            </Menu.Item>
            <Menu.Item key="inventoryRecord">
              <Link to="/smmInventoryRecord">库存查询</Link>
            </Menu.Item>
            <Menu.Item key="deliveryOfCargoFromStorage">
              <Link to="/smmDeleteRecordSearch">出库记录查询</Link>
            </Menu.Item>
            <Menu.Item key="smmMaterialTraySearch">
              <Link to="/smmMaterialTraySearch">料盘查询</Link>
            </Menu.Item>
            <Menu.Item key="smmPickMaterialSearch">
              <Link to="/smmPickMaterialSearch">接料查询</Link>
            </Menu.Item>
            <Menu.Item key="smmPCBTrack">
              <Link to="/smmPCBTrack">PCB追踪</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="prepareMaterialCondition">
            <Link to="/smmPrepareMaterialCondition">发料状态查询</Link>
          </Menu.Item>
          <Menu.Item key="smmUnbindStockCar"><Link to="/smmUnbindStockCar">解绑备料车</Link></Menu.Item>
          <Menu.Item key="smmAddWorkOrder"><Link to="/smmAddWorkOrder">增加SAP物料清單</Link></Menu.Item>
          <Menu.Item key="smmWarehouseSetting"><Link to="/smmWarehouseSetting">仓库设定</Link></Menu.Item>
          <Menu.Item key="smmBinSetting"><Link to="/smmBinSetting">仓库储位设定</Link></Menu.Item>
          <Menu.Item key="smmWarehousePartition"><Link to="/smmWarehousePartition">小仓库划分</Link></Menu.Item>
          <Menu.Item key="cangjiawei">
            <Link to="/smmCangjiawei">尾数仓架位管理</Link>
          </Menu.Item>
        </SubMenu> */}
        <SubMenu key="smmPreProcessManage" title="预加工管理">
          <Menu.Item key="smmPreProcessSchedule"><Link to="/smmPreProcessSchedule">预加工排程</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="smmStockManage" title="备料区管理">
          <Menu.Item key="smmMaterialCarMerge">
            <Link to="/smmMaterialCarMerge">接料</Link>
          </Menu.Item>
          <Menu.Item key="smmAutoUpFeeder">
            <Link to="/smmAutoUpFeeder">自动上Feeder</Link>
          </Menu.Item>
          <Menu.Item key="SMMUnbindFeeder">
            <Link to="/SMMUnbindFeeder">解绑Feeder</Link>
          </Menu.Item>
          <Menu.Item key="smmStockSchedule">
            <Link to="/smmStockSchedule">备料进度</Link>
          </Menu.Item>
          <Menu.Item key="smmReturnStockSchedule">
            <Link to="/smmReturnStockSchedule">退料进度</Link>
          </Menu.Item>
          <Menu.Item key="smmReturnStockScheduleDebit">
            <Link to="/smmReturnStockScheduleDebit">扣账进度</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="smmSetting" title="原材料管理设置">
          <Menu.Item key="moveLabelSet">
            <Link to="/smmMoveLabelSet">可移动标签管理</Link>
          </Menu.Item>
          <Menu.Item key="skipCarManage">
            <Link to="/smmSkipCarManage">料车管理</Link>
          </Menu.Item>
          <Menu.Item key="fictitious_modual">
            <Link to="/smmFictitious_modual">虚拟模组管理</Link>
          </Menu.Item>
          <Menu.Item key="CellLibraryManage">
            <Link to="/smmCellLibraryManage">元件库管理</Link>
          </Menu.Item>
          <Menu.Item key="systemSeting">
            <Link to="/smmSystemSeting">系统设置</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="smmFeeder" title="Feeder管理">
          <Menu.Item key="feedManage">
            <Link to="/smmFeedManage">Feeder管理</Link>
          </Menu.Item>
          <Menu.Item key="feedCook">
            <Link to="/smmFeedCook">Feeder缓存区架位管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="smmWork" title="原材料作业">
          <Menu.Item key="smmReceivingWork"><Link to="/smmReceivingWork">收料作业</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="smmWorkOrder" title="工单管理">
          <Menu.Item key="smmWorkOrderSearch"><Link to="/smmWorkOrderSearch"> 工单状态</Link></Menu.Item>
          <Menu.Item key="smmWorkOrderLifeCycle"><Link to="/smmWorkOrderLifeCycle"> 工单生命周期</Link></Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="pcb" title={<span><Icon type="tool" /><span>PCB</span></span>}>
        <SubMenu key="pcbStoreManager" title="仓库管理">
          <Menu.Item key="pcbStorePD"><Link to="/pcbStorePD">库存盘点</Link></Menu.Item>
          <Menu.Item key="pcbStoreDiscard"><Link to="/pcbStoreDiscard">库存报废</Link></Menu.Item>
          <Menu.Item key="pcbStoreDebit"><Link to="/pcbStoreDebit">库存扣账</Link></Menu.Item>
          <SubMenu key="pcbReportSearch" title="报表查询">
            <Menu.Item key="pcbPutStore"><Link to="/pcbPutStore">入库历史查询</Link></Menu.Item>
            <Menu.Item key="pcbOutStore"><Link to="/pcbOutStore">出库历史查询</Link></Menu.Item>
            <Menu.Item key="pcbDiscardHistory"><Link to="/pcbDiscardHistory">报废历史查询</Link></Menu.Item>
            <Menu.Item key="pcbStoreDetail"><Link to="/pcbStoreDetail">库存详情查询</Link></Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="pcbMonitorModule" title="监控平台">
          {/* <Menu.Item key="pcbShelfMonitor"><Link to="/pcbShelfMonitor">架位监控</Link></Menu.Item> */}
          <Menu.Item key="pcbKWMonitor"><Link to="/pcbKWMonitor">库位监控</Link></Menu.Item>
          <Menu.Item key="pcbOuttimeMonitor"><Link to="/pcbOuttimeMonitor">超期监控</Link></Menu.Item>
          <Menu.Item key="pcbBLMonitor"><Link to="/pcbBLMonitor">备料监控</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="pcbSystemConfig" title="系统配置">
          <Menu.Item key="pcbParamConfig"><Link to="/pcbParamConfig">参数配置</Link></Menu.Item>
          {/* <Menu.Item key="pcbShelfConfig"><Link to="/pcbShelfConfig">架位配置</Link></Menu.Item> */}
          <Menu.Item key="pcbNewShelfConfig"><Link to="/pcbNewShelfConfig">标签配置</Link></Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="jig" title={<span><Icon type="tool" /><span>治工具管理</span></span>}>
        <Menu.Item key="JigAlertPage"><Link to="/JigAlertPage">实时监控</Link></Menu.Item>
        <Menu.Item key="JigShelfManagePage"><Link to="/JigShelfManagePage">架位管理</Link></Menu.Item>

        <SubMenu key="jigSetting" title="治具管理设定">
          <Menu.Item key="jigTypeSetting"><Link to="/jigTypeSetting">治工具类型设定</Link></Menu.Item>
          <Menu.Item key="JigTypeGroupSetting"><Link to="/JigTypeGroupSetting">治工具类型群组设定</Link></Menu.Item>
          <Menu.Item key="jigCheckProjectSetting"><Link to="/jigCheckProjectSetting">治工具检验项目设定</Link></Menu.Item>
          <Menu.Item key="jigCheckGroupSetting"><Link to="/jigCheckGroupSetting">治工具检验群组设定</Link></Menu.Item>
          <Menu.Item key="JigMaintainSetting"><Link to="/JigMaintainSetting">治工具保养项目设定</Link></Menu.Item>
          <Menu.Item key="JigMaintainGroupSetting"><Link to="/JigMaintainGroupSetting">治工具保养群组设定</Link></Menu.Item>
          <Menu.Item key="jigScrapReasonSetting"><Link to="/jigScrapReasonSetting">治工具报废原因设定</Link></Menu.Item>
          <Menu.Item key="JigScrapGroupSetting"><Link to="/JigScrapGroupSetting">治工具报废群组设定</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="jigUse" title="使用管理">
          <Menu.Item key="jigUseManager"><Link to="/jigUseManager">治具作业</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="jigSearch" title="综合查询">
          <Menu.Item key="storeRecord">
            <Link to="/jigStoreRecord">库存记录</Link>
          </Menu.Item>
          <Menu.Item key="useRecord">
            <Link to="/jigUseRecordoverall">使用记录</Link>
          </Menu.Item>
          <Menu.Item key="inspectionRecord">
            <Link to="/jigInspectionRecord">检测记录</Link>
          </Menu.Item>
          <Menu.Item key="upkeep">
            <Link to="/jigUpkeep">保养记录</Link>
          </Menu.Item>
          <Menu.Item key="maintenanceRecord">
            <Link to="/jigMaintenanceRecord">维修记录</Link>
          </Menu.Item>
          <Menu.Item key="scrapRecord">
            <Link to="/jigScrapRecord">报废记录</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="jigConf" title="系统配置">
          <Menu.Item key="PWBShelfConfig">
            <Link to="/jigPWBShelfConfig">架位配置</Link>
          </Menu.Item>
          <Menu.Item key="useRecord">
            <Link to="/jigUseRecord">参数配置</Link>
          </Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="EQM" title={<span><Icon type="tool" /><span>设备管理</span></span>}>
        <SubMenu key="EQManage" title="设备管理">
          <Menu.Item key="EQMTypeSet"><Link to="/EQMTypeSet">类型配置</Link></Menu.Item>
          <Menu.Item key="EQMComType"><Link to="/EQMComType">通讯类型</Link></Menu.Item>
          <Menu.Item key="EQMModSet"><Link to="/EQMModSet">型号配置</Link></Menu.Item>
          <Menu.Item key="EQMGrpMng"><Link to="/EQMGrpMng">群组配置</Link></Menu.Item>
          <Menu.Item key="EQMEqReg"><Link to="/EQMEqReg">设备登记</Link></Menu.Item>
          <Menu.Item key="ConfSearch"><Link to="/ConfSearch">机型配置</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="EQMFaultMaintMng" title="故障及维修">
          <Menu.Item key="EQMErrorCodeSet"><Link to="/EQMErrorCodeSet">错误码配置</Link></Menu.Item>
          <Menu.Item key="EQMFaultMng"><Link to="/EQMFaultMng">故障项管理</Link></Menu.Item>
          <Menu.Item key="EQMMaintGrpMng"><Link to="/EQMMaintGrpMng">故障群组管理</Link></Menu.Item>
          <Menu.Item key="EQMSolveMng"><Link to="/EQMSolveMng">解决方案项管理</Link></Menu.Item>
          <Menu.Item key="EQMSolveGrpMng"><Link to="/EQMSolveGrpMng">解决方案群组管理</Link></Menu.Item>
          {/* <Menu.Item key="EQMFaultSovSet"><Link to="/EQMFaultSovSet">故障对应解决方案配置</Link></Menu.Item> */}
          <Menu.Item key="EQMFaultRepMng"><Link to="/EQMFaultRepMng">设备报修</Link></Menu.Item>
          <Menu.Item key="EQMMaintMng"><Link to="/EQMMaintMng">设备维修</Link></Menu.Item>
          <Menu.Item key="EQMResaveSure"><Link to="/EQMResaveSure">验收确认</Link></Menu.Item>
          <Menu.Item key="EQMListSearch"><Link to="/EQMListSearch">记录查询</Link></Menu.Item>
          <Menu.Item key="EQMFaultStat"><Link to="/EQMFaultStat">故障统计</Link></Menu.Item>
          <Menu.Item key="EQMMaintStat"><Link to="/EQMMaintStat">维修统计</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="EQMMaintChec" title="点检及保养">
          <Menu.Item key="EQMMaintChecSet"><Link to="/EQMMaintChecSet">点检及保养项设置</Link></Menu.Item>
          <Menu.Item key="EQMMaintChecBOM"><Link to="/EQMMaintChecBOM">点检及保养项BOM</Link></Menu.Item>
          <Menu.Item key="EQMPeriodSet"><Link to="/EQMPeriodSet">保养周期设置</Link></Menu.Item>
          <Menu.Item key="EQMMaintChecOPT"><Link to="/EQMMaintChecOPT">点检保养操作</Link></Menu.Item>
          <Menu.Item key="EQMMaintChecHisSearch"><Link to="/EQMMaintChecHisSearch">点检保养记录查询</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="EQMScrapMng" title="设备报废">
          <Menu.Item key="EQMScrapSet"><Link to="/EQMScrapSet">报废项配置</Link></Menu.Item>
          <Menu.Item key="EQMScrapGrpSet"><Link to="/EQMScrapGrpSet">报废群组配置</Link></Menu.Item>
          {/* <Menu.Item key="EQMScrapMng"><Link to="/EQMScrapMng">设备报废</Link></Menu.Item> */}
          <Menu.Item key="EQMScrapMngHisSearch"><Link to="/EQMScrapMngHisSearch">设备报废</Link></Menu.Item>
          <Menu.Item key="EQMScrapStat"><Link to="/EQMScrapStat">报废统计</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="EQMPartMng" title="零件管理">
          <Menu.Item key="EQMPartTypeSet"><Link to="/EQMPartTypeSet">零件类型配置</Link></Menu.Item>
          <Menu.Item key="EQMPartModSet"><Link to="/EQMPartModSet">零件型号配置</Link></Menu.Item>
          <Menu.Item key="EQMInvMng"><Link to="/EQMInvMng">设备关键零件配置</Link></Menu.Item>
          <Menu.Item key="EQMInkuSet"><Link to="/EQMInkuSet">入库管理</Link></Menu.Item>
          <Menu.Item key="EQMUseSet"><Link to="/EQMUseSet">使用管理</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="EQMProdStat" title="生产统计">
          <Menu.Item key="EQMRealTimeBoard"><Link to="/EQMRealTimeBoard">实时看板</Link></Menu.Item>
          <Menu.Item key="EQMUtilizationRate"><Link to="/EQMUtilizationRate">稼动率</Link></Menu.Item>
          <Menu.Item key="EQMAllAnalysis"><Link to="/EQMAllAnalysis">全局设备效率（OEE）</Link></Menu.Item>
          <Menu.Item key="EQMMachineBad"><Link to="/EQMMachineBad">预警信息</Link></Menu.Item>
          <Menu.Item key="EQMMachineAbnor"><Link to="/EQMMachineAbnor">设备异常</Link></Menu.Item>
          <Menu.Item key="EQMDatasSearch"><Link to="/EQMDatasSearch">数据查询</Link></Menu.Item>
          <Menu.Item key="EQMPlanConfig"><Link to="/EQMPlanConfig">产线计划配置</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="EQMBasicSet" title="基础配置">
          <Menu.Item key="EQMParamConfig"><Link to="/EQMParamConfig">参数配置</Link></Menu.Item>
          <Menu.Item key="EQMSupplierConfig"><Link to="/EQMSupplierConfig">供应商配置</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="EQMPrevMaint" title="预防维护">
          <Menu.Item key="EQMEqMaint"><Link to="/EQMEqMaint">设备维修</Link></Menu.Item>
          <Menu.Item key="EQMEqScrap"><Link to="/EQMEqScrap">设备报废</Link></Menu.Item>
          <Menu.Item key="EQMKeyParts"><Link to="/EQMKeyParts">关键零件</Link></Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="LM" title={<span><Icon type="tool" /><span>产线管理</span></span>}>
        <Menu.Item key="LMFctTypeSet"><Link to="/LMFctTypeSet">厂别配置</Link></Menu.Item>
        <Menu.Item key="LMZoneTypeSet"><Link to="/LMZoneTypeSet">区域配置</Link></Menu.Item>
        <Menu.Item key="LMLineTypeSet"><Link to="/LMLineTypeSet">线别配置</Link></Menu.Item>
        <Menu.Item key="LineConf"><Link to="/LineConf">线体管理</Link></Menu.Item>
        <SubMenu key="LMSet" title="工作站配置">
          <Menu.Item key="LMSegTypeSet"><Link to="/LMSegTypeSet">段别配置</Link></Menu.Item>
          <Menu.Item key="LMGrpTypeSet"><Link to="/LMGrpTypeSet">组别配置</Link></Menu.Item>
          <Menu.Item key="LMStatTypeSet"><Link to="/LMStatTypeSet">站别配置</Link></Menu.Item>
          <Menu.Item key="LMStatSet"><Link to="/LMStatSet">工作站配置</Link></Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="IntelligentManagement" title={<span><Icon type="tool" /><span>智能换线管理</span></span>}>
        {/* <Menu.Item key="LineConfiguration"><Link to="/LineConfiguration">线体配置</Link></Menu.Item> */}
        <Menu.Item key="LineChangeInformation"><Link to="/LineChangeInformation">换线信息监控</Link></Menu.Item>
        {/* <Menu.Item key="LineMachineProgramQuery"><Link to="/LineMachineProgramQuery">机台程式查询</Link></Menu.Item> */}
      </SubMenu>
      <SubMenu key="lineBOM" title={<span><Icon type="tool" /><span>主线首件报表</span></span>}>
        <Menu.Item key="lineBOMSearch"><Link to="/lineBOMSearch">电子料表查询</Link></Menu.Item>
        <Menu.Item key="lineBOMChecHis"><Link to="/lineBOMChecHis">对料记录查询</Link></Menu.Item>
      </SubMenu>
      {/* <SubMenu key="monitor" title={<span><Icon type="tool" /><span>生产监控</span></span>}>
        <Menu.Item key="pdtManage"><Link to="/pdtManage">生产管理</Link></Menu.Item>
        <Menu.Item key="qtManage"><Link to="/qtManage">品质管理</Link></Menu.Item>
        <Menu.Item key="macManage"><Link to="/macManage">设备管理</Link></Menu.Item>
        <Menu.Item key="lgtManage"><Link to="/lgtManage">物流管理</Link></Menu.Item>
        <Menu.Item key="pdtPanel"><Link to="/pdtPanel">产线看板</Link></Menu.Item>
      </SubMenu> */}
      <SubMenu key="SPC" title={<span><Icon type="tool" /><span>SPC</span></span>}>
        <SubMenu key="Variable" title="计量值">
          <Menu.Item key="SPCCpk"><Link to="/SPCCpk">CPK趋势图</Link></Menu.Item>
          <Menu.Item key="SPCXBarR"><Link to="/SPCXBarR">平均值全距管制图</Link></Menu.Item>
          <Menu.Item key="SPCXBarS"><Link to="/SPCXBarS">平均值标准差管制图</Link></Menu.Item>
          <Menu.Item key="SPCXMr"><Link to="/SPCXMr">个别移动全距管制图</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="Attribute" title="计数值">
          <Menu.Item key="SPCP"><Link to="/SPCP">不良率管制图</Link></Menu.Item>
          <Menu.Item key="SPCNP"><Link to="/SPCNP">不良数管制图</Link></Menu.Item>
          <Menu.Item key="SPCYield"><Link to="/SPCYield">良率管制图</Link></Menu.Item>
          <Menu.Item key="SPCC"><Link to="/SPCC">缺点数管制图</Link></Menu.Item>
          <Menu.Item key="SPCU"><Link to="/SPCU">单位缺点数管制图</Link></Menu.Item>
          <Menu.Item key="SPCDPMO"><Link to="/SPCDPMO">百万缺点数管制图</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="SettingPage" title="设定页面">
          <Menu.Item key="SPCPreferenceSetting"><Link to="/SPCPreferenceSetting">喜好设定</Link></Menu.Item>
          <Menu.Item key="SPCChartSetting"><Link to="/SPCChartSetting">图表类型设定</Link></Menu.Item>
          <Menu.Item key="SPCRuleSetting"><Link to="/SPCRuleSetting">规则设定</Link></Menu.Item>
          <Menu.Item key="SPCGradeSetting"><Link to="/SPCGradeSetting">评等设定</Link></Menu.Item>
          <Menu.Item key="SPCOccurrenceSetting"><Link to="/SPCOccurrenceSetting">发生现象设定</Link></Menu.Item>
          <Menu.Item key="SPCCauseSetting"><Link to="/SPCCauseSetting">异常原因设定</Link></Menu.Item>
          <Menu.Item key="SPCSolutionSetting"><Link to="/SPCSolutionSetting">处理方法设定</Link></Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="monitorWIP" title={<span><Icon type="tool" /><span>生产监控WIP</span></span>}>
        <Menu.Item key="WIPProduceMana"><Link to="/WIPProduceMana">生产力总览</Link></Menu.Item>
        <Menu.Item key="WIP"><Link to="/WIP">生产管理KPI</Link></Menu.Item>
        <Menu.Item key="WIPOEE"><Link to="/WIPOEE">OEE</Link></Menu.Item>
        <Menu.Item key="WIPQualityMana"><Link to="/WIPQualityMana">品质管理</Link></Menu.Item>
        <Menu.Item key="WIPProductionLineMana"><Link to="/WIPProductionLineMana">产线管理</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="System" title={<span><Icon type="tool" /><span>系统设置</span></span>}>
        <Menu.Item key="supplier"><Link to="/supplier">供应商</Link></Menu.Item>
      </SubMenu>
      <SubMenu key="Alarm" title={<span><Icon type="tool" /><span>Alarm</span></span>}>
        <Menu.Item key="AlarmUserSubMana"><Link to="/AlarmUserSubMana">用户订阅管理</Link></Menu.Item>
        <Menu.Item key="AlarmUserThemeRuleMana"><Link to="/AlarmUserThemeRuleMana">用户主题规则管理</Link></Menu.Item>
        <Menu.Item key="Alarmputmsg"><Link to="/Alarmputmsg">发布消息</Link></Menu.Item>
        <Menu.Item key="AlarmMsgList"><Link to="/AlarmMsgList">消息记录</Link></Menu.Item>
      </SubMenu>
    </Menu>
  </div>
);
Sider.defaultProps = {

};
Sider.propTypes = {

};

export default Sider;
