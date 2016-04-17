var compose = require('./compose')
var extend = require('extend')

module.exports = function applyMiddleware () {
  var middlewares = [].slice.call(arguments)

  return function (createStore) {
    return function (reducer, initialState, enhancer) {
      var store = createStore(reducer, initialState, enhancer)
      var chain = []

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function (action) {
          return dispatch(action)
        }
      }

      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI)
      })

      var dispatch = compose.apply(null, chain)(store.dispatch)

      return extend(store, {
        dispatch: dispatch
      })
    }
  }
}
