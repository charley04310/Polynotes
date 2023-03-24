import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user:
    | {
        username: string;
        userId: string;
        email: string;
      }
    | undefined;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setIsAuthenticated, setUser } = authSlice.actions;

export default authSlice.reducer;
