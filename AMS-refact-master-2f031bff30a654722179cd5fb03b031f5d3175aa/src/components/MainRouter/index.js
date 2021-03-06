/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import PropTypes from 'prop-types';
import AppStore from '../../store';
import Layout from '../../layout';
import LineBOMSearchPage from '../LineBOMSearchPage';
import LineBOMChecHisPage from '../LineBOMChecHisPage';
import SMMAddRecordSearch from '../SMMAddRecordSearch';
import SMMCellLibraryManage from '../SMMCellLibraryManage';
import SMMInventoryRecord from '../SMMInventoryRecord';
import SMMDeleteRecordSearch from '../SMMDeleteRecordSearch';
import SMMMaterialTraySearch from '../SMMMaterialTraySearch';
import SMMPickMaterialSearch from '../SMMPickMaterialSearch';
import SMMPCBTrack from '../SMMPCBTrack';
import SMMPrepareMaterialCondition from '../SMMPrepareMaterialCondition';
import SMMUnbindStockCar from '../SMMUnbindStockCar';
import SMMAddWorkOrder from '../SMMAddWorkOrder';
import SMMMES from '../SMMMES';
import SMMMoveLabelSet from '../SMMMoveLabelSet';
import SMMSkipCarManage from '../../containers/SMMSkipCarManageContainer';
import SMMFeedManage from '../SMMFeedManage';
import SMMFeedCook from '../SMMFeedCook';
import SMMCangjiawei from '../SMMCangjiawei';
import SMMPreProcessSchedule from '../smmPreProcessSchedule';
import SMMAutoUpFeeder from '../SMMAutoUpFeeder';
import SMMUnbindFeeder from '../SMMUnbindFeeder';
import SMMMaterialCarMerge from '../SMMMaterialCarMerge';
import SMMMaterialCarMergeOthers from '../../containers/SMMMaterialCarMergeOthersContainer';
import SMMAutoUpFeederOthers from '../../containers/SMMAutoUpFeederOthersContainer';
import SMMAutoUpFeederMES from '../../containers/SMMAutoUpFeederMESContainer';
import SMMStockSchedule from '../SMMStockSchedule';
import SMMReturnStockSchedule from '../SMMReturnStockSchedule';
import SMMReturnStockScheduleDebit from '../SMMReturnStockScheduleDebit';
import SMMFictitiousModual from '../SMMFictitiousModual';
import SMMSystemSeting from '../SMMSystemSeting';
import JigTypeSetting from '../JigTypeSetting';
import JigCheckGroupSetting from '../JigCheckGroupSetting';
import JigCheckProjectSetting from '../JigCheckProjectSetting';
import JigShelfManagePage from '../JigShelfManagePage';
import JigScrapReasonSetting from '../JigScrapReasonSetting';
import JigGroupSetting from '../JigGroupSetting';
import JigAlertPage from '../JigAlertPage';
import JigShelfLocationSetting from '../JigShelfLocationSetting';
import SMMRecWorkPage from '../../containers/SMMRecWorkPageContainer';
import SMMWorkOrderSearch from '../SMMWorkOrderSearch';
import SMMWorkOrderLifeCycle from '../SMMWorkOrderLifeCycle';
import SMMWarehouseSettingPage from '../SMMWarehouseSettingPage';
import SMMBinSettingPage from '../SMMBinSettingPage';
import SMMWarehousePartition from '../SMMWarehousePartition';
import JigTypeGroupSetting from '../JigTypeGroupSetting';
import JigMaintainSetting from '../JigMaintainSetting';
import JigMaintainGroupSetting from '../JigMaintainGroupSetting';
import JigScrapGroupSetting from '../JigScrapGroupSetting';
import JigWorkInventorySearchPage from '../JigWorkInventorySearchPage';
import JigWorkInShelfPage from '../JigWorkInShelfPage';
import JigStoreRecordPage from '../JigStoreRecordPage';
import JigUseRecordoverallPage from '../JigUseRecordoverallPage';
import JigInspectionRecordPage from '../JigInspectionRecordPage';
import JigUpkeepPage from '../JigUpkeepPage';
import JigMaintenanceRecordPage from '../JigMaintenanceRecordPage';
import JigScrapRecordPage from '../JigScrapRecordPage';
import JigShelfConfigPage from '../JigShelfConfigPage';
import JigUseRecordPage from '../JigUseRecordPage';
import JigSystemConfigPage from '../JigSystemConfigPage';
import JigUseManager from '../jigUseManager';
import BomSearch from '../BomSearch';
import BomProduct from '../BomProduct';
import BomMaintain from '../BomMaintain';
import BomAudit from '../BomAudit';
import BomRecordSearch from '../BomRecordSearch';
import BomInstSearch from '../BomInstSearch';
import BomInstProduct from '../BomInstProduct';
import BomInstAudit from '../BomInstAudit';
import RateMaintain from '../RateMaintain';
import LineConfiguration from '../LineConfiguration';
import LineChangeInformation from '../LineChangeInformation';
import LineMachineProgramQuery from '../LineMachineProgramQuery';
import SPClinkPage from '../SPClinkPage';
import Supplier from '../Supplier';
import PDTManage from '../PDTManage';
import PDTPanel from '../PDTPanel';
import LGTManage from '../LGTManage';
import QTManage from '../QTManage';
import MACManage from '../MACManage';
import RMPatternConf from '../RMPatternConf';
// import SPCAOIDangerSearch from '../SPCAOIDangerSearch';
// import SPCAOIRealMonitor from '../SPCAOIRealMonitor';
// import SPCAOIReportExport from '../SPCAOIReportExport';
// import SPCUChartSearch from '../SPCUChartSearch';
import SPCCpk from '../SPCCpk';
import SPCXBarR from '../SPCXBarR';
import SPCXBarS from '../SPCXBarS';
import SPCXMr from '../SPCXMr';
import SPCP from '../SPCP';
import SPCNP from '../SPCNP';
import SPCYield from '../SPCYield';
import SPCC from '../SPCC';
import SPCU from '../SPCU';
import SPCDPMO from '../SPCDPMO';
import SPCPreferenceSetting from '../SPCPreferenceSetting';
import SPCChartSetting from '../SPCChartSetting';
import SPCRuleSetting from '../SPCRuleSetting';
import SPCGradeSetting from '../SPCGradeSetting';
import SPCOccurrenceSetting from '../SPCOccurrenceSetting';
import SPCCauseSetting from '../SPCCauseSetting';
import SPCSolutionSetting from '../SPCSolutionSetting';
import WIPProduceMana from '../WIPProduceMana';
import WIP from '../WIP';
import WIPOEE from '../WIPOEE';
import WIPQualityMana from '../WIPQualityMana';
import WIPProductionLineMana from '../WIPProductionLineMana';
import PCBStorePD from '../PCBStorePD';
import PCBStoreDiscard from '../PCBStoreDiscard';
import PCBStoreDebit from '../PCBStoreDebit';
import PCBPutStore from '../PCBPutStore';
import PCBOutStore from '../PCBOutStore';
import PCBDiscardHistory from '../PCBDiscardHistory';
import PCBStoreDetail from '../PCBStoreDetail';
import PCBShelfMonitor from '../PCBShelfMonitor';
import PCBKWMonitor from '../PCBKWMonitor';
import PCBOuttimeMonitor from '../PCBOuttimeMonitor';
import PCBBLMonitor from '../PCBBLMonitor';
import PCBParamConfig from '../PCBParamConfig';
import PCBShelfConfig from '../PCBShelfConfig';
import PCBNewShelfConfig from '../PCBNewShelfConfig';
import JigCheckProjectSettingOld from '../JigCheckProjectSettingOld';
import EQMTypeSet from '../EQMTypeSet';
import EQMModSet from '../EQMModSet';
import EQMComType from '../EQMComType';
import EQMGrpMng from '../EQMGrpMng';
import EQMEqReg from '../EQMEqReg';
import EQMMaintChecSet from '../EQMMaintChecSet';
import EQMPeriodSet from '../EQMPeriodSet';
import EQMMaintChecBOM from '../EQMMaintChecBOM';
import EQMMaintChecOPT from '../EQMMaintChecOPT';
import EQMMaintChecHisSearch from '../EQMMaintChecHisSearch';
import EQMScrapSet from '../EQMScrapSet';
import EQMScrapMngHisSearch from '../EQMScrapMngHisSearch';
import EQMScrapStat from '../EQMScrapStat';
import EQMErrorCodeSet from '../EQMErrorCodeSet';
import EQMFaultMng from '../EQMFaultMng';
import EQMMaintGrpMng from '../EQMMaintGrpMng';
import EQMSolveMng from '../EQMSolveMng';
import EQMSolveGrpMng from '../EQMSolveGrpMng';
import EQMFaultRepMng from '../EQMFaultRepMng';
import EQMResaveSure from '../EQMResaveSure';
import EQMListSearch from '../EQMListSearch';
import EQMMaintMng from '../EQMMaintMng';
import EQMMaintStat from '../EQMMaintStat';
import EQMPartTypeSet from '../EQMPartTypeSet';
import EQMPartModSet from '../EQMPartModSet';
import EQMInvMng from '../EQMInvMng';
import EQMFctTypeSet from '../EQMFctTypeSet';
import EQMZoneTypeSet from '../EQMZoneTypeSet';
import EQMLineTypeSet from '../EQMLineTypeSet';
import EQMSegTypeSet from '../EQMSegTypeSet';
import EQMGrpTypeSet from '../EQMGrpTypeSet';
import EQMStatTypeSet from '../EQMStatTypeSet';
import EQMStatSet from '../EQMStatSet';
import EQMInkuSet from '../EQMInkuSet';
import EQMFaultStat from '../EQMFaultStat';
import EQMScrapGrpSet from '../EQMScrapGrpSet';
import EQMUseSet from '../EQMUseSet';
import EQMRealTimeBoard from '../EQMRealTimeBoard';
import EQMUtilizationRate from '../EQMUtilizationRate';
import EQMAllAnalysis from '../EQMAllAnalysis';
import EQMMachineBad from '../EQMMachineBad';
import EQMMachineAbnor from '../EQMMachineAbnor';
import EQMDatasSearch from '../EQMDatasSearch';
import EQMParamConfig from '../EQMParamConfig';
import EQMSupplierConfig from '../EQMSupplierConfig';
import ConfSearch from '../ConfSearch';
import LineConf from '../LineConf';
import EQMEqMaint from '../EQMEqMaint';
import EQMEqScrap from '../EQMEqScrap';
import EQMKeyParts from '../EQMKeyParts';
import EQMPlanConfig from '../EQMPlanConfig';
import ProductOtherSetting from '../ProductOtherSetting';
import DepartSetting from '../DepartSetting';
import MachineCodeSetting from '../MachineCodeSetting';
import PCBCodeSetting from '../PCBCodeSetting';
import ProductSetting from '../ProductSetting';
import ProductBasicSetting from '../ProductBasicSetting';
import WorkOrderSetting from '../WorkOrderSetting';
import RoutingSetting from '../RoutingSetting';
import SerialnumSetting from '../SerialnumSetting';
import RoutingDetailSetting from '../RoutingDetailSetting';
import ProductRoutingSetting from '../ProductRoutingSetting';
import StationRuleSetting from '../StationRuleSetting';
import ProjectParamSetting from '../ProjectParamSetting';
import RoutingGroup from '../RoutingGroup';
import RoutingSetting1 from '../RoutingSetting1';
import RuleSetting from '../RuleSetting';
import RuleDetailSetting from '../RuleDetailSetting';
import RuleSearch from '../RuleSearch';
import RuleSetting1 from '../RuleSetting1';
import RuleNodeSetting from '../RuleNodeSetting';
import RuleSearch1 from '../RuleSearch1';
import AlarmPutmsg from '../AlarmPutmsg';
import AlarmMsgList from '../AlarmMsgList';
import AlarmUserSubMana from '../AlarmUserSubMana';
import AlarmUserThemeRuleMana from '../AlarmUserThemeRuleMana';

