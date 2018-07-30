/**
 * @see https://github.com/emilmork/react-rt-chart
 * @see http://c3js.org/reference.html
 */
export default {
  width: 1000,
  height: 300,
  fields: ['data'], // required
  dataTransformer: {
    fields: ['data'],
    topic: '',
    transformer: `function transformer(data) {
      if (data !== undefined) {
        return data;
      }
    }`,
    max: '200',
    min: '-100',
    units: 'mph',
    arcWidth: '70',
    colorLevels: [
      { value: '0', color: 'red' },
      { value: '30', color: 'orange' },
      { value: '90', color: 'yellow' },
      { value: '200', color: 'green' },
    ],
  },
  reset: false, // call unload funciton with c3.js -> unload fields data
  // flow: {
  //   duration: 350, // animation duration by rtchart lib
  // },
  // ////////////////////////////
  // main setting by c3.js API //
  // ////////////////////////////
  chart: {
    size: {
      width: 1000,  // This option should be specified if possible
      height: 300,
    },
    gauge: {
      label: {
        format: function format(value) {return value;},
        show: true,
      },
      min: -100,   // 0 is default, can handle negative value
      max: 200,    // 100 is default
      units: 'mph',
      width: 70,   // arc thickness
    },
    color: {
      pattern: ['red', 'orange', 'yellow', 'green'], // the color levels for the values
      threshold: {
        unit: 'value', // percentage is default
        values: [0, 30, 90, 200],
      },
    },
  },
};
