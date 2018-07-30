export default (url, params) => (
  url + (url.indexOf('?') === -1 ? '?' : '&') + Object.keys(params)
    .filter(k => params[k] !== undefined)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')
);
