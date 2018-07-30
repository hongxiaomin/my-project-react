State Shape: Reducer
=======================

UI-UTILITY has 4 reducers:
 - options
 - fields
 - routing
 - stencilTree
 
[options](http://twtpesir01.delta.corp/react/ui-utility/blob/master/src/reducers/optionsReducers.js) and [fields](http://twtpesir01.delta.corp/react/ui-utility/blob/master/src/reducers/fieldsReducers.js) are under this project.  
[routing](http://twtpesir01.delta.corp/react/ui-utility-core/blob/master/src/reducers/routingReducers.js) and [stencilTree](http://twtpesir01.delta.corp/react/ui-utility-core/blob/master/src/reducers/stencilTreeReducers.js) are under [ui-utility-core](http://twtpesir01.delta.corp/react/ui-utility-core) project.

## options
This reducer is about UI state, such as modal / toast state and current mode.

| Name                     | Type      | Default         | Description  | Action  |
| :----------------------- | :-------- | :-------------- | :----------- | :----------- |
| mode                     | enum:<br/> 'edit', 'preview'| 'edit' | Current mode of UI-UTILITY | setEditMode, setPreviewMode |
| stencilEditorDrawer      | object    | { open: false } | Determines whether or not to display the stencilEditorDrawer  | openStencilEditorDrawer, closeStencilEditorDrawer | 
| propertySelectionModal   | object    | { open: false } | Determines whether or not to display the propertySelectionModal  | openPropertySelectionModal, closePropertySelectionModal | 
| pageEditorModal          | object    | { open: false } | Determines whether or not to display the pageEditorModal | openPageEditorModal, closePageEditorModal | 
| pageManagerAction        | enum: <br/> 'add', 'clone', <br/> 'edit', 'delete  | 'add' | Action type from 4 PageManagerToolbar buttons, determines the content to show on the pageEditorModal  | changePageManagerAction | 
| rtchartEditorModal       | object    | { open: false } | Determines whether or not to display the rtchartEditorModal | openRTChartEditorModal, closeRTChartEditorModal | 
| rechartEditorModal       | object    | { open: false } | Determines whether or not to display the rechartEditorModal | openReChartEditorModal, closeReChartEditorModal | 
| plainTableEditorModal    | object    | { open: false } | Determines whether or not to display the plainTableEditorModal | openPlainTableEditorModal, closePlainTableEditorModal | 
| mqttSettingModal         | object    | { open: false } | Determines whether or not to display the mqttSettingModal | openMQTTSettingModal, closeMQTTSettingModal | 
| iconSelectorModal        | object    | { open: false } | Determines whether or not to display the iconSelectorModal | openIconSelectorModal, closeIconSelectorModal<br/> (from fieldsActions) | 
| deployToServerModal      | object    | { open: false } | Determines whether or not to display the deployToServerModal | openDeployToServerModal, closeDeployToServerModal | 
| deployToServerToast      | object    | { open: false } | Determines whether or not to display the deployToServerToast | openDeployToServerToast, closeDeployToServerToast | 
| stencilCloneModal        | object    | { open: false, type: '' } | Determines whether or not to display the stencilCloneModal;<br/> type is `'clone'` or `'link clone'`, both will show stencilCloneModal to select destination page | openStencilCloneModal, closeStencilCloneModal | 
| stencilCloneExplainModal | object    | { open: false } | Determines whether or not to display the stencilCloneExplainModal | openStencilCloneExplainModal, closeStencilCloneExplainModal | 


## fields
This reducer is about selected props/icon/stencil and form setting, most are temporary.

| Name                         | Type      | Default         | Description  | Action       |
| :--------------------------- | :-------- | :-------------- | :----------- | :----------- |
| selectedProperty             | object    | { prop: [], style: [] } | The content of prop and style are from PropertySelectionModal | submitSelectedProperty, resetSelectedProperty, deleteSelectedProperty |
| selectedStencil              | object    |                 | SelectedStencil will be set after double clicking stencil | setSelectedStencil, resetSelectedStencil |
| mqttSetting                  | object    | { ip: '', port: '', username: '', password: '', } | MQTT related setting from mqttSettingModal | setMQTTSetting |
| mqttDataArrivedTime          | Date      | null            | The date when receive message from subscribed mqtt topic | setMQTTData |
| mqttData                     | object    |                 | The JSON data when receive message from subscribed mqtt topic | setMQTTData |
| doubleSelectedStencilModelId | string    | ''              | Stencil id for highlight selected stencil | resetDoubleSelectedStencil, setDoubleSelectedStencil |
| restData                     | object    |                 | The JSON data with its prefix when receive message from rest api | setRESTData |
| iconData                     | object    | { fieldName: '', searchedText: '', selectedIcon: '', oldPickedIcon: '', newPickedIcon: '', } | component prop name; search key word; original icon value; tmp pick old; tmp pick new; | pickNewIcon, pickOldIcon, resetIconData, updateIconData, setIconSearchedText, setUsedIcon |
| deployToServerFeedback       | object    |                 | example: { "success": true, "url": "http://10.120.136.90:3010/apps/test/" } | updateDeployToServerFeedback |


## routing
This reducer is about pages, stencils relation (sibling order / parent), stencil properties.

| Name                       | Type      | Default         | Description  | Action       |
| :------------------------- | :-------- | :-------------- | :----------- | :----------- |
| locationBeforeTransitions  | object    |                 | Handled by react-router-redux, from ui-utility/src/middlewares/pageRouting.js, will trigger switchPage | action.type is '@@router/LOCATION_CHANGE'
| index                      | number    | undefined       | Current page index <td rowspan="3"> addPageAndRoot, addPropsStencil,  addStencil, changeParent, changeStencilOrder, clonePage, cloneStencil, deletePage, deleteStencil, editPageName, loadPages, moveStencilOrderForwardBackward, switchPage, updateStencil, updateStencilProperty </td>
| currentPage                | string    | undefined       | Current page name |
| routes                     | array of object | []        | Object contains path - page name and stencils - all stencils inside this page, example: [{ path: 'index', stencils: {} }, { path: 'foo', stencils: {} }] |


## stencilTree
This reducer is about composing all stencils in current page to a stecnil tree (from ROOT stencil).

| Name                       | Type      | Default         | Description  | Action             |
| :------------------------- | :-------- | :-------------- | :----------- | :----------------- |
| stencilTree                | object    |                 | A hierarchical stencil tree structure, with a root stencil and subtrees of children stencils | composeStencilTree |stencils