/**
 * Store Generator
 */

/* eslint strict: ["off"] */

'use strict';

module.exports = {
  description: 'Add a store',
  prompts: [],
  actions: () => {
    const actions = [{
      type: 'add',
      path: '../../../src/store/index.js',
      templateFile: './store/index.js.hbs',
      abortOnFail: true,
    }];
    return actions;
  },
};
