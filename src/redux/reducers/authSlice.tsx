import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoProps } from "./_model";
// import { UserInfoModel } from "./models";

interface AuthStateProps {
  userInfo: UserInfoProps | {};
  isLoggedIn: boolean;
}

const initialState: AuthStateProps = {
  userInfo: {},
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (
      state: any,
      action: PayloadAction<{ userInfo: any, isLoggedIn: boolean }>,
    ) => {
      state.userInfo = action?.payload;
      state.isLoggedIn = true;
    },
    
    logout: (state: any) => {
        state.userInfo = {};
        state.isLoggedIn = false;
    }
  },
});

export const { setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
