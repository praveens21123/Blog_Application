import React from 'react'
import { useState } from 'react';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    name:undefined,
    email:undefined,
    phoneNumber:undefined,
    password:undefined
  })
  const navigate = useNavigate()

  const changeHandler = (event) => {
    // console.log(event.target.value, event.target.id);
    const {id, value} = event.target
    
    setUserData((preState)=> ({...preState, [id]:value}))
  }
  const submitHandler = async(event) => {
    event.preventDefault()
    try{
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify(userData)
      })
      const data = await response.json()
      console.log(data);
      navigate("/login")
      
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='container'>
      <h2>Registration</h2>
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <form action="#" onSubmit={submitHandler}>
            <input type="text" className='form-control mb-1' id="name" placeholder='Enter your Name' onChange={changeHandler}/>
            <input type="email" className='form-control mb-1' id="email" placeholder='Enter your email' onChange={changeHandler}/>
            <input type="number" className='form-control mb-1' id="phoneNumber" placeholder='Enter your PhoneNum' onChange={changeHandler}/>
            <input type="password" className='form-control mb-1' id="password" placeholder='Create your Password' onChange={changeHandler}/>

            <button type='submit' className='btn btn-primary'>Register</button>
          </form>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  )
}

export default Register