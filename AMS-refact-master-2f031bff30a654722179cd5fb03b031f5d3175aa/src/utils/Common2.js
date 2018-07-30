const s4 = () => (
  Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
);

export const GUID = () => (
  `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
);
export const isObject = obj => typeof obj === 'object' && obj !== null;
export const emptyObject = () => Object.assign({});
