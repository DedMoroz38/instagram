import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MessagesState {
  messages: Array<{
    id?: string,
    message: string,
    messagefrom: string
    messageto: string
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
      state.messages.push(action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;