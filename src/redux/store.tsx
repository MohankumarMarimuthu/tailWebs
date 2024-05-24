import {
  AnyAction,
  // Reducer,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import userReducer, { UserState } from "./user/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import studentReducer from "./student/studentSlice";

interface RootState {
  user: UserState;
  studentData: { data: any[] };
}
// type RootReducer = Reducer<RootState, AnyAction>;

const rootReducer = combineReducers({
  user: userReducer,
  studentData: studentReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer<RootState, AnyAction>(
  persistConfig,
  rootReducer
);
// it will help us to persist the state even if we refresh the page so we are using this

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare: any) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
