import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";
import blockReducer from "./slices/blockSlice";
import treeFileStructureReducer from "./slices/TreeFileExplorerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blocks: blockReducer,
    Tree: treeFileStructureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
