import initState from '../data';  
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING} from '../components/ReducerTypes'
import Axios from 'axios'; 
import config from '../config';
//Reducers specify how the application’s state changes in response to actions sent to the store.
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
        
        console.log(state)
          let addedItem = state.items.find(item=> item.id == action.id)
         

          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id == item.id)
         console.log(existed_item);
         try{ 
             Axios.post(`${config.SERVER_URI}/api/cart`,addedItem).then(response=>{ 
                    console.log(response.data)
                }
                )  
         }
         catch(err){
             console.log(err)
         }
          if(existed_item)
         {
            addedItem.quantity += 1 
            // const serializedState = JSON.stringify( [...state.addedItems, addedItem]);
            // localStorage.setItem('state', serializedState);
            // console.log(serializedState)
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
  
            addedItem.quantity = 1;
            // const serializedState = JSON.stringify( [...state.addedItems, addedItem]);
            // localStorage.setItem('state', serializedState);
            // console.log(serializedState)
            //calculating the total
            let newTotal = state.total + addedItem.price 

            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id == item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        // const serializedState = JSON.stringify( [...state.addedItems, new_items]);
        // localStorage.setItem('state', serializedState);
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id == action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
        //   const serializedState = JSON.stringify( [...state.addedItems, addedItem.quantity]);
        //   localStorage.setItem('state', serializedState);
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            
        //   const serializedState = JSON.stringify( [...state.addedItems, new_items]);
        //   localStorage.setItem('state', serializedState);
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }

    }
    if(action.type=== ADD_SHIPPING){
        return{
            ...state,
            total: state.total + 6
        }
  }

  if(action.type=== 'SUB_SHIPPING'){
      return{
          ...state,
          total: state.total - 6
      }
}
  
    else{
        return state
    }
  }
export default cartReducer;