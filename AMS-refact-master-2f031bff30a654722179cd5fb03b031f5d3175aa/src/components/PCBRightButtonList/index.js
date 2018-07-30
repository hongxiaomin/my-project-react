 import React from 'react';
 import PCBRightButton from '../../containers/PCBRightButtonContainer';
 import { SERVER_IP_PCB, defaultDataSourceTemplate } from '../../constants/Settings';

 const PCBSubShelf = `${SERVER_IP_PCB}/ams/pcb/subshelf`;
 const paramTemplate = (param) => {
   const { ...data } = param;
   return { condition: data ? [data] : [] };
 };
 const PCBRightButtonList = (param) => {
   const { rightArr } = param;
   const floorTitle = rightArr ? rightArr[0].floor : '';
   const rightButtons = rightArr ? rightArr.map((v, i) => (
     <PCBRightButton
       key={i}
       value={v.serial || ''}
       action={PCBSubShelf}
       paramTemplate={paramTemplate}
       dataSourceTemplate={defaultDataSourceTemplate}
     />)) : '';
   return (
     <div>
       <div className="floorTitle">
         {floorTitle}<span style={{ marginLeft: '10px' }}>Floor</span>
       </div>
       <div>
         {rightButtons}
       </div>
     </div>
   );
 };

 export default PCBRightButtonList;
