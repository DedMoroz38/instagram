import { PayloadAction } from "@reduxjs/toolkit";
import { PostsState } from "../posts/followingsPostsSlice";
import { createSlice } from '@reduxjs/toolkit';

const initialState: PostsState = {
  posts: [],
  attachments: [],
  likes: [],
  numberOfLikes: {}
}

export const userPostsSlice = createSlice({
  name: 'userPosts',
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
    deleteUserPost: (state, action: PayloadAction<any>) => {
      const postId = action.payload.postId;
      state.attachments = [...state.attachments.filter(attachment => attachment.postId !== postId)];
      const likeIndex = state.likes.indexOf(postId);
      state.likes.splice(likeIndex, 1);
      delete state.numberOfLikes[postId];
      state.posts = [...state.posts.filter(posts => posts.postId !== postId)];
    },
    resetPosts: () => initialState,
  },
})

// Action creators are generated for each case reducer function
export const { addPosts, addLikes, resetPosts, removeLike, addLike, addNumberOfLikes, incrementLikeNumber, decrementLikeNumber, deleteUserPost } = userPostsSlice.actions;



export default userPostsSlice.reducer;
