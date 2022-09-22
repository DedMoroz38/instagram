import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  posts: Array<number>,
  attachments: Array<{
    attachmentId: number,
    postId: number,
    fileName: string,
  }>
}

const initialState: PostsState = {
  posts: [],
  attachments: []
}


  

export const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<any>) => {
      for(let attachment of action.payload){
        let postId = +attachment.postId;
        if(!state.posts.includes(postId)){
          state.posts.push(postId);
        }
        state.attachments.push({
          attachmentId: +attachment.attachmentId,
          fileName: attachment.fileName,
          postId: postId
      })
      }
    },
    addPost: (state, action: PayloadAction<any>) => {
      state.posts.push(action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addPosts, addPost } = userPostsSlice.actions;

export default userPostsSlice.reducer;