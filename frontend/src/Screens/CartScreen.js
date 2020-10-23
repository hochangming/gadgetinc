import Axios from 'axios';
import React, { Component, useEffect,useState } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from '../actions/cartActions'
import ShippingScreen from './ShippingScreen';

const CartScreen =(props)=>{ 
    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem('cartItems')))
 
     const handleClick = (e)=>{
        e.preventDefault();
        if(localStorage.getItem('loginState')){

        } else{ 
            console.log(props.id) 
            props.history.push('/login')
        }
    }
 
    //  //to remove the item completely
    const handleRemove = (id)=>{
        setCartItem(cartItem.filter(item => item.id !== id));
        localStorage.setItem('cartItems',JSON.stringify(cartItem));
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
                                <p>{item.desc}</p>
                                <p><b>Price: {item.price}$</b></p> 
                                <p>
                                    <b>Quantity: {item.count}</b> 
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><i className="material-icons" onClick={()=>{handleAddQuantity(item.id)}}>arrow_drop_up</i></Link>
                                    <Link to="/cart"><i className="material-icons" onClick={()=>{handleSubtractQuantity(item.id)}}>arrow_drop_down</i></Link>
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
        <div className="container">
        <div className="cart">
            <h5>You have ordered:</h5>
            <ul className="collection">
                {addedItems}
            </ul>
        </div>
        {/* <ShippingScreen key={props.history} id={props.history}/>                 */}
           <div className="container">
                <div className="collection">
                    <li className="collection-item"> 
                        </li>
                        <li className="collection-item"><b>Total: ${
                            cartItem.reduce((a,c)=> a + c.count * c.price, 0) 
                        }</b></li>
                    </div>
                    <div className="checkout">
                        <button onClick={(e)=>handleClick(e)} className="waves-effect waves-light btn">Checkout</button>
                    </div>
                 </div>
    </div>

    )
}

// const mapStateToProps = (state)=>{
//     return{
//         items: state.addedItems
//     }
// }
// const mapDispatchToProps = (dispatch)=>{
//     return{
//         removeItem: (id)=>{dispatch(removeItem(id))},
//         addQuantity: (id)=>{dispatch(addQuantity(id))},
//         subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
//     }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(CartScreen) 
export default CartScreen;