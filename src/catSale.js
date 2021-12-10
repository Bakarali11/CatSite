import { useState } from "react";
import img1 from './cat1.jpg';
import img2 from './cat2.jpg';
import img3 from './cat3.jpg';
import { useEffect } from "react";
import React from "react";
import {
BrowserRouter as Router,
Switch,
Route,
Link
} from "react-router-dom";
const faker = require('faker');


const App = () =>{
    const [basket,setBasket]=useState([])
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
        const fakeData = await fakeDataHandler(data)
        setSale(data)
        setLoading(false)
        }catch (error) {
        setError({error:true,message:error.message})
        }
        
    }
    const fakeDataHandler = (data) =>{
        data.map((cat)=>{
            cat["name"] = faker.name.firstName()
            cat["price"] = parseInt(faker.commerce.price())
        })
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
        return(
            <div>
            <h1 className="header">Home</h1>;
            </div>
        )
    }
    
    function About() {
        return (<div>
        <h1 className="header">About</h1>
        <Aboutt/>
        </div>
        )
    }
    
    function User() {
        return (
        <div className="cats">
        <h1 className="header">Cats For Sale</h1>
        <Cat setBasket={setBasket} basket={basket} sale={sale}/>
    </div>
    )
    }
    function Checkout(){
        return(
            <div>
                <div>
                <h1>Basket</h1>
                </div>
            <Basket basket={basket} setBasket={setBasket}/>
            <h2>Total: £ WIP</h2>
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
            <Link to="/About">About</Link>
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
        <Route path="/About">
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

const Cat = ({sale, setBasket, basket}) => {
    const updateBasket = (cat) =>{
        let stored = [...basket]
        stored.push(cat)
        setBasket(stored)
    }
    if(!sale){
        return null
    }
    return(
        <div className="catt">
            {sale.map((cat,index)=>{
            return( 
                <div>
                <img key={index} src={cat.url}/>
                <h2>{cat.name}</h2>
                <h2>Price: £{[cat.price]}</h2>
                <button onClick={ () => {updateBasket(cat)}}>Add to basket</button>
                </div>
            )
            })} 
        </div>
    )
}

const Basket = ({basket,setBasket}) => {
    const deleteHandler = (index) =>{
        let storedCart = [...basket]
        storedCart.splice(index,1)
        setBasket(storedCart)
    }
return(
    <div className="catt">
    {basket && 
    basket.map((cat,index) =>{
        return (<div key={index} value = "item">
            <img src={cat.url}/>
            <h2>{cat.name}</h2>
            <h2>Price: £{[cat.price]}</h2>
        <button onClick = {() => deleteHandler(index)}>Remove from Basket</button>
        </div>)
    })}
    </div> )
}

const Aboutt = () => {
    return <div>
        {/* <h1>About Us</h1> */}
        <p>Hello we are cats4lyf</p>
        <br/>
        <p>We're a cat sales agency that help businesses drive revenue with the use of inbound marketing and sales. Our team is made up of smart and talented people that are passionate about creating inbound sales results.</p>
        <br />
        <p>In 2021, we spoke to over 10,000 people from lifelong cat-lovers to potential owners.</p>
        <br />
        <p>Our vision is a world where every cat is treated with kindness and an understanding of it's needs. Yes we know its an ambitious vision. However, we truly believe it can be achieved because of our passion, our professional approach and simply because cats are among the UK's most popular companion pets.</p>
        <br />
            <div className="catt">
                <img src={img1} height={200} width={200} alt=''/>
                <img src={img2} height={200} width={200} alt='' />
                <img src={img3} height={200} width={200} alt='' />
            </div>
        </div>
    }


export default App;
