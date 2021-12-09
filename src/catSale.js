import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import {
BrowserRouter as Router,
Switch,
Route,
Link
} from "react-router-dom";


const App = () =>{
    const [sale,setSale] = useState("")
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState({
        error:false,
        message:""
    })
    const getter = async() =>{
        try{
        setLoading(true)
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
        if(response.status !== 200){
        throw new Error("not working")
        }
        const data = await response.json()
        setSale(data)
        setLoading(false)
        }catch (error) {
        setError({error:true,message:error.message})
        }
        
    }
    useEffect(()=>{
        getter()
    },[])
    if(!sale || loading){
        return <h1>loading...</h1>
    }
    if(error.error){
        return <h1>{error.message}</h1>
    }
    function Home() {
        return <h1 className="header">Home</h1>;
    }
    
    function About() {
        return <h1 className="header">About</h1>;
    }
    
    function User() {
        return (
        <div className="cats">
        <h1 className="header">Cats For Sale</h1>
        <Cat sale={sale}/>
    </div>
    )
    }
    function Checkout(){
        return(
            <div>
            <Basket cart={sale}/>
            </div>
        )
    }
    return(
        <div>
            <div>
            <Router>
    <div>
        <nav className="navbar">
        <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/about">About</Link>
            </li>
            <li>
            <Link to="/User">Cats for sale</Link>
            </li>
            <li>
                <Link to="/checkout">Basket</Link>
            </li>
        </ul>
        </nav>
        <Switch>
        <Route path="/about">
            <About />
        </Route>
        <Route path="/User">
            <User />
        </Route>
        <Route path="/checkout">
            <Checkout />
        </Route>
        <Route path="/">
            <Home />
        </Route>
        </Switch>
        
    </div>
    </Router>
        </div>
    </div>
    )
}

const Cat = ({sale}) => {
    const [cat,setCat] = useState("")
    const catS=()=>{
        setCat(sale)
    }
    const randomPrice = () =>{
        let price = Math.floor(Math.random()*200)
        return(
            price
        )
    }
    useEffect(()=>{
        catS()
    },[])
    useEffect(()=>{
        randomPrice()
    },[])
    if(!cat){
        return null
    }
    if(!sale){
        return null
    }
    return(
        <div className="catt">
            {cat.map((img,index)=>{
            return( 
                <div>
                <img key={index} src={img.url}/>
                <h2>Price: £{randomPrice(index)}</h2>
                <button>Add to basket</button>
                </div>
            )
            })} 
        </div>
    )
}

const Basket = ({storedCart}) => {
    const [cart, setCart] = useState([])
    const addHandler = () =>{
        let storedCart = [...cart]
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



export default App;
