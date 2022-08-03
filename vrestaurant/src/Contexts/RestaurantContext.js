import React, {useReducer} from 'react'

export const RestaurantContext = React.createContext()
export const RestaurantContextConsumer = RestaurantContext.Consumer

function reducer(state, actions){

  switch(actions.type){

    case 'AddRestaurantDetails':
        return {...state, RestaurantData : actions.payload.name }

    default:
       return state
  }
}

const initialState ={
  RestaurantData : 'hello'
}


export function RestaurantContextProvider({ children }) {

  const [state, dispatch2] = useReducer(reducer, initialState)
  const {RestaurantData} = state 

  
  
  return (
        <RestaurantContext.Provider value={{RestaurantData ,dispatch2}}> 
             {children}
           </RestaurantContext.Provider>
  )
}
