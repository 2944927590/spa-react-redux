import { createStore, applyMiddleware ,compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, createLogger()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
          const nextRootReducer = require('../reducers');
          store.replaceReducer(nextRootReducer)
      })
  }
  return store
}
