import { SET_FILTER } from './actionTypes'

export const setFilter = (filter: any) => ({
  type: SET_FILTER,
  payload: { filter },
})
