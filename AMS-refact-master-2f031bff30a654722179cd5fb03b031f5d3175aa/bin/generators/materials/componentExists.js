/**
 * componentExists
 *
 * Check whether the given component exist in directory
 */

const fs = require('fs');
const path = require('path');

const dir = '../../../src/';
const list = [
  'components',
  'containers',
  'actions',
  'reducers',
  'models',
];
let components = null;

list.forEach((item) => {
  const wholePath = path.join(__dirname, dir + item);
  if (fs.existsSync(wholePath)) {
    const component = fs.readdirSync(wholePath);
    components = components ? components.concat(component) : component;
  }
});

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
