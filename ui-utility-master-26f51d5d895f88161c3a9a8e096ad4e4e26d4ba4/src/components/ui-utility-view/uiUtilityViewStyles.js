export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    zIndex: 1, // let this view down to App Bar (via tooltip hint position)
  },
};
