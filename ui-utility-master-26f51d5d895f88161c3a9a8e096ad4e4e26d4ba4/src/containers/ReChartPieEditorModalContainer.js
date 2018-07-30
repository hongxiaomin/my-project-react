import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import store from '../store';
import ReChartPieEditorModal from '../components/rechart-pie-editor-modal';
import { renderRechartInCommon } from '../utils';
import {
  closeReChartEditorModal, updateStencilProperty, deleteStencil, setRESTData,
} from '../actions';
const { checkDeleteLegend, checkAddLegend } = renderRechartInCommon;

const mapStateToProps = (state) => ({
  rechartEditorModalOpen: state.getIn(['options', 'rechartEditorModal', 'open']),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
  chartType: state.getIn(['fields', 'selectedStencil', 'name']),
  currentPageIndex: state.getIn(['routing', 'index']),
  routes: state.getIn(['routing', 'routes']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  closeReChartEditorModal: () => {
    dispatch(closeReChartEditorModal());
  },
  onDataTransformerFormSubmit: (id, props, pageStencils) => {
    // update stencil property first
    Object.assign(props.dataTransformer,
      { transformer: eval(`(${props.dataTransformer.transformer})`) });
    dispatch(updateStencilProperty({ id, properties: fromJS(props) }));

    // do fetch
    const { url, transformer, outerRadius, innerRadius,
      color, legend, labelPosition } = props.dataTransformer;
    const allChildrenName = [];   // get every children name to see if Legend already exists

    if (url.length !== 0 && url.replace(/\s/g, '').length !== 0) {
      fetch(url)
      .then(resp => resp.json())
      .then(json => {
        // <Pie> and <Scatter> should keep transformer function by themselves
        // for preview mode updating data, no need to get transformer function from their parent
        pageStencils[id].children.forEach((childId) => {
          const { name, props: innerChartProps } = pageStencils[childId];
          allChildrenName.push(name);
          const prefix = `${name}${innerChartProps.key.split('-')[0]}`;
          dispatch(setRESTData({ prefix, restData: fromJS(json) }));
          const restData = store.getState().getIn(['fields', 'restData']).toJS();
          Object.assign(innerChartProps,
            { fill: color, data: transformer(restData[prefix]), transformer, labelPosition }
          );
          if (outerRadius !== undefined || innerRadius !== undefined) {
            Object.assign(innerChartProps, { outerRadius, innerRadius });
          }
          dispatch(updateStencilProperty({
            id: childId, properties: fromJS(innerChartProps), atypicalReChart: true,
          }));
          checkDeleteLegend(name, legend, dispatch, deleteStencil, childId);
        });
        checkAddLegend(allChildrenName, legend, dispatch, id);
      }).catch(ex => {
        window.console.error(ex);
      });
    }
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, dispatchProps, {
    onDataTransformerFormSubmit: (id, props) => {
      const pageStencils = stateProps.routes[stateProps.currentPageIndex].stencils;
      dispatchProps.onDataTransformerFormSubmit(id, props, pageStencils);
    },
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReChartPieEditorModal);
