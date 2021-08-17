import { configureStore } from '@reduxjs/toolkit'
import { filterDataByPrice } from './reducers/filter'

const store = configureStore({
  reducer: {
    filterReducer: filterDataByPrice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
