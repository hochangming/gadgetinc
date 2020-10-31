import Axios from 'axios';
import React, { Component, useEffect,useState } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from '../actions/cartActions' 

const CartScreen =(props)=>{ 
    const [cartItem, setCartItem] = useState(localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [])
    
     const handleClick = (e)=>{
        e.preventDefault();
        if(localStorage.getItem('cartItems')){
            if(localStorage.getItem('loginState')){
                props.history.push('/checkout');
            } else{ 
                console.log(props.id) 
                alert('Sign In First')
                localStorage.setItem('checkOutSignin',JSON.stringify('checkOutSignin'))
                props.history.push('/login')
            }
        } else{
            alert("There's no items in your cart!")
        }

    }
 
    //  //to remove the item completely
    const handleRemove = (id)=>{
        setCartItem(cartItem.filter(item => item.id !== id));
        localStorage.setItem('cartItems',JSON.stringify(cartItem));
        if (cartItem.length === 1) {
        localStorage.removeItem("cartItems");
    }
     }
     console.log(cartItem)
    //to add the quantity
    const handleAddQuantity = (id)=>{
        let cartItemClone = cartItem;
        let addedItem = cartItem.find(item=> item.id == id)
        var index = cartItem.indexOf(id);
        addedItem.count++;
        if (~index) { 
            cartItem[index] = addedItem;
        }
        console.log(cartItem);
        setCartItem(cartItem);
     
        localStorage.setItem('cartItems',JSON.stringify(cartItem));

    }
    //to substruct from the quantity
    const handleSubtractQuantity = (id)=>{ 
        let cartItemClone = cartItem;
        let addedItem = cartItem.find(item=> item.id == id)
        var index = cartItem.indexOf(id);
        if(addedItem.count>1){ 
            addedItem.count--;
        }
        if (~index) { 
            cartItem[index] = addedItem;
        }
        console.log(cartItem);
        setCartItem(cartItem);
     
        localStorage.setItem('cartItems',JSON.stringify(cartItem));
    }
  
    // console.log(JSON.parse(localStorage.getItem('state')))
    let addedItems = cartItem.length ?
    // let addedItems = props.items.length?
    (  
        // JSON.parse(localStorage.getItem('state')).map(item=>{
            cartItem.map(item=>{ 
            return(
               
                <li className="collection-item avatar" key={item.id}>
                    <div className="item-img"> 
                        <img src={item.image} alt={item.image}/>
                    </div>                         
                    <div className="item-desc">
                        <span className="title">{item.title}</span>
                        <p className="description">{item.desc}</p>
                        <p><b>Price: {item.price}$</b></p> 
                        <p>
                            <b>Quantity: {item.count}</b> 
                        </p>
                        <div className="add-remove">
                            <Link to="/cart"><i className="material-icons btn btn-secondary" onClick={()=>{handleAddQuantity(item.id)}}>arrow_drop_up</i></Link>
                            <Link to="/cart"><i className="material-icons btn btn-secondary" onClick={()=>{handleSubtractQuantity(item.id)}}>arrow_drop_down</i></Link>
                        </div>
                        <button className="waves-effect waves-light btn pink remove" onClick={()=>{handleRemove(item.id)}}>Remove</button>
                    </div>                           
                </li>                
            )
        })
    ):

     (
        <p>Nothing.</p>
     )
    return ( 
        <div className="container-main">
            <div className="cart">
                <h5>You have ordered:</h5>
                <ul className="collection">
                    {addedItems}
                </ul>
            </div>
            <div className="container">
                <div className="collection">
                    <li className="collection-item-1"> 
                        </li>
                        <li className="collection-item-2"><b>Total: ${
                            cartItem.reduce((a,c)=> a + c.count * c.price, 0) 
                        }</b></li>
                </div>
                <div className="checkout">
                    <button onClick={(e)=>handleClick(e)} className="waves-effect waves-light btn btn-primary btn-xl">Checkout</button>
                </div>
            </div>
        </div>

    )
} 
export default CartScreen;