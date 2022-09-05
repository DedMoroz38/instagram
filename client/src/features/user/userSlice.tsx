import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  [x: string]: any;
  name: string,
  login: string,
  photo: string,
  id: string
}

const initialState: UserState = {
  name: "",
  login: "",
  photo: "",
  id: ''
}

  

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<any>) => {
      state.name = action.payload.full_name;
      state.login = action.payload.login;
      state.photo = action.payload.photo;
      state.id = action.payload.id;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      state.photo = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { createUser, updateUser } = userSlice.actions;

export default userSlice.reducer;