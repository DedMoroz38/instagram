import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FriendsState {
  friends: Array<{
    id: string,
    full_name: string
  }>,
}

const initialState: FriendsState = {
  friends: [],
}

  

export const friendsSlice = createSlice({
  name: 'userFriends',
  initialState,
  reducers: {
    addFriends: (state, action: PayloadAction<any>) => {
      for(let user of action.payload){
        state.friends.push(user);
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addFriends } = friendsSlice.actions;

export default friendsSlice.reducer;