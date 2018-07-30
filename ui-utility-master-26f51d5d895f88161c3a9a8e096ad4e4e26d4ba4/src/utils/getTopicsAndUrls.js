import { RECHART_SPECIAL_TYPE, ATYPICAL_RECHARTS } from '../constants/config';

export default (pages) => {
  const topics = [];
  const urls = [];
  for (let i = 0; i < pages.length; i++) {
    const stencils = pages[i].stencils;
    const stencilKeys = Object.keys(stencils);
    for (let j = 0; j < stencilKeys.length; j++) {
      const stencil = stencils[stencilKeys[j]];
      const { props, name, namespace, children } = stencil;
      const { dataTransformer, key } = props;

      if (name === 'RTChart' && dataTransformer.topic.length > 0) {
        topics.push(dataTransformer.topic);
      }

      if (namespace === 'DRC' && dataTransformer !== undefined && dataTransformer.url.length > 0) {
        let stencilUrlInfo;
        if (ATYPICAL_RECHARTS.indexOf(name) > -1) {
          for (let k = 0; k < children.length; k++) {
            // for Pie and Scatter, prefix is from its id, not from PieChart nor ScatterChart
            // data is on Pie and Scatter not PieChart nor ScatterChart
            if (RECHART_SPECIAL_TYPE.indexOf(stencils[children[k]].name) > -1) {
              stencilUrlInfo = {
                model: stencils[children[k]],
                prefix: `${stencils[children[k]].name}${stencils[children[k]].id.split('-')[0]}`,
                url: dataTransformer.url,
                pageIndex: i,
              };
            }
          }
        } else {
          // for AreaChart, BarChart, LineChart and plainTable, data is on themselves
          stencilUrlInfo = {
            model: stencil,
            prefix: `${name}${key.split('-')[0]}`,
            url: dataTransformer.url,
            pageIndex: i,
          };
        }
        urls.push(stencilUrlInfo);
      }
    }// end for
  }// end for

  return { topics, urls };
};
