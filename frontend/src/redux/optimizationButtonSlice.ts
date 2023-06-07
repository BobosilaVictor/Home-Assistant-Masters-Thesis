import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface optimizationButtonState {
  value: boolean
}

// Define the initial state using that type
const initialState: optimizationButtonState = {
  value: false
}

export const optimizationButtonSlice = createSlice({
  name: 'optimizationButton',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    on: state => {
      state.value = true
    },
    off: state => {
      state.value = false
    },
  }
})

export const { on, off } = optimizationButtonSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectOptimizationButton = (state: RootState) => state.optimizationButton.value

export default optimizationButtonSlice.reducer