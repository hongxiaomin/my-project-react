/**
 * @see https://github.com/emilmork/react-rt-chart
 * @see http://c3js.org/reference.html
 */
export default {
  width: 600, // for style, value is the same with chart.size.width
  height: 400, // for style, value is the same with chart.size.height
  fields: ['data'], // required
  dataTransformer: {
    fields: ['data'],
    topic: '',
    transformer: `function transformer(data) {
      if (data !== undefined) {
        return data;
      }
    }`,
    yLines: [
      { type: 'yAxis', max: '', min: '' },
      { type: 'Upper Bound', text: '', value: '' },
      { type: 'Lower Bound', text: '', value: '' },
    ],
    axes: [
      { type: 'xAxis', text: 'X Label', position: 'outer-right' },
      { type: 'yAxis', text: 'Y Label', position: 'outer-top' },
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
      width: 600,  // This option should be specified if possible
      height: 400,
    },
    transition: {
      duration: 350, // default by c3.js
    },
    data: {
      type: 'line',
      // line
      // spline
      // step
      // area
      // area-spline
      // area-step
      // bar
      // scatter
      // pie
      // donut
      // gauge
      names: {}, // could be change data name, ex: data1:'healthy'
      labels: false, // default by c3.js
      order: 'desc', // default by c3.js
    },
    grid: {
      x: {
        show: false, // default by c3.js
      },
      y: {
        show: true,  // default is false
        lines: [],
        // { value: '', text: '' },
        // { value: '', text: '' },
        // add more line for bound, array of objects, Default : []
        // if value is '' and text is string, both text will overlapped
        // if both value and text are '', there will be a line at 0
        // so if both value and text are '', keep this array empty as default
      },
    },
    axis: {
      x: {
        type: 'indexed',
        // indexed
        // timeseries
        // category
        // indexed
        label: {
          text: 'X Label',
          position: 'outer-right',
          // inner-right : default
          // inner-center
          // inner-left
          // outer-right
          // outer-center
          // outer-left
        },
        tick: {
          count: undefined, // default by c3.js
          rotate: 0, // default by c3.js
          fit: true, // default by c3.js
        },
      },
      y: {
        label: {
          text: 'Y Label',
          position: 'outer-top',
          // inner-top : default
          // inner-middle
          // inner-bottom
          // outer-top
          // outer-middle
          // outer-bottom
        },
        tick: {
          count: undefined, // default by c3.js
          // format: function format(data) { return Number(data).toFixed(1); }, // Default : false
        },
        min: '',  // lock the lowest value, Default: undefined, empty string is acceptable
        max: '',  // lock the highest value, Default: undefined, empty string is acceptable
      },
      y2: {
        label: {
          text: '',
          position: 'outer-middle',
          // inner-top : default
          // inner-middle
          // inner-bottom
          // outer-top
          // outer-middle
          // outer-bottom
        },
        tick: {
          count: undefined, // default by c3.js
        },
      },
    },
    legend: {
      position: 'bottom',
      // bottom
      // right
      // inset
      show: true, // default by c3.js
      hide: false, // default by c3.js, if true -> use array value
    },
    tooltip: {
      show: true, // default by c3.js
      format: {
        value: function value(data) {return data;}, // Default : undefined
      },
    },
    subchart: {
      show: false, // default by c3.js
    },
    zoom: {
      enabled: false, // default by c3.js
      rescale: false, // default by c3.js
    },
    point: {
      show: true, // default by c3.js
      r: 2.5, // default by c3.js
    },
    line: {
      step: {
        type: 'step',
        // step
        // step-before
        // step-after
      },
    },
    pie: {
      label: {
        show: true, // default by c3.js
      },
    },
    donut: {
      label: {
        show: true, // default by c3.js
      },
    },
  },
};
