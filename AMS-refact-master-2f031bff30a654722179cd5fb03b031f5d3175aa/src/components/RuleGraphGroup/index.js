/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import { PropTypes } from 'prop-types';
import FormContainer from '../../containers/FormContainer';
import InputContainer from '../../containers/InputContainer';
import ActionBtn from '../../containers/ActionBtnContainer';
import ActionBtnShowSureModel from '../../containers/ActionBtnShowSureModelContainer';
import RuleGraph from '../RuleGraph';
import { SERVER_IP_RULE1 } from '../../constants/Settings';

const deleteAPI = `${SERVER_IP_RULE1}/ams/routing/info`;

const RuleGraphGroup = (props) => {
  const { ruleToolBarRuleData, ruleGraphData } = props;
  let ruleGraph = null;
  if (ruleToolBarRuleData && ruleGraphData) {
    ruleGraph = 'true';
  }
  if (ruleGraph) {
    let btnShow = (<ActionBtn
      btnName="保存"
      mode="ruleGraphDataSave"
      action=""
      formName=""
      tableName=""
    />);
    if (ruleGraphData[0].nodeList.length > 0) {
      btnShow = (<ActionBtn
        btnName="保存修改"
        mode="ruleGraphDataUpdate"
        action=""
        formName=""
        tableName=""
      />);
    }
    return (
      <div style={{ display: props.showState }}>
        {/* <Title name="制作规则" /> */}
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
          >制作规则</h3>
          <div style={{ padding: '10px' }}>
            <FormContainer
              name="RuleSettingFrom"
              action=""
            >
              <div className={'searchCondition'}>
                <label htmlFor="ruleCode" className={'label'}>代码</label>
                <InputContainer type="text" name="ruleCode" className={'input'} />
              </div>
              <div className={'searchCondition'}>
                <label htmlFor="ruleName" className={'label'}>名称</label>
                <InputContainer type="text" name="ruleName" className={'input'} />
              </div>
              <div className={'searchCondition'}>
                <label htmlFor="ruleVersion" className={'label'}>版本</label>
                <InputContainer type="text" name="ruleVersion" className={'input'} />
              </div>
              <div className={'searchCondition'}>
                <label htmlFor="ruleType" className={'label'}>类别</label>
                <InputContainer type="text" name="ruleType" className={'input'} />
              </div>
              <div className={'searchCondition'}>
                <label htmlFor="ruleDes" className={'label'}>描述</label>
                <InputContainer type="text" name="ruleDes" className={'input'} />
              </div>
              <div className="routingGraphContent" style={{ clear: 'both', overflow: 'hidden' }}>
                <div style={{ width: '100%', float: 'left' }}>
                  <div style={{ position: 'relative' }}>
                    <RuleGraph
                      ruleData={ruleToolBarRuleData}
                      graphData={ruleGraphData}
                    />
                  </div>
                </div>
              </div>
            </FormContainer>
            <div style={{ textAlign: 'right' }}>
              <ActionBtn
                btnName="取消"
                mode="ruleGraphCancelBtn"
                action=""
                formName=""
                tableName="RuleSettingTable"
              />
              <ActionBtnShowSureModel
                btnName="清空"
                mode="empty"
                action={deleteAPI}
                formName="RuleSettingForm"
                tableName="RuleSettingTable"
                ruleGraph
              />
              {/* <ActionBtn
                btnName="保存"
                mode="ruleGraphDataSave"
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

RuleGraphGroup.defaultProps = {

};
RuleGraphGroup.propTypes = {
  showState: PropTypes.string,
  ruleToolBarRuleData: PropTypes.arrayOf(Object),
  // toolBarRuleSettingData: PropTypes.arrayOf(Object),
  // ruleSettingDate: PropTypes.arrayOf(Object),
  ruleDate: PropTypes.arrayOf(Object),
  ruleGraphData: PropTypes.arrayOf(Object),
};

export default RuleGraphGroup;
