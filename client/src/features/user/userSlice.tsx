import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name: string,
  login: string,
  photo: string
}

const initialState: UserState = {
  name: "",
  login: "",
  photo: ""
}

  

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<any>) => {
      state.name = action.payload.full_name;
      state.login = action.payload.login;
      state.photo = action.payload.photo;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      state.photo = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { createUser, updateUser } = userSlice.actions;

export default userSlice.reducer;