import React, { useEffect, useReducer, useState } from "react";


export const MenuCartContext = React.createContext();


function cartReducer(state, actions){
      switch(actions.type){

        case 'UserLoggedIN':
        return {...state, 
        user: actions.payload.username,
        LoggedIn: true
        }

        case 'AddUserData':
            return {...state,
            userData: actions.payload.user
       }

        case 'getRestaurantname' :{

          return {
            ...state,
            Restaurantname : actions.payload.name

          }
          
        }
        
        case 'AddMainMenu' :{
          
          return {...state,RestaurantUsermenu: actions.payload.Menu} 
          
        }

        case 'UpdateMainMenu' :{
          
          return {
            ...state,
            RestaurantUsermenu:[
              ...state.RestaurantUsermenu.map(item => {
                  return {...item, quantity:0, itemTotalPrice : 0}
              })
            ] 
            } 
          
        }

        case 'additem' :{

          return {
            ...state,cartItems: [...state.cartItems, {...actions.payload.item, quantity: 1, itemTotalPrice: actions.payload.item.itemPrice * 1}]

          }
    
        }

        case 'updateItemTotal' :{

          return {
            ...state,cartItems: [...state.cartItems.map(item => {
             if(item._id === actions.payload.item._id) {
              return { ...item, itemTotalPrice: item.itemPrice * item.quantity };
            }
            return item;
          })]
        }
    
        }

        
        case 'DecItem' :{

          return {
            ...state,cartItems: [...state.cartItems.map(item => {
             if(item._id === actions.payload.item._id) {
              return { ...item, quantity: item.quantity - 1 , itemTotalPrice: item.itemTotalPrice - item.itemPrice };
            }
            return item;
          })]
        }
    
        }

        case 'DecrementUpdateMenu' :{
          
          return {
            ...state,RestaurantUsermenu: [...state.RestaurantUsermenu.map(item => { 
              if(item._id === actions.payload.item._id && actions.payload.item.quantity > 0){
                 return {...item, quantity : item.quantity - 1}
              } 
              return item })]
          }
          
        }

        case 'ClearCart' :{

          return {...state,
            cartItems : []
          
          }
    
        }

        case 'RefreshMenu' :{

          return {
            ...state,
            RestaurantUsermenu:[
              ...state.RestaurantUsermenu.map(item => {
                  return {...item, quantity:0}
              })
            ] 
            }
    
        }

        case 'ChktoDelItem' :{

          return {
            ...state,cartItems: [...state.cartItems.filter(item => item._id !== actions.payload.item._id)]

          
          }
    
        }


        case 'UpdateAddeditem' :{
          return {
            ...state,cartItems: [...state.cartItems.map(item => {
             if(item._id === actions.payload.foundItem._id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          })]
        }
        
        }

        case 'UpdateMenu' :{
          
          return {
            ...state,RestaurantUsermenu: [...state.RestaurantUsermenu.map(item => { 
              if(item._id === actions.payload.item._id){
                 return {...item, quantity : item.quantity + 1}
              } 
              return item })]
          }
          
        }
            
        case 'clearitems' :{

          return state
        
        }

        case 'removeItem': {
          
          return state.filter(obj => obj._id !== actions.payload.foundItem._id)

        }

        default: 
           return state;
        }
}

const InitialState = {

  user: localStorage.getItem('user'),
  userData:{},
  Restaurantname:'',
  LoggedIn: false,
  cartItems: [],
  RestaurantUsermenu:[],
  cartTotal:0  

}

 export function MenuCartContextProvider({ children }) {

    const [state, dispatch] = useReducer(cartReducer, InitialState)
    const {user , userData , LoggedIn, cartItems, cartTotal, RestaurantUsermenu, Restaurantname} = state
    
    const [MenuFetcherror, setMenuFetcherror] = useState('')

    useEffect(() => {

      
      fetch(`http://localhost:5252/zomato/menu/${Restaurantname}`)
      .then(res => res.json())
      .then(data => {
        dispatch({type:'AddMainMenu', payload: {Menu : data.data}})
        dispatch({type:'UpdateMainMenu'})
      }).catch(error => setMenuFetcherror(error))
    
    

      

    }, [Restaurantname])


  return(
           <MenuCartContext.Provider value={{user , userData , LoggedIn, cartItems, cartTotal ,RestaurantUsermenu, Restaurantname, dispatch}}> 
             {children}
           </MenuCartContext.Provider>
  )
}
