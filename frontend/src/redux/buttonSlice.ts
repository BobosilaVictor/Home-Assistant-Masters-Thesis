import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface ButtonState {
  value: number
}

// Define the initial state using that type
const initialState: ButtonState = {
  value: 0
}

export const buttonSlice = createSlice({
  name: 'button',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    exposes: state => {
      state.value = 0
    },
    bind: state => {
      state.value = 1
    },
    group: state => {
      state.value = 2
    },
    settings: state => {
      state.value = 3
    },
  }
})

export const { exposes, bind, group, settings } = buttonSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectButton = (state: RootState) => state.button.value

export default buttonSlice.reducer