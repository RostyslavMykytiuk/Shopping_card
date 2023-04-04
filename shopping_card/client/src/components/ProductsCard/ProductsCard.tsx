import React, { useEffect, useState } from 'react'
import {AlphaCard, Button} from '@shopify/polaris';
import Item from '../../models/ItemModel'
import './ProductCard.css'
import ProductItem from '../Item/Item'
import { useAppSelector } from '../../store/hooks';
import {  useNavigate } from 'react-router-dom'


const ProductsCard = () => {
  // getting items from redux state
  const items = useAppSelector((state)=> state.items.items)

  const [totalprice , setTotalPrice] = useState(0)

  const [paymentCurrency, setPaymentCurrency] = useState('USD')

  const [currencyRateResult, setCurrencyRateResult] = useState(1)

  const navigate = useNavigate()

  const saveReceipt = async () => {
    if(items.length === 0){
      alert("Please add items to save receipt")
    }
    else{
      //creating receipt date
      const today = new Date()
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const currentDate = date +' '+time
      //creating object to post on server

      const receiptData = JSON.stringify({      
          date:currentDate,
          totalprice:totalprice,
          currency:paymentCurrency,
          items:[...items]
      })
      // post object to server
      fetch('http://localhost:3001/receipts',{
        method:"POST",
        headers: {
          "Content-type": "application/json",
        } ,
        body:receiptData
      },)
    }
    
  }

  // useEffect used to get rate from server and 
  //to calculate total price each time we adding new item or chanching currency by checkbox 
  useEffect(()=>{
    const getCurrencyRate = async () =>{
      const response = await fetch(`http://localhost:3001/rate`)
      const value = await response.json()
      setCurrencyRateResult(value.rate)
    }
    getCurrencyRate()
    let totalprice = 0
    // calculating total price 
    items.forEach((item:Item) => {
      if(item.currency !== paymentCurrency){
        if(item.currency === 'EUR'){
          const itemTotalPrice = item.price*item.quantity
          totalprice += itemTotalPrice * currencyRateResult
        }
        else if(item.currency === 'USD'){
          const itemTotalPrice = item.price*item.quantity
          totalprice += itemTotalPrice / currencyRateResult
        }
      }
      else {
        totalprice += item.price * item.quantity
      }
      totalprice = parseFloat(totalprice.toFixed(2))
      setTotalPrice(totalprice)
    });
    
  },[items,paymentCurrency])

  return (
    <div className="card_container">
    <AlphaCard>
        <table className="products_info" >
           <thead>
              <tr>
                <th>Product name</th>
                <th>price</th>
                <th>quantity</th>
                <th>currency</th>
              </tr>
           </thead>
           <tbody>
              {
                items.map((item:Item,index:number) =>{
                  return (
                    <ProductItem
                      key={index}
                      title={item.title}
                      quantity={item.quantity}
                      price={item.price}
                      currency={item.currency}
                    />
                  )
                })
              }
           </tbody>
        </table>
        <div className="align_right_container">
          <Button onClick={()=> navigate("/add")}>Add items</Button>
          <br/>
          <h3 className='total_price_heading'>Total price : {totalprice} {paymentCurrency}</h3> 
          <br />
          Payment currency :
          <select 
                name="select_currency" 
                defaultValue={paymentCurrency} 
                onChange={(event)=>{setPaymentCurrency(event.target.value)}} >
                  <option  value="USD">USD</option>
                  <option value="EUR">EUR</option>
          </select>
          <br />
          <div className="save_receipt_button">
            <Button  onClick={saveReceipt}>Save</Button>
          </div>
        </div>
       
    </AlphaCard>
    </div>
  )
}

export default ProductsCard
