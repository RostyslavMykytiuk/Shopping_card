import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  add_item
} from "../../slices/ItemSlice"

export const AddForm = () => {
  // custom validator to validate quantity and price
  const isNaturalNumber = (value:number) => value >= 0

  //creating form for adding items to redux state
  const{
    register,
    formState:{errors},
    reset,
    handleSubmit
  } = useForm({
    mode:'onBlur'
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // pushing created Item to state
  const onSubmit = (data:any) =>{
    console.log(JSON.stringify(data))
    dispatch(add_item(data))
    reset()
    navigate("/")
  }
  return (
    <form className='form_container' onSubmit={handleSubmit(onSubmit)}>
        Product Title:<br></br>
        <input 
          {...register('title',
            {
              required:true,
              minLength:4,
              maxLength:100
            })
          }
          type="text" 
          name="title" 
          id="product_title" 
        />
        <br />
        {errors?.title && <p>Please enter valid data for this field</p>}
        Product price:<br></br>
        <input 
          {...register("price",
            {
              required:true,
              validate:isNaturalNumber
            }
          )}
          type="number"
          step='0.01' 
          name="price" 
          id="product_price" 
        />
        <br />
        {errors?.price && <p>Please enter valid data for this field</p>}
        Product Quantity:<br></br>
        <input 
          {...register("quantity",
          {
            required:true,
            validate:isNaturalNumber
          }
          )}
          type="number" 
          name="quantity" 
          id="product_quantity" 
        />
        <br />
        {errors?.quantity && <p>Please enter valid data for this field</p>}
        Product Currency <br />
        <select 
           {...register("currency",
            {
              required:true
            }
           )}
           defaultValue="USD"
           name="currency" 
           id="product_currency">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
        </select>
        <br />
        <button type="submit">Add product</button>
    </form>
  )
}
