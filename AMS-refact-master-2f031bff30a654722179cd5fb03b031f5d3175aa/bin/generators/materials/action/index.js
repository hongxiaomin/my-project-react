/**
 * Action Generator
 */

const componentExists = require('../componentExists');

module.exports = {
  description: 'Add a action',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'sample',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(`${value}Action`) ? 'Name already exists' : true;
      }

      return 'The name is required';
    },
  }],
  actions: () => {
    const actions = [{
      type: 'add',
      path: '../../../src/actions/{{name}}Action/index.js',
      templateFile: './action/index.js.hbs',
      abortOnFail: true,
    }];
    return actions;
  },
};
