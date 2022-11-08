import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { updateImportEqualsDeclaration } from 'typescript';

export interface UserState {
  [x: string]: any;
  name: string,
  user_name: string,
  login: string,
  photo: string,
  id: string
}

const initialState: UserState = {
  name: "",
  user_name: "",
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
      state.user_name = action.payload.user_name;
      state.login = action.payload.login;
      state.photo = action.payload.photo;
      state.id = action.payload.id;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      state.photo = action.payload;
    },
    resetUser: () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { createUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;