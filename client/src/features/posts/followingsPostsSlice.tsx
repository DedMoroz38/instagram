import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  posts: Array<{
    postId: number,
    userName: string
  }>,
  attachments: Array<{
    attachmentId: number,
    postId: number,
    firstPostAttachment: string,
    userPhoto: string
  }>
}

const initialState: PostsState = {
  posts: [],
  attachments: []
}


  

export const followingsPostsSlice = createSlice({
  name: 'followingsPosts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<any>) => {
      for(let attachment of action.payload){
        let postId: number = +attachment.postId;
        if(
          !state.posts.includes({
            postId: postId,
            userName: attachment.userName
          })
        ){
          state.posts.push({
            postId,
            userName: attachment.userName
          })
        }
        state.attachments.push({
          attachmentId: +attachment.attachmentId,
          firstPostAttachment: attachment.firstPostAttachment,
          postId: postId,
          userPhoto: attachment.userPhoto
      })
      }
    },
    addPost: (state, action: PayloadAction<any>) => {
      //TODO - make it work
      // state.posts.push(action.payload);
    },
    resetPosts: () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { addPosts, addPost, resetPosts } = followingsPostsSlice.actions;

export default followingsPostsSlice.reducer;