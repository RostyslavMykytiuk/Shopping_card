import {configureStore} from '@reduxjs/toolkit'
import ItemsReducer from '../slices/ItemSlice'

const store = configureStore({
    reducer : {
        items:ItemsReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch