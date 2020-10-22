import React, { useEffect, useState } from 'react'; 
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import UserScreen from './Screens/UserScreen';
import ShippingScreen from './Screens/ShippingScreen';

function App() {
  const [state, setstate] = useState(); 
  useEffect(() => {
    setstate(localStorage.getItem('loginState') ? JSON.parse(localStorage.getItem('loginState')).emailAddress : '')
    return () => { 
    }
  }, [])
   return (
    <BrowserRouter>
      <div class="wrapper">
          <header>
          <Link to="/">Home</Link> 
          <h1>Gadget Inn</h1>
          <div>
          {localStorage.getItem('loginState') ? 
          (<Link to="/user">{state}</Link>): 
          <Link to="/login">Log In</Link>
          }
          
          <Link to="/cart">Cart</Link> 
          </div>
           </header>
          <main>
          <Switch> 
          <Route path ="/user" component={UserScreen}></Route>  
          <Route path ="/register" component={RegisterScreen}></Route> 
          <Route path ="/login" component={LoginScreen}></Route>
          <Route path ="/cart" component={CartScreen}></Route>   
          <Route path ="/:id" component={ProductScreen}></Route> 
          <Route exact path ="/" component={HomeScreen}></Route>
          </Switch>
          </main>
          
          <footer>I'm a 30px tall footer</footer>
      </div>
</BrowserRouter>
  );
}

export default App;
