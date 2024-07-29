import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productReducer from "./product";
import articleReducer from "./article";
import userContentReducer from "./userContent";
import transactionReducer from "./transaction";
import reviewReducer from "./review";
import UserReducer from "./user";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productReducer,
  articles:articleReducer,
  userContent:userContentReducer,
  transactions:transactionReducer,
  reviews:reviewReducer,
  users:UserReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
