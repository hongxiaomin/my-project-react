export default {
  wrapper: {
    display: 'inline-block',
    position: 'relative',
  },
  palette: {
    background: 'rgb(255, 255, 255)',
    display: 'inline-block',
    cursor: 'pointer',
    position: 'absolute',
    bottom: 16, /* use bottom, because the size of a palette is not the same heigh by generating */
    right: 0,
  },
  paletteColor: {
    width: 16,
    height: 16,
    border: '1px solid #ccc',
  },
  paletteLable: {
    color: 'rgb(134, 134, 134)',
    fontSize: 16.5,
  },
  /* wrap in palette to absolute position to avoid placing on any html poition */
  colorPopover: {
    position: 'absolute',
    zIndex: '10',
    right: 0,
    top: 26,
  },
  cover: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};