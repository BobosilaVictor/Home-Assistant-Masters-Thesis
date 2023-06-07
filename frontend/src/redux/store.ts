import { configureStore } from '@reduxjs/toolkit'
import devicesReducer from './deviceSlice'
import buttonReducer from './buttonSlice'
import optimizationButtonReducer from './optimizationButtonSlice'
import optimizationPredictionReducer from './optimizerPredictionSlice'
import groupReducer from './groupSlice'

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    button: buttonReducer,
    groups: groupReducer,
    optimizationButton: optimizationButtonReducer,
    optimizationPrediction: optimizationPredictionReducer
    
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;