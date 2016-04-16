module.exports = function bindActionCreators (actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('actionCreators must be a function or object with functions')
  }

  var keys = Object.keys(actionCreators)
  var boundActionCreators = {}

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }

  return boundActionCreators
}

function bindActionCreator (actionCreator, dispatch) {
  return function () {
    dispatch(actionCreator.apply(null, arguments))
  }
}
