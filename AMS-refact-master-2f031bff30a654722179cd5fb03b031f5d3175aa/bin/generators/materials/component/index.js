/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'Name already exists' : true;
      }
      return 'The name is required';
    },
  }],
  actions: () => {
    const actions = [{
      type: 'add',
      path: '../../../src/components/{{name}}/index.js',
      templateFile: './component/index.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../../src/components/{{name}}/style.less',
      templateFile: './component/style.less.hbs',
      abortOnFail: true,
    }];
    return actions;
  },
};
