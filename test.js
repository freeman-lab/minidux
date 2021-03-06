var test = require('tape')
var createStore = require('./index').createStore
var combineReducers = require('./combineReducers')
var applyMiddleware = require('./applyMiddleware')
var bindActionCreators = require('./bindActionCreators')

test('create a store', function (t) {
  function reducer (state, action) {
    if (action.type === 'example') {
      return { example: true }
    }
  }

  var store = createStore(reducer, {
    example: false
  })

  store.subscribe(function (state) {
    t.ok(state.example)
  })

  store.dispatch({ type: 'example' })
  t.end()
})

test('missing reducer function fails', function (t) {
  try {
    createStore()
  } catch (err) {
    t.ok(err)
    t.equal(err.message, 'reducer must be a function')
  }

  t.end()
})

test('initial action', function (t) {
  function reducer (state, action) {
    t.ok(action.type.indexOf('INIT') > -1)
    return { example: true }
  }

  createStore(reducer, {})
  t.end()
})

test('initial state', function (t) {
  var store = createStore(function (state, action) { return state }, { example: true })
  var state = store.getState()
  t.ok(state)
  t.ok(state.example)
  t.end()
})

test('get state', function (t) {
  function reducer (state, action) {
    if (action.type === 'example') {
      return { example: action.example }
    }
  }

  var store = createStore(reducer, { example: true })
  store.dispatch({ type: 'example', example: false })
  var state = store.getState()
  t.ok(state)
  t.equal(state.example, false)
  t.end()
})

test('action has a type', function (t) {
  function reducer (state, action) {
    t.ok(action.type)
    t.ok(action.type.indexOf('INIT') > -1 || action.type.indexOf('example') > -1)
    return { example: true }
  }

  var store = createStore(reducer, {
    example: false
  })

  store.dispatch({ type: 'example' })
  t.end()
})

test('missing action fails', function (t) {
  var store = createStore(function () {})

  try {
    store.dispatch()
  } catch (err) {
    t.ok(err)
    t.equal(err.message, 'action parameter is required and must be a plain object')
  }

  t.end()
})

test('missing type fails', function (t) {
  var store = createStore(function () {})

  try {
    store.dispatch({ pizza: 'fail' })
  } catch (err) {
    t.ok(err)
    t.equal(err.message, 'type property of action is required and must be a string')
  }

  t.end()
})

test('replace a reducer', function (t) {
  var store = createStore(function () {})
  store.replaceReducer(function reducer (state, action) {
    if (action.type === 'example') {
      return { example: action.example }
    }
  })
  store.dispatch({ type: 'example', example: false })
  var state = store.getState()
  t.ok(state)
  t.equal(state.example, false)
  t.end()
})

test('combine reducers', function (t) {
  var reducer = combineReducers({
    add: function (state, action) {
      if (action.type === 'add') {
        return action.x + action.y
      }
      return state
    },
    multiply: function (state, action) {
      if (action.type === 'multiply') {
        return action.x * action.y
      }
      return state
    }
  })

  var store = createStore(reducer, { add: 0, multiply: 0 })

  store.dispatch({ type: 'add', x: 2, y: 2 })
  t.equal(store.getState().add, 4)

  store.dispatch({ type: 'multiply', x: 3, y: 3 })
  t.equal(store.getState().multiply, 9)
  t.end()
})

test('apply middleware', function (t) {
  t.plan(3)

  function reducer (state, action) {
    if (action.type === 'item') {
      state.item = action.item
      return state
    } else {
      return state
    }
  }

  function decorate (store) {
    return function (next) {
      return function (action) {
        t.ok(action)
        action.item = 'this is the item'
        return next(action)
      }
    }
  }

  function log (store) {
    return function (next) {
      return function (action) {
        t.ok(action)
        return next(action)
      }
    }
  }

  var store = createStore(reducer, { item: null }, applyMiddleware(decorate, log))
  store.dispatch({ type: 'item' })
  t.equal(store.getState().item, 'this is the item')
  t.end()
})

test('bind action creators', function (t) {
  var actionCreators = {
    item: function item (text) {
      return { type: 'item', item: text }
    }
  }

  var store = createStore(function (state, action) {
    if (action.type === 'item') {
      return { item: action.item }
    }
  }, { item: null })

  var bound = bindActionCreators(actionCreators, store.dispatch)
  bound.item('hello')
  t.equal(store.getState().item, 'hello')
  t.end()
})
