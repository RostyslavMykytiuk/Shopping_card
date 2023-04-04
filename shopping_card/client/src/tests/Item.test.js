import {render, screen ,cleanup} from '@testing-library/react'
import Item from '../components/Item/Item'
test("should render Item component",()=>{
    render(<Item/>)
    const itemElement = screen.getByTestId('todo-1');
    expect(itemElement).toBeInTheDocument();
})
test("should contain text value of props",()=>{
    const item = {title:"banana",price:7,quantity:9,currency:"USD"}
    render(<Item title={item.title} price={item.price} quantity={item.quantity} currency={item.currency}/>)
    const itemElement = screen.getByTestId('todo-1');
    expect(itemElement).toHaveTextContent("banana")
})
test("should contain td tag element",()=>{
    const item = {title:"banana",price:7,quantity:9,currency:"USD"}
    render(<Item title={item.title} price={item.price} quantity={item.quantity} currency={item.currency}/>)
    const itemElement = screen.getByTestId('todo-1');
    expect(itemElement).toContainHTML("<td>")
})