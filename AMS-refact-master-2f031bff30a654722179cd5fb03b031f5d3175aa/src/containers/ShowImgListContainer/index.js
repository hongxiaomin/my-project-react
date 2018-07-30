/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { onImgDoubleClick } from '../../actions/TableAction';
import ShowImgList from '../../components/ShowImgList';
import { formReducerName, formDataSourceName } from '../../constants/Config';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
    data: state.getIn([formReducerName, props.formName, formDataSourceName]),
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    // init: (() => {
    //   dispatch(saveShowImgListData({
    //     name: props.name,
    //     showImgListData: LineChangeData,
    //   }));
    // })(),
    onImgDoubleClick: (name) => {
      console.log('name', name);
      dispatch(props.onDClick({ props, name }));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowImgList);
