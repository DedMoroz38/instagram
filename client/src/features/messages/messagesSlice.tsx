import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MessagesState {
  messages: Array<{
    id: number,
    conversation_id: number,
    message: string,
    created_at: number,
    sender_id: number
  }>,
}

const initialState: MessagesState = {
  messages: []
}

  

export const messagesSlice = createSlice({
  name: 'userMessages',
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<any>) => {
      for(let message of action.payload){
        state.messages.push(message);
      }
    },
    addMessage: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.messages.push(action.payload);
    },
    resetMessages: () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { addMessages, addMessage, resetMessages } = messagesSlice.actions;

export default messagesSlice.reducer;