import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers';


export default function configureStore(preloadedState) {
  const middlewares = [ 
]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('data/reducers', () => store.replaceReducer(rootReducer));
  }

  return store
}