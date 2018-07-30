import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DnDGeneratorContainer from '../../containers/DnDGeneratorContainer';
import ReactGeneratorContainer from '../../containers/ReactGeneratorContainer';
import styles from './uiCanvasViewStyles';

class UICanvasView extends Component {
  componentDidMount() {
    this.props.onCanvasMount();
  }

  componentWillReceiveProps(nextProps) {
    const pageIndex = nextProps.pageIndex;
    if (nextProps.routes !== this.props.routes || nextProps.pageIndex !== this.props.pageIndex) {
      // since routes from UICanvasViewContainer is not toJS(), so use immutable getIn here
      this.props.onStencilsChange(nextProps.routes.getIn([pageIndex, 'stencils']));
    }
  }

  render() {
    const { mode } = this.props;
    return (
      <div style={Object.assign({}, styles.canvas, mode === 'preview' && styles.fullScreen)}>
        {mode === 'edit' && <DnDGeneratorContainer />}
        {mode === 'preview' && <ReactGeneratorContainer />}
      </div>
    );
  }
}

UICanvasView.propTypes = {
  routes: PropTypes.object,    // because routes is not toJS(), so it's a object
  onStencilsChange: PropTypes.func,
  onCanvasMount: PropTypes.func,
  mode: PropTypes.string.isRequired,
  pageIndex: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

export default UICanvasView;
