import {configureStore} from '@reduxjs/toolkit'
import ItemsReducer from '../slices/ItemSlice'

export const store = configureStore({
    reducer : {
        items:ItemsReducer
    }
})