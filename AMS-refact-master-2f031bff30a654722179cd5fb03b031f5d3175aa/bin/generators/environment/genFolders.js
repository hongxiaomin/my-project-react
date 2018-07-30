/**
 * componentExists
 *
 * Generate folder structure
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
  'store',
  'layout',
  'constants',
];

function genFolders() {
  list.forEach((item) => {
    const wholePath = path.join(__dirname, dir + item);
    if (!fs.existsSync(wholePath)) {
      fs.mkdirSync(wholePath);
    }
  });
}

module.exports = genFolders;
