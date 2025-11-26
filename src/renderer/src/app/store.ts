import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AppReducer from "../features/app/appSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage, // 使用localstorage
  blackList: [] // 黑名单
};

const rootReducer = combineReducers({
  app: AppReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoreActions: true
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
