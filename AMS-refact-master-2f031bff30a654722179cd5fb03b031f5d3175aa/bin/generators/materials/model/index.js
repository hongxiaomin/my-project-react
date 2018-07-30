/**
 * Model Generator
 */

const componentExists = require('../componentExists');

module.exports = {
  description: 'Add a model',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'sample',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(`${value}Model`) ? 'Name already exists' : true;
      }
      return 'The name is required';
    },
  }],
  actions: () => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../../src/models/{{name}}Model/index.js',
      templateFile: './model/index.js.hbs',
      abortOnFail: true,
    }];
    return actions;
  },
};