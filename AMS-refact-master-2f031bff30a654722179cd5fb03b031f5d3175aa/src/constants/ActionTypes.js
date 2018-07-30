/**
fileName    : ActionTypes.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

export const ONSUBMITCLICK = 'Submit';                         // 表单提交
export const ONCANCELCLICK = 'Cancel';                         // 取消
export const ONCREATECLICK = 'Create';                         // 新增
export const ONBATCHCREATECLICK = 'BatchCreate';               // 批量增加
export const ONCOPYCLICK = 'Copy';                             // 复制
export const ONMODIFYCLICK = 'Modify';                         // 修改
export const ONDELETECLICK = 'Delete';                         // 删除
export const ONSELECTCHANGE = 'Select';                        // 修改
export const ONHIDECLICK = 'SiderHide';                        // 隐藏左侧导航栏
export const ONRADIOCLICK = 'Radio';                           // 单选按钮点击
export const ONSHOWMODALCLICK = 'Modal';                       // 显示弹框
export const ONBUTTONCLICK = 'Button';                               // 点击按钮
export const ONPAGECHANGE = 'onPageChange';
export const ONROWSELECTEDCHANGE = 'onRowSelectedChange';
export const ONMODALSHOWCLICK = 'onModalShowClick';            // 点击按钮打开弹框
export const ONMODALOKCLICK = 'onModalOkClick';                // 点击弹框确认
export const ONMODALCANCELCLICK = 'onModalCancelClick';        // 点击弹框取消
export const ONMODALUPDATEPROPS = 'onModalUpdateProps';
export const UPDATEDATASOURCE = 'updateDataSource';           // 更新无form table的dataSource
export const ONCHECKBOXCHANGE = 'onCheckBoxChange';           // 显示\隐藏按钮的变化
export const CLEARROWSKEYS = 'clearRowsKeys';                // 清空数据池中的key值
export const ONSIDERPROPSCHANGE = 'onSiderPropsChange';
export const ONSAVEPAGINATION = 'onSavePagination';          // 保存分页
export const GETSAVEDATA = 'getSaveData';                // 保存所有的数据
export const UPDATEJIGDATASOURCE = 'updateJigDataSource'; // 保存Jig的dataSource;
export const DATASOURCEONENAME = 'dataSourceOneName';  // 保存第一个数值
export const UPDATEJIGSHELFSIDE = 'updateJigShelfside'; // 保存ShelfSide；
export const UPDATEJIGSHELFIAYER = 'updateJigShelfLayer'; // 保存ShelfLayer;
export const UPDATEJIGSHELFLAYERCLICK = 'updateJigShelfLayerClick'; // 保存ShelfLayerClick;
export const UPDATEJIGSHELFLAYERLIST = 'updateJigShelfLayerList'; // 获取ShelfLayerList列表
export const SAVEPROPS = 'saveProps'; // 保存props
export const UPDATEJIGTYPEID = 'updateJigTypeId'; // 更新jigTypeId
export const SAVEROWDATA = 'saveRowData'; // 保存一行的数据
export const SAVEPTABLEROPS = 'saveTableProps';  // 保存props;
export const CLEARROWID = 'clearRowId';  // 清除一行的id
export const UPDATAROW = 'upDataRow';  // 更新单元格的数据
export const DELETEDATAROW = 'deleteDataRow'; // 清除一行的数据
export const SAVEOPTION = 'saveOption'; // 保存option的值
export const SAVEOLDOPTION = 'saveOldOption'; // 保存不变的option的值
export const TABLEDOUBLECLICK = 'tableDoubleClick';// 双击table；
export const SAVEDATATOWSELECT = 'saveDateTowSelect'; // 保存数据
export const SAVEPARAM = 'savrParam'; // 保存param；
export const SAVESELECTPROPS = 'saveProps'; // 保存props;
export const SAVEDISABLE = 'saveDisable'; // 保存disable
// ---------------------- common ----------------------
export const ONINPUTCLICK = 'onInputClick';
export const ONFORMUPDATECHILDREN = 'onFormUpdateChildren';
export const ONFORMSUBMITSUCCESS = 'onFormSubmitSuccess';
export const ONFORMDATASOURCECHANGE = 'onFormDataSourceChange';
export const ONFORMDATACHANGE = 'onFormDataChange';
export const ONFORMUPDATEPROPS = 'onFormUpdateProps';
export const ONCOLORPICKERINITIAL = 'onColorPickerInitial';
export const ONCOLORPICKERDISPLAY = 'onColorPickerPisplay';
export const ONCOLORPICKERCHANGE = 'onColorPickerChange';
export const ONSELECTBASESETTING = 'onSelectBaseSetting';
export const ONSELECTOPTIONSLOADED = 'onSelectOptionsLoaded';
export const ONSELECTDISABLELOADED = 'onSelectDisableLoaded';
export const ONUPDATECHILDREN = 'onUpdateChildren';
export const ONGROUPSELECTUPDATECONNECT = 'onGroupSelectUpdateConnect';
export const ONLINECHARTUPDATECHILDREN = 'onLineChartUpdateChildren';
export const ONCOMMONUIUPDATEPROPS = 'onCommonUIUpdateProps';  // 组件属性修改
export const ONBUTINIT = 'onButInit';// button组件的初始化
export const ONIMGDATACHANGE = 'onImgDataChange'; // 修改image数据
// ---------------------- Newer ----------------------
export const ONUPDATEPROPS = 'onUpdateProps';
export const ONUPDATEUI = 'onUpdateUI';
export const ONUPDATEDATASOURCE = 'onUpdateDataSource';
// -----------------------PCBShelfMonitor------------------------------
export const GETARR = 'getArr';
export const GETRIGHTARR = 'getRightArr';
export const GETLEFTARR = 'getLeftArr';
export const CLOSEBOX = 'closeBox';
export const SAVAPROPS = 'saveProps';
export const MODELSHOWHIDE = 'modelShowHide';
export const MODELMESSAGE = 'modelMessage';
export const ONFORMINPUTSAVEDATA = 'onFormInputSaveData';
// ---------------------------复选框-------------------------------------
export const ONSAVECHECKBOXDATA = 'onSaveCheckBoxData';
export const SAVECHECKBOXDATA = 'saveCheckboxData';// 保存数据
export const SAVECHECKBOXDATALOAD = 'saveCheckboxDataLoad';// 保存初始化数据
export const SAVECHECKBOXDISABLED = 'saveCheckboxDisabled'; // 保存disabled
export const CLEARCHECKBOXDATA = 'clearCheckBoxData'; // 清除自定义组件一行的数据。
export const ONSAVECHECKBOXCHECKED = 'onSaveCheckBoxChecked';
// ------------------------------保存showImgList的数据-------------------
export const SAVESHOWIMGLISTDATA = 'saveShowImgListData';
export const ADDARRAYONELINE = 'addArrayOneLine';
export const ONUPDATEFORMDATA = 'onupdateFormdata';
export const SAVETABLETNPUTDATA = 'svaetableInputData';
// ------------------------------保存时间差--------------------------------
export const ONSAVETIME = 'onSaveTime';
// ------------------------------清除table的data----------------------------
export const CLEARTABLETNPUTDATA = 'cleartableInputData';
// ------------------------------制作途程内容显示与否的判断状态--------------------------
export const ONROUTINGSHOWSTATE = 'onRoutingShowStateInitial';
// ------------------------------制作规则内容显示与否的判断状态--------------------------
export const ONRULESHOWSTATE = 'onRuleShowStateInitial';
