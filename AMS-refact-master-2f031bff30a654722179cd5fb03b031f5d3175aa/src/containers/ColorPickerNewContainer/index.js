import { connect } from 'react-redux';
import { onClick } from '../../actions/SelectListAction';
import ColorPickerNew from '../../components/ColorPickerNew';
import { savaColorData } from '../../actions/ColorPickerNewAction';

const mapStateToProps = (state, props) => (
  {
    // ... receiver
  }
);
const mapDispatchToProps = (dispatch, props) => (
  {
    // ... dispatcher
    colorChange: (e) => {
      const newColor = e.color;
      const newProps = { ...props, ...{ newColor } };
      dispatch(savaColorData(newProps));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorPickerNew);
