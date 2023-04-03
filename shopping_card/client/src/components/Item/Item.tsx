import React from 'react'
import Item from '../../models/ItemModel'


const ProductItem = ({title, price , quantity , currency}:Item) => {
  return (
      <tr className="item_info">
          <td>{title}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>{currency}</td>
      </tr>

  )
}
export default ProductItem
