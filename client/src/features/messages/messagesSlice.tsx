import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MessagesState {
  messages: Array<{
    message_type: 'text'
    message_id: number,
    conversation_id: number,
    message: string,
    created_at: string,
    sender_id: number
  } | {
    message_type: 'file',
    message_id: number,
    conversation_id: number,
    created_at: string,
    sender_id: number,
    message: string,
    attachments: Array<{
      attachment_id: number,
      file_name: string,
      size: number,
      message_id?: number
    }>
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
      state.messages.unshift(action.payload);
    },
    resetMessages: () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { addMessages, addMessage, resetMessages } = messagesSlice.actions;

export default messagesSlice.reducer;