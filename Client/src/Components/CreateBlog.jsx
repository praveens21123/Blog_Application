import React, { useState } from 'react'
import { BASE_URL, token } from '../utils/config.js'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    title:undefined,
    subTitle:undefined,
    poster:undefined,
    content:undefined,
  })
  const navigate = useNavigate()
  const changeHandler = (event) => {
    const {id, value} = event.target
    setBlog(preState => ({...preState, [id]:value}))
  }

  const submitHandler = async(event) => {
    event.preventDefault()

    try{
      console.log(token);
      
      const response = await fetch(`${BASE_URL}/blog/createblog`, {
        method:"POST",
        headers:{
          "Content-type":"application/json",
          "authorization":`Bearer ${token}`
        }, 
        body: JSON.stringify(blog)
      })
      const data = await response.json()
      console.log(data);
      navigate("/")
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='container'>
      <h4>Write your Blog here!</h4>
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <form action="" onSubmit={submitHandler}>
            <input type="text" className='form-control mb-2' placeholder='Enter your Title' id="title" onChange={changeHandler}/>
            <input type="text" className='form-control mb-2' placeholder='Enter your SubTitle' id="subTitle" onChange={changeHandler}/>
            <input type="text" className='form-control mb-2' placeholder='Enter your Poster' id="poster" onChange={changeHandler}/>
            <textarea className='form-control mb-2' id="content" name="content" cols="3" rows="5" placeholder='Enter your content' onChange={changeHandler}></textarea>
            <button className='btn btn-primary' type="submit">Create Blog</button>
          </form>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  )
}

export default CreateBlog