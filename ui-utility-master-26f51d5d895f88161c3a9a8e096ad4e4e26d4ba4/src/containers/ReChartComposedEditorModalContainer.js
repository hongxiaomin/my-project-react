import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import store from '../store';
import ReChartComposedEditorModal from '../components/rechart-composed-editor-modal';
import { addUnitStencil, renderRechartInCommon } from '../utils';
import { RECHART_BASIC_TYPE } from '../constants/config';
import {
  closeReChartEditorModal, updateStencilProperty, deleteStencil, setRESTData,
} from '../actions';
const { checkRemoveLegend, checkAddLegend } = renderRechartInCommon;

const mapStateToProps = (state) => ({
  rechartEditorModalOpen: state.getIn(['options', 'rechartEditorModal', 'open']),
  selectedStencil: state.getIn(['fields', 'selectedStencil']).toJS(),
  chartType: state.getIn(['fields', 'selectedStencil', 'name']),
  currentPageIndex: state.getIn(['routing', 'index']),
  routes: state.getIn(['routing', 'routes']).toJS(),
});

const updateXAxisAndSeries = (chartContainerId, dataTransformer, pageStencils, dispatch) => {
  const chartModel = pageStencils[chartContainerId];
  const originalSeriesIdArr = [];
  const allChildrenName = [];   // get every children name to see if Legend already exists

  chartModel.children.forEach((childId) => {
    const { name, props } = pageStencils[childId];
    allChildrenName.push(name);
    if (name === 'XAxis') {
      Object.assign(props,
        { dataKey: dataTransformer.xAxisKey, label: dataTransformer.axes[0].text }
      );
      dispatch(updateStencilProperty({ id: childId, properties: fromJS(props) }));
    } else if (name === 'YAxis') {
      Object.assign(props, { label: dataTransformer.axes[1].text });
      dispatch(updateStencilProperty({ id: childId, properties: fromJS(props) }));
    }
    // any Area, Bar, Line need to be deleted first
    if (Object.values(RECHART_BASIC_TYPE).indexOf(name) > -1) {
      originalSeriesIdArr.push(childId);
    }
    checkRemoveLegend(name, dataTransformer.legend, originalSeriesIdArr, childId);
  });

  checkAddLegend(allChildrenName, dataTransformer.legend, dispatch, chartContainerId);

  dataTransformer.series.forEach((aSeries) => {
    const stencilName = `re-${aSeries.type}`;

    let nonSharedProps = {};

    switch (stencilName) {
      case 're-Area':
      case 're-Line':
        nonSharedProps = { type: aSeries.curveType };
        break;
      case 're-Bar':
        nonSharedProps = { labelPosition: aSeries.labelPosition };
        break;
      default:
        nonSharedProps = {};
    }

    addUnitStencil(dispatch, stencilName, chartContainerId,
      Object.assign(
        {},
        { dataKey: aSeries.key, fill: aSeries.color, stroke: aSeries.color },
        nonSharedProps
      )
    );
  });

  return originalSeriesIdArr;
};

const mapDispatchToProps = (dispatch) => ({
  closeReChartEditorModal: () => {
    dispatch(closeReChartEditorModal());
  },
  onDataTransformerFormSubmit: (id, props, pageStencils) => {
    // update stencil property first
    Object.assign(props.dataTransformer,
      { transformer: eval(`(${props.dataTransformer.transformer})`) });
    dispatch(updateStencilProperty({ id, properties: fromJS(props) }));

    const originalSeriesIdArr =
      updateXAxisAndSeries(id, props.dataTransformer, pageStencils, dispatch);

    // do fetch
    const { url, transformer } = props.dataTransformer;
    if (url.length !== 0 && url.replace(/\s/g, '').length !== 0) {
      fetch(url)
      .then(resp => resp.json())
      .then(json => {
        const prefix = `${pageStencils[id].name}${props.key.split('-')[0]}`;
        dispatch(setRESTData({ prefix, restData: fromJS(json) }));
        const restData = store.getState().getIn(['fields', 'restData']).toJS();
        Object.assign(props, { data: transformer(restData[prefix]) });
        dispatch(updateStencilProperty({ id, properties: fromJS(props) }));

        originalSeriesIdArr.forEach((seriesId) => {
          dispatch(deleteStencil({ id: seriesId }));
        });
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
)(ReChartComposedEditorModal);
