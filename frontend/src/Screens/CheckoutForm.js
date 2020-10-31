import React, { Component,useState } from "react";
import PaypalButtons from "./PaypalButtons"; 
 

class CheckoutForm extends Component {
   state = {
    showPaypal: false,
    cartItems: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
  }; 
  
  showPaypalButtons = () => {
      console.log(JSON.parse(localStorage.getItem('cartItems')))
    this.setState({ showPaypal: true });
  };
   render() {
    const { showPaypal } = this.state;
    if (showPaypal) {
      return <PaypalButtons />;
    } else {
      return (
        <div className="main1">
            <div className="main-1-border">
            {this.state.cartItems.map(item=>{
               return <div><h5>Buy this {item.title} <b>now!</b> (<b>50% off</b>) </h5>
                         <h5>
                         <img className="all-image" src={item.image} alt={item.image}/>
                            
                            <b>${item.price- (50/100 * item.price)}</b>
                            {' '}
                            Qty: <b>{item.count}</b>
                        </h5>
               </div>
            })} 
        </div>
        <div className="main2">
           <h5><b> Total <span style={{ color: 'black' }} > ${this.state.cartItems.reduce((a,c)=> a + c.count * c.price -(50/100*c.price), 0)}</span>
           </b> <b>(</b><b style={{color: 'red'}}>Discount included</b><b>)</b></h5>
          <button type="submit" className="btn btn-primary btn-xl" onClick={this.showPaypalButtons}> Click here to pay </button>
          </div>
        </div>
      );
    }
  }
}

export default CheckoutForm;
