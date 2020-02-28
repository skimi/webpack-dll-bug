```bash
npm i
npm start
# Access the webserver http://localhost:8080
```

A module is missing in the chunk of `dll.js` and we get an error in the console:

```
Uncaught TypeError: Cannot read property 'call' of undefined
    at __webpack_require__ (dll.js:21)
    at Module../test-package/index.js (dll.js:121)
    at __webpack_require__ (dll.js:21)
    at Module../dll.js (dll.js:95)
    at __webpack_require__ (dll.js:21)
    at Object.<anonymous> (index.js:107)
    at __webpack_require__ (index.js:20)
    at Module.<anonymous> (index.js:100)
    at __webpack_require__ (index.js:20)
    at Object.<anonymous> (index.js:91)
```

This seems to be a tree-shaking problem as the module that is not in the dll, `test-package/someFunction.js`, should have been a module removed by the tree-shaking.
The module itself has been removed but reference to it are still there.

The problem is caused by the re-export from `test-package/index.js` of `test-package/constants.js`.

```js
import * as _constants from './constants';
export var constants = _constants;
```

If you rewrite the constant file to be able to re-export its default then it works:

```js
export { default as constants } from './constants';
```

This error does not happen if not using the DllPlugin.