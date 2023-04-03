import React from 'react'
import { useForm , useField,notEmpty,lengthMoreThan,lengthLessThan } from '@shopify/react-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  add_item
} from "../../slices/ItemSlice"
import { Form, FormLayout, TextField , Select  } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'

export const AddForm = () => {
  // custom validator to validate quantity and price
  //const isNaturalNumber = (value:number) => value >= 0

  
  const options = [
    {label:"USD", value:"USD"},
    {label:"EUR",value:'EUR'}
  ]
  //creating form for adding items to redux state
  const {fields, submit} = useForm({
    fields:{
      title:useField({
        value:'',
        validates:[
          notEmpty('Title is required'),
          lengthMoreThan(3, 'Title must be more than 3 characters'),
          lengthLessThan(70,"Title cant contain more than 70 characters")
        ]
      }),
      price:useField({
        value:'',
        validates:[
          notEmpty('Price is required')
        ]
      }),
      quantity:useField({
        value:'',
        validates:[
          notEmpty('Product quantity is required')
        ]
      }),
      currency:useField({
        value:"USD",
        validates:[
          
        ]
      })
    },
    onSubmit (data:any):any{
      console.log(JSON.stringify(data))
      dispatch(add_item(data))
      navigate("/")
    }
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // pushing created Item to state
  
  return (
    <Form onSubmit={submit}>
        <FormLayout>
          <TextField 
            {...fields.title}
            autoComplete='off'
            label={"Product title:"}
            type="text" 
            name="title" 
            id="product_title" 
          />
          <br />
          <TextField
            {...fields.price}
            autoComplete='off'
            type="text"
            name="price" 
            label='Product price'
            id="product_price" 
          />
          <TextField 
            {...fields.quantity}
            autoComplete='off'
            type="text" 
            name="quantity" 
            label="Product quantity"
            id="product_quantity" 
          />
          
          <Select
            {...fields.currency}
            options={options}
            label='Select currency'
            name="currency" 
            id="product_currency"/>
          
          <button type="submit">Add product</button>
        </FormLayout>
    </Form>
  )
}
