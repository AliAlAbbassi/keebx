import {
  SET_BID_TEXT_DECORATION,
  SET_BUY_TEXT_DECORATION,
  SET_FILTER,
} from './actionTypes'

export const setFilter = (filter: any) => ({
  type: SET_FILTER,
  payload: { filter },
})

export const setBuyTextDecoration = () => ({
  type: SET_BUY_TEXT_DECORATION,
})

export const setBidTextDecoration = () => ({
  type: SET_BID_TEXT_DECORATION,
})
