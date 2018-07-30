/**
 * Clear Generator
 */

const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');

const dir = '../../../../src/';
const list = [
  'components',
  'containers',
  'actions',
  'reducers',
  'models',
  'store',
  'layout',
  'constants',
  'main.js',
  'index.html',
];

module.exports = {
  description: 'Remove all in src',
  prompts: [{
    type: 'confirm',
    name: 'clearAll',
    message: 'Do you want to clear all folders in src ?',
    default: false,
  }],
  actions: (data) => {
    const actions = [];
    if (data.clearAll) {
      list.forEach((item) => {
        const wholepath = path.join(__dirname, dir + item);
        if (fs.existsSync(wholepath)) rimraf(wholepath, () => console.log(`Remove: ${wholepath}   Done!`));
      });
    }
    return actions;
  },
};
