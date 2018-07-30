import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import store from '../store';
import ReChartRadialBarEditorModal from '../components/rechart-radialbar-editor-modal';
import { addUnitStencil, renderRechartInCommon } from '../utils';
import {
  closeReChartEditorModal, updateStencilProperty, setRESTData, deleteStencil,
} from '../actions';
const { checkDeleteLegend } = renderRechartInCommon;

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
    const { url, transformer, color,
      outerRadius, innerRadius, dataKey, legend } = props.dataTransformer;
    const allChildrenName = [];   // get every children name to see if Legend already exists

    pageStencils[id].children.forEach((childId) => {
      const { name, props: innerChartProps } = pageStencils[childId];
      allChildrenName.push(name);
      if (name === 'RadialBar') {
        Object.assign(innerChartProps, { dataKey });
        dispatch(updateStencilProperty({ id: childId, properties: fromJS(innerChartProps) }));
      }
      checkDeleteLegend(name, legend, dispatch, deleteStencil, childId);
    });

    if (allChildrenName.indexOf('Legend') === -1 && legend) {   // add Legend
      addUnitStencil(dispatch, 're-Legend', id,
        {
          iconSize: 10,
          width: 120,
          height: 140,
          layout: 'vertical',
          verticalAlign: 'middle',
          wrapperStyle: {
            top: 0,
            left: 350,
            lineHeight: '24px',
          },
        },
      );
    }

    // do fetch
    if (url.length !== 0 && url.replace(/\s/g, '').length !== 0) {
      fetch(url)
      .then(resp => resp.json())
      .then(json => {
        const prefix = `${pageStencils[id].name}${props.key.split('-')[0]}`;
        dispatch(setRESTData({ prefix, restData: fromJS(json) }));
        const restData = store.getState().getIn(['fields', 'restData']).toJS();
        Object.assign(props,
          { data: transformer(restData[prefix]), outerRadius, innerRadius, fill: color,
        });
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
)(ReChartRadialBarEditorModal);
