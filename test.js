var test = require('tape')
var createStore = require('./index')

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
