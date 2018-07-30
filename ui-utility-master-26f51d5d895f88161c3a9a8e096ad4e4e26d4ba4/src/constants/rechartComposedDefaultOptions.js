export default {
  width: 700,
  height: 500,
  margin: {
    top: 30, right: 55,
  },
  data: [
    { page: 'Page A', uv: 7500, pv: 4400, amt: 5600 },
    { page: 'Page B', uv: 5000, pv: 3398, amt: 8110 },
    { page: 'Page C', uv: 2000, pv: 7800, amt: 3590 },
    { page: 'Page D', uv: 8780, pv: 7908, amt: 2000 },
  ],
  dataTransformer: {
    url: 'http://10.120.136.90:3010/pages',
    xAxisKey: 'page',
    legend: true,
    series: [
      { type: 'Area', key: 'amt', curveType: 'monotone', color: '#8884d8' },
      { type: 'Bar', key: 'pv', labelPosition: 'inner', color: '#413ea0' },
      { type: 'Line', key: 'uv', curveType: 'monotone', color: '#ff7300' },
    ],
    axes: [
      { type: 'xAxis', text: 'Pages' },
      { type: 'yAxis', text: 'Value' },
    ],
    transformer: `function transformer(data) {
      if (data !== undefined) {
        return data;
      }
    }`,
  },
};
