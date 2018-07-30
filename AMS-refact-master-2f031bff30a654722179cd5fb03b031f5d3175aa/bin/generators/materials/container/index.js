/**
 * Container Generator
 */

const componentExists = require('../componentExists');

module.exports = {
  description: 'Add a container',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(`${value}Container`) ? 'Name already exists' : true;
      }
      return 'The name is required';
    },
  }],
  actions: () => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../../src/containers/{{name}}Container/index.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true,
    }];
    return actions;
  },
};
