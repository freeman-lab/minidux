var isPlainObject = require('is-plain-object')

module.exports = function combineReducers (reducers) {
  if (!reducers || !isPlainObject(reducers)) throw new Error('reducers argument must be an object with reducer methods')
  var keys = Object.keys(reducers)

  return function combination (state, action) {
    var hasChanged = false
    var nextState = {}

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (typeof reducers[key] !== 'function') throw new Error('reducer ' + key + 'must be a function')
      nextState[key] = reducers[key](state[key], action)
      hasChanged = hasChanged || nextState[key] !== state[key]
    }

    return hasChanged ? nextState : state
  }
}
