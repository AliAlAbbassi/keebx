import { AnyAction, Reducer } from '@reduxjs/toolkit'
import { Product } from '../../../types'
import { SET_FILTER_PRICE } from '../actionTypes'

interface filterProps {
  price: number
  productType: Product | string
  greaterThan: boolean
}

const initialState = {
  price: 300,
  productType: 'Keeb',
  greaterThan: true,
}

export const filterData: Reducer<filterProps, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_FILTER_PRICE:
      console.log(action.payload)
      return action.payload
  }

  return state
}
