import { Product } from '../../types'
import {
  SET_BID_TEXT_DECORATION,
  SET_BUY_TEXT_DECORATION,
  SET_FILTER_PRICE,
} from './actionTypes'

export const setBuyTextDecoration = () => ({
  type: SET_BUY_TEXT_DECORATION,
})

export const setBidTextDecoration = () => ({
  type: SET_BID_TEXT_DECORATION,
})

export const setPriceFilter = (
  productType: Product,
  price: number,
  greaterThan: boolean
) => ({
  type: SET_FILTER_PRICE,
  payload: { productType, price, greaterThan },
})
