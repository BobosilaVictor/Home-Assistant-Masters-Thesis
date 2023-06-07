import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface optimizationButtonState {
  value: string
}

// Define the initial state using that type
const initialState: optimizationButtonState = {
  value: ""
}

export const optimizationPrediction = createSlice({
  name: 'optimizationButton',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    prediction_value: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  }
})

export const { prediction_value} = optimizationPrediction.actions

// Other code such as selectors can use the imported `RootState` type
export const selectOptimizationPrediction = (state: RootState) => state.optimizationPrediction.value

export default optimizationPrediction.reducer