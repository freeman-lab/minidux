var isPlainObject = require('is-plain-object')

module.exports = function createStore (reducer, initialState, enhancer) {
  if (!reducer || typeof reducer !== 'function') throw new Error('reducer must be a function')

  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState
    initialState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer must be a function.')
    }

    return enhancer(createStore)(reducer, initialState)
  }

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

  function replaceReducer (next) {
    if (typeof next !== 'function') throw new Error('new reducer must be a function')
    reducer = next
  }

  function getState () {
    return state
  }

  dispatch({ type: '@@minidux/INIT' })

  return {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }
}
