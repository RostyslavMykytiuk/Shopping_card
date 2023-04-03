import React, { useEffect, useState } from 'react'
import Item from '../../models/ItemModel'
import './ProductCard.css'
import ProductItem from '../Item/Item'
import { useSelector  } from 'react-redux'
import {  useNavigate } from 'react-router-dom'


const ProductsCard = () => {
  // getting items from redux state
  const items = useSelector((state:any)=> state.items.items)

  const [totalprice , setTotalPrice] = useState(0)

  const [paymentCurrency, setPaymentCurrency] = useState('USD')

  const [currencyRateResult, setCurrencyRateResult] = useState(1)

  const navigate = useNavigate()

  const saveReceipt = async () => {
    //creating date to use as receipt key 
    const arr = []
    const date = new Date()
    let year = date.getFullYear()
    arr.push(year)
    let month = date.getMonth() + 1
    arr.push(month)
    let day = date.getDate()
    arr.push(day)
    let hours = date.getHours()
    arr.push(hours)
    let minutes = date.getMinutes()
    arr.push(minutes)
    let seconds = date.getSeconds()
    arr.push(seconds)
    const currentDate = arr.join('-')

    //creating object to post on server

    const receiptData = JSON.stringify({
        [currentDate]:{
          totalprice:totalprice,
          currency:paymentCurrency,
          items:[...items]
        }
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
    <div className='products_card_container'>
        <table className="products_info">
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
        <button onClick={()=> navigate("/add")}>Add items</button>
        <br />
        Total price : {totalprice}
        <br />
        Payment currency :
        <select 
              name="select_currency" 
              defaultValue={paymentCurrency} 
              onChange={(event)=>{setPaymentCurrency(event.target.value)}} >
                <option  value="USD">USD</option>
                <option value="EUR">EUR</option>
        </select>
        Currency rate:{currencyRateResult}
        <br />
        <button onClick={saveReceipt}>Save</button>
    </div>
  )
}

export default ProductsCard
