import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Device } from '../models'
import type { RootState } from './store'

// Define a type for the slice state
interface DeviceState {
  device: Device[]
}

// Define the initial state using that type
const initialState: DeviceState = {
  device: []
}

export const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<Device[]>) => {
      state.device = action.payload
    }
  }
})

export const { incrementByAmount } = deviceSlice.actions


// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.devices.device

export default deviceSlice.reducer