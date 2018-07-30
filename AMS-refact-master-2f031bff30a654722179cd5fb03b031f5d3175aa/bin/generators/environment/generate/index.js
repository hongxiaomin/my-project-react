/**
 * Base Folder Structure Generator
 */

const genFolders = require('../genFolders');

module.exports = {
  description: 'Add base environment',
  prompts: [{
    type: 'confirm',
    name: 'autoGenFolderStructure',
    message: 'Do you want auto-generate folder structure?',
    default: true,
  }, {
    type: 'confirm',
    name: 'autoGenBaseFile',
    message: 'Do you want auto-generate base file?',
    default: true,
  }],
  actions: (data) => {
    let actions = [];
    if (data.autoGenFolderStructure) genFolders();
    if (data.autoGenBaseFile) {
      actions = [{
        type: 'add',
        path: '../../../src/constants/ActionTypes.js',
        templateFile: './generate/ActionTypes.js.hbs',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../../../src/constants/Config.js',
        templateFile: './generate/Config.js.hbs',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../../../src/reducers/index.js',
        templateFile: './generate/reducers.index.js.hbs',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../../../src/main.js',
        templateFile: './generate/main.js.hbs',
        abortOnFail: true,
      }, {
        type: 'add',
        path: '../../../src/index.html',
        templateFile: './generate/index.html.hbs',
        abortOnFail: true,
      }];
    }
    return actions;
  },
};
