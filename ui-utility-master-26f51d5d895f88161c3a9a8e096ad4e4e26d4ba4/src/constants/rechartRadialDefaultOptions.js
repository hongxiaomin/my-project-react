export default {
  width: 500,
  height: 300,
  cx: 150,
  cy: 150,
  outerRadius: 140,
  innerRadius: 20,
  barSize: 10,
  fill: '#008000',
  data: [
    { name: 'Sales', employees: 2400, women: 1200, men: 1200, fill: '#8884d8' },
    { name: 'Business', employees: 4567, women: 2693, men: 1874, fill: '#83a6ed' },
    { name: 'Education', employees: 1398, women: 624, men: 774, fill: '#8dd1e1' },
    { name: 'Health', employees: 9800, women: 5479, men: 4321, fill: '#82ca9d' },
    { name: 'Art', employees: 3908, women: 1954, men: 1954, fill: '#a4de6c' },
    { name: 'Trades', employees: 4800, women: 3620, men: 1180, fill: '#d0ed57' },
    { name: 'Sport', employees: 5200, women: 1479, men: 3721, fill: '#ffc658 ' },
  ],
  dataTransformer: {
    url: 'http://10.120.136.90:3010/occupations',
    dataKey: 'employees',   // <RadialBar dataKey='uv'>
    outerRadius: 140,       // <RadialBarChart innerRadius={20} outerRadius={140}>
    innerRadius: 20,
    legend: true,
    color: '#008000',
    transformer: `function transformer(data) {
      if (data !== undefined) {
        return data;
      }
    }`,
  },
};
