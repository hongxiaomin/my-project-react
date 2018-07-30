import Mark from 'markup-js';
import { RECHART_SPECIAL_TYPE } from '../constants/config';
import {
  CONTAINER_DISPATCH_TEMPLATE,
  CONTAINER_STATE_TEMPLATE,
  CONTAINER_TOPIC_TRANSFORMER_TEMPLATE,
  CONTAINER_CHART_INFO_TEMPLATE,
} from '../constants/codeTemplates';

const rechartSeries = ['AreaChart', 'BarChart', 'ComposedChart', 'LineChart',
  'RadarChart', 'RadialBarChart', 'Pie', 'Scatter'];

export default (stencils) => {
  let dispatches = '';   // for mapDispatchToProps
  let states = '';       // for mapStateToProps
  let rtchartInfo = '';
  let rechartInfo = '';
  let plainTableInfo = '';
  let rtchartDataArray = [];
  let rechartDataArray = [];
  let plainTableDataArray = [];
  Object.keys(stencils).map((key) => {
    const { props, name, id } = stencils[key];
    const prefix = `${name}${id.split('-')[0]}`;

    if (props.onTouchTap !== undefined) {
      const { name: action, args } = props.onTouchTap[0];
      const dispatchName = `on${prefix}TouchTap`;
      const dispatchBody = `dispatch(${action}("${args[0]}"))`;
      dispatches = dispatches +
        Mark.up(CONTAINER_DISPATCH_TEMPLATE, { dispatchName, dispatchBody });
    }

    if (name === 'RTChart') {
      // each rtchartDataArray has transformer and topic for a rtchart
      rtchartDataArray = [];
      let topicTransformer = '';
      const transformerContent = `${props.dataTransformer.transformer}`;
      rtchartDataArray.push({ key: 'transformer', value: transformerContent });
      const topicContent = `"${props.dataTransformer.topic}"`;
      rtchartDataArray.push({ key: 'topic', value: topicContent });
      for (let i = 0; i < rtchartDataArray.length; i++) {
        // creating transformer and topic
        topicTransformer = topicTransformer +
          Mark.up(CONTAINER_TOPIC_TRANSFORMER_TEMPLATE, { data: rtchartDataArray[i] });
      }
      // wrap transformer and topic by its prefix to container's state
      rtchartInfo = rtchartInfo +
        Mark.up(CONTAINER_CHART_INFO_TEMPLATE, { prefix, topicTransformer });
    }

    if (rechartSeries.indexOf(name) > -1) {
      // for recharts, no need to keep url inside container, only transformer and whole restData
      rechartDataArray = [];
      let transformer = '';
      let transformerContent;
      if (RECHART_SPECIAL_TYPE.indexOf(name) > -1) {
        transformerContent = `${props.transformer}`;
      } else {
        transformerContent = `${props.dataTransformer.transformer}`;
      }
      rechartDataArray.push({ key: 'transformer', value: transformerContent });
      for (let i = 0; i < rechartDataArray.length; i++) {
        // creating transformer
        transformer = transformer +
          Mark.up(CONTAINER_TOPIC_TRANSFORMER_TEMPLATE, { data: rechartDataArray[i] });
      }
      // wrap transformer by its prefix to container's state
      rechartInfo = rechartInfo +
        Mark.up(CONTAINER_CHART_INFO_TEMPLATE, { prefix, topicTransformer: transformer });
    }

    if (name === 'PlainTable') {
      plainTableDataArray = [];
      let transformer = '';
      const transformerContent = `${props.dataTransformer.transformer}`;

      plainTableDataArray.push({ key: 'transformer', value: transformerContent });
      for (let i = 0; i < plainTableDataArray.length; i++) {
        // creating transformer
        transformer = transformer +
          Mark.up(CONTAINER_TOPIC_TRANSFORMER_TEMPLATE, { data: plainTableDataArray[i] });
      }
      // wrap transformer by its prefix to container's state
      plainTableInfo = plainTableInfo +
        Mark.up(CONTAINER_CHART_INFO_TEMPLATE, { prefix, topicTransformer: transformer });
    }

    return dispatches;
  });

  if (rtchartDataArray.length > 0) {
    const mqttData = { key: 'mqttData', value: "state.getIn(['fields', 'mqttData']).toJS()" };
    states =
      states + Mark.up(CONTAINER_STATE_TEMPLATE, { chartInfo: rtchartInfo, state: mqttData });
  }
  if (rechartDataArray.length > 0) {
    const restData = { key: 'restData', value: "state.getIn(['fields', 'restData']).toJS()" };
    states =
      states + Mark.up(CONTAINER_STATE_TEMPLATE, { chartInfo: rechartInfo, state: restData });
  }
  if (plainTableDataArray.length > 0) {
    const restData = { key: 'restData', value: "state.getIn(['fields', 'restData']).toJS()" };
    states =
      states + Mark.up(CONTAINER_STATE_TEMPLATE, { chartInfo: plainTableInfo, state: restData });
  }

  return { states, dispatches };
};
