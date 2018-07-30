// --------------------- Request ---------------------
export const defaultGetParamTemplate = (param) => {
  const {
    sort = undefined,
    size = 10,
    current = 1,
    ...data } = param;
  return {
    condition: [data],
    sort: sort ? [sort] : [],
    page: { size, current } };
};
export const defaultPostDataTemplate = (param) => {
  const {
    mode,
    ...data } = param;
  return {
    mode,
    value: JSON.stringify([data]) };
};
export const defaultPutParamTemplate = (param) => {
  const { id } = param;
  return {
    condition: [{ id: Number(id) }] };
};
export const defaultDataSourceTemplate = param => param.rows;
export const defaultRequestFilters = [null, '', undefined, 'Invalid date', '-1'];
// --------------------- Charts ---------------------
export const yFormat = val => (Math.round(val * 100) / 100);
