import {
    legacy_createStore as createStore,
    applyMiddleware,
  } from "redux";
  import thunk from "redux-thunk";
  import { reducer as dataReducer } from "./reducer";
  
  export const store = createStore(
    dataReducer,
    applyMiddleware(thunk)
  );
  console.log("store", store.getState());
  