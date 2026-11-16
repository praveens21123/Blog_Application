import React, { useContext } from 'react'
import { BASE_URL } from '../utils/config.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthC } from '../context/AuthContext.jsx'
import { toast } from 'react-toastify'

const Login = () => {
  const [userData, setUserData] = useState({
    email:undefined,
    password:undefined
  })
  const {user, token, dispatch} = useContext(AuthC)

  const navigator = useNavigate()

  const changeHandler = (event) => {
    setUserData(preState => ({...preState, [event.target.id]:event.target.value}))
  }

  const submitHandler = async(event) => {
    event.preventDefault()

    try{
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(userData)
      })
      const {data, token} = await response.json()
      console.log(data);
      dispatch({
        type:"LOGIN",
        payload:data,
        token:token,
        role:data.role
      })
      navigator("/")
      toast.success("Login Done!")
    }catch(err){
      console.log(err);
      
    }
  }
  return (
    <div className='container'>
      <h2>Login</h2>
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <form action="#" onSubmit={submitHandler}>
            <input type="email" className='form-control mb-1' placeholder="Enter your Email" onChange={changeHandler} id="email"/>
            <input type="password" className='form-control mb-1' placeholder="Enter your Password" onChange={changeHandler} id="password"/>
            <button className="btn btn-primary" type="submit">Login</button>
          </form>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  )
}

export default Login