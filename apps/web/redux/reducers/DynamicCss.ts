import { AnyAction } from '@reduxjs/toolkit'
import { Reducer } from 'react'
import {
  SET_BID_TEXT_DECORATION,
  SET_BUY_TEXT_DECORATION,
} from '../actionTypes'

const initialState = {
  BuyTextDecoration: 'none',
  BidTextDecoration: 'underline',
}

interface textDecorationProps {
  BuyTextDecoration: string
  BidTextDecoration: string
}

export const textDecoration: Reducer<
  textDecorationProps | undefined,
  AnyAction
> = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUY_TEXT_DECORATION: {
      return {
        BuyTextDecoration: 'underline',
        BidTextDecoration: 'none',
      }
    }
    case SET_BID_TEXT_DECORATION: {
      return {
        BuyTextDecoration: 'none',
        BidTextDecoration: 'underline',
      }
    }
    default: {
      return state
    }
  }
}
