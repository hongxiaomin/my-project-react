/**
 * Reducer Generator
 */

const componentExists = require('../componentExists');

module.exports = {
  description: 'Add a reducer',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'sample',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(`${value}Reducer`) ? 'Name already exists' : true;
      }

      return 'The name is required';
    },
  }],
  actions: () => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../../src/reducers/{{name}}Reducer/index.js',
      templateFile: './reducer/index.js.hbs',
      abortOnFail: true,
    }];
    return actions;
  },
};
