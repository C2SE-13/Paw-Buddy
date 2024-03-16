import {combineReducers, configureStore} from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import userSlice from './user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'app/user',
  storage: AsyncStorage,
};

const userConfig = {
  ...persistConfig,
  whitelist: ['isLoggedIn', 'token'],
};

const rootReducer = combineReducers({
  app: appSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(userConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