import './style.less';

const MainRouter = props => (
  <Provider store={AppStore}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={LineBOMSearchPage} />
        {/* <Route path="/spcAOIDangerSearch" component={SPCAOIDangerSearch} />
        <Route path="/spcAOIRealMonitor" component={SPCAOIRealMonitor} />
        <Route path="/spcAOIReportExport" component={SPCAOIReportExport} />
        <Route path="/spcUChartSearch" component={SPCUChartSearch} /> */}
        <Route path="/LineConf" component={LineConf} />
        <Route path="/RMPatternConf" component={RMPatternConf} />
        <Route path="/ConfSearch" component={ConfSearch} />
        <Route path="/SPCCpk" component={SPCCpk} />
        <Route path="/SPCXBarR" component={SPCXBarR} />
        <Route path="/SPCXBarS" component={SPCXBarS} />
        <Route path="/SPCXMr" component={SPCXMr} />
        <Route path="/SPCP" component={SPCP} />
        <Route path="/SPCNP" component={SPCNP} />
        <Route path="/SPCYield" component={SPCYield} />
        <Route path="/SPCC" component={SPCC} />
        <Route path="/SPCU" component={SPCU} />
        <Route path="/SPCDPMO" component={SPCDPMO} />
        <Route path="/SPCPreferenceSetting" component={SPCPreferenceSetting} />
        <Route path="/SPCChartSetting" component={SPCChartSetting} />
        <Route path="/SPCRuleSetting" component={SPCRuleSetting} />
        <Route path="/SPCGradeSetting" component={SPCGradeSetting} />
        <Route path="/SPCOccurrenceSetting" component={SPCOccurrenceSetting} />
        <Route path="/SPCCauseSetting" component={SPCCauseSetting} />
        <Route path="/SPCSolutionSetting" component={SPCSolutionSetting} />
        <Route path="/WIPProduceMana" component={WIPProduceMana} />
        <Route path="/WIP" component={WIP} />
        <Route path="/WIPOEE" component={WIPOEE} />
        <Route path="/WIPQualityMana" component={WIPQualityMana} />
        <Route path="/WIPProductionLineMana" component={WIPProductionLineMana} />
        <Route path="/lineBOMSearch" component={LineBOMSearchPage} />
        <Route path="/lineBOMChecHis" component={LineBOMChecHisPage} />
        <Route path="/smmAddRecordSearch" component={SMMAddRecordSearch} />
        <Route path="/smmCellLibraryManage" component={SMMCellLibraryManage} />
        <Route path="/smmInventoryRecord" component={SMMInventoryRecord} />
        <Route path="/smmDeleteRecordSearch" component={SMMDeleteRecordSearch} />
        <Route path="/smmMaterialTraySearch" component={SMMMaterialTraySearch} />
        <Route path="/smmPickMaterialSearch" component={SMMPickMaterialSearch} />
        <Route path="/smmPCBTrack" component={SMMPCBTrack} />
        <Route path="/smmPrepareMaterialCondition" component={SMMPrepareMaterialCondition} />
        <Route path="/smmUnbindStockCar" component={SMMUnbindStockCar} />
        <Route path="/smmAddWorkOrder" component={SMMAddWorkOrder} />
        <Route path="/smmMES" component={SMMMES} />
        <Route path="/smmMoveLabelSet" component={SMMMoveLabelSet} />
        <Route path="/smmSkipCarManage" component={SMMSkipCarManage} />
        <Route path="/smmFeedManage" component={SMMFeedManage} />
        <Route path="/smmFeedCook" component={SMMFeedCook} />
        <Route path="/smmCangjiawei" component={SMMCangjiawei} />
        <Route path="/smmPreProcessSchedule" component={SMMPreProcessSchedule} />
        <Route path="/SMMAutoUpFeeder" component={SMMAutoUpFeeder} />
        <Route path="/SMMUnbindFeeder" component={SMMUnbindFeeder} />
        <Route path="/smmMaterialCarMerge" component={SMMMaterialCarMerge} />
        <Route path="/smmMaterialCarMergeOthers" component={SMMMaterialCarMergeOthers} />
        <Route path="/smmAutoUpFeederOthers" component={SMMAutoUpFeederOthers} />
        <Route path="/smmAutoUpFeederMES" component={SMMAutoUpFeederMES} />
        <Route path="/smmStockSchedule" component={SMMStockSchedule} />
        <Route path="/smmReturnStockSchedule" component={SMMReturnStockSchedule} />
        <Route path="/smmReturnStockScheduleDebit" component={SMMReturnStockScheduleDebit} />
        <Route path="/smmFictitious_modual" component={SMMFictitiousModual} />
        <Route path="/smmSystemSeting" component={SMMSystemSeting} />
        <Route path="/JigTypeGroupSetting" component={JigTypeGroupSetting} />
        <Route path="/JigMaintainSetting" component={JigMaintainSetting} />
        <Route path="/JigMaintainGroupSetting" component={JigMaintainGroupSetting} />
        <Route path="/JigScrapGroupSetting" component={JigScrapGroupSetting} />
        <Route path="/JigShelfManagePage" component={JigShelfManagePage} />
        <Route path="/JigAlertPage" component={JigAlertPage} />
        <Route path="/jigTypeSetting" component={JigTypeSetting} />
        <Route path="/jigCheckGroupSetting" component={JigCheckGroupSetting} />
        <Route path="/jigCheckProjectSetting" component={JigCheckProjectSettingOld} />
        <Route path="/jigScrapReasonSetting" component={JigScrapReasonSetting} />
        <Route path="/jigGroupSetting" component={JigGroupSetting} />
        <Route path="/jigShelfLocationSetting" component={JigShelfLocationSetting} />
        <Route path="/smmReceivingWork" component={SMMRecWorkPage} />
        <Route path="/smmWorkOrderSearch" component={SMMWorkOrderSearch} />
        <Route path="/smmWorkOrderLifeCycle" component={SMMWorkOrderLifeCycle} />
        <Route path="/smmWarehouseSetting" component={SMMWarehouseSettingPage} />
        <Route path="/smmBinSetting" component={SMMBinSettingPage} />
        <Route path="/smmWarehousePartition" component={SMMWarehousePartition} />
        <Route path="/jigWorkInventorySearch" component={JigWorkInventorySearchPage} />
        <Route path="/jigWorkInShelf" component={JigWorkInShelfPage} />
        <Route path="/jigStoreRecord" component={JigStoreRecordPage} />
        <Route path="/jigUseRecordoverall" component={JigUseRecordoverallPage} />
        <Route path="/jigInspectionRecord" component={JigInspectionRecordPage} />
        <Route path="/jigUpkeep" component={JigUpkeepPage} />
        <Route path="/jigMaintenanceRecord" component={JigMaintenanceRecordPage} />
        <Route path="/jigScrapRecord" component={JigScrapRecordPage} />
        <Route path="/jigPWBShelfConfig" component={JigShelfConfigPage} />
        <Route path="/jigUseRecord" component={JigUseRecordPage} />
        <Route path="/jigSystemConfig" component={JigSystemConfigPage} />
        <Route path="/BomSearch" component={BomSearch} />
        <Route path="/BomProduct" component={BomProduct} />
        <Route path="/BomMaintain" component={BomMaintain} />
        <Route path="/BomAudit" component={BomAudit} />
        <Route path="/BomRecordSearch" component={BomRecordSearch} />
        <Route path="/BomInstSearch" component={BomInstSearch} />
        <Route path="/BomInstProduct" component={BomInstProduct} />
        <Route path="/BomInstAudit" component={BomInstAudit} />
        <Route path="/RateMaintain" component={RateMaintain} />
        <Route path="/LineConfiguration" component={LineConfiguration} />
        <Route path="/LineChangeInformation" component={LineChangeInformation} />
        <Route path="/LineMachineProgramQuery" component={LineMachineProgramQuery} />
        <Route path="/SPClink" component={SPClinkPage} />
        <Route path="/supplier" component={Supplier} />
        <Route path="/jigUseManager" component={JigUseManager} />
        <Route path="/pdtPanel" component={PDTPanel} />
        <Route path="/pdtManage" component={PDTManage} />
        <Route path="/qtManage" component={QTManage} />
        <Route path="/lgtManage" component={LGTManage} />
        <Route path="/macManage" component={MACManage} />
        <Route path="/pcbStorePD" component={PCBStorePD} />
        <Route path="/pcbStoreDiscard" component={PCBStoreDiscard} />
        <Route path="/pcbStoreDebit" component={PCBStoreDebit} />
        <Route path="/pcbPutStore" component={PCBPutStore} />
        <Route path="/pcbOutStore" component={PCBOutStore} />
        <Route path="/pcbDiscardHistory" component={PCBDiscardHistory} />
        <Route path="/pcbStoreDetail" component={PCBStoreDetail} />
        <Route path="/pcbShelfMonitor" component={PCBShelfMonitor} />
        <Route path="/pcbKWMonitor" component={PCBKWMonitor} />
        <Route path="/pcbOuttimeMonitor" component={PCBOuttimeMonitor} />
        <Route path="/pcbBLMonitor" component={PCBBLMonitor} />
        <Route path="/pcbParamConfig" component={PCBParamConfig} />
        <Route path="/pcbShelfConfig" component={PCBShelfConfig} />
        <Route path="/pcbNewShelfConfig" component={PCBNewShelfConfig} />
        <Route path="/EQMTypeSet" component={EQMTypeSet} />
        <Route path="/EQMModSet" component={EQMModSet} />
        <Route path="/EQMComType" component={EQMComType} />
        <Route path="/EQMGrpMng" component={EQMGrpMng} />
        <Route path="/EQMEqReg" component={EQMEqReg} />
        <Route path="/EQMMaintChecSet" component={EQMMaintChecSet} />
        <Route path="/EQMPeriodSet" component={EQMPeriodSet} />
        <Route path="/EQMMaintChecBOM" component={EQMMaintChecBOM} />
        <Route path="/EQMMaintChecOPT" component={EQMMaintChecOPT} />
        <Route path="/EQMMaintChecHisSearch" component={EQMMaintChecHisSearch} />
        <Route path="/EQMScrapSet" component={EQMScrapSet} />
        <Route path="/EQMScrapMngHisSearch" component={EQMScrapMngHisSearch} />
        <Route path="/EQMScrapStat" component={EQMScrapStat} />
        <Route path="/EQMErrorCodeSet" component={EQMErrorCodeSet} />
        <Route path="/EQMFaultMng" component={EQMFaultMng} />
        <Route path="/EQMMaintGrpMng" component={EQMMaintGrpMng} />
        <Route path="/EQMSolveMng" component={EQMSolveMng} />
        <Route path="/EQMSolveGrpMng" component={EQMSolveGrpMng} />
        <Route path="/EQMFaultRepMng" component={EQMFaultRepMng} />
        <Route path="/EQMMaintMng" component={EQMMaintMng} />
        <Route path="/EQMResaveSure" component={EQMResaveSure} />
        <Route path="/EQMListSearch" component={EQMListSearch} />
        <Route path="/EQMPartTypeSet" component={EQMPartTypeSet} />
        <Route path="/EQMPartModSet" component={EQMPartModSet} />
        <Route path="/EQMInvMng" component={EQMInvMng} />
        <Route path="/LMFctTypeSet" component={EQMFctTypeSet} />
        <Route path="/LMZoneTypeSet" component={EQMZoneTypeSet} />
        <Route path="/LMLineTypeSet" component={EQMLineTypeSet} />
        <Route path="/LMSegTypeSet" component={EQMSegTypeSet} />
        <Route path="/LMGrpTypeSet" component={EQMGrpTypeSet} />
        <Route path="/LMStatTypeSet" component={EQMStatTypeSet} />
        <Route path="/LMStatSet" component={EQMStatSet} />
        <Route path="/EQMInkuSet" component={EQMInkuSet} />
        <Route path="/EQMFaultStat" component={EQMFaultStat} />
        <Route path="/EQMMaintStat" component={EQMMaintStat} />
        <Route path="/EQMScrapGrpSet" component={EQMScrapGrpSet} />
        <Route path="/EQMUseSet" component={EQMUseSet} />
        <Route path="/EQMRealTimeBoard" component={EQMRealTimeBoard} />
        <Route path="/EQMUtilizationRate" component={EQMUtilizationRate} />
        <Route path="/EQMAllAnalysis" component={EQMAllAnalysis} />
        <Route path="/EQMMachineBad" component={EQMMachineBad} />
        <Route path="/EQMMachineAbnor" component={EQMMachineAbnor} />
        <Route path="/EQMDatasSearch" component={EQMDatasSearch} />
        <Route path="/EQMParamConfig" component={EQMParamConfig} />
        <Route path="/EQMSupplierConfig" component={EQMSupplierConfig} />
        <Route path="/EQMEqMaint" component={EQMEqMaint} />
        <Route path="/EQMEqScrap" component={EQMEqScrap} />
        <Route path="/EQMKeyParts" component={EQMKeyParts} />
        <Route path="/EQMPlanConfig" component={EQMPlanConfig} />
        <Route path="/ProductOtherSetting" component={ProductOtherSetting} />
        <Route path="/DepartSetting" component={DepartSetting} />
        <Route path="/MachineCodeSetting" component={MachineCodeSetting} />
        <Route path="/PCBCodeSetting" component={PCBCodeSetting} />
        <Route path="/ProductSetting" component={ProductSetting} />
        <Route path="/ProductBasicSetting" component={ProductBasicSetting} />
        <Route path="/OrderSetting" component={WorkOrderSetting} />
        <Route path="/RoutingSetting" component={RoutingSetting} />
        <Route path="/SerialnumSetting" component={SerialnumSetting} />
        <Route path="/RoutingDetailSetting" component={RoutingDetailSetting} />
        <Route path="/ProductRouting" component={ProductRoutingSetting} />
        <Route path="/StationRule" component={StationRuleSetting} />
        <Route path="/ProjectParamSetting" component={ProjectParamSetting} />
        <Route path="/RoutingGroup" component={RoutingGroup} />
        <Route path="/RoutingSetting1" component={RoutingSetting1} />
        <Route path="/RuleSetting" component={RuleSetting} />
        <Route path="/RuleDetailSetting" component={RuleDetailSetting} />
        <Route path="/RuleSearch" component={RuleSearch} />
        <Route path="/RuleSetting1" component={RuleSetting1} />
        <Route path="/RuleNodeSetting" component={RuleNodeSetting} />
        <Route path="/RuleSearch1" component={RuleSearch1} />
        <Route path="/AlarmPutmsg" component={AlarmPutmsg} />
        <Route path="/AlarmUserSubMana" component={AlarmUserSubMana} />
        <Route path="/AlarmUserThemeRuleMana" component={AlarmUserThemeRuleMana} />
        <Route path="/AlarmMsgList" component={AlarmMsgList} />

      </Route>
    </Router>
  </Provider>
);
MainRouter.defaultProps = {

};
MainRouter.propTypes = {

};

export default MainRouter;
