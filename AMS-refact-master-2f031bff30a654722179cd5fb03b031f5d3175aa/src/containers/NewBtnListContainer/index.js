/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import { connect } from 'react-redux';
import { showDetail } from '../../actions/BtnClick';
import NewBtnList from '../../components/NewBtnList';


const mapStateToProps = (state, props) =>(
  {
      // ... receiver
 
  }
);
const mapDispatchToProps = (dispatch, props)=>(
  {
    // ... dispatcher
    
   
    showDetail: () =>{ dispatch(showDetail(props))}
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBtnList)
