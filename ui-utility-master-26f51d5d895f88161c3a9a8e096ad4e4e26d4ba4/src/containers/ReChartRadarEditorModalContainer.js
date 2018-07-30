import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import store from '../store';
import ReChartRadarEditorModal from '../components/rechart-radar-editor-modal';
import { renderRechartInCommon } from '../utils';
import {
  closeReChartEditorModal, updateStencilProperty, setRESTData, deleteStencil,
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

    // update related stencil
    const { url, transformer, color, outerRadius,
      radarKey, angleKey, legend, legendName } = props.dataTransformer;
    const allChildrenName = [];   // get every children name to see if Legend already exists

    pageStencils[id].children.forEach((childId) => {
      const { name, props: innerChartProps } = pageStencils[childId];
      allChildrenName.push(name);
      if (name === 'Radar') {
        Object.assign(innerChartProps,
          { fill: color, stroke: color, name: legendName, dataKey: radarKey }
        );
        dispatch(updateStencilProperty({ id: childId, properties: fromJS(innerChartProps) }));
      } else if (name === 'PolarAngleAxis') {
        Object.assign(innerChartProps, { dataKey: angleKey });
        dispatch(updateStencilProperty({ id: childId, properties: fromJS(innerChartProps) }));
      }
      checkDeleteLegend(name, legend, dispatch, deleteStencil, childId);
    });

    checkAddLegend(allChildrenName, legend, dispatch, id);

    // do fetch
    if (url.length !== 0 && url.replace(/\s/g, '').length !== 0) {
      fetch(url)
      .then(resp => resp.json())
      .then(json => {
        const prefix = `${pageStencils[id].name}${props.key.split('-')[0]}`;
        dispatch(setRESTData({ prefix, restData: fromJS(json) }));
        const restData = store.getState().getIn(['fields', 'restData']).toJS();
        Object.assign(props, { data: transformer(restData[prefix]), outerRadius });
        dispatch(updateStencilProperty({ id, properties: fromJS(props) }));
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
)(ReChartRadarEditorModal);
