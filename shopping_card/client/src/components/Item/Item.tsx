import './Item.css'
import Item from '../../models/ItemModel'


const ProductItem:React.FC<Item> = ({title, price , quantity , currency}) => {
  return (
      <tr data-testid="todo-1" className="item_info">
          <td>{title}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>{currency}</td>
      </tr>

  )
}
export default ProductItem
