/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { getDefaultData } from '../../actions/SMMMaterialCarMergeOthersAction';
import SMMMaterialCarMergeOthers from '../../components/SMMMaterialCarMergeOthers';
import { tableRedecurName } from '../../constants/TableConfig';



const mapStateToProps = (state, props) => {
    
    return {  // ... receiver
        dataSource: state.getIn([tableRedecurName, 'SMMMaterialCarMergeTable', 'rowData']),
    };
};
const mapDispatchToProps = (dispatch, props) => (
    {
        inintal: (() => {
            // table初始化
            dispatch(getDefaultData(props));
        })(),

    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SMMMaterialCarMergeOthers);