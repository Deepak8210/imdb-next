import { configureStore } from "@reduxjs/toolkit";
import { providerReducer } from "./slices/providerSlice";

const store = configureStore({
  reducer: {
    provider: providerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
