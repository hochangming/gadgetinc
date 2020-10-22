import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Axios from 'axios'; 
const HomeScreen =(props)=>{
 
  const [items, setItems] = useState([])
  useEffect(() => {
    Axios.get('http://localhost:5000/').then(response=>{
      console.log(response.data);
      setItems(response.data);
    })
    return () => {
       
    }
  }, [])

    console.log();
    return (
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
      </section>


    )
}

export default HomeScreen;