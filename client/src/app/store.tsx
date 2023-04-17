import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import conversationsReducer from '../features/friends/conversationsSlice';
import messagesReducer from '../features/messages/messagesSlice';
import userPostsReducer from '../features/posts/userPostsSlice';
import followingsPostsReducer from '../features/posts/followingsPostsSlice';
import accountPostsSlice from '../features/posts/accountPostsSlice';


export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    userConversations: conversationsReducer,
    userMessages: messagesReducer,
    userPosts: userPostsReducer,
    followingsPosts: followingsPostsReducer,
    accountPosts: accountPostsSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;