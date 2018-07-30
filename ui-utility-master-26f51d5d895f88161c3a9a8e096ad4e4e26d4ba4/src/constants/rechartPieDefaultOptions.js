export default {
  width: 370,
  height: 370,
  dataTransformer: {
    url: 'http://10.120.136.90:3010/groups',
    outerRadius: 140,
    innerRadius: 75,
    labelPosition: 'above',
    legend: true,
    color: '#008000',
    transformer: `function transformer(data) {
      if (data !== undefined) {
        return data;
      }
    }`,
  },
};
