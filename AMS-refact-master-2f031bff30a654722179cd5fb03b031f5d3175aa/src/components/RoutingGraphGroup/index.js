import React, { components } from 'react';
import { Tabs } from 'antd';
import { PropTypes } from 'prop-types';
import Title from '../Title';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import RoutingGraph from '../RoutingGraph';
import RoutingGraphList from '../RoutingGraphList';

const RoutingGraphGroup = (props) => {
  const { routingToolBarRouteData, routingToolBarStationData, routingDate, stationDate, routingGraphData } = props;
  let routGraph = null;
  if (routingToolBarRouteData && routingToolBarStationData && routingGraphData) {
    routGraph = 'true';
  }
  if (routGraph) {
    let btnShow = (<ActionBtn
      btnName="保存"
      mode="graphDataSave"
      action=""
      formName=""
      tableName=""
    />);
    if (routingGraphData[0].nodeList.length > 0) {
      btnShow = (<ActionBtn
        btnName="保存修改"
        mode="graphDataUpdate"
        action=""
        formName=""
        tableName=""
      />);
    }
    return (
      <div style={{ display: props.showState }}>
        {/* <Title name="制作途程" /> */}
        <div style={{ border: '1px solid #ddd', borderRadius: '6px 6px 0 0' }}>
          <h3
            style={{ height: '36px',
              lineHeight: '36px',
              fontWeight: '600',
              backgroundColor: '#337ab7',
              color: '#fff',
              fontSize: '16px',
              paddingLeft: '20px',
              borderRadius: '6px 6px 0 0',
            }}
          >制作途程</h3>
          <div style={{ padding: '10px' }}>
            <FormContainer
              name="routingGraphFrom"
              action=""
            >
              <div className={'searchCondition'}>
                <label htmlFor="routingCode" className={'label'}>代码</label>
                <InputContainer type="text" name="routingCode" className={'input'} />
              </div>
              <div className={'searchCondition'}>
                <label htmlFor="routingName" className={'label'}>名称</label>
                <InputContainer type="text" name="routingName" className={'input'} />
              </div>
              <div className={'searchCondition'}>
                <label htmlFor="routingVersion" className={'label'}>版本</label>
                <InputContainer type="text" name="routingVersion" className={'input'} />
              </div>
              <div className={'searchCondition'}>
                <label htmlFor="routingType" className={'label'}>类别</label>
                <InputContainer type="text" name="routingType" className={'input'} />
              </div>
              <div className={'searchCondition'}>
                <label htmlFor="routingDes" className={'label'}>描述</label>
                <InputContainer type="text" name="routingDes" className={'input'} />
              </div>
              <div className="routingGraphContent" style={{ clear: 'both', overflow: 'hidden' }}>
                <div style={{ width: '100%', float: 'left' }}>
                  <div style={{ position: 'relative' }}>
                    <RoutingGraph
                      stationData={routingToolBarStationData}
                      routingData={routingToolBarRouteData}
                      graphData={routingGraphData}
                    />
                  </div>
                </div>
                <div style={{ width: '30%', float: 'right', border: '1px solid #ddd', borderTop: null, height: '500px', display: 'none' }}>
                  <RoutingGraphList stationListData={stationDate} routingListData={routingDate} />
                </div>
              </div>
            </FormContainer>
            <div style={{ textAlign: 'right' }}>
              <ActionBtn
                btnName="取消"
                mode="graphCancelBtn"
                action=""
                formName=""
                tableName=""
              />
              <ActionBtn
                btnName="清空"
                mode="graphDeleteBtn"
                action=""
                formName=""
                tableName=""
              />
              {/* <ActionBtn
                btnName="保存修改"
                mode="graphDataUpdate"
                action=""
                formName=""
                tableName=""
              /> */}
              {btnShow}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

RoutingGraphGroup.defaultProps = {

};
RoutingGraphGroup.propTypes = {
  showState: PropTypes.string,
  routingToolBarStationData: PropTypes.arrayOf(Object),
  routingToolBarRouteData: PropTypes.arrayOf(Object),
  routingDate: PropTypes.arrayOf(Object),
  stationDate: PropTypes.arrayOf(Object),
  // routingGraphData: PropTypes.Object,
};

export default RoutingGraphGroup;
