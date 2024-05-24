import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  currentUser: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // signOutUserStart: (state) => {
    //   state.loading = true;
    // },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    // signOutUserFailure: (state, action: PayloadAction<string>) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  // signOutUserStart,
  signOutUserSuccess,
  // signOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
