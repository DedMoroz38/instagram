import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import friendReducer from '../features/friends/friendsSlice';
import messagesReducer from '../features/messages/messagesSlice';
import userPostsReducer from '../features/posts/userPostsSlice';
import followingsPostsReducer from '../features/posts/followingsPostsSlice';


export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    userFriends: friendReducer,
    userMessages: messagesReducer,
    userPosts: userPostsReducer,
    followingsPosts: followingsPostsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;