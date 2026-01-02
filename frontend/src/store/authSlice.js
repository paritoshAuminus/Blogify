import { createSlice } from "@reduxjs/toolkit";
import authService from "../auth/auth";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "idle",     // idle, loading, authenticated, unauthenticated
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.status = "authenticated";
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.status = "unauthenticated"; 
            state.user = null;
            authService.logout();
        }
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;