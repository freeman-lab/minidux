# minidux

> just like [`redux`](https://github.com/reactjs/redux) but tiny

This little module mimics the [`redux`](https://github.com/reactjs/redux) API, is written in vanilla JS, and has minimal dependencies and dev dependencies.

## Redux docs

Because this module aims to be a drop-in replacement for redux, you can read the [redux docs](http://redux.js.org/) for detailed usage examples and [API reference](http://redux.js.org/docs/api/index.html).

## Usage

Usage of minidux is identical to redux:

```js
var createStore = require('minidux').createStore

function reducer (state, action) {
  if (action.type === 'example') {
    return { example: true }
  }
}

var store = createStore(reducer, {
  example: false
})

store.subscribe(function (state) {
  console.log(state)
})

store.dispatch({ type: 'example' })
```

## Requiring modules

If you'd like to use `applyMiddleware`, `bindActionCreators`, `combineReducers`, `createStore`, & `compose` separately, you can `require` those files directly:

```js
var applyMiddleware = require('minidux/applyMiddleware')
var bindActionCreators = require('minidux/bindActionCreators')
var combineReducers = require('minidux/combineReducers')
var createStore = require('minidux/createStore')
var compose = require('minidux/compose')
```

## API

#### `var store = createStore(reducer, [initialState], [enhancer])`
[Full redux docs for `createStore`](http://redux.js.org/docs/api/createStore.html)

#### `store.getState()`
[Full redux docs for `store.getState`](http://redux.js.org/docs/api/Store.html#getState)

#### `store.dispatch(action)`
[Full redux docs for `store.dispatch`](http://redux.js.org/docs/api/Store.html#dispatch)

#### `store.subscribe(listener)`
[Full redux docs for `store.subscribe`](http://redux.js.org/docs/api/Store.html#subscribe)

#### `store.replaceReducer(nextReducer)`
[Full redux docs for `store.replaceReducer`](http://redux.js.org/docs/api/Store.html#replaceReducer)

### `combineReducers(reducers)`
[Full redux docs for `combineReducers`](http://redux.js.org/docs/api/combineReducers.html)

### `applyMiddleware(...middlewares)`
[Full redux docs for `applyMiddleware`](http://redux.js.org/docs/api/applyMiddleware.html)

### `bindActionCreators(actionCreators, dispatch)`
[Full redux docs for `bindActionCreators`](http://redux.js.org/docs/api/bindActionCreators.html)

### `compose(...functions)`
[Full redux docs for `compose`](http://redux.js.org/docs/api/compose.html)

Instead of implementing another `compose` function we use the `[composite](http://npmjs.com/composite)` module.

## Issues

Notice any incompatibilites with `redux`? Let us know in the [issues queue](issues).

## See also
- [hxdx](https://github.com/freeman-lab/hxdx) – connects a `redux`-style store to a `virtual-dom`-style view
- [send-action](https://github.com/sethvincent/send-action) – a state container with an API that is much simpler than redux, but that follows a similar pattern
- [store-emitter](https://github.com/sethvincent/store-emitter) – a state container with an API similar to redux with more flexible options for listening to changes
- [prior art](http://redux.js.org/docs/introduction/PriorArt.html) – some of the projects that redux is based on

## License

[MIT](LICENSE.md)
