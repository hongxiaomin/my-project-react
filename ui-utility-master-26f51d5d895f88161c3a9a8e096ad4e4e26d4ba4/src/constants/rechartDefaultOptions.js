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
    legend: true,             // for Area, Bar, Line
    stacked: false,           // for Area, Bar
    curveType: 'monotone',    // for Area, Line
    labelPosition: 'inner',   // for Bar
    series: [
      { key: 'amt', color: '#8884d8' },
      { key: 'pv', color: '#82ca9d' },
      { key: 'uv', color: '#ffc658' },
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
