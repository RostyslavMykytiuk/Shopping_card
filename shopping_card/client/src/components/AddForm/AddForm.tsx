
import { useForm , useField,notEmpty,lengthMoreThan,lengthLessThan } from '@shopify/react-form'
import { useAppDispatch } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import {
  add_item
} from "../../slices/ItemSlice"
import { Form, FormLayout, TextField , Select, Button  } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import "./AddForm.css"
import Item from '../../models/ItemModel'


export const AddForm = () => {
  
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
        validates : [
          notEmpty("Product price is required"),
          function isNumber(value:string){
            if(parseFloat(value)<=0){
              return "Price should be higher than 0"
            }
          }
        ]
      }),
      quantity:useField({
        value:'',
        validates:[
          notEmpty('Product quantity is required'),
          function isInteger(value:string){
            if(parseFloat(value) - parseInt(value)!==0){
              return "Quantity should be integer value"
            }
          },
          function isNumber(value:string){
            if(parseFloat(value)<=0){
              return "Quantity should be higher than 0"
            }
          }
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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // pushing created Item to state
  
  return (
    
    <Form onSubmit={submit} data-testid="test-form">
      <div className="form_container">
        <h1 className='heading'>Add Item</h1>
        <FormLayout >
          <TextField 
            {...fields.title}
            autoComplete='off'
            label={"Product title:"}
            type="text" 
            name="title" 
            id="product_title" 
          />
          <TextField
            {...fields.price}
            autoComplete='off'
            type="number"
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
          
          <Button   submit>Add product</Button>
        </FormLayout>
      </div>
    </Form>
    
  )
}
