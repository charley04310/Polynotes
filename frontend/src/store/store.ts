import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";
import blockReducer from "./slices/blockSlice";
import dataBaseReducer from "./slices/dataBaseSlice";
import dataBaseColumnReducer from "./slices/dataBaseColumnSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blocks: blockReducer,
    dataBase: dataBaseReducer,
    dataBaseColumns: dataBaseColumnReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
