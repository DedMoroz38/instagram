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
  }>,
  likes: Array<number>
}

const initialState: PostsState = {
  posts: [],
  attachments: [],
  likes: []
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
    addLikes: (state, action: PayloadAction<any>) => {
      const ids = action.payload.map((postId: { postId: any; }) => {
        return postId.postId
      })
      state.likes = [...ids];
    },
    addLike: (state, action: PayloadAction<number>) => {
      state.likes.push(action.payload);
    },
    removeLike: (state, action: PayloadAction<number>) => {
      state.likes.splice(action.payload, 1);
    },
    resetPosts: () => initialState,
  },
})

// Action creators are generated for each case reducer function
export const { addPosts, addLikes, resetPosts, removeLike, addLike } = followingsPostsSlice.actions;

export default followingsPostsSlice.reducer;