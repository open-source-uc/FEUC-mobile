import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import { autoRehydrate } from "redux-persist";

import reducers from "./reducers";
import * as middlewares from "./middlewares";

export default function configureStore(initialState, { client, tracker }) {
  const shouldLog = process.env.NODE_ENV !== "production";

  // Setup middleware
  const middleware = [
    thunk.withExtraArgument({ client }),
    promiseMiddleware(),
    middlewares.screenTracking(tracker),
    middlewares.analytics(tracker),
  ];
  if (shouldLog) {
    middleware.push(logger);
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
