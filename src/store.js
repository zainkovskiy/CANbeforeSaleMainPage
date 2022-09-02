import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { rootReducer } from "reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk, logger),
})
