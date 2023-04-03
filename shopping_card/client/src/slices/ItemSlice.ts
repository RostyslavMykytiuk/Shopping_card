import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface Item {
    title:string;
    price:number;
    quantity:number;
    currency:string;
}

// initial state for items
const initialState:any = {
    items:[
        
    ]
} 

export const ItemsSlice = createSlice({
    name:"items",
    initialState,
    reducers:{
        add_item(state,action:PayloadAction<Item>){
            state.items.push(action.payload)
        }
    }
})

export const {add_item} = ItemsSlice.actions

export default ItemsSlice.reducer





