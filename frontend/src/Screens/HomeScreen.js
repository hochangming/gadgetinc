import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Axios from 'axios'; 
import config from '../config';
import Cookie from 'js-cookie'
const HomeScreen =(props)=>{
 
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false);  
  
  useEffect(() => {
    
    Axios.get(`${config.SERVER_URI}/api`).then(response=>{
      console.log(response.data);
      setItems(response.data);
      localStorage.setItem('dataproducts',JSON.stringify(response.data));
      Cookie.set('dataproducts',response.data)
     setLoaded(true);
    })
    return () => {
       
    }
  }, [])

    console.log();
    return ( 
      <div> 
      { !loaded?<div>loading...</div> :
        <section class="products">  
         {items.map(item=>{
                return  <div class="product-card">  
                <div class="product-image">
                  <Link to = {'/' + item.id}   > 
                    <img src= {item.image}></img> 
                    <h5>{item.title}</h5> 
                  </Link>
                 <div class="product-info"> 
                    <h6>${item.price}</h6>
                  </div>
                </div> 
                </div>  
            })}      
      </section>}
  </div>

    )
}

export default HomeScreen;