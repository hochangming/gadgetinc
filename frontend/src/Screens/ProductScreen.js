import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrayOfObjects from '../data';
import { connect } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import Axios from 'axios'; 
import config from '../config';
const ProductScreen =(props)=>{
    const [productImg, setProductImg] = useState();
    const [productDesc, setProductDesc] = useState();
    useEffect(() => {
        Axios.get(`${config.SERVER_URI}`).then(response=>{
            console.log(response.data[props.match.params.id-1].desc);
            setProductImg(response.data[props.match.params.id-1].image);
            setProductDesc(response.data[props.match.params.id-1].desc)
        })
        return () => { 
        }
    }, [])

     const handleClick = (id)=>{props.addToCart(id);
        props.history.push('/cart');
    }
    return ( 
        <div className="product-details">
            <div className="product-image">
                <img src= {productImg} ></img>

            </div>
            <div className="product-detail">
                Description: {productDesc}
                    
            </div>
            <div className="product-action">
              <button onClick={()=>{handleClick(props.match.params.id)}}>  Add to cart</button>

            </div>
        </div>

    )
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
  const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

 export default connect(mapStateToProps,mapDispatchToProps)(ProductScreen)