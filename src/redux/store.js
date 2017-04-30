import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import { autoRehydrate } from "redux-persist";

import reducers from "./reducers";

export default function configureStore(initialState = {}, { client } = {}) {
  const shouldLog = process.env.NODE_ENV !== "production";

  // Setup middleware
  const middleware = [thunk.withExtraArgument({ client }), promiseMiddleware()];
  if (shouldLog) {
    middleware.push(createLogger());
  }

  // Setup middlewares and enhancers
  const enhancer = compose(
    applyMiddleware(...middleware),
    autoRehydrate({ log: shouldLog })
  );

  // Create redux store
  const store = createStore(reducers, initialState, enhancer);

  return store;
}
