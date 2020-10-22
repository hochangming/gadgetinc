import Axios from "axios";
 
Axios.get('http://localhost:5000/').then(response=>{
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