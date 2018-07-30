// ------------------- Create UUID -----------------------
const s4 = () => (
  Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
);
const GUID = () => (
  `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
);
const getDate = (setDate) => {
  const date = setDate ? new Date(setDate) : new Date();
  const add0 = m => m < 10 ? `0${m}` : m;
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${Y}-${add0(M)}-${add0(D)} ${add0(h)}:${add0(m)}:${add0(s)}`;
};

export { GUID, getDate };
