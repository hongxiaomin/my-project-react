/**
 * Layout Generator
 */

module.exports = {
  description: 'Add a layout',
  prompts: [],
  actions: () => {
    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../../src/layout/index.js',
      templateFile: './layout/index.js.hbs',
      abortOnFail: true,
    }];
    return actions;
  },
};
