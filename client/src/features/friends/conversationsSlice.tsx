import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FriendsState {
  conversations: Array<{
    user_id: number,
    conversation_id: number,
    full_name: string,
    photo: string | null
  }>,
}

const initialState: FriendsState = {
  conversations: [],
}

  

export const friendsSlice = createSlice({
  name: 'userFriends',
  initialState,
  reducers: {
    addConversations: (state, action: PayloadAction<any>) => {
      for(let user of action.payload){
        if(!state.conversations.includes(user)){
          state.conversations.push(user);
        }
      }
    },
    resetFriends: () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { addConversations, resetFriends } = friendsSlice.actions;

export default friendsSlice.reducer;