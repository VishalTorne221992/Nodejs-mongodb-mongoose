import React, {useReducer} from 'react'

export const UserContext = React.createContext()

export const MyUserContextConsumer = UserContext.Consumer


function reducer(state, actions){

  //const {user, LoggedIn} = state

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

    default : 
          return state

  }

}


const initialState = {

    user:'Guest',
    userData:{},
    LoggedIn: false

}


export function UserContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const {user , userData , LoggedIn } = state

  return (
    <UserContext.Provider value={{user, userData, LoggedIn, dispatch}}>
        { children }
    </UserContext.Provider>
  )
}

