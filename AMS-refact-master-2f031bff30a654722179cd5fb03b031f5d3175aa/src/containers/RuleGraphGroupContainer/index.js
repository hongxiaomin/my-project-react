/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import RuleGraphGroup from '../../components/RuleGraphGroup';
import { onRuleShowStateInitial } from '../../actions/UIAction';
import { getRuleGraphRuleList } from '../../actions/RuleGraphAction';


const mapStateToProps = (state, props) => (
  {
    showState: state.getIn(['UI', 'RuleGraph', 'ruleGraphShowState']),
    ruleToolBarRuleData: state.getIn(['UI', 'RuleGraph', 'ruleGraphRuleData']),
    ruleGraphData: state.getIn(['UI', 'RuleGraph', 'ruleGraphData']),
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    init: (() => {
      dispatch(onRuleShowStateInitial({ name: 'ruleGraphShowState', value: 'none' }));
      dispatch(getRuleGraphRuleList());
    })(),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RuleGraphGroup);
