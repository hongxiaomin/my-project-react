Testing
=======

To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them. Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying `coverage_reporters` in `~/config/project.config.js`.

## React Component Testing
### [Enzyme](https://github.com/airbnb/enzyme)
It gives us several ways to render components for testing: using `shallow`, `mount`, `render`. We apply [shallow api](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md) in most testing scenario. It's useful to constrain yourself to testing a component as a unit. Consider the code snippet below out of *HomeView.spec.js*.

```js
import HomeView from 'routes/Home/components/HomeView';

describe('(View) Home', () => {
  let _component;
  beforeEach(() => {
    _component = render(<HomeView />);
  });

  it('Renders a welcome message', () => {
    expect(welcome.text()).toMatch(/Welcome!/);
  });
});
```

When *shallowing* the `HomeView` component, it return the instance around the rendered output called the **ShallowWrapper** with abundant method for testing. In the example, it was assigned to `_component` variable and its `text()` method returned a string representation of the text nodes, *'Welcome!'* in the current render tree.

### Snapshot Testing
We recommend that using [Jest](https://facebook.github.io/jest/) and its [snapshot testing](https://facebook.github.io/jest/docs/snapshot-testing.html) feature to make sure your UI does not change unexpectedly. Instead of rendering the graphical UI and manipulating it in the browser, which would require additional building time and cause more human judgement error, you can use a *test renderer* to quickly generate a serializable value for your React tree.

The *snapshot testing* is the other alternative for testing component and it worked well with Enzyme we introduced previously. Consider the code snippet of *HomeView.spec.js* again.

```js
import HomeView from 'routes/Home/components/HomeView';

describe('(View) Home', () => {
  let _component;
  beforeEach(() => {
    _component = render(<HomeView />);
  });

  it('Renders a welcome message', () => {
    expect(welcome).toMatchSnapshot();
  });
});
```

The first time this test is run, Jest creates a snapshot file that looks like this:
```js
exports[`(View) Home Renders a welcome message 1`] = `
<h4>
  Welcome!
</h4>
`;

exports[`(View) Home Renders an awesome duck image 1`] = `
<img
  alt="This is a duck, because Redux!"
  class="duck"
  src="test-file-stub"
/>
`;
```

The snapshot artifact should be committed alongside code changes, and reviewed as part of your code review process. On subsequent test runs Jest will simply compare the rendered output with the previous snapshot. If they match, the test will pass. If they don't match, either the test runner found a bug in your code that should be fixed, or the implementation has changed and the snapshot needs to be updated.
