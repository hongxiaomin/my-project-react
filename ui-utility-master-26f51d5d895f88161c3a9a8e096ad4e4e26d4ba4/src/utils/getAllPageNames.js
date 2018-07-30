export default (routes) => {
  const pageNameArray = [];
  for (let i = 0; i < routes.length; i++) {
    pageNameArray.push(routes[i].path);
  }
  return pageNameArray;
};
