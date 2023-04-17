import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PostsState {
  posts: Array<{
    postId: number,
    userName: string,
    userId: number
  }>,
  attachments: Array<{
    attachmentId: number,
    postId: number,
    firstPostAttachment: string,
    userPhoto: string
  }>,
  likes: Array<number>,
  numberOfLikes: any
}

const initialState: PostsState = {
  posts: [],
  attachments: [],
  likes: [],
  numberOfLikes: {}
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
            userName: attachment.userName,
            userId: attachment.userId
          })
        ){
          state.posts.push({
            postId,
            userName: attachment.userName,
            userId: attachment.userId
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
      state.likes = [...action.payload];
    },
    addLike: (state, action: PayloadAction<number>) => {
      state.likes.push(action.payload);
    },
    removeLike: (state, action: PayloadAction<number>) => {
      state.likes.splice(action.payload, 1);
    },
    addNumberOfLikes: (state, action: PayloadAction<any>) => {
      state.numberOfLikes = {...action.payload};
    },
    incrementLikeNumber: (state, action: PayloadAction<any>) => {
      const postId = action.payload;
      state.numberOfLikes[`${postId}`] += 1;
    },
    decrementLikeNumber: (state, action: PayloadAction<any>) => {
      const postId = action.payload;
      state.numberOfLikes[`${postId}`] -= 1;
    },
    resetPosts: () => initialState,
  },
})

// Action creators are generated for each case reducer function
export const { addPosts, addLikes, resetPosts, removeLike, addLike, addNumberOfLikes, incrementLikeNumber, decrementLikeNumber } = followingsPostsSlice.actions;

export default followingsPostsSlice.reducer;