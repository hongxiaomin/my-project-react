export default {
  width: 600,
  height: 400,
  margin: {
    top: 30, right: 60,
  },
  dataTransformer: {
    url: 'http://10.120.136.90:3010/coordinates',
    color: '#ff0000',
    shape: 'circle',
    legend: true,
    legendName: 'A school',
    xAndY: [
      { axis: 'xAxis', key: 'x', name: 'stature', unit: 'cm' },
      { axis: 'yAxis', key: 'y', name: 'weight', unit: 'kg' },
    ],
    axes: [
      { type: 'xAxis', text: 'Stature' },
      { type: 'yAxis', text: 'Weight' },
    ],
    transformer: `function transformer(data) {
      if (data !== undefined) {
        return data;
      }
    }`,
  },
};
