import {configureStore} from '@reduxjs/toolkit';
// import dataReducer from './dataSlice';
// import argumentReducer from './argumentSlice';

const store = configureStore({
  reducer: {
    // data: dataReducer,
    // argument: argumentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
