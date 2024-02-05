import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoApi.ts";
import { cryptoNewsApi } from "../services/cryptoNewsApi.ts";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

