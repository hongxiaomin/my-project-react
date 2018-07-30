/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const list = [
  'component',
  'container',
  'action',
  'reducer',
  'store',
  'model',
  'layout',
];

module.exports = (plop) => {
  list.forEach((component) => {
    const generator = require(`./${component}/index.js`);
    plop.setGenerator(component, generator);
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
