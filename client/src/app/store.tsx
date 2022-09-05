import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import friendReducer from '../features/friends/friendsSlice';
import messagesReducer from '../features/messages/messagesSlice';


export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    userFriends: friendReducer,
    userMessages: messagesReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;