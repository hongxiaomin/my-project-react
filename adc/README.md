DRC Starter Kit
===============

Please access [http://10.136.225.86:3003/book/drc-starter-kit/](http://10.136.225.86:3003/book/drc-starter-kit/) for documentation.

### React-Router-Redux
#### Why
[see the issue](https://github.com/davezuko/react-redux-starter-kit/issues/1067)

#### How to configure
commit 66931f0 replace src/store/location.js with react-router-redux since the former did not work

#### How to implement
[official docs](https://github.com/reactjs/react-router-redux#pushlocation-replacelocation-gonumber-goback-goforward)

```js
import { push } from 'react-router-redux'

dispatch(push('/foo'))
```
