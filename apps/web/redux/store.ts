import { configureStore } from '@reduxjs/toolkit'
import { textDecoration } from './reducers/DynamicCss'
import { filterData } from './reducers/filter'

export const store = configureStore({
  reducer: {
    textDecoration: textDecoration,
    filterData: filterData,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
