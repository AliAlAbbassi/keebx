import { AnyAction, Reducer } from '@reduxjs/toolkit'
import { Keeb } from '../../generated/graphql'

interface filterProps {
  price: number
  data: Keeb[]
}

export const filterDataByPrice: Reducer<filterProps, AnyAction> = (
  state,
  action
) => {
  console.log('state', state)
  console.log('action', action)
  return state!
}
