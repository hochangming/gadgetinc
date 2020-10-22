import Axios from "axios";
import config from "./config";
 
Axios.get(`${config.SERVER_URI}`).then(response=>{
  console.log(response.data); 
  localStorage.setItem('dataproducts',JSON.stringify(response.data));
  console.log(JSON.parse(localStorage.getItem('dataproducts')));
}).catch(err=>{
  console.log(err);
})
 
const initState = {
  items: localStorage.getItem('dataproducts')? JSON.parse(localStorage.getItem('dataproducts')) : '',
  // items: '',
  addedItems:[],
  total: 0

}
  export default initState;