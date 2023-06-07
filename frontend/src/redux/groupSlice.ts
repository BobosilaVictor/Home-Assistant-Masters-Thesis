import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Device, Groups } from '../models'
import type { RootState } from './store'

// Define a type for the slice state
interface GroupState {
  group:  Groups[]
}

// Define the initial state using that type
const initialState: GroupState = {
  group:  []
}

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addGroups: (state, action: PayloadAction<Groups[]>) => {
      state.group = action.payload
    }
  }
})

export const { addGroups } = groupSlice.actions


// Other code such as selectors can use the imported `RootState` type
export const selectGroups = (state: RootState) => state.groups.group

export default groupSlice.reducer