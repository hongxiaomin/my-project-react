export default {
  outerRadius: 100,
  width: 350,
  height: 320,
  data: [
    { subject: 'Math', A: 30, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
  ],
  dataTransformer: {
    url: 'http://10.120.136.90:3010/subjects',
    outerRadius: 100,      // for <RadarChart outerRadius={100} />
    color: '#8884d8',      // for <Radar stroke="#8884d8" fill="#8884d8" />
    legend: true,
    legendName: 'Mike',    // for <Radar name="Mike" />
    radarKey: 'A',         // for <Radar dataKey="A" />
    angleKey: 'subject',   // for <PolarAngleAxis dataKey="subject" />
    transformer: `function transformer(data) {
      if (data !== undefined) {
        return data;
      }
    }`,
  },
};
