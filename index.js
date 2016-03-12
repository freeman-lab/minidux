var isPlainObject = require('is-plain-object')
var combineReducers = require('./combineReducers')

module.exports = function createStore (reducer, initialState) {
  if (!reducer || typeof reducer !== 'function') throw new Error('reducer must be a function')
  initialState = initialState || {}
  var state = initialState
  var listener = null
  var isEmitting = false

  function dispatch (action) {
    if (!action || !isPlainObject(action)) throw new Error('action parameter is required and must be a plain object')
    if (!action.type || typeof action.type !== 'string') throw new Error('type property of action is required and must be a string')
    if (isEmitting) throw new Error('modifiers may not emit actions')

    isEmitting = true
    state = reducer(state, action)
    if (listener) listener(state)
    isEmitting = false
    return action
  }

  function subscribe (cb) {
    if (!cb || typeof cb !== 'function') throw new Error('listener must be a function')
    listener = cb
  }

  function getState () {
    return state
  }

  return {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    combineReducers: combineReducers
  }
}
