import {randomPrice} from "../App";
const { useState } = require("react");

const Basket = () => {
    const [cart, setCart] = useState([])
    const addHandler = () =>{
        let storedCart = randomPrice([...cart])
        storedCart.push(setCart)
        setCart(storedCart)
    }
    const deleteHandler = (index) =>{
        let storedCart = [...cart]
        storedCart.splice(index,1)
        setCart(storedCart)
    }
return(
    <div>
    <h1>Basket</h1>
    <button type="button" onClick = {addHandler}>+</button>
    {cart && 
    cart.map((index) =>{
        return (<div key={index} value = "item">
        <button onClick = {() => deleteHandler(index)}>-</button>
        </div>)
    })}
    </div> )
}
export default Basket;