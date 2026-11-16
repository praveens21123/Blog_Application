import React, { createContext, useEffect, useReducer } from 'react'

const initialState = {
  user: localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null
}

const authReducer = (state, action) => {
  switch(action.type){
    case "LOGIN":
      return {
        user:action.payload,
        token:action.token,
        role:action.role
      }
    case "LOGOUT" : 
      return {
        user:null,
        token:null,
        role:null
      }
  }
}


export const AuthC = createContext(initialState)

const AuthContext = ({children}) => {
 const [state, dispatch]  = useReducer(authReducer, initialState)

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
    localStorage.setItem("token", state.token)
    localStorage.setItem("role", state.role)
  }, [state])

  return (
    <AuthC.Provider value={{
      user:state.user,
      token:state.token,
      dispatch
    }}>
      {children} 
    </AuthC.Provider>
  )
}

export default AuthContext